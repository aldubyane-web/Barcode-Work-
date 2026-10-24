import { useState } from 'react';
import { Camera, Search, FileText, Save, Plane, Globe, Languages } from 'lucide-react';
import { RoomLocation, Language } from '../types';
import { translations, getRoomName, getRoomZone, getRoomFloor } from '../i18n/translations';

interface HeaderProps {
  rooms: RoomLocation[];
  selectedRoom: RoomLocation;
  language: Language;
  onSelectRoom: (room: RoomLocation) => void;
  onOpenScanner: () => void;
  onOpenReports: () => void;
  onToggleLanguage: (lang: Language) => void;
  onSaveNotice: () => void;
}

export function Header({
  rooms,
  selectedRoom,
  language,
  onSelectRoom,
  onOpenScanner,
  onOpenReports,
  onToggleLanguage,
  onSaveNotice
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const t = translations[language];

  // Convert Arabic numerals to Western numerals for flexible searching
  const normalizeText = (txt: string) => {
    return txt
      .replace(/١/g, '1')
      .replace(/٢/g, '2')
      .replace(/٣/g, '3')
      .replace(/٤/g, '4')
      .replace(/٥/g, '5')
      .replace(/٦/g, '6')
      .replace(/٧/g, '7')
      .replace(/٨/g, '8')
      .replace(/٩/g, '9')
      .replace(/٠/g, '0')
      .toLowerCase();
  };

  const normalizedQuery = normalizeText(searchQuery.trim());

  const searchResults = searchQuery.trim()
    ? rooms.filter(r => {
        const roomNameAr = r.nameAr || '';
        const roomNameEn = r.nameEn || '';
        const zoneAr = r.zone || '';
        const floorAr = r.floor || '';
        const fullDesc = `${r.barcode} ${zoneAr} ${floorAr} ${roomNameAr} ${roomNameEn}`;
        const normalizedFullDesc = normalizeText(fullDesc);
        return (
          roomNameAr.includes(searchQuery.trim()) ||
          roomNameEn.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          r.barcode.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
          zoneAr.includes(searchQuery.trim()) ||
          floorAr.includes(searchQuery.trim()) ||
          normalizedFullDesc.includes(normalizedQuery)
        );
      })
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#081226] border-b border-[#1A2E4E] shadow-xl" id="main-airport-header">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2.5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Logo & Official Airport Name */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#FF9F1C] rounded-lg flex items-center justify-center text-[#050B18] shadow-md shadow-[#FF9F1C]/20 font-bold shrink-0">
                <Plane className={`w-5 h-5 ${language === 'ar' ? 'transform -rotate-45' : 'transform rotate-45'} text-[#050B18] stroke-[2.5]`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                    {t.appTitle}
                  </h1>
                  <span className="text-[10px] font-mono bg-[#050B18] text-[#4A90E2] border border-[#1A2E4E] px-1.5 py-0.2 rounded font-bold">
                    PMIA
                  </span>
                </div>
                <p className="text-[11px] text-[#4A90E2] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BADC58] animate-pulse"></span>
                  {t.appSubtitle}
                </p>
              </div>
            </div>

            {/* Mobile Scan Button */}
            <button
              onClick={onOpenScanner}
              className="md:hidden p-2 bg-[#FF9F1C] text-[#050B18] rounded-lg font-bold shadow flex items-center gap-1 text-xs"
              id="mobile-header-scan-btn"
            >
              <Camera className="w-4 h-4" />
              <span>{language === 'ar' ? 'مسح' : 'Scan'}</span>
            </button>
          </div>

          {/* Quick Search Box with instant dropdown */}
          <div className="relative w-full md:w-64 lg:w-80">
            <div className="relative">
              <Search className={`w-3.5 h-3.5 absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-2.5 text-[#4A90E2]/70`} />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className={`w-full ${language === 'ar' ? 'pl-3 pr-8' : 'pr-3 pl-8'} py-1.5 bg-[#050B18] border border-[#1A2E4E] rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF9F1C] transition-all`}
                id="header-search-bar"
              />
            </div>

            {showDropdown && searchResults.length > 0 && (
              <div 
                className="absolute top-full mt-1.5 w-full bg-[#081226] border border-[#1A2E4E] rounded-xl shadow-2xl p-1.5 z-50 max-h-60 overflow-y-auto"
                onMouseLeave={() => setShowDropdown(false)}
              >
                {searchResults.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onSelectRoom(r);
                      setShowDropdown(false);
                      setSearchQuery('');
                    }}
                    className={`w-full p-2 ${language === 'ar' ? 'text-right' : 'text-left'} rounded-lg hover:bg-[#111F3A] flex items-center justify-between transition-colors text-xs`}
                  >
                    <div>
                      <p className="font-bold text-white truncate">{getRoomName(r, language)}</p>
                      <p className="text-[10px] font-mono text-[#4A90E2]">{r.barcode} • {getRoomFloor(r, language)}</p>
                    </div>
                    <span className="font-bold text-[#FF9F1C] font-mono">{r.overallProgress}%</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clean Action Navigation Bar & Language Toggle */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            
            {/* Language Switcher Button (English / العربية) */}
            <div className="relative flex items-center bg-[#050B18] p-0.5 rounded-lg border border-[#1A2E4E]">
              <button
                onClick={() => onToggleLanguage('ar')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                  language === 'ar'
                    ? 'bg-[#FF9F1C] text-[#050B18] shadow'
                    : 'text-white/60 hover:text-white'
                }`}
                title="التحويل للغة العربية"
                id="lang-toggle-ar"
              >
                <span>العربية</span>
              </button>
              <button
                onClick={() => onToggleLanguage('en')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-[#FF9F1C] text-[#050B18] shadow'
                    : 'text-white/60 hover:text-white'
                }`}
                title="Switch to English"
                id="lang-toggle-en"
              >
                <span>English</span>
              </button>
            </div>

            {/* Primary Action Button: Open Camera Scanner */}
            <button
              onClick={onOpenScanner}
              className="px-3 py-1.5 bg-[#FF9F1C] hover:bg-[#FF9F1C]/90 text-[#050B18] font-bold rounded-lg text-xs shadow-md shadow-[#FF9F1C]/20 flex items-center gap-1.5 transition-all transform active:scale-95 shrink-0"
              id="camera-scanner-nav-btn"
            >
              <Camera className="w-3.5 h-3.5 text-[#050B18] stroke-[2.5]" />
              <span>{t.barcodeScanner}</span>
            </button>

            {/* Reports and PDF Export Modal */}
            <button
              onClick={onOpenReports}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#060D1D] text-white border border-[#1A2E4E] hover:bg-[#111F3A] flex items-center gap-1.5 transition-all shrink-0"
              id="reports-nav-btn"
            >
              <FileText className="w-3.5 h-3.5 text-[#4A90E2]" />
              <span>{t.reportsAndPdf}</span>
            </button>

            {/* Save & Sync State Button */}
            <button
              onClick={onSaveNotice}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#BADC58]/15 hover:bg-[#BADC58]/25 text-[#BADC58] border border-[#BADC58]/30 flex items-center gap-1.5 transition-all shrink-0"
              id="save-sync-nav-btn"
              title={t.savedToast}
            >
              <Save className="w-3.5 h-3.5 text-[#BADC58]" />
              <span>{t.saveAndSync}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
