import { ExecutionPhase, Language, RoomLocation } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import QRCode from 'qrcode';
import { getRoomName, getRoomZone, getRoomFloor } from '../i18n/translations';

export function playBeepSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (err) {
    console.log('Audio playback error', err);
  }
}

export function playSuccessChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.2, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.3);
    });
  } catch (err) {
    console.log('Chime error', err);
  }
}

export function getStatusColor(progress: number, lang: Language = 'ar'): {
  bg: string;
  text: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  label: string;
  stateLabel: string;
  hex: string;
} {
  const isEn = lang === 'en';
  if (progress === 100) {
    return {
      bg: 'bg-[#BADC58]/10',
      text: 'text-[#BADC58]',
      border: 'border-[#BADC58]/40',
      badgeBg: 'bg-[#BADC58] text-[#050B18] font-bold shadow-sm shadow-[#BADC58]/20',
      badgeText: 'text-[#BADC58]',
      label: isEn ? '100% Completed' : 'مكتمل 100%',
      stateLabel: isEn ? 'Completed' : 'مكتمل',
      hex: '#BADC58'
    };
  }
  if (progress > 0) {
    return {
      bg: 'bg-[#FF9F1C]/10',
      text: 'text-[#FF9F1C]',
      border: 'border-[#FF9F1C]/40',
      badgeBg: 'bg-[#FF9F1C] text-[#050B18] font-bold shadow-sm shadow-[#FF9F1C]/20',
      badgeText: 'text-[#FF9F1C]',
      label: isEn ? `${progress}% In Progress` : `جاري ${progress}%`,
      stateLabel: isEn ? 'In Progress' : 'جاري',
      hex: '#FF9F1C'
    };
  }
  return {
    bg: 'bg-white/5',
    text: 'text-white/50',
    border: 'border-white/10',
    badgeBg: 'bg-[#1A2E4E] text-white/70 font-bold',
    badgeText: 'text-white/50',
    label: isEn ? '0% Not Started' : 'غير منجز 0%',
    stateLabel: isEn ? 'Not Started' : 'غير منجز',
    hex: '#4A5568'
  };
}

export function getPhaseInfo(phase: ExecutionPhase | string, lang: Language = 'ar'): {
  badgeColor: string;
  textColor: string;
  borderColor: string;
  label: string;
  number: number;
} {
  const isEn = lang === 'en';
  // Phase 1: الدراسات والتهيئة والمخططات
  if (phase.includes('الدراسات') || phase.includes('التأسيس') || phase.includes('Phase 1') || phase.includes('Studies')) {
    return {
      badgeColor: 'bg-[#4A90E2]/15 text-[#4A90E2]',
      textColor: 'text-[#4A90E2]',
      borderColor: 'border-[#4A90E2]/30',
      label: isEn ? 'Phase 1: Studies, Preparation & Master Plans' : 'المرحلة الأولى — الدراسات والتهيئة والمخططات',
      number: 1
    };
  }
  // Phase 2: الأعمال الإنشائية والأساسات
  if (phase.includes('الإنشائية') || phase.includes('الأساسات') || phase.includes('Phase 2') || phase.includes('Structural')) {
    return {
      badgeColor: 'bg-[#00D2D3]/15 text-[#00D2D3]',
      textColor: 'text-[#00D2D3]',
      borderColor: 'border-[#00D2D3]/30',
      label: isEn ? 'Phase 2: Substructure & Structural Works' : 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
      number: 2
    };
  }
  // Phase 3: التمديدات والأنظمة الفنية
  if (phase.includes('التمديدات') || phase.includes('الأنظمة الفنية') || phase.includes('Phase 3') || phase.includes('MEP')) {
    return {
      badgeColor: 'bg-[#FF9F1C]/15 text-[#FF9F1C]',
      textColor: 'text-[#FF9F1C]',
      borderColor: 'border-[#FF9F1C]/30',
      label: isEn ? 'Phase 3: MEP & Technical Systems' : 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
      number: 3
    };
  }
  // Phase 4: التشطيبات والخدمات
  if (phase.includes('التشطيبات') || phase.includes('الخدمات') || phase.includes('Phase 4') || phase.includes('Finishes')) {
    return {
      badgeColor: 'bg-[#A29BFE]/15 text-[#A29BFE]',
      textColor: 'text-[#A29BFE]',
      borderColor: 'border-[#A29BFE]/30',
      label: isEn ? 'Phase 4: Architectural Finishes & Services' : 'المرحلة الرابعة — التشطيبات والخدمات',
      number: 4
    };
  }
  // Phase 5: التركيب والتشغيل والاختبار
  if (phase.includes('التركيب') || phase.includes('التشغيل') || phase.includes('Phase 5') || phase.includes('Commissioning')) {
    return {
      badgeColor: 'bg-[#FDCB6E]/15 text-[#FDCB6E]',
      textColor: 'text-[#FDCB6E]',
      borderColor: 'border-[#FDCB6E]/30',
      label: isEn ? 'Phase 5: Installation, Testing & Commissioning' : 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
      number: 5
    };
  }
  // Phase 6: التسليم والاستلام
  return {
    badgeColor: 'bg-[#BADC58]/15 text-[#BADC58]',
    textColor: 'text-[#BADC58]',
    borderColor: 'border-[#BADC58]/30',
    label: isEn ? 'Phase 6: Final Handover & Acceptance' : 'المرحلة السادسة — التسليم والاستلام',
    number: 6
  };
}

