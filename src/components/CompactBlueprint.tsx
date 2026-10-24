import { useState } from 'react';
import { RoomLocation, Language } from '../types';
import { ZoomIn, ZoomOut, RotateCcw, Compass, Info } from 'lucide-react';
import { getStatusColor } from '../utils/helpers';
import { translations, getRoomName, getRoomZone, getRoomFloor } from '../i18n/translations';

interface CompactBlueprintProps {
  rooms: RoomLocation[];
  selectedRoom: RoomLocation;
  language: Language;
  onSelectRoom: (room: RoomLocation) => void;
}

export function CompactBlueprint({ rooms, selectedRoom, language, onSelectRoom }: CompactBlueprintProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredRoom, setHoveredRoom] = useState<RoomLocation | null>(null);

  const t = translations[language];
  const isEn = language === 'en';

  const filteredRooms = rooms.filter(r => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'departures') return r.zone === 'مبنى المغادرة' || r.zone === 'Departure Terminal';
    if (selectedFilter === 'arrivals') return r.zone === 'مبنى الوصول' || r.zone === 'Arrival Terminal';
    if (selectedFilter === 'floor1') return r.floor === 'طابق ١' || r.floor === 'Floor 1';
    if (selectedFilter === 'floor2') return r.floor === 'طابق ٢' || r.floor === 'Floor 2';
    return true;
  });

  return (
    <div className="bg-[#081226] border border-[#1A2E4E] rounded-xl overflow-hidden shadow-xl flex flex-col h-full" id="compact-blueprint-panel">
      
      {/* Blueprint Header */}
      <div className="p-3 bg-[#081226] border-b border-[#1A2E4E] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FF9F1C] flex items-center justify-center text-[#050B18] shadow">
            <Compass className="w-4 h-4 text-[#050B18] stroke-[2.5]" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-white flex items-center gap-1.5 leading-none">
              {t.interactiveBlueprintTitle}
              <span className="text-[9px] font-mono bg-[#050B18] text-[#4A90E2] border border-[#1A2E4E] px-1.5 py-0.2 rounded font-bold">
                {t.locationsCount}
              </span>
            </h3>
            <p className="text-[10px] text-[#4A90E2] mt-0.5 leading-none">{t.blueprintInstruction}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-[#050B18] p-0.5 rounded-lg border border-[#1A2E4E] text-[10px] sm:text-[11px] overflow-x-auto">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'departures', label: t.filterDepartures },
            { id: 'arrivals', label: t.filterArrivals },
            { id: 'floor1', label: t.filterFloor1 },
            { id: 'floor2', label: t.filterFloor2 }
          ].map((fl) => (
            <button
              key={fl.id}
              onClick={() => setSelectedFilter(fl.id)}
              className={`px-2 py-1 rounded-md font-bold whitespace-nowrap transition-all ${
                selectedFilter === fl.id
                  ? 'bg-[#FF9F1C] text-[#050B18] shadow'
                  : 'text-white/60 hover:text-white'
              }`}
              id={`floor-filter-${fl.id}`}
            >
              {fl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Blueprint Canvas SVG Area */}
      <div className="relative bg-[#050B18] overflow-hidden p-2 sm:p-4 min-h-[380px] sm:min-h-[440px] flex items-center justify-center select-none border-b border-[#1A2E4E] flex-1">
        
        {/* CAD Blueprint Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(74, 144, 226, 0.4) 1px, transparent 1px), linear-gradient(to right, rgba(74, 144, 226, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(74, 144, 226, 0.08) 1px, transparent 1px)`,
            backgroundSize: '16px 16px, 32px 32px, 32px 32px',
          }}
        />

        {/* Scalable SVG Container */}
        <div 
          className="relative w-full max-w-2xl aspect-[16/9] transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          <svg
            viewBox="0 0 900 450"
            className="w-full h-full drop-shadow-2xl"
          >
            <defs>
              <pattern id="cadGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(74,144,226,0.1)" strokeWidth="0.7" />
              </pattern>
            </defs>

            {/* External Concourse Boundary */}
            <rect x="20" y="20" width="860" height="410" rx="12" fill="#081226" stroke="#1A2E4E" strokeWidth="2" />
            <rect x="25" y="25" width="850" height="400" rx="10" fill="url(#cadGrid)" />

            {/* Zone Dividers & Boundary Headers */}
            {/* Zone A: Departure Floor 1 (Top Left) */}
            <rect x="35" y="32" width="440" height="175" rx="8" fill="#050B18" fillOpacity="0.4" stroke="#1A2E4E" strokeWidth="1" strokeDasharray="3 3" />
            <text x="45" y="47" fill="#4A90E2" fontSize="9.5" fontWeight="bold">
              {isEn ? '🏢 Departure Terminal — Floor 1 (M-1-01 to M-1-10)' : '🏢 مبنى المغادرة — طابق ١ (M-1-01 إلى M-1-10)'}
            </text>

            {/* Zone B: Departure Floor 2 (Bottom Left) */}
            <rect x="35" y="217" width="440" height="200" rx="8" fill="#050B18" fillOpacity="0.4" stroke="#1A2E4E" strokeWidth="1" strokeDasharray="3 3" />
            <text x="45" y="233" fill="#4A90E2" fontSize="9.5" fontWeight="bold">
              {isEn ? '🏢 Departure Terminal — Floor 2 (M-2-01 to M-2-06)' : '🏢 مبنى المغادرة — طابق ٢ (M-2-01 إلى M-2-06)'}
            </text>

            {/* Central Structural Vertical Divider */}
            <line x1="488" y1="32" x2="488" y2="418" stroke="#FF9F1C" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />

            {/* Zone C: Arrival Floor 2 (Right Column) */}
            <rect x="495" y="32" width="370" height="385" rx="8" fill="#050B18" fillOpacity="0.4" stroke="#1A2E4E" strokeWidth="1" strokeDasharray="3 3" />
            <text x="505" y="47" fill="#FF9F1C" fontSize="10" fontWeight="bold">
              {isEn ? '🛬 Arrival Terminal — Floor 2 (A-2-01 to A-2-03)' : '🛬 مبنى الوصول — طابق ٢ (A-2-01 إلى A-2-03)'}
            </text>

            {/* Render Each Room Geometry */}
            {filteredRooms.map((r) => {
              const status = getStatusColor(r.overallProgress, language);
              const isSelected = selectedRoom.id === r.id;
              const isHovered = hoveredRoom?.id === r.id;
              const bp = r.blueprint;
              const displayName = getRoomName(r, language);

              return (
                <g
                  key={r.id}
                  onClick={() => onSelectRoom(r)}
                  onMouseEnter={() => setHoveredRoom(r)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  className="cursor-pointer transition-all duration-200"
                  id={`blueprint-room-shape-${r.id}`}
                >
                  {/* Room Box */}
                  <rect
                    x={bp.x}
                    y={bp.y}
                    width={bp.width}
                    height={bp.height}
                    rx="5"
                    fill={
                      isSelected
                        ? '#142542'
                        : r.overallProgress === 100
                        ? '#0B1E13'
                        : r.overallProgress >= 50
                        ? '#1D1708'
                        : r.overallProgress >= 25
                        ? '#0A182E'
                        : '#071021'
                    }
                    stroke={isSelected ? '#FF9F1C' : isHovered ? '#4A90E2' : status.hex}
                    strokeWidth={isSelected ? 3 : isHovered ? 2 : 1.2}
                  />

                  {/* Corner Accent for engineering feel */}
                  <path
                    d={`M ${bp.x} ${bp.y + 8} L ${bp.x + 8} ${bp.y}`}
                    stroke={isSelected ? '#FF9F1C' : status.hex}
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.9"
                  />

                  {/* Room Barcode Tag - Code is NEVER changed */}
                  <rect
                    x={bp.x + 4}
                    y={bp.y + 4}
                    width={bp.width > 120 ? 52 : 44}
                    height="13"
                    rx="2.5"
                    fill="#050B18"
                    stroke={isSelected ? '#FF9F1C' : status.hex}
                    strokeWidth="0.7"
                  />
                  <text
                    x={bp.x + 7}
                    y={bp.y + 13.5}
                    fill={isSelected ? '#FF9F1C' : '#4A90E2'}
                    fontSize="7.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {r.barcode}
                  </text>

                  {/* Completion percentage circle */}
                  <circle
                    cx={bp.x + bp.width - 11}
                    cy={bp.y + 10.5}
                    r="7.5"
                    fill={status.hex}
                  />
                  <text
                    x={bp.x + bp.width - 11}
                    y={bp.y + 13.5}
                    fill="#050B18"
                    fontSize="6.5"
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    {r.overallProgress}%
                  </text>

                  {/* Localized Name Text */}
                  <text
                    x={bp.x + bp.width / 2}
                    y={bp.y + (bp.height / 2) + (bp.height > 80 ? 4 : 8)}
                    fill="#FFFFFF"
                    fontSize={bp.width > 200 ? "11" : bp.width > 100 ? "9.5" : "8"}
                    fontWeight="bold"
                    textAnchor="middle"
                    className="select-none pointer-events-none"
                  >
                    {displayName}
                  </text>

                  {/* Floor / Area Sub-label if space permits */}
                  {bp.height > 70 && (
                    <text
                      x={bp.x + bp.width / 2}
                      y={bp.y + (bp.height / 2) + 20}
                      fill="#4A90E2"
                      fontSize="7.5"
                      textAnchor="middle"
                      className="select-none pointer-events-none opacity-80"
                    >
                      {r.areaM2} {isEn ? 'm²' : 'م²'} • {getRoomFloor(r, language)}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Hover Room Quick Card */}
          {hoveredRoom && (
            <div 
              className={`absolute pointer-events-none z-30 bg-[#081226] border border-[#1A2E4E] p-2.5 rounded-lg shadow-xl w-60 ${isEn ? 'text-left' : 'text-right'} animate-in fade-in`}
              style={{
                left: `${Math.min(68, Math.max(8, (hoveredRoom.blueprint.x / 900) * 100))}%`,
                top: `${Math.min(60, Math.max(5, (hoveredRoom.blueprint.y / 450) * 100 + 8))}%`,
              }}
            >
              <div className="flex items-center justify-between border-b border-[#1A2E4E] pb-1 mb-1.5">
                <span className="text-[10px] font-mono text-[#FF9F1C] font-bold">
                  {hoveredRoom.barcode}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${getStatusColor(hoveredRoom.overallProgress, language).badgeBg}`}>
                  {hoveredRoom.overallProgress}% {isEn ? 'Done' : 'مكتمل'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">
                {getRoomZone(hoveredRoom, language)} — {getRoomFloor(hoveredRoom, language)} — {getRoomName(hoveredRoom, language)}
              </h4>
              <p className="text-[10px] text-[#4A90E2]">{t.area}: {hoveredRoom.areaM2} {isEn ? 'm²' : 'م²'}</p>
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className={`absolute bottom-3 ${isEn ? 'right-3' : 'left-3'} flex flex-col gap-1 bg-[#081226] border border-[#1A2E4E] p-1 rounded-lg`}>
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
            className="w-7 h-7 rounded bg-[#050B18] hover:bg-[#111F3A] text-[#4A90E2] flex items-center justify-center transition-colors"
            title={t.zoomIn}
            id="blueprint-zoom-in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.7))}
            className="w-7 h-7 rounded bg-[#050B18] hover:bg-[#111F3A] text-[#4A90E2] flex items-center justify-center transition-colors"
            title={t.zoomOut}
            id="blueprint-zoom-out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="w-7 h-7 rounded bg-[#050B18] hover:bg-[#111F3A] text-white/50 hover:text-white flex items-center justify-center transition-colors text-xs font-bold"
            title={t.resetZoom}
            id="blueprint-zoom-reset"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Blueprint Legend Bar */}
      <div className="p-2 bg-[#060D1D] flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1.5 text-white/70 font-bold">
          <Info className="w-3.5 h-3.5 text-[#4A90E2]" />
          <span>{t.colorLegend}:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-[#BADC58]"></span>
            <span className="text-[#BADC58] font-bold">{t.legendCompleted}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-[#FF9F1C]"></span>
            <span className="text-[#FF9F1C] font-bold">{t.legendInProgress}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-[#4A90E2]"></span>
            <span className="text-[#4A90E2] font-bold">{t.legendInitial}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-white/20"></span>
            <span className="text-white/40 font-bold">{t.legendNotStarted}</span>
          </div>
        </div>

        <div className="text-[10px] font-mono text-[#FF9F1C]">
          {t.selectedLocation}: <span className="text-white font-bold">{selectedRoom.barcode} ({getRoomZone(selectedRoom, language)} — {getRoomFloor(selectedRoom, language)} — {getRoomName(selectedRoom, language)})</span>
        </div>
      </div>

    </div>
  );
}
