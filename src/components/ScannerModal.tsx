import React, { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Camera, X, RefreshCw, Search, AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import { RoomLocation, Language } from '../types';
import { playBeepSound } from '../utils/helpers';
import { translations, getRoomName, getRoomZone, getRoomFloor } from '../i18n/translations';

interface ScannerModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  onSelectRoom: (room: RoomLocation) => void;
  rooms: RoomLocation[];
}

export function ScannerModal({ isOpen, language, onClose, onSelectRoom, rooms }: ScannerModalProps) {
  const [scannerActive, setScannerActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [scannedSuccessCode, setScannedSuccessCode] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isProcessing, setIsProcessing] = useState(false);

  const t = translations[language];
  const isEn = language === 'en';

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const isStartingRef = useRef(false);
  const isStoppingRef = useRef(false);
  const isMountedRef = useRef(true);
  const currentStartPromiseRef = useRef<Promise<void> | null>(null);
  const scannerContainerId = 'pmia-qr-reader-container';

  useEffect(() => {
    isMountedRef.current = true;
    let isCurrent = true;

    if (!isOpen) {
      safeStopScanner();
      setScannedSuccessCode(null);
      setCameraError(null);
      return;
    }

    const timer = setTimeout(() => {
      if (isCurrent && isOpen) {
        startScanner();
      }
    }, 150);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
      safeStopScanner();
    };
  }, [isOpen, facingMode]);

  const handleBarcodeDetected = (decodedText: string) => {
    if (isProcessing) return;
    setIsProcessing(true);
    playBeepSound();
    setScannedSuccessCode(decodedText);

    // Clean decoded text
    const cleanCode = decodedText.trim().toUpperCase();
    
    // Find room by barcode or ID or containing code
    const matchedRoom = rooms.find(
      r => r.barcode.toUpperCase() === cleanCode || 
           cleanCode.includes(r.barcode.toUpperCase()) || 
           r.id.toUpperCase() === cleanCode
    );

    setTimeout(() => {
      if (matchedRoom) {
        onSelectRoom(matchedRoom);
        onClose();
      } else {
        const partial = rooms.find(r => 
          (r.nameAr && r.nameAr.includes(cleanCode)) ||
          (r.nameEn && r.nameEn.toUpperCase().includes(cleanCode)) ||
          r.barcode.toLowerCase().includes(cleanCode.toLowerCase())
        );
        if (partial) {
          onSelectRoom(partial);
          onClose();
        } else {
          setCameraError(isEn ? `No location found matching code: ${decodedText}` : `لم يتم العثور على موقع مرتبط بالرمز: ${decodedText}`);
        }
      }
      setIsProcessing(false);
    }, 600);
  };

  const safeStopScanner = async () => {
    if (isStoppingRef.current) return;
    isStoppingRef.current = true;

    try {
      if (currentStartPromiseRef.current) {
        try {
          await currentStartPromiseRef.current;
        } catch {
          // ignore start error
        }
      }

      if (html5QrCodeRef.current) {
        try {
          if (html5QrCodeRef.current.isScanning) {
            await html5QrCodeRef.current.stop();
          }
        } catch (stopErr) {
          console.warn('Scanner stop error suppressed:', stopErr);
        }

        try {
          html5QrCodeRef.current.clear();
        } catch (clearErr) {
          console.warn('Scanner clear error suppressed:', clearErr);
        }

        html5QrCodeRef.current = null;
      }
    } finally {
      if (isMountedRef.current) {
        setScannerActive(false);
      }
      isStartingRef.current = false;
      isStoppingRef.current = false;
      currentStartPromiseRef.current = null;
    }
  };

  const startScanner = async () => {
    const container = document.getElementById(scannerContainerId);
    if (!container) return;

    if (isStartingRef.current || isStoppingRef.current) return;
    isStartingRef.current = true;
    setCameraError(null);

    const startExecution = async () => {
      try {
        if (html5QrCodeRef.current) {
          try {
            if (html5QrCodeRef.current.isScanning) {
              await html5QrCodeRef.current.stop();
            }
            html5QrCodeRef.current.clear();
          } catch {
            // ignore
          }
          html5QrCodeRef.current = null;
        }

        container.innerHTML = '';

        const html5QrCode = new Html5Qrcode(scannerContainerId, {
          formatsToSupport: [
            Html5QrcodeSupportedFormats.QR_CODE,
            Html5QrcodeSupportedFormats.CODE_128,
            Html5QrcodeSupportedFormats.CODE_39,
            Html5QrcodeSupportedFormats.EAN_13,
            Html5QrcodeSupportedFormats.EAN_8,
            Html5QrcodeSupportedFormats.UPC_A
          ],
          verbose: false
        });

        html5QrCodeRef.current = html5QrCode;

        const config = {
          fps: 15,
          qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight);
            const qrboxSize = Math.max(160, Math.floor(minEdge * 0.75));
            return {
              width: qrboxSize,
              height: Math.floor(qrboxSize * 0.8)
            };
          },
          aspectRatio: 1.333334
        };

        await html5QrCode.start(
          { facingMode: facingMode },
          config,
          (decodedText) => {
            handleBarcodeDetected(decodedText);
          },
          () => {
            // scan frame error ignore
          }
        );

        if (isMountedRef.current) {
          setScannerActive(true);
        }
      } catch (err: unknown) {
        console.warn('Camera start error:', err);
        const errMessage = err instanceof Error ? err.message : String(err);
        if (isMountedRef.current) {
          setScannerActive(false);
          if (errMessage.includes('NotAllowedError') || errMessage.includes('Permission')) {
            setCameraError(t.cameraPermissionError);
          } else if (errMessage.includes('NotFoundError')) {
            setCameraError(isEn ? 'No camera device found on this system.' : 'لم يتم العثور على كاميرا في هذا الجهاز.');
          } else {
            setCameraError(t.cameraError);
          }
        }
      } finally {
        isStartingRef.current = false;
      }
    };

    const promise = startExecution();
    currentStartPromiseRef.current = promise;
    await promise;
  };

  const handleManualSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    const query = manualCode.trim().toUpperCase();
    const matched = rooms.find(
      r => r.barcode.toUpperCase() === query || 
           r.id.toUpperCase() === query ||
           (r.nameAr && r.nameAr.includes(manualCode.trim())) ||
           (r.nameEn && r.nameEn.toUpperCase().includes(query))
    );

    if (matched) {
      playBeepSound();
      onSelectRoom(matched);
      onClose();
    } else {
      setCameraError(isEn ? `No location found matching code: "${manualCode}"` : `لم يتم العثور على أي موقع يطابق الرمز: "${manualCode}"`);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCameraError(null);
      const scanner = new Html5Qrcode('file-scan-temp-div', false);
      const result = await scanner.scanFile(file, true);
      try {
        scanner.clear();
      } catch {
        // ignore
      }
      handleBarcodeDetected(result);
    } catch {
      setCameraError(isEn ? 'No barcode or QR code detected in this image.' : 'لم يتم العثور على باركود أو QR واضح في الصورة المختارة.');
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#050B18]/85 backdrop-blur-md animate-in fade-in" id="scanner-modal-backdrop">
      <div id="file-scan-temp-div" className="fixed -left-[9999px] top-0 pointer-events-none opacity-0" aria-hidden="true"></div>

      <div className="bg-[#081226] border border-[#1A2E4E] rounded-xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[94vh]" id="scanner-modal-content">
        
        {/* Header */}
        <div className="p-3 bg-[#081226] border-b border-[#1A2E4E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF9F1C] flex items-center justify-center text-[#050B18] shadow">
              <Camera className="w-4 h-4 text-[#050B18] stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-1.5 leading-none">
                {t.scannerTitle}
              </h3>
              <p className="text-[10px] text-[#4A90E2] mt-0.5 leading-none">{t.scannerSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleCamera}
              className="p-1.5 rounded-lg bg-[#050B18] hover:bg-[#111F3A] text-[#4A90E2] border border-[#1A2E4E] transition-colors"
              title={t.toggleCamera}
              id="toggle-camera-facing-btn"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#050B18] hover:bg-[#111F3A] text-white/60 hover:text-white border border-[#1A2E4E] transition-colors"
              id="close-scanner-modal-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Camera Container */}
        <div className="relative bg-black min-h-[260px] sm:min-h-[300px] flex items-center justify-center overflow-hidden">
          <div id={scannerContainerId} className="w-full h-full [&_video]:w-full [&_video]:object-cover" />

          {/* HUD Target Finder Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-52 h-44 border-2 border-[#FF9F1C] rounded-xl relative shadow-[0_0_20px_rgba(255,159,28,0.3)]">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white rounded-tl"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white rounded-tr"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white rounded-bl"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white rounded-br"></div>
              
              {/* Laser scan line */}
              <div className="absolute inset-x-2 top-1/2 h-0.5 bg-[#FF9F1C] shadow-[0_0_12px_#FF9F1C] animate-bounce"></div>

              <div className="absolute -bottom-7 inset-x-0 text-center">
                <span className="text-[10px] font-mono font-bold bg-[#050B18]/90 text-[#FF9F1C] px-2 py-0.5 rounded border border-[#FF9F1C]/40">
                  {t.laserAimPrompt}
                </span>
              </div>
            </div>
          </div>

          {/* Success Scan Feedback */}
          {scannedSuccessCode && (
            <div className="absolute inset-0 bg-[#081226]/90 backdrop-blur flex flex-col items-center justify-center p-4 text-center z-20">
              <CheckCircle2 className="w-12 h-12 text-[#BADC58] mb-2 animate-bounce" />
              <p className="text-xs text-white/70">{t.scannedSuccess}</p>
              <p className="text-base font-mono font-bold text-[#FF9F1C] mt-1">{scannedSuccessCode}</p>
            </div>
          )}

          {/* Camera Error / Permission Banner */}
          {cameraError && (
            <div className="absolute inset-0 bg-[#081226]/95 p-4 flex flex-col items-center justify-center text-center z-20">
              <AlertCircle className="w-10 h-10 text-[#FF9F1C] mb-2" />
              <p className="text-xs font-bold text-white mb-1">{t.scanStatus}</p>
              <p className="text-[11px] text-white/70 max-w-xs mb-3">{cameraError}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={startScanner}
                  className="px-3 py-1 bg-[#FF9F1C] text-[#050B18] text-xs font-bold rounded-lg"
                >
                  {isEn ? 'Retry Camera' : 'إعادة المحاولة'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Manual Input Form & Quick Jump List */}
        <div className="p-3 bg-[#060D1D] border-t border-[#1A2E4E] space-y-2.5">
          {/* Manual Entry Form */}
          <form onSubmit={handleManualSubmit} className="flex gap-1.5">
            <div className="relative flex-1">
              <Search className={`w-3.5 h-3.5 absolute ${isEn ? 'left-2.5' : 'right-2.5'} top-2.5 text-white/40`} />
              <input
                type="text"
                placeholder={t.manualCodePlaceholder}
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className={`w-full ${isEn ? 'pl-8 pr-3' : 'pr-8 pl-3'} py-1.5 bg-[#050B18] border border-[#1A2E4E] rounded-lg text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF9F1C] font-mono`}
                id="manual-barcode-input"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#FF9F1C] hover:bg-[#FF9F1C]/90 text-[#050B18] font-bold rounded-lg text-xs transition-colors shrink-0"
              id="manual-barcode-submit-btn"
            >
              {t.searchBtn}
            </button>
            <label className="p-1.5 bg-[#050B18] hover:bg-[#111F3A] text-[#4A90E2] border border-[#1A2E4E] rounded-lg cursor-pointer flex items-center justify-center shrink-0" title={t.uploadBarcodeImage}>
              <Upload className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </form>

          {/* Quick Simulation Chips */}
          <div>
            <p className="text-[10px] text-white/40 font-bold mb-1">
              {t.quickSimulateNotice}:
            </p>
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-[#050B18] rounded-lg border border-[#1A2E4E]">
              {rooms.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    playBeepSound();
                    onSelectRoom(r);
                    onClose();
                  }}
                  className="px-1.5 py-0.5 bg-[#081226] hover:bg-[#FF9F1C] hover:text-[#050B18] text-[#4A90E2] border border-[#1A2E4E] rounded text-[10px] font-mono font-bold transition-all"
                  title={`${getRoomZone(r, language)} — ${getRoomName(r, language)}`}
                >
                  {r.barcode}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
