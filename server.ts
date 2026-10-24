import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Database file path for durable persistence
const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  try {
    fs.mkdirSync(DB_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating db directory:', err);
  }
}

// In-memory cache for ultra-fast response
let cachedRooms: any[] | null = null;

function loadRoomsFromDisk(): any[] | null {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedRooms = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading database from disk:', err);
  }
  return null;
}

function saveRoomsToDisk(rooms: any[]): boolean {
  try {
    cachedRooms = rooms;
    fs.writeFileSync(DB_FILE, JSON.stringify(rooms, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving database to disk:', err);
    return false;
  }
}

// ----------------------------------------------------
// RESTful API Endpoints for PMIA Execution System
// ----------------------------------------------------

// 1. Health Check
app.get('/api/health', (req, res) => {
  const isDbReady = fs.existsSync(DB_FILE) || cachedRooms !== null;
  res.json({
    status: 'ok',
    system: 'Prince Mohammad Bin Abdulaziz International Airport (PMIA) Execution Tracking API',
    databasePersisted: isDbReady,
    cachedRoomsCount: cachedRooms ? cachedRooms.length : 0,
    timestamp: new Date().toISOString()
  });
});

// 2. Get All Rooms
app.get('/api/rooms', (req, res) => {
  const rooms = cachedRooms || loadRoomsFromDisk();
  res.json({
    success: true,
    rooms: rooms || [],
    total: rooms ? rooms.length : 0,
    lastSync: new Date().toISOString()
  });
});

// 3. Batch Update / Save All Rooms
app.post('/api/rooms', (req, res) => {
  const { rooms } = req.body;
  if (!Array.isArray(rooms)) {
    return res.status(400).json({ success: false, error: 'Invalid payload: rooms must be an array' });
  }

  saveRoomsToDisk(rooms);
  res.json({
    success: true,
    message: 'Rooms successfully saved and synchronized with PMIA database',
    count: rooms.length,
    timestamp: new Date().toISOString()
  });
});

// 4. Update Single Room
app.put('/api/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  const updatedRoom = req.body;

  let rooms = cachedRooms || loadRoomsFromDisk() || [];
  const index = rooms.findIndex((r: any) => r.id === roomId || r.barcode === roomId);

  if (index >= 0) {
    rooms[index] = {
      ...rooms[index],
      ...updatedRoom,
      lastInspectionDate: new Date().toISOString().split('T')[0]
    };
  } else {
    rooms.push(updatedRoom);
  }

  saveRoomsToDisk(rooms);
  res.json({
    success: true,
    room: updatedRoom,
    message: `Room ${roomId} updated successfully`
  });
});

// 5. Set All Stages of a Room to 100% (or specified value)
app.post('/api/rooms/:id/set-all', (req, res) => {
  const roomId = req.params.id;
  const { progress = 100 } = req.body;

  let rooms = cachedRooms || loadRoomsFromDisk() || [];
  const index = rooms.findIndex((r: any) => r.id === roomId || r.barcode === roomId);

  if (index >= 0) {
    const room = rooms[index];
    const today = new Date().toISOString().split('T')[0];
    const updatedTasks = (room.tasks || []).map((t: any) => ({
      ...t,
      progress,
      isApproved: progress === 100,
      lastUpdated: today
    }));

    rooms[index] = {
      ...room,
      tasks: updatedTasks,
      overallProgress: progress,
      isOfficiallyApproved: progress === 100,
      approvalDate: progress === 100 ? today : undefined,
      lastInspectionDate: today
    };

    saveRoomsToDisk(rooms);
    return res.json({
      success: true,
      room: rooms[index],
      message: `All stages of room ${roomId} updated to ${progress}%`
    });
  }

  res.status(404).json({ success: false, error: `Room ${roomId} not found` });
});

// 6. Project Stats Summary
app.get('/api/stats', (req, res) => {
  const rooms = cachedRooms || loadRoomsFromDisk() || [];
  if (rooms.length === 0) {
    return res.json({
      totalRooms: 0,
      completedRooms: 0,
      inProgressRooms: 0,
      notStartedRooms: 0,
      totalStagesCount: 0,
      completedStagesCount: 0,
      overallPercentage: 0
    });
  }

  const totalRooms = rooms.length;
  const completedRooms = rooms.filter((r: any) => r.overallProgress === 100).length;
  const inProgressRooms = rooms.filter((r: any) => r.overallProgress > 0 && r.overallProgress < 100).length;
  const notStartedRooms = rooms.filter((r: any) => r.overallProgress === 0).length;

  let totalStages = 0;
  let completedStages = 0;
  let progressSum = 0;

  rooms.forEach((r: any) => {
    progressSum += (r.overallProgress || 0);
    if (Array.isArray(r.tasks)) {
      totalStages += r.tasks.length;
      completedStages += r.tasks.filter((t: any) => t.progress === 100).length;
    }
  });

  const overallPercentage = Math.round(progressSum / totalRooms);

  res.json({
    totalRooms,
    completedRooms,
    inProgressRooms,
    notStartedRooms,
    totalStagesCount: totalStages,
    completedStagesCount: completedStages,
    overallPercentage,
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------
// Vite Middleware / Static Asset Serving
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PMIA Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
