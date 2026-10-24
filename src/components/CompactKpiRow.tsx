import { RoomLocation, Language } from '../types';
import { CheckCircle2, Layers, MapPin, Activity, ShieldCheck } from 'lucide-react';
import { getStatusColor } from '../utils/helpers';
import { translations, getRoomName } from '../i18n/translations';

interface CompactKpiRowProps {
  rooms: RoomLocation[];
  selectedRoom: RoomLocation;
  language: Language;
  onSelectRoom: (room: RoomLocation) => void;
}

export function CompactKpiRow({ rooms, selectedRoom, language, onSelectRoom }: CompactKpiRowProps) {
  const t = translations[language];
  const totalRooms = rooms.length;
  const completedRooms = rooms.filter(r => r.overallProgress === 100).length;
  
  // Total 34 stages count
  const allTasks = rooms.flatMap(r => r.tasks);
  const totalTasksCount = allTasks.length;
  const completedTasksCount = allTasks.filter(t => t.progress === 100).length;
  
  // Project overall average
  const totalSum = rooms.reduce((acc, r) => acc + r.overallProgress, 0);
  const projectOverallAvg = Math.round(totalSum / (totalRooms || 1));
  const statusCfg = getStatusColor(selectedRoom.overallProgress, language);

  return (
    <div className="bg-[#081226] border border-[#1A2E4E] rounded-xl p-2.5 sm:p-3 shadow-md mb-3" id="compact-kpi-summary-row">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 items-center">
        
        {/* 1. Overall Project Progress */}
        <div className="bg-[#050B18] border border-[#1A2E4E] rounded-lg p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#FF9F1C]/15 border border-[#FF9F1C]/30 flex items-center justify-center text-[#FF9F1C] shrink-0">
              <Activity className="w-4 h-4 text-[#FF9F1C]" />
            </div>
            <div>
              <p className="text-[10px] text-white/50 font-medium leading-none mb-1">{t.overallProjectProgress}</p>
              <p className="text-xs font-bold text-white leading-none">{language === 'ar' ? 'مطار الأمير محمد' : 'PMIA Project'}</p>
            </div>
          </div>
          <div className={language === 'ar' ? 'text-left' : 'text-right'}>
            <span className="text-base font-black font-mono text-[#FF9F1C] leading-none">
              {projectOverallAvg}%
            </span>
          </div>
        </div>

        {/* 2. Completed Locations */}
        <div className="bg-[#050B18] border border-[#1A2E4E] rounded-lg p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#BADC58]/15 border border-[#BADC58]/30 flex items-center justify-center text-[#BADC58] shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#BADC58]" />
            </div>
            <div>
              <p className="text-[10px] text-white/50 font-medium leading-none mb-1">{t.completedLocations}</p>
              <p className="text-xs font-bold text-white leading-none">
                {language === 'ar' ? `${completedRooms} من أصل ${totalRooms}` : `${completedRooms} of ${totalRooms}`}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#BADC58] bg-[#BADC58]/10 px-1.5 py-0.5 rounded border border-[#BADC58]/20">
            {Math.round((completedRooms / (totalRooms || 1)) * 100)}%
          </span>
        </div>

        {/* 3. Total 34 Stages Completed */}
        <div className="bg-[#050B18] border border-[#1A2E4E] rounded-lg p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#4A90E2]/15 border border-[#4A90E2]/30 flex items-center justify-center text-[#4A90E2] shrink-0">
              <Layers className="w-4 h-4 text-[#4A90E2]" />
            </div>
            <div>
              <p className="text-[10px] text-white/50 font-medium leading-none mb-1">{t.stagesCompletedCount}</p>
              <p className="text-xs font-bold text-white leading-none">{completedTasksCount} / {totalTasksCount}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#4A90E2] bg-[#4A90E2]/10 px-1.5 py-0.5 rounded border border-[#4A90E2]/20">
            {completedTasksCount} {language === 'ar' ? 'بند' : 'items'}
          </span>
        </div>

        {/* 4. Active Selected Location */}
        <div className="bg-[#050B18] border border-[#FF9F1C]/40 rounded-lg p-2 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-md bg-[#FF9F1C] flex items-center justify-center text-[#050B18] shrink-0 font-bold">
              <MapPin className="w-4 h-4 text-[#050B18]" />
            </div>
            <div className={`min-w-0 ${language === 'ar' ? 'pr-1' : 'pl-1'}`}>
              <p className="text-[10px] text-[#FF9F1C] font-mono leading-none mb-1 truncate">{selectedRoom.barcode}</p>
              <p className="text-xs font-bold text-white leading-none truncate">{getRoomName(selectedRoom, language)}</p>
            </div>
          </div>
          <span className={`text-xs font-mono font-black px-1.5 py-0.5 rounded shrink-0 ${statusCfg.badgeBg}`}>
            {selectedRoom.overallProgress}%
          </span>
        </div>

        {/* 5. Direct Status / Sync indicator */}
        <div className="hidden lg:flex bg-[#050B18] border border-[#1A2E4E] rounded-lg p-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#BADC58]/15 border border-[#BADC58]/30 flex items-center justify-center text-[#BADC58] shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#BADC58]" />
            </div>
            <div>
              <p className="text-[10px] text-white/50 font-medium leading-none mb-1">{t.engineeringCompliance}</p>
              <p className="text-xs font-bold text-[#BADC58] leading-none">{t.barcodeSynced}</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-white/40">GACA-REV4</span>
        </div>

      </div>
    </div>
  );
}
