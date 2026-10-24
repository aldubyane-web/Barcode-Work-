import { useState, useEffect } from 'react';
import { RoomLocation, Language } from './types';
import { getInitialProjectData, saveProjectData, initialRoomsData, fetchRoomsFromServer, syncRoomsWithServer } from './data/initialData';
import { Header } from './components/Header';
import { CompactKpiRow } from './components/CompactKpiRow';
import { RoomStagesChecklist } from './components/RoomStagesChecklist';
import { CompactBlueprint } from './components/CompactBlueprint';
import { ScannerModal } from './components/ScannerModal';
import { ReportsModal } from './components/ReportsModal';
import { CheckCircle2 } from 'lucide-react';
import { translations } from './i18n/translations';
import { safeStorage } from './utils/storage';

export function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = safeStorage.getItem('pmia_app_language_v1');
    return (saved === 'en' || saved === 'ar') ? (saved as Language) : 'ar';
  });

  const [rooms, setRooms] = useState<RoomLocation[]>(() => {
    const initial = getInitialProjectData();
    return (initial && initial.length > 0) ? initial : initialRoomsData;
  });
  const [selectedRoomId, setSelectedRoomId] = useState<string>('M-1-01'); // Default to M-1-01
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [isReportsOpen, setIsReportsOpen] = useState<boolean>(false);
  const [showSaveToast, setShowSaveToast] = useState<boolean>(false);

  // Synchronize document HTML dir and lang attributes
  useEffect(() => {
    try {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    } catch (e) {
      console.warn('Could not set documentElement attributes', e);
    }
    safeStorage.setItem('pmia_app_language_v1', language);
  }, [language]);

  // Initial load from server database
  useEffect(() => {
    let isMounted = true;
    fetchRoomsFromServer().then((serverRooms) => {
      if (isMounted && serverRooms && serverRooms.length > 0) {
        setRooms(serverRooms);
      } else {
        // If server is empty on first run, seed server with current rooms
        syncRoomsWithServer(rooms);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Selected room object
  const selectedRoom = (rooms && rooms.find(r => r.id === selectedRoomId)) || (rooms && rooms[0]) || initialRoomsData[0];
  const t = translations[language] || translations.ar;

  // Update room handler
  const handleUpdateRoom = (updatedRoom: RoomLocation) => {
    const nextRooms = rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r);
    const saved = saveProjectData(nextRooms);
    setRooms(saved);
  };

  // Select room handler
  const handleSelectRoom = (room: RoomLocation) => {
    setSelectedRoomId(room.id);
  };

  // Save feedback notice
  const handleSaveNotice = () => {
    const saved = saveProjectData(rooms);
    setRooms(saved);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2500);
  };

  // Switch language
  const handleToggleLanguage = (newLang: Language) => {
    setLanguage(newLang);
  };

  return (
    <div 
      className={`min-h-screen bg-[#050B18] text-white flex flex-col selection:bg-[#FF9F1C] selection:text-[#050B18] ${
        language === 'ar' ? "font-['Cairo','Tajawal',sans-serif]" : "font-['Plus_Jakarta_Sans',sans-serif]"
      }`} 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      
      {/* 1. Header with Language Toggle & Search */}
      <Header
        rooms={rooms}
        selectedRoom={selectedRoom}
        language={language}
        onSelectRoom={handleSelectRoom}
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenReports={() => setIsReportsOpen(true)}
        onToggleLanguage={handleToggleLanguage}
        onSaveNotice={handleSaveNotice}
      />

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4">
        
        {/* Single-row KPI Summary */}
        <CompactKpiRow
          rooms={rooms}
          selectedRoom={selectedRoom}
          language={language}
          onSelectRoom={handleSelectRoom}
        />

        {/* Side-by-Side Cohesive Layout: Checklist & Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
          
          {/* Main 34-Stage Execution Checklist (7 Columns) */}
          <div className="lg:col-span-7 h-full">
            <RoomStagesChecklist
              room={selectedRoom}
              allRooms={rooms}
              language={language}
              onUpdateRoom={handleUpdateRoom}
              onSelectRoom={handleSelectRoom}
              onOpenScanner={() => setIsScannerOpen(true)}
            />
          </div>

          {/* Compact CAD Blueprint (5 Columns) */}
          <div className="lg:col-span-5 h-full">
            <CompactBlueprint
              rooms={rooms}
              selectedRoom={selectedRoom}
              language={language}
              onSelectRoom={handleSelectRoom}
            />
          </div>

        </div>
      </main>

      {/* Save Notification Toast */}
      {showSaveToast && (
        <div className={`fixed bottom-4 ${language === 'ar' ? 'left-4' : 'right-4'} z-50 bg-[#BADC58] text-[#050B18] px-4 py-2 rounded-lg font-bold shadow-2xl flex items-center gap-2 text-xs animate-in slide-in-from-bottom-3`}>
          <CheckCircle2 className="w-4 h-4 text-[#050B18]" />
          <span>{t.savedToast}</span>
        </div>
      )}

      {/* Camera Barcode / QR Scanner Modal */}
      <ScannerModal
        isOpen={isScannerOpen}
        language={language}
        onClose={() => setIsScannerOpen(false)}
        onSelectRoom={handleSelectRoom}
        rooms={rooms}
      />

      {/* Reports and PDF Export Modal */}
      <ReportsModal
        isOpen={isReportsOpen}
        language={language}
        onClose={() => setIsReportsOpen(false)}
        rooms={rooms}
        selectedRoom={selectedRoom}
        onSelectRoom={handleSelectRoom}
      />

    </div>
  );
}

export default App;
