import { useState } from 'react';
import { RoomLocation, TaskItem, ExecutionPhase, Language } from '../types';
import { 
  CheckCircle2, 
  MapPin, 
  FileText, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare 
} from 'lucide-react';
import { getStatusColor, getPhaseInfo, exportElementAsPDF, playSuccessChime } from '../utils/helpers';
import { translations, getRoomName, getRoomZone, getRoomFloor, getStageI18n } from '../i18n/translations';

interface RoomStagesChecklistProps {
  room: RoomLocation;
  allRooms: RoomLocation[];
  language: Language;
  onUpdateRoom: (updatedRoom: RoomLocation) => void;
  onSelectRoom: (room: RoomLocation) => void;
  onOpenScanner?: () => void;
}

export function RoomStagesChecklist({
  room,
  allRooms,
  language,
  onUpdateRoom,
  onSelectRoom,
  onOpenScanner
}: RoomStagesChecklistProps) {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<number | 'all'>('all');
  const [expandedNotesId, setExpandedNotesId] = useState<number | null>(null);
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const t = translations[language];
  const isEn = language === 'en';
  const statusCfg = getStatusColor(room.overallProgress, language);

  // Update a single task progress
  const handleTaskProgressChange = (taskId: number, newProgress: number) => {
    const updatedTasks = room.tasks.map(tItem => {
      if (tItem.id === taskId) {
        return {
          ...tItem,
          progress: newProgress,
          lastUpdated: new Date().toISOString().split('T')[0],
          isApproved: newProgress === 100
        };
      }
      return tItem;
    });

    const sum = updatedTasks.reduce((acc, task) => acc + task.progress, 0);
    const overallProgress = Math.round(sum / updatedTasks.length);

    if (newProgress === 100) {
      playSuccessChime();
    }

    onUpdateRoom({
      ...room,
      tasks: updatedTasks,
      overallProgress,
      isOfficiallyApproved: overallProgress === 100,
      approvalDate: overallProgress === 100 ? new Date().toISOString().split('T')[0] : undefined
    });
  };

  // Update task note
  const handleTaskNoteChange = (taskId: number, note: string) => {
    const updatedTasks = room.tasks.map(tItem => {
      if (tItem.id === taskId) {
        return { ...tItem, notes: note };
      }
      return tItem;
    });
    onUpdateRoom({ ...room, tasks: updatedTasks });
  };

  // Set all tasks in this room to 100%
  const handleSetAll100 = () => {
    const updatedTasks = room.tasks.map(tItem => ({
      ...tItem,
      progress: 100,
      isApproved: true,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
    playSuccessChime();
    onUpdateRoom({
      ...room,
      tasks: updatedTasks,
      overallProgress: 100,
      isOfficiallyApproved: true,
      approvalDate: new Date().toISOString().split('T')[0]
    });
  };

  // Reset all tasks to 0%
  const handleResetAll0 = () => {
    const updatedTasks = room.tasks.map(tItem => ({
      ...tItem,
      progress: 0,
      isApproved: false,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
    onUpdateRoom({
      ...room,
      tasks: updatedTasks,
      overallProgress: 0,
      isOfficiallyApproved: false,
      approvalDate: undefined
    });
  };

  // Export current room PDF
  const handleExportRoomPDF = async () => {
    setIsExportingPDF(true);
    await exportElementAsPDF('printable-room-report', `PMIA_Report_${room.barcode}.pdf`);
    setIsExportingPDF(false);
  };

  // Filter tasks by phase number (1 to 6 or all)
  const filteredTasks = room.tasks.filter(tItem => {
    if (selectedPhaseFilter === 'all') return true;
    return tItem.phaseNumber === selectedPhaseFilter;
  });

  // Count completed tasks by phase
  const phase1Count = room.tasks.filter(tItem => tItem.phaseNumber === 1 && tItem.progress === 100).length;
  const phase1Total = room.tasks.filter(tItem => tItem.phaseNumber === 1).length;
  const phase2Count = room.tasks.filter(tItem => tItem.phaseNumber === 2 && tItem.progress === 100).length;
  const phase2Total = room.tasks.filter(tItem => tItem.phaseNumber === 2).length;
  const phase3Count = room.tasks.filter(tItem => tItem.phaseNumber === 3 && tItem.progress === 100).length;
  const phase3Total = room.tasks.filter(tItem => tItem.phaseNumber === 3).length;
  const phase4Count = room.tasks.filter(tItem => tItem.phaseNumber === 4 && tItem.progress === 100).length;
  const phase4Total = room.tasks.filter(tItem => tItem.phaseNumber === 4).length;
  const phase5Count = room.tasks.filter(tItem => tItem.phaseNumber === 5 && tItem.progress === 100).length;
  const phase5Total = room.tasks.filter(tItem => tItem.phaseNumber === 5).length;
  const phase6Count = room.tasks.filter(tItem => tItem.phaseNumber === 6 && tItem.progress === 100).length;
  const phase6Total = room.tasks.filter(tItem => tItem.phaseNumber === 6).length;

  return (
    <div className="bg-[#081226] border border-[#1A2E4E] rounded-xl overflow-hidden shadow-xl flex flex-col h-full" id="room-stages-checklist-container">
      
      {/* 1. Top Active Location Header Banner */}
      <div className="p-3 sm:p-4 bg-[#081226] border-b border-[#1A2E4E]">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2.5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-[#4A90E2] font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF9F1C]" />
                📍 {getRoomZone(room, language)} — {getRoomFloor(room, language)}
              </span>
              <span className="text-[10px] font-mono bg-[#050B18] text-[#FF9F1C] border border-[#FF9F1C]/40 px-2 py-0.5 rounded font-bold">
                📌 {room.barcode}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white leading-snug">
              {getRoomName(room, language)}
            </h2>
            <p className="text-[11px] text-[#4A90E2] font-medium mt-0.5">
              {t.area}: {room.areaM2} {isEn ? 'm²' : 'م²'} • {t.category}: {isEn ? (room.category === 'مكاتب وتشغيل' ? 'Offices & Ops' : room.category === 'صالات وركاب' ? 'Lounges & Gates' : 'Services & Utilities') : room.category} • {t.lastInspection}: {room.lastInspectionDate}
            </p>
          </div>

          {/* Progress Badge Box */}
          <div className="flex items-center gap-2">
            <div className={`${isEn ? 'text-right' : 'text-left'} bg-[#050B18] border border-[#1A2E4E] px-3 py-1.5 rounded-lg flex items-center gap-2.5`}>
              <div>
                <p className="text-[10px] text-white/50 leading-none mb-1">{t.overallProgress}</p>
                <p className="text-xs font-bold text-white leading-none">
                  {room.tasks.filter(tItem => tItem.progress === 100).length} / {room.tasks.length} {isEn ? 'items' : 'بند'}
                </p>
              </div>
              <span className={`text-base sm:text-lg font-mono font-black px-2 py-1 rounded ${statusCfg.badgeBg}`}>
                {room.overallProgress}%
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1A2E4E]">
          {/* Quick Room Jump Dropdown */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
            <span className="text-[11px] text-white/40 font-bold shrink-0">{t.switchLocation}:</span>
            <div className="flex gap-1">
              {allRooms.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onSelectRoom(r)}
                  className={`px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap transition-all ${
                    r.id === room.id
                      ? 'bg-[#FF9F1C] text-[#050B18] font-bold shadow'
                      : 'bg-[#050B18] hover:bg-[#111F3A] text-white/70 border border-[#1A2E4E]'
                  }`}
                  title={`${getRoomZone(r, language)} — ${getRoomFloor(r, language)} — ${getRoomName(r, language)} (${r.overallProgress}%)`}
                  id={`room-pill-select-${r.id}`}
                >
                  {r.barcode}
                </button>
              ))}
            </div>
          </div>

          {/* Room Tools */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleExportRoomPDF}
              disabled={isExportingPDF}
              className="px-2.5 py-1 bg-[#050B18] hover:bg-[#111F3A] text-[#4A90E2] border border-[#1A2E4E] rounded text-xs font-bold flex items-center gap-1 transition-colors"
              title={isEn ? "Export PDF report for this room" : "استخراج تقرير PDF للغرفة الحالية"}
              id="export-room-pdf-btn"
            >
              <FileText className="w-3.5 h-3.5 text-[#FF9F1C]" />
              <span>{isExportingPDF ? t.exporting : t.pdfReport}</span>
            </button>

            <button
              onClick={handleSetAll100}
              className="px-2.5 py-1 bg-[#BADC58]/15 hover:bg-[#BADC58]/25 text-[#BADC58] border border-[#BADC58]/30 rounded text-xs font-bold flex items-center gap-1 transition-colors"
              id="set-all-100-btn"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.all100}</span>
            </button>

            <button
              onClick={handleResetAll0}
              className="px-2 py-1 bg-[#050B18] hover:bg-[#111F3A] text-white/50 hover:text-white border border-[#1A2E4E] rounded text-xs transition-colors"
              title={t.reset0}
              id="reset-room-tasks-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Phase Navigation Tabs */}
      <div className="p-2 sm:p-3 bg-[#060D1D] border-b border-[#1A2E4E]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[11px] text-[#4A90E2] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#BADC58] animate-pulse"></span>
            <span>{t.parallelDesc}</span>
          </div>
          <span className="text-[10px] text-white/40 font-mono hidden sm:inline-block">{t.independentParallel}</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setSelectedPhaseFilter('all')}
            className={`px-2.5 py-1 rounded text-xs font-bold transition-all shrink-0 ${
              selectedPhaseFilter === 'all'
                ? 'bg-[#FF9F1C] text-[#050B18] shadow'
                : 'text-white/60 hover:text-white bg-[#050B18] border border-[#1A2E4E]'
            }`}
            id="phase-tab-all"
          >
            {t.allPhases} ({room.tasks.length})
          </button>

          <button
            onClick={() => setSelectedPhaseFilter(1)}
            className={`px-2 py-1 rounded text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
              selectedPhaseFilter === 1
                ? 'bg-[#4A90E2] text-[#050B18] shadow'
                : 'text-[#4A90E2] hover:text-white bg-[#050B18] border border-[#1A2E4E]'
            }`}
            id="phase-tab-1"
          >
            <span>{t.phase1Tab}</span>
            <span className="text-[10px] px-1 bg-[#050B18]/50 rounded">{phase1Count}/{phase1Total}</span>
          </button>

          <button
            onClick={() => setSelectedPhaseFilter(2)}
            className={`px-2 py-1 rounded text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
              selectedPhaseFilter === 2
                ? 'bg-[#00D2D3] text-[#050B18] shadow'
                : 'text-[#00D2D3] hover:text-white bg-[#050B18] border border-[#1A2E4E]'
            }`}
            id="phase-tab-2"
          >
            <span>{t.phase2Tab}</span>
            <span className="text-[10px] px-1 bg-[#050B18]/50 rounded">{phase2Count}/{phase2Total}</span>
          </button>

          <button
            onClick={() => setSelectedPhaseFilter(3)}
            className={`px-2 py-1 rounded text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
              selectedPhaseFilter === 3
                ? 'bg-[#FF9F1C] text-[#050B18] shadow'
                : 'text-[#FF9F1C] hover:text-white bg-[#050B18] border border-[#1A2E4E]'
            }`}
            id="phase-tab-3"
          >
            <span>{t.phase3Tab}</span>
            <span className="text-[10px] px-1 bg-[#050B18]/50 rounded">{phase3Count}/{phase3Total}</span>
          </button>

          <button
            onClick={() => setSelectedPhaseFilter(4)}
            className={`px-2 py-1 rounded text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
              selectedPhaseFilter === 4
                ? 'bg-[#A29BFE] text-[#050B18] shadow'
                : 'text-[#A29BFE] hover:text-white bg-[#050B18] border border-[#1A2E4E]'
            }`}
            id="phase-tab-4"
          >
            <span>{t.phase4Tab}</span>
            <span className="text-[10px] px-1 bg-[#050B18]/50 rounded">{phase4Count}/{phase4Total}</span>
          </button>

          <button
            onClick={() => setSelectedPhaseFilter(5)}
            className={`px-2 py-1 rounded text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
              selectedPhaseFilter === 5
                ? 'bg-[#FDCB6E] text-[#050B18] shadow'
                : 'text-[#FDCB6E] hover:text-white bg-[#050B18] border border-[#1A2E4E]'
            }`}
            id="phase-tab-5"
          >
            <span>{t.phase5Tab}</span>
            <span className="text-[10px] px-1 bg-[#050B18]/50 rounded">{phase5Count}/{phase5Total}</span>
          </button>

          <button
            onClick={() => setSelectedPhaseFilter(6)}
            className={`px-2 py-1 rounded text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
              selectedPhaseFilter === 6
                ? 'bg-[#BADC58] text-[#050B18] shadow'
                : 'text-[#BADC58] hover:text-white bg-[#050B18] border border-[#1A2E4E]'
            }`}
            id="phase-tab-6"
          >
            <span>{t.phase6Tab}</span>
            <span className="text-[10px] px-1 bg-[#050B18]/50 rounded">{phase6Count}/{phase6Total}</span>
          </button>
        </div>
      </div>

      {/* 3. The 34 Sequential Tasks List */}
      <div className="p-2 sm:p-3 overflow-y-auto space-y-2 flex-1 max-h-[580px] sm:max-h-[640px]" id="stages-scroll-container">
        {filteredTasks.map((task) => {
          const tStatus = getStatusColor(task.progress, language);
          const stageI18n = getStageI18n(task.stageNumber, language);
          const pInfo = getPhaseInfo(task.phase, language);
          const isNotesExpanded = expandedNotesId === task.id;

          return (
            <div
              key={task.id}
              className={`p-2.5 rounded-lg border transition-all ${
                task.progress === 100
                  ? 'bg-[#0B1E13]/80 border-[#BADC58]/40'
                  : task.progress > 0
                  ? 'bg-[#050B18] border-[#FF9F1C]/30'
                  : 'bg-[#050B18] border-[#1A2E4E]/80'
              }`}
              id={`stage-item-${task.id}`}
            >
              {/* Task Header Row */}
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-start gap-2 min-w-0 flex-1">
                  {/* Sequential Number Badge (1 to 34) */}
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono shrink-0 ${
                    task.progress === 100
                      ? 'bg-[#BADC58] text-[#050B18]'
                      : task.progress >= 50
                      ? 'bg-[#FF9F1C] text-[#050B18]'
                      : 'bg-[#1A2E4E] text-white/80'
                  }`}>
                    {task.stageNumber}
                  </div>

                  {/* Title & Phase */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                      <span className={`text-[9.5px] px-1.5 py-0.2 rounded border font-medium ${pInfo.badgeColor} ${pInfo.borderColor}`}>
                        {stageI18n.phase}
                      </span>
                      <span className="text-[10px] text-white/40">
                        • {t.contractor}: {stageI18n.contractor}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-white leading-snug">
                      {stageI18n.title}
                    </h4>
                  </div>
                </div>

                {/* Status Indicator Badge with State Name */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${tStatus.badgeBg}`}>
                    <span>{tStatus.stateLabel}</span>
                    <span className="font-mono">({task.progress}%)</span>
                  </span>
                </div>
              </div>

              {/* Interactive Status Controls: Quick 5 Buttons + Slider */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#1A2E4E]/60">
                {/* 5 Quick State Buttons with clear visual indicators */}
                <div className="flex items-center gap-1">
                  {[
                    { val: 0, label: isEn ? '0% Not Started' : '0% غير منجز' },
                    { val: 25, label: '25%' },
                    { val: 50, label: '50%' },
                    { val: 75, label: '75%' },
                    { val: 100, label: isEn ? '100% Done' : '100% مكتمل' }
                  ].map(({ val, label }) => {
                    const isActive = task.progress === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleTaskProgressChange(task.id, val)}
                        className={`px-2 py-1 rounded text-[11px] font-bold font-mono transition-all ${
                          isActive
                            ? val === 100
                              ? 'bg-[#BADC58] text-[#050B18] shadow-md shadow-[#BADC58]/20'
                              : val > 0
                              ? 'bg-[#FF9F1C] text-[#050B18] shadow-md shadow-[#FF9F1C]/20'
                              : 'bg-[#1A2E4E] text-white border border-[#4A90E2]/50 shadow'
                            : 'bg-[#060D1D] text-white/50 hover:text-white hover:bg-[#111F3A] border border-[#1A2E4E]'
                        }`}
                        id={`task-${task.id}-val-${val}`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Range Slider for Granular adjustment + Notes toggle */}
                <div className="flex items-center gap-2 flex-1 max-w-xs justify-end">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={task.progress}
                    onChange={(e) => handleTaskProgressChange(task.id, Number(e.target.value))}
                    className="w-24 sm:w-32 accent-[#FF9F1C] cursor-pointer"
                    id={`task-${task.id}-slider`}
                  />

                  <button
                    onClick={() => setExpandedNotesId(isNotesExpanded ? null : task.id)}
                    className="p-1 rounded text-white/50 hover:text-white hover:bg-[#111F3A] transition-colors text-xs flex items-center gap-0.5"
                    title={t.fieldNotes}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#4A90E2]" />
                    {isNotesExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Expandable Field Notes Box */}
              {isNotesExpanded && (
                <div className="mt-2 pt-2 border-t border-[#1A2E4E] bg-[#081226] p-2 rounded">
                  <label className="text-[10px] text-[#4A90E2] font-bold block mb-1">
                    {t.notesPrompt} #{task.stageNumber}:
                  </label>
                  <input
                    type="text"
                    value={task.notes || ''}
                    onChange={(e) => handleTaskNoteChange(task.id, e.target.value)}
                    placeholder={t.enterNotesPlaceholder}
                    className="w-full p-1.5 bg-[#050B18] border border-[#1A2E4E] rounded text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF9F1C]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Off-screen container formatted specifically for PDF and Print Generation */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none opacity-0" aria-hidden="true">
        <div id="printable-room-report" className="p-8 bg-white text-black font-sans w-[800px]" dir={isEn ? 'ltr' : 'rtl'}>
          <div className="border-b-2 border-slate-800 pb-4 mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-slate-900">{t.airportFullName}</h1>
              <p className="text-sm text-slate-600">{t.fieldReportTitle}</p>
            </div>
            <div className={`${isEn ? 'text-right' : 'text-left'} font-mono text-xs`}>
              <p className="font-bold text-slate-800">PMIA-INSP-2026</p>
              <p className="text-slate-500">{t.date}: {new Date().toLocaleDateString(isEn ? 'en-US' : 'ar-SA')}</p>
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg mb-6 grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-700">{t.locationRoom}:</span>
              <p className="text-sm font-bold text-slate-900">{getRoomName(room, language)}</p>
            </div>
            <div>
              <span className="font-bold text-slate-700">{t.barcodeAndZone}:</span>
              <p className="text-sm font-mono text-slate-900">{room.barcode} ({getRoomZone(room, language)})</p>
            </div>
            <div>
              <span className="font-bold text-slate-700">{t.overallProgress}:</span>
              <p className="text-base font-bold text-emerald-700">{room.overallProgress}%</p>
            </div>
          </div>

          <table className={`w-full ${isEn ? 'text-left' : 'text-right'} border-collapse text-xs mb-6`}>
            <thead>
              <tr className="bg-slate-200 border-b border-slate-300">
                <th className="p-2 border">#</th>
                <th className="p-2 border">{t.phaseAndCategory}</th>
                <th className="p-2 border">{t.stageItemAndSpec}</th>
                <th className="p-2 border">{t.approvedContractor}</th>
                <th className="p-2 border text-center">{t.progress}</th>
              </tr>
            </thead>
            <tbody>
              {room.tasks.map(tItem => {
                const sI18n = getStageI18n(tItem.stageNumber, language);
                return (
                  <tr key={tItem.id} className="border-b border-slate-200">
                    <td className="p-2 border font-mono font-bold text-center">{tItem.stageNumber}</td>
                    <td className="p-2 border text-slate-600">{sI18n.phase}</td>
                    <td className="p-2 border font-bold text-slate-900">{sI18n.title}</td>
                    <td className="p-2 border text-slate-600">{sI18n.contractor}</td>
                    <td className="p-2 border text-center font-bold font-mono">
                      {tItem.progress === 100 ? '✅ 100%' : `${tItem.progress}%`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="border-t pt-4 flex justify-between text-xs text-slate-600">
            <div>
              <p className="font-bold">{t.inspectionCommittee}</p>
              <p>{t.airportFullName}</p>
            </div>
            <div className={isEn ? 'text-right' : 'text-left'}>
              <p>{t.systemGeneratedNotice}</p>
              <p className="font-mono">{room.barcode}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
