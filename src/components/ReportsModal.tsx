import { useState } from 'react';
import { RoomLocation, Language } from '../types';
import { X, FileText, Printer, Download, QrCode, FileSpreadsheet, Check, Copy, ExternalLink, Layers, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import QRCode from 'qrcode';
import { exportElementAsPDF, exportAllBarcodesPDF, printAllBarcodes } from '../utils/helpers';
import { translations, getRoomName, getRoomZone, getRoomFloor } from '../i18n/translations';

interface ReportsModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  rooms: RoomLocation[];
  selectedRoom: RoomLocation;
  onSelectRoom: (room: RoomLocation) => void;
}

export function ReportsModal({
  isOpen,
  language,
  onClose,
  rooms,
  selectedRoom,
  onSelectRoom
}: ReportsModalProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'stickers'>('summary');
  const [isExporting, setIsExporting] = useState(false);
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<'all' | 'departures' | 'arrivals' | 'external'>('all');
  const [copiedBarcode, setCopiedBarcode] = useState<string | null>(null);

  const t = translations[language];
  const isEn = language === 'en';

  if (!isOpen) return null;

  const totalRooms = rooms.length;
  const completedRooms = rooms.filter(r => r.overallProgress === 100).length;
  const inProgressRooms = rooms.filter(r => r.overallProgress > 0 && r.overallProgress < 100).length;
  
  const allTasks = rooms.flatMap(r => r.tasks);
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(tItem => tItem.progress === 100).length;
  const overallAvg = Math.round(rooms.reduce((a, b) => a + b.overallProgress, 0) / (totalRooms || 1));

  // Filter rooms for stickers tab
  const filteredRooms = rooms.filter(r => {
    if (selectedZoneFilter === 'all') return true;
    if (selectedZoneFilter === 'departures') return r.barcode.startsWith('M-1-');
    if (selectedZoneFilter === 'arrivals') return r.barcode.startsWith('M-2-');
    if (selectedZoneFilter === 'external') return r.barcode.startsWith('A-2-');
    return true;
  });

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      if (activeTab === 'stickers') {
        await exportAllBarcodesPDF(filteredRooms.length > 0 ? filteredRooms : rooms, language);
      } else {
        await exportElementAsPDF('full-project-report-container', `PMIA_Project_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      }
    } catch (err) {
      console.error('Export error', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAllStickersDirect = async () => {
    setIsExporting(true);
    try {
      await exportAllBarcodesPDF(rooms, language);
    } catch (err) {
      console.error('Stickers export error', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    if (activeTab === 'stickers') {
      printAllBarcodes(filteredRooms.length > 0 ? filteredRooms : rooms, language);
    } else {
      window.print();
    }
  };

  const handleCopyBarcode = (barcode: string) => {
    navigator.clipboard.writeText(barcode);
    setCopiedBarcode(barcode);
    setTimeout(() => setCopiedBarcode(null), 2000);
  };

  const handleDownloadSingleQR = async (room: RoomLocation) => {
    try {
      const url = await QRCode.toDataURL(room.barcode, {
        width: 600,
        margin: 2,
        color: {
          dark: '#050B18',
          light: '#FFFFFF'
        }
      });
      const a = document.createElement('a');
      a.href = url;
      a.download = `QR_${room.barcode}_${getRoomName(room, 'en').replace(/\s+/g, '_')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error('Single QR download error', e);
    }
  };

  const handleExportCSV = () => {
    const headers = isEn
      ? ['Barcode', 'Room Name', 'Zone', 'Floor', 'Area (m2)', 'Progress (%)', 'Status']
      : ['رمز الباركود', 'اسم الموقع', 'المنطقة', 'الدور', 'المساحة م2', 'نسبة الإنجاز', 'الحالة'];

    const rows = rooms.map(r => [
      r.barcode,
      `"${getRoomName(r, language)}"`,
      `"${getRoomZone(r, language)}"`,
      `"${getRoomFloor(r, language)}"`,
      r.areaM2,
      `${r.overallProgress}%`,
      r.overallProgress === 100 
        ? (isEn ? 'Completed & Approved' : 'مكتمل ومعتمد')
        : r.overallProgress > 0 
        ? (isEn ? 'In Progress' : 'جاري التنفيذ')
        : (isEn ? 'Not Started' : 'غير منجز')
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PMIA_Tracking_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#050B18]/85 backdrop-blur-md animate-in fade-in" id="reports-modal-backdrop">
      <div className="bg-[#081226] border border-[#1A2E4E] rounded-xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden" id="reports-modal-container">
        
        {/* Header */}
        <div className="p-4 bg-[#081226] border-b border-[#1A2E4E] flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF9F1C] flex items-center justify-center text-[#050B18] shadow">
              <FileText className="w-5 h-5 text-[#050B18] stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2 leading-tight">
                {t.reportsCenterTitle}
                <span className="text-[10px] bg-[#4A90E2]/20 text-[#4A90E2] border border-[#4A90E2]/40 px-2 py-0.5 rounded font-mono font-bold">
                  GACA-REPORT
                </span>
              </h3>
              <p className="text-xs text-[#4A90E2] leading-tight mt-0.5">
                {t.airportFullName} — {t.appSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="px-3.5 py-1.5 bg-[#FF9F1C] hover:bg-[#FF9F1C]/90 text-[#050B18] font-bold rounded-lg text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
              id="export-pdf-report-btn"
            >
              <Download className="w-3.5 h-3.5 text-[#050B18]" />
              <span>
                {isExporting
                  ? t.exporting
                  : activeTab === 'stickers'
                  ? (isEn ? 'Export All Barcodes (PDF)' : 'تصدير جميع الباركودات (PDF)')
                  : t.exportPdf}
              </span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#050B18] hover:bg-[#111F3A] text-white border border-[#1A2E4E] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              id="print-report-btn"
            >
              <Printer className="w-3.5 h-3.5 text-[#4A90E2]" />
              <span>{activeTab === 'stickers' ? (isEn ? 'Print Stickers' : 'طباعة الملصقات') : t.print}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-[#050B18] hover:bg-[#111F3A] text-white border border-[#1A2E4E] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              id="export-csv-btn"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#BADC58]" />
              <span>{t.exportCsv}</span>
            </button>

            <button
              onClick={onClose}
              className={`w-8 h-8 rounded-lg bg-[#050B18] hover:bg-[#111F3A] text-white/60 hover:text-white border border-[#1A2E4E] flex items-center justify-center transition-colors cursor-pointer ${isEn ? 'ml-2' : 'mr-2'}`}
              id="close-reports-modal-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-[#060D1D] px-4 pt-2 border-b border-[#1A2E4E] gap-2">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'summary'
                ? 'bg-[#081226] text-[#FF9F1C] border-t-2 border-t-[#FF9F1C] border-x border-[#1A2E4E]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.overallSummaryReport} ({totalRooms} {isEn ? 'locations' : 'موقعاً'})</span>
          </button>

          <button
            onClick={() => setActiveTab('stickers')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'stickers'
                ? 'bg-[#081226] text-[#FF9F1C] border-t-2 border-t-[#FF9F1C] border-x border-[#1A2E4E]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>🏷️ {t.barcodeStickers} ({totalRooms} {isEn ? 'stickers' : 'ملصق'})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4" id="full-project-report-container">
          
          {activeTab === 'summary' && (
            <div className="space-y-4">
              {/* Executive Metrics Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-[#050B18] border border-[#1A2E4E] rounded-lg">
                  <span className="text-[10px] text-white/50 block">{t.overallProjectProgress}</span>
                  <span className="text-xl font-bold font-mono text-[#FF9F1C]">{overallAvg}%</span>
                </div>
                <div className="p-3 bg-[#050B18] border border-[#1A2E4E] rounded-lg">
                  <span className="text-[10px] text-white/50 block">{t.completedLocations}</span>
                  <span className="text-xl font-bold font-mono text-[#BADC58]">{completedRooms} / {totalRooms}</span>
                </div>
                <div className="p-3 bg-[#050B18] border border-[#1A2E4E] rounded-lg">
                  <span className="text-[10px] text-white/50 block">{isEn ? 'In Progress Locations' : 'المواقع قيد التنفيذ'}</span>
                  <span className="text-xl font-bold font-mono text-[#4A90E2]">{inProgressRooms}</span>
                </div>
                <div className="p-3 bg-[#050B18] border border-[#1A2E4E] rounded-lg">
                  <span className="text-[10px] text-white/50 block">{t.stagesCompletedCount}</span>
                  <span className="text-xl font-bold font-mono text-white">{completedTasks} / {totalTasks}</span>
                </div>
              </div>

              {/* Table of all 19 airport sites */}
              <div className="border border-[#1A2E4E] rounded-lg overflow-hidden">
                <table className={`w-full ${isEn ? 'text-left' : 'text-right'} text-xs`}>
                  <thead className="bg-[#050B18] text-[#4A90E2] border-b border-[#1A2E4E] font-bold">
                    <tr>
                      <th className="p-2.5">{isEn ? 'Barcode' : 'الباركود'}</th>
                      <th className="p-2.5">{isEn ? 'Location Name' : 'اسم الموقع والقاعة'}</th>
                      <th className="p-2.5">{isEn ? 'Zone & Floor' : 'المنطقة والطابق'}</th>
                      <th className="p-2.5">{isEn ? 'Area' : 'المساحة'}</th>
                      <th className="p-2.5">{isEn ? 'Completed Stages' : 'المراحل المنجزة'}</th>
                      <th className={`p-2.5 ${isEn ? 'text-right' : 'text-left'}`}>{isEn ? 'Progress' : 'نسبة الإنجاز'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A2E4E]">
                    {rooms.map(r => {
                      const completedCount = r.tasks.filter(tItem => tItem.progress === 100).length;
                      return (
                        <tr
                          key={r.id}
                          onClick={() => {
                            onSelectRoom(r);
                            onClose();
                          }}
                          className="hover:bg-[#111F3A] cursor-pointer transition-colors"
                        >
                          <td className="p-2.5 font-mono font-bold text-[#FF9F1C]">{r.barcode}</td>
                          <td className="p-2.5 font-bold text-white">{getRoomName(r, language)}</td>
                          <td className="p-2.5 text-[#4A90E2]">{getRoomZone(r, language)} • {getRoomFloor(r, language)}</td>
                          <td className="p-2.5 text-white/60">{r.areaM2} {isEn ? 'm²' : 'م²'}</td>
                          <td className="p-2.5 text-white/80">{completedCount} / {r.tasks.length}</td>
                          <td className={`p-2.5 ${isEn ? 'text-right' : 'text-left'}`}>
                            <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                              r.overallProgress === 100
                                ? 'bg-[#BADC58]/15 text-[#BADC58]'
                                : r.overallProgress >= 50
                                ? 'bg-[#FF9F1C]/15 text-[#FF9F1C]'
                                : 'bg-[#4A90E2]/15 text-[#4A90E2]'
                            }`}>
                              {r.overallProgress}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'stickers' && (
            <div className="space-y-4">
              
              {/* Premium Top Bar for Stickers Export */}
              <div className="bg-[#050B18] border border-[#1A2E4E] p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#BADC58] animate-pulse"></span>
                    <h4 className="font-bold text-sm text-white">
                      {isEn ? 'All 19 Official Barcode & QR Stickers' : 'جميع ملصقات الباركود و QR الرسمية الـ 19 المعتمدة'}
                    </h4>
                  </div>
                  <p className="text-xs text-white/60 mt-1">
                    {isEn
                      ? 'High-resolution printable stickers formatted for A4 sheets with cutting guidelines and complete room data.'
                      : 'ملصقات عالية الدقة ومعدة للطباعة والقص والتركيب الميداني على مداخل القاعات والغرف وفق معايير GACA.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={handleExportAllStickersDirect}
                    disabled={isExporting}
                    className="flex-1 md:flex-none px-4 py-2 bg-[#FF9F1C] hover:bg-[#FF9F1C]/90 text-[#050B18] font-bold rounded-lg text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#050B18]" />
                    <span>{isExporting ? t.exporting : (isEn ? 'Download All 19 Stickers (PDF)' : 'تصدير جميع الـ 19 باركود كملصقات PDF')}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-3.5 py-2 bg-[#111F3A] hover:bg-[#1A2E4E] text-white border border-[#4A90E2]/40 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[#4A90E2]" />
                    <span>{isEn ? 'Print All' : 'طباعة الكل'}</span>
                  </button>
                </div>
              </div>

              {/* Zone Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <button
                  onClick={() => setSelectedZoneFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedZoneFilter === 'all'
                      ? 'bg-[#FF9F1C] text-[#050B18]'
                      : 'bg-[#050B18] text-white/70 border border-[#1A2E4E] hover:text-white'
                  }`}
                >
                  {isEn ? `All Locations (${rooms.length})` : `كافة المواقع الـ (${rooms.length})`}
                </button>

                <button
                  onClick={() => setSelectedZoneFilter('departures')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedZoneFilter === 'departures'
                      ? 'bg-[#4A90E2] text-[#050B18]'
                      : 'bg-[#050B18] text-white/70 border border-[#1A2E4E] hover:text-white'
                  }`}
                >
                  {isEn ? 'Departure Concourse • Floor 1 (10)' : 'صالات المغادرة • طابق 1 (10)'}
                </button>

                <button
                  onClick={() => setSelectedZoneFilter('arrivals')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedZoneFilter === 'arrivals'
                      ? 'bg-[#BADC58] text-[#050B18]'
                      : 'bg-[#050B18] text-white/70 border border-[#1A2E4E] hover:text-white'
                  }`}
                >
                  {isEn ? 'Arrival Concourse • Floor 2 (6)' : 'صالات الوصول • طابق 2 (6)'}
                </button>

                <button
                  onClick={() => setSelectedZoneFilter('external')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedZoneFilter === 'external'
                      ? 'bg-[#FDCB6E] text-[#050B18]'
                      : 'bg-[#050B18] text-white/70 border border-[#1A2E4E] hover:text-white'
                  }`}
                >
                  {isEn ? 'External Aerodrome Facilities (3)' : 'المرافق والساحات الخارجية (3)'}
                </button>
              </div>

              {/* 19 Barcode Stickers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5" id="qr-stickers-grid">
                {filteredRooms.map(r => {
                  const completedCount = r.tasks.filter(tItem => tItem.progress === 100).length;
                  return (
                    <div
                      key={r.id}
                      className="bg-[#050B18] border-2 border-[#1A2E4E] hover:border-[#FF9F1C]/70 p-3.5 rounded-xl flex flex-col items-center text-center transition-all group relative overflow-hidden"
                    >
                      {/* Top Mini Header */}
                      <div className="w-full flex items-center justify-between text-[10px] text-white/50 mb-2 border-b border-[#1A2E4E] pb-1.5">
                        <span className="font-mono text-[#4A90E2] font-bold">PMIA-GACA</span>
                        <span className="text-[#FF9F1C] font-mono font-bold">{r.overallProgress}%</span>
                      </div>

                      {/* QR Code */}
                      <div className="bg-white p-2.5 rounded-lg mb-2.5 shadow-md group-hover:scale-105 transition-transform">
                        <QRCodeSVG value={r.barcode} size={110} level="M" />
                      </div>

                      {/* Barcode badge */}
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="font-mono text-xs font-bold text-[#FF9F1C] bg-[#081226] border border-[#FF9F1C]/40 px-2 py-0.5 rounded">
                          {r.barcode}
                        </span>
                        <button
                          onClick={() => handleCopyBarcode(r.barcode)}
                          title={isEn ? 'Copy Barcode' : 'نسخ رمز الباركود'}
                          className="p-1 text-white/40 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedBarcode === r.barcode ? <Check className="w-3 h-3 text-[#BADC58]" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>

                      {/* Room Titles */}
                      <p className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#FF9F1C] transition-colors">
                        {getRoomName(r, language)}
                      </p>
                      <p className="text-[10px] text-white/50 line-clamp-1 mt-0.5">
                        {getRoomName(r, isEn ? 'ar' : 'en')}
                      </p>

                      {/* Zone & Floor */}
                      <div className="mt-2 text-[10px] text-[#4A90E2] bg-[#4A90E2]/10 border border-[#4A90E2]/30 px-2 py-0.5 rounded w-full line-clamp-1">
                        {getRoomZone(r, language)} • {getRoomFloor(r, language)}
                      </div>

                      {/* Action buttons */}
                      <div className="mt-3 pt-2 border-t border-[#1A2E4E] w-full flex items-center justify-between gap-1.5">
                        <button
                          onClick={() => handleDownloadSingleQR(r)}
                          className="flex-1 py-1 px-1.5 bg-[#081226] hover:bg-[#111F3A] text-white/80 hover:text-white border border-[#1A2E4E] rounded text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                          title={isEn ? 'Download Single QR Image (PNG)' : 'تحميل صورة QR منفصلة (PNG)'}
                        >
                          <Download className="w-2.5 h-2.5 text-[#FF9F1C]" />
                          <span>PNG</span>
                        </button>

                        <button
                          onClick={() => {
                            onSelectRoom(r);
                            onClose();
                          }}
                          className="flex-1 py-1 px-1.5 bg-[#081226] hover:bg-[#111F3A] text-[#4A90E2] hover:text-white border border-[#1A2E4E] rounded text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          <span>{isEn ? 'Inspect' : 'متابعة'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