function convertColorToRgb(color: string): string {
  if (!color || color === 'transparent' || color === 'inherit' || color === 'initial' || color === 'none') {
    return color;
  }
  if (!color.includes('oklab') && !color.includes('oklch') && !color.includes('color-mix') && !color.includes('lab(') && !color.includes('lch(')) {
    return color;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return color;
    
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    
    const imgData = ctx.getImageData(0, 0, 1, 1).data;
    const alpha = (imgData[3] / 255).toFixed(3);
    if (imgData[3] === 255) {
      return `rgb(${imgData[0]}, ${imgData[1]}, ${imgData[2]})`;
    } else {
      return `rgba(${imgData[0]}, ${imgData[1]}, ${imgData[2]}, ${alpha})`;
    }
  } catch {
    return 'rgb(0, 0, 0)';
  }
}

function replaceModernColorsInString(str: string): string {
  if (!str || (!str.includes('oklab') && !str.includes('oklch') && !str.includes('lab(') && !str.includes('lch('))) {
    return str;
  }
  return str.replace(/(?:oklab|oklch|lab|lch)\([^)]+\)/gi, (match) => {
    return convertColorToRgb(match);
  });
}

export async function exportAllBarcodesPDF(rooms: RoomLocation[], language: Language = 'ar'): Promise<void> {
  const isEn = language === 'en';
  const totalRooms = rooms.length;
  if (totalRooms === 0) return;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const STICKERS_PER_PAGE = 6; // 2 columns x 3 rows
  const totalPages = Math.ceil(totalRooms / STICKERS_PER_PAGE);

  const canvasWidth = 2480;
  const canvasHeight = 3508;

  // Pre-generate all QR data URLs
  const qrImages: string[] = await Promise.all(
    rooms.map(async (r) => {
      try {
        return await QRCode.toDataURL(r.barcode, {
          width: 420,
          margin: 1,
          color: {
            dark: '#050B18',
            light: '#FFFFFF'
          }
        });
      } catch (e) {
        return '';
      }
    })
  );

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    if (pageIndex > 0) {
      pdf.addPage();
    }

    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = canvasWidth;
    pageCanvas.height = canvasHeight;
    const ctx = pageCanvas.getContext('2d');
    if (!ctx) continue;

    // Fill Page Background (Crisp Light Gray for sticker sheets)
    ctx.fillStyle = '#F1F5F9';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Header Container (Navy Blue)
    ctx.fillStyle = '#081226';
    ctx.fillRect(0, 0, canvasWidth, 340);

    // Accent line at top
    ctx.fillStyle = '#FF9F1C';
    ctx.fillRect(0, 0, canvasWidth, 16);

    // Header Content
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 50px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = isEn ? 'left' : 'right';
    const headerTitle = isEn
      ? 'Prince Mohammad Bin Abdulaziz International Airport (PMIA)'
      : 'مطار الأمير محمد بن عبدالعزيز الدولي بالمدينة المنورة';
    ctx.fillText(headerTitle, isEn ? 120 : canvasWidth - 120, 100);

    ctx.fillStyle = '#4A90E2';
    ctx.font = 'bold 32px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    const subTitle = isEn
      ? 'Official Field Barcode & QR Stickers for Inspection & Tracking — GACA & SBC Standards'
      : 'بطاقات وملصقات الباركود و QR للمتابعة والمسح الميداني — معايير الطيران المدني والكود السعودي';
    ctx.fillText(subTitle, isEn ? 120 : canvasWidth - 120, 160);

    // Header Metadata Badges
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(120, 200, canvasWidth - 240, 95, 16);
    ctx.fill();

    ctx.fillStyle = '#FF9F1C';
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`TOTAL LOCATIONS: ${totalRooms} | PMIA-AERODROME-CAD`, 150, 258);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'right';
    const dateStr = new Date().toLocaleDateString(isEn ? 'en-US' : 'ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText(`${isEn ? 'Page' : 'الصفحة'} ${pageIndex + 1} / ${totalPages}  •  ${dateStr}`, canvasWidth - 150, 258);

    // Grid Coordinates
    const startX = 120;
    const startY = 380;
    const colGap = 80;
    const rowGap = 65;
    const cardW = 1080;
    const cardH = 880;

    const startIndex = pageIndex * STICKERS_PER_PAGE;
    const endIndex = Math.min(startIndex + STICKERS_PER_PAGE, totalRooms);

    for (let i = startIndex; i < endIndex; i++) {
      const room = rooms[i];
      const slotIndex = i - startIndex;
      const col = slotIndex % 2;
      const row = Math.floor(slotIndex / 2);

      const x = startX + col * (cardW + colGap);
      const y = startY + row * (cardH + rowGap);

      // Card Shadow & Container
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(x, y, cardW, cardH, 24);
      ctx.fill();

      // Card Border & Cutting Guides
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#CBD5E1';
      ctx.stroke();

      // Dashed cutting guide outline
      ctx.save();
      ctx.setLineDash([12, 10]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#94A3B8';
      ctx.strokeRect(x - 12, y - 12, cardW + 24, cardH + 24);
      ctx.restore();

      // Sticker Top Header Bar
      ctx.fillStyle = '#081226';
      ctx.beginPath();
      ctx.roundRect(x, y, cardW, 110, [24, 24, 0, 0]);
      ctx.fill();

      ctx.fillStyle = '#FF9F1C';
      ctx.fillRect(x, y + 106, cardW, 4);

      // Sticker Top Titles
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 30px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('مطار الأمير محمد بن عبدالعزيز الدولي', x + cardW - 35, y + 65);

      ctx.fillStyle = '#4A90E2';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('PMIA-GACA-SBC', x + 35, y + 65);

      // QR Code Area
      const qrSize = 360;
      const qrX = x + 45;
      const qrY = y + 155;

      // QR Background Border Box
      ctx.fillStyle = '#F8FAFC';
      ctx.beginPath();
      ctx.roundRect(qrX - 10, qrY - 10, qrSize + 20, qrSize + 20, 16);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E2E8F0';
      ctx.stroke();

      // Draw QR Image
      const qrImgSrc = qrImages[i];
      if (qrImgSrc) {
        const qrImg = new Image();
        qrImg.src = qrImgSrc;
        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
      }

      // Barcode Badge under QR
      ctx.fillStyle = '#081226';
      ctx.beginPath();
      ctx.roundRect(qrX - 10, qrY + qrSize + 20, qrSize + 20, 75, 12);
      ctx.fill();

      ctx.fillStyle = '#FF9F1C';
      ctx.font = 'bold 38px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(room.barcode, qrX + qrSize / 2, qrY + qrSize + 70);

      // Text Info Column (Right of QR)
      const textX = x + qrSize + 90;
      const textW = cardW - qrSize - 120;
      let currentTextY = y + 185;

      // Room Name (Arabic)
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 40px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      const roomNameAr = getRoomName(room, 'ar');
      ctx.fillText(roomNameAr, textX + textW - 10, currentTextY);

      currentTextY += 50;

      // Room Name (English)
      ctx.fillStyle = '#475569';
      ctx.font = '600 28px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      const roomNameEn = getRoomName(room, 'en');
      ctx.fillText(roomNameEn, textX + textW - 10, currentTextY);

      currentTextY += 60;

      // Floor & Zone Badge
      ctx.fillStyle = '#EFF6FF';
      ctx.beginPath();
      ctx.roundRect(textX, currentTextY, textW, 70, 10);
      ctx.fill();
      ctx.strokeStyle = '#BFDBFE';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#1D4ED8';
      ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      const zoneFloorText = `${getRoomZone(room, language)} • ${getRoomFloor(room, language)}`;
      ctx.fillText(zoneFloorText, textX + textW - 20, currentTextY + 45);

      currentTextY += 95;

      // Area and Total Tasks
      ctx.fillStyle = '#ECFDF5';
      ctx.beginPath();
      ctx.roundRect(textX, currentTextY, textW, 70, 10);
      ctx.fill();
      ctx.strokeStyle = '#A7F3D0';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#047857';
      ctx.font = 'bold 25px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      const completedCount = room.tasks.filter(tItem => tItem.progress === 100).length;
      const areaText = `${isEn ? 'Area' : 'المساحة'}: ${room.areaM2} ${isEn ? 'm²' : 'م²'}  |  ${isEn ? 'Stages' : 'المراحل'}: ${completedCount}/${room.tasks.length}`;
      ctx.fillText(areaText, textX + textW - 20, currentTextY + 45);

      currentTextY += 95;

      // Progress Badge
      const isComplete = room.overallProgress === 100;
      ctx.fillStyle = isComplete ? '#F0FDF4' : '#FFFBEB';
      ctx.beginPath();
      ctx.roundRect(textX, currentTextY, textW, 65, 10);
      ctx.fill();
      ctx.strokeStyle = isComplete ? '#86EFAC' : '#FDE68A';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = isComplete ? '#15803D' : '#B45309';
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      const progressText = `${isEn ? 'Overall Progress' : 'نسبة الإنجاز الإجمالية'}: ${room.overallProgress}%`;
      ctx.fillText(progressText, textX + textW - 20, currentTextY + 42);

      // Card Bottom Instruction
      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      const scanInstruction = isEn
        ? '✦ Scan QR code with camera or mobile terminal to update phases'
        : '✦ امسح الباركود بواسطة الكاميرا أو جهاز المسح الميداني لتحديث مراحل التنفيذ';
      ctx.fillText(scanInstruction, x + cardW / 2, y + cardH - 30);
    }

    // Page Footer
    ctx.fillStyle = '#081226';
    ctx.fillRect(0, canvasHeight - 110, canvasWidth, 110);

    ctx.fillStyle = '#FF9F1C';
    ctx.fillRect(0, canvasHeight - 110, canvasWidth, 4);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('PRINCE MOHAMMAD BIN ABDULAZIZ INT. AIRPORT — FIELD BARCODE SYSTEM', 120, canvasHeight - 45);

    ctx.textAlign = 'right';
    ctx.fillText(`GACA & SBC COMPLIANT  •  ${isEn ? 'Page' : 'صفحة'} ${pageIndex + 1} / ${totalPages}`, canvasWidth - 120, canvasHeight - 45);

    // Add Canvas page to PDF
    const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
    pdf.addImage(pageImgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  }

  const filename = `PMIA_All_Barcodes_${rooms.length}_Stickers_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(filename);
}

export function printAllBarcodes(rooms: RoomLocation[], language: Language = 'ar'): void {
  const isEn = language === 'en';
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const stickersHtml = rooms.map(room => {
    const completedCount = room.tasks.filter(tItem => tItem.progress === 100).length;
    return `
      <div class="sticker-card">
        <div class="sticker-header">
          <span class="airport-title">مطار الأمير محمد بن عبدالعزيز الدولي</span>
          <span class="code-badge">PMIA-GACA</span>
        </div>
        <div class="sticker-body">
          <div class="qr-col">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(room.barcode)}" alt="${room.barcode}" class="qr-img" />
            <div class="barcode-tag">${room.barcode}</div>
          </div>
          <div class="info-col">
            <div class="room-title-ar">${getRoomName(room, 'ar')}</div>
            <div class="room-title-en">${getRoomName(room, 'en')}</div>
            <div class="badge-blue">${getRoomZone(room, language)} • ${getRoomFloor(room, language)}</div>
            <div class="badge-green">${isEn ? 'Area' : 'المساحة'}: ${room.areaM2} ${isEn ? 'm²' : 'م²'} | ${isEn ? 'Phases' : 'المراحل'}: ${completedCount}/${room.tasks.length}</div>
            <div class="badge-gold">${isEn ? 'Progress' : 'نسبة الإنجاز'}: ${room.overallProgress}%</div>
          </div>
        </div>
        <div class="sticker-footer">
          امسح رمز الاستجابة السريعة لتسجيل مراحل التنفيذ • Scan QR to Inspect
        </div>
      </div>
    `;
  }).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html dir="${isEn ? 'ltr' : 'rtl'}" lang="${language}">
    <head>
      <meta charset="utf-8">
      <title>PMIA Barcode Stickers — ${rooms.length} Locations</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          background: #FFFFFF;
          color: #0F172A;
          padding: 10px;
        }
        .page-header {
          text-align: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #081226;
        }
        .page-header h1 {
          font-size: 18px;
          color: #081226;
        }
        .page-header p {
          font-size: 12px;
          color: #475569;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        .sticker-card {
          border: 2px solid #CBD5E1;
          border-radius: 12px;
          background: #FFFFFF;
          overflow: hidden;
          page-break-inside: avoid;
          break-inside: avoid;
          display: flex;
          flex-direction: column;
        }
        .sticker-header {
          background: #081226;
          color: #FFFFFF;
          padding: 8px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #FF9F1C;
        }
        .airport-title {
          font-size: 12px;
          font-weight: bold;
        }
        .code-badge {
          font-size: 10px;
          font-family: monospace;
          color: #FF9F1C;
          font-weight: bold;
        }
        .sticker-body {
          display: flex;
          padding: 12px;
          gap: 12px;
          align-items: center;
        }
        .qr-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 110px;
        }
        .qr-img {
          width: 100px;
          height: 100px;
          border-radius: 6px;
          border: 1px solid #E2E8F0;
          padding: 4px;
        }
        .barcode-tag {
          margin-top: 6px;
          background: #081226;
          color: #FF9F1C;
          font-family: monospace;
          font-size: 12px;
          font-weight: bold;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .info-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .room-title-ar {
          font-size: 14px;
          font-weight: bold;
          color: #0F172A;
        }
        .room-title-en {
          font-size: 11px;
          color: #64748B;
        }
        .badge-blue {
          background: #EFF6FF;
          color: #1D4ED8;
          font-size: 10px;
          font-weight: bold;
          padding: 3px 6px;
          border-radius: 4px;
          border: 1px solid #BFDBFE;
        }
        .badge-green {
          background: #ECFDF5;
          color: #047857;
          font-size: 10px;
          font-weight: bold;
          padding: 3px 6px;
          border-radius: 4px;
          border: 1px solid #A7F3D0;
        }
        .badge-gold {
          background: #FFFBEB;
          color: #B45309;
          font-size: 10px;
          font-weight: bold;
          padding: 3px 6px;
          border-radius: 4px;
          border: 1px solid #FDE68A;
        }
        .sticker-footer {
          background: #F8FAFC;
          border-top: 1px solid #E2E8F0;
          padding: 6px;
          font-size: 9px;
          text-align: center;
          color: #64748B;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="page-header">
        <h1>مطار الأمير محمد بن عبدالعزيز الدولي — بطاقات وملصقات الباركود الرسمية</h1>
        <p>إجمالي المواقع: ${rooms.length} موقعاً | متوافق مع معايير الهيئة العامة للطيران المدني (GACA)</p>
      </div>
      <div class="grid-container">
        ${stickersHtml}
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 400);
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

export async function exportElementAsPDF(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#081226',
      onclone: (clonedDoc: Document, clonedEl: HTMLElement) => {
        // Expand element and its parent hierarchy to full scrollable content
        let cur: HTMLElement | null = clonedEl;
        while (cur && cur !== clonedDoc.body) {
          cur.style.opacity = '1';
          cur.style.visibility = 'visible';
          cur.style.maxHeight = 'none';
          cur.style.height = 'auto';
          cur.style.overflow = 'visible';
          if (cur.style.display === 'none') {
            cur.style.display = 'block';
          }
          if (cur.style.position === 'fixed' || cur.classList.contains('fixed')) {
            cur.style.position = 'relative';
            cur.style.left = '0';
            cur.style.top = '0';
          }
          cur = cur.parentElement;
        }

        // Sanitize any remaining modern color values in style tags
        clonedDoc.querySelectorAll('style').forEach((styleEl) => {
          if (styleEl.textContent && (styleEl.textContent.includes('oklab') || styleEl.textContent.includes('oklch'))) {
            styleEl.textContent = replaceModernColorsInString(styleEl.textContent);
          }
        });

        // Ensure elements with inline modern colors are safely converted
        const allElements = clonedEl.querySelectorAll<HTMLElement>('*');
        allElements.forEach((el) => {
          const win = el.ownerDocument.defaultView || window;
          const computed = win.getComputedStyle(el);

          const colorProps = [
            'color',
            'backgroundColor',
            'borderColor',
            'borderTopColor',
            'borderRightColor',
            'borderBottomColor',
            'borderLeftColor',
            'outlineColor',
            'fill',
            'stroke',
            'textDecorationColor'
          ] as const;

          for (const prop of colorProps) {
            const val = (computed as unknown as Record<string, string>)[prop];
            if (val && typeof val === 'string' && (val.includes('oklab') || val.includes('oklch') || val.includes('lab') || val.includes('lch'))) {
              el.style.setProperty(
                prop.replace(/([A-Z])/g, '-$1').toLowerCase(),
                convertColorToRgb(val),
                'important'
              );
            }
          }

          if (computed.boxShadow && (computed.boxShadow.includes('oklab') || computed.boxShadow.includes('oklch'))) {
            el.style.setProperty('box-shadow', replaceModernColorsInString(computed.boxShadow), 'important');
          }
        });
      }
    });

    const isLandscape = canvas.width > canvas.height * 1.3;
    const pdf = new jsPDF({
      orientation: isLandscape ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 10;
    const usableWidth = pageWidth - margin * 2;
    const usableHeight = pageHeight - margin * 2;

    const imgWidth = usableWidth;
    const totalImgHeight = (canvas.height * imgWidth) / canvas.width;

    if (totalImgHeight <= usableHeight) {
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, totalImgHeight, undefined, 'FAST');
    } else {
      let currentY = 0;
      const pageCanvasHeight = (usableHeight * canvas.width) / imgWidth;

      while (currentY < canvas.height) {
        if (currentY > 0) {
          pdf.addPage();
        }

        const sliceHeight = Math.min(pageCanvasHeight, canvas.height - currentY);
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const pageCtx = pageCanvas.getContext('2d');
        if (pageCtx) {
          pageCtx.fillStyle = '#081226';
          pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          pageCtx.drawImage(
            canvas,
            0, currentY, canvas.width, sliceHeight,
            0, 0, canvas.width, sliceHeight
          );
          const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
          const sliceImgHeight = (sliceHeight * imgWidth) / canvas.width;
          pdf.addImage(pageImgData, 'JPEG', margin, margin, imgWidth, sliceImgHeight, undefined, 'FAST');
        }

        currentY += sliceHeight;
      }
    }

    pdf.save(filename);
  } catch (error) {
    console.error('PDF export fallback to print', error);
    window.print();
  }
}
