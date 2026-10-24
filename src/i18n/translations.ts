import { Language, ExecutionPhase, RoomLocation } from '../types';

export interface Translations {
  // App Title & Header
  appTitle: string;
  appSubtitle: string;
  airportFullName: string;
  officialProjectTitle: string;
  officialSubtitle: string;
  searchPlaceholder: string;
  searchLabel: string;
  languageSelect: string;
  switchLanguage: string;
  cameraScanner: string;
  barcodeScanner: string;
  cameraScannerDesc: string;
  reportsAndExport: string;
  reportsAndPdf: string;
  reportsDesc: string;
  saveData: string;
  saveAndSync: string;
  savedToast: string;
  saveDataSuccess: string;
  activeRoom: string;

  // KPI Row
  kpiOverallProgress: string;
  overallProjectProgress: string;
  kpiTotalRooms: string;
  completedLocations: string;
  kpiApprovedRooms: string;
  kpiUnderExecution: string;
  kpiNotStarted: string;
  kpiTotalStages: string;
  stagesCompletedCount: string;
  kpiCompletedStages: string;
  kpiRemainingStages: string;
  kpiRate: string;
  engineeringCompliance: string;
  barcodeSynced: string;

  // CAD Blueprint Panel
  interactiveBlueprintTitle: string;
  cadBlueprintTitle: string;
  locationsCount: string;
  cadLocationsCount: string;
  blueprintInstruction: string;
  cadSubtitle: string;
  filterAll: string;
  filterDepartures: string;
  filterArrivals: string;
  filterDeparture: string;
  filterArrival: string;
  filterFloor1: string;
  filterFloor2: string;
  zoneDepartureFloor1: string;
  zoneDepartureFloor2: string;
  zoneArrivalFloor2: string;
  zoomIn: string;
  zoomOut: string;
  resetZoom: string;
  zoomReset: string;
  colorLegend: string;
  legendCompleted: string;
  legendApproved: string;
  legendInProgress: string;
  legendInitial: string;
  legendStarted: string;
  legendNotStarted: string;
  selectedLocation: string;
  area: string;
  roomArea: string;
  category: string;
  roomCategory: string;
  completedBadge: string;

  // Checklist & Stages Panel
  stagesChecklistTitle: string;
  stagesCountLabel: string;
  stagesSubtitle: string;
  quickJumpLocation: string;
  switchLocation: string;
  officialApprovalTitle: string;
  officialApprovalSubtitle: string;
  officialApprovalBtn: string;
  approvedBadge: string;
  pendingBadge: string;
  contractor: string;
  contractorLabel: string;
  lastInspection: string;
  lastUpdatedLabel: string;
  fieldNotes: string;
  notesLabel: string;
  notesPrompt: string;
  notesPlaceholder: string;
  enterNotesPlaceholder: string;
  stageApprovedBtn: string;
  stageApproveAction: string;
  milestoneBadge: string;
  phaseLabel: string;
  expandAll: string;
  collapseAll: string;
  pdfReport: string;
  all100: string;
  reset0: string;
  parallelDesc: string;
  independentParallel: string;
  allPhases: string;
  phase1Tab: string;
  phase2Tab: string;
  phase3Tab: string;
  phase4Tab: string;
  phase5Tab: string;
  phase6Tab: string;
  status100: string;
  status75: string;
  status50: string;
  status25: string;
  status0: string;
  statusCompleted: string;
  statusInProgress: string;
  statusNotStarted: string;
  stageStatus: string;
  inspectionDate: string;
  overallProgress: string;

  // PDF Export specific
  fieldReportTitle: string;
  date: string;
  locationRoom: string;
  barcodeAndZone: string;
  phaseAndCategory: string;
  stageItemAndSpec: string;
  approvedContractor: string;
  progress: string;
  inspectionCommittee: string;
  systemGeneratedNotice: string;

  // Scanner Modal
  scannerTitle: string;
  scannerSubtitle: string;
  scannerCameraTab: string;
  scannerUploadTab: string;
  scannerManualTab: string;
  scannerFlipCamera: string;
  toggleCamera: string;
  laserAimPrompt: string;
  scannedSuccess: string;
  scanStatus: string;
  scannerGuide: string;
  scannerQuickList: string;
  quickSimulateNotice: string;
  manualCodePlaceholder: string;
  scannerManualPlaceholder: string;
  searchBtn: string;
  scannerSearchBtn: string;
  uploadBarcodeImage: string;
  scannerUploadPrompt: string;
  scannerUploadBtn: string;
  scannerSuccessDetected: string;
  scannerErrorTitle: string;
  cameraError: string;
  cameraPermissionError: string;
  scannerPermissionError: string;
  close: string;

  // Reports & Export Modal
  reportsCenterTitle: string;
  reportsTitle: string;
  reportsSubtitle: string;
  overallSummaryReport: string;
  barcodeStickers: string;
  stickersDesc: string;
  tabExecutiveSummary: string;
  tabRoomCard: string;
  tabQRCodes: string;
  exportPdf: string;
  exportPdfBtn: string;
  exportCsv: string;
  exportCsvBtn: string;
  print: string;
  printBtn: string;
  exporting: string;
  roomDetailsTitle: string;
  executiveReportTitle: string;
  qrCodeGridTitle: string;
  qrCodeGridSubtitle: string;
  scanMeToInspect: string;
  officialSignature: string;
  residentEngineer: string;
  projectManager: string;
  consultantRep: string;
  dateStamp: string;
  stageNameHeader: string;
  stagePhaseHeader: string;
  stageContractorHeader: string;
  stageProgressHeader: string;
  stageStatusHeader: string;
  totalLocationsHeader: string;
  averageProgressHeader: string;
  filterByBuilding: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    appTitle: 'مطار الأمير محمد بن عبدالعزيز الدولي',
    appSubtitle: 'نظام متابعة التنفيذ بالباركود والمخطط الهندسي',
    airportFullName: 'مطار الأمير محمد بن عبدالعزيز الدولي بالمدينة المنورة',
    officialProjectTitle: 'مشروع مطار الأمير محمد بن عبدالعزيز الدولي',
    officialSubtitle: 'نظام متابعة تنفيذ أعمال المبنى بالباركود والمخطط الهندسي',
    searchPlaceholder: 'ابحث برمز الباركود (M-1-05) أو اسم الموقع أو المبنى...',
    searchLabel: 'البحث السريع:',
    languageSelect: 'اللغة',
    switchLanguage: 'English',
    cameraScanner: 'ماسح الباركود',
    barcodeScanner: 'ماسح الباركود',
    cameraScannerDesc: 'مسح باركود المواقع والغرف بالكاميرا',
    reportsAndExport: 'التقارير والطباعة',
    reportsAndPdf: 'التقارير و PDF',
    reportsDesc: 'تصدير وطباعة تقارير الإنجاز وملصقات QR',
    saveData: 'حفظ المزامنة',
    saveAndSync: 'حفظ ومزامنة',
    savedToast: 'تم حفظ ومزامنة البيانات بنجاح في قاعدة البيانات',
    saveDataSuccess: 'تم حفظ وتحديث ومزامنة بيانات المشروع بنجاح!',
    activeRoom: 'الموقع النشط',

    kpiOverallProgress: 'نسبة الإنجاز العام للمشروع',
    overallProjectProgress: 'الإنجاز العام للمشروع',
    kpiTotalRooms: 'إجمالي المواقع',
    completedLocations: 'المواقع المكتملة 100%',
    kpiApprovedRooms: 'مواقع مكتملة ومعتمدة (100%)',
    kpiUnderExecution: 'مواقع قيد التنفيذ',
    kpiNotStarted: 'مواقع غير مبدوءة',
    kpiTotalStages: 'إجمالي مراحل التنفيذ (28 مرحلة معتمدة)',
    stagesCompletedCount: 'المراحل المنجزة',
    kpiCompletedStages: 'المراحل المنجزة بالكامل',
    kpiRemainingStages: 'المراحل المتبقية',
    kpiRate: 'معدل الإنجاز',
    engineeringCompliance: 'المطابقة الهندسية المعتمدة',
    barcodeSynced: 'الكود السعودي ومعايير GACA',

    interactiveBlueprintTitle: 'المخطط الهندسي التفاعلي للمطار (CAD)',
    cadBlueprintTitle: 'المخطط الهندسي التفاعلي للمطار (CAD)',
    locationsCount: '19 موقعاً',
    cadLocationsCount: '19 موقعاً',
    blueprintInstruction: 'انقر على أي موقع للانتقال الفوري إلى بطاقته ومراحله الهندسية',
    cadSubtitle: 'انقر على أي موقع لمتابعة وتحديث المراحل الهندسية',
    filterAll: 'الكل (19)',
    filterDepartures: 'مبنى المغادرة (16)',
    filterArrivals: 'مبنى الوصول (3)',
    filterDeparture: 'مبنى المغادرة (16)',
    filterArrival: 'مبنى الوصول (3)',
    filterFloor1: 'طابق ١ (10)',
    filterFloor2: 'طابق ٢ (9)',
    zoneDepartureFloor1: '🏢 مبنى المغادرة — طابق ١ (M-1-01 إلى M-1-10)',
    zoneDepartureFloor2: '🏢 مبنى المغادرة — طابق ٢ (M-2-01 إلى M-2-06)',
    zoneArrivalFloor2: '🛬 مبنى الوصول — طابق ٢ (A-2-01 إلى A-2-03)',
    zoomIn: 'تكبير',
    zoomOut: 'تصغير',
    resetZoom: 'إعادة ضبط',
    zoomReset: 'إعادة ضبط',
    colorLegend: 'دليل الألوان',
    legendCompleted: 'مكتمل (100%)',
    legendApproved: '100% معتمد',
    legendInProgress: 'قيد التنفيذ (50-75%)',
    legendInitial: 'مرحلة أولية (25%)',
    legendStarted: '25% جاري',
    legendNotStarted: 'غير مبدوء (0%)',
    selectedLocation: 'الموقع النشط',
    area: 'المساحة',
    roomArea: 'المساحة',
    category: 'التصنيف',
    roomCategory: 'التصنيف',
    completedBadge: 'مكتمل',

    stagesChecklistTitle: 'مراحل التنفيذ الهندسية المعتمدة',
    stagesCountLabel: '28 مرحلة تنفيذية',
    stagesSubtitle: 'سجل نسب الإنجاز الميدانية واعتمد البنود المنفذة وفق الكود السعودي ومعايير GACA',
    quickJumpLocation: 'الانتقال السريع بين المواقع الـ 19:',
    switchLocation: 'تبديل الموقع',
    officialApprovalTitle: 'الاعتماد الهندسي النهائي للموقع',
    officialApprovalSubtitle: 'اعتماد تسليم جميع مراحل هذا الموقع رسمياً بعد استيفاء الفحوصات',
    officialApprovalBtn: 'اعتماد تسليم الموقع رسميًا',
    approvedBadge: 'معتمد رسمياً',
    pendingBadge: 'قيد التنفيذ والمتابعة',
    contractor: 'المقاول/الاستشاري',
    contractorLabel: 'الجهة المنفذة:',
    lastInspection: 'آخر فحص',
    lastUpdatedLabel: 'آخر تحديث:',
    fieldNotes: 'ملاحظات الفحص الميداني',
    notesLabel: 'ملاحظات الفحص الميداني:',
    notesPrompt: 'إضافة وتوثيق ملاحظات الفحص الهندسي للموقع:',
    notesPlaceholder: 'اكتب ملاحظات الفحص، مراجع الكود السعودي، أو نتائج اختبارات المطابقة...',
    enterNotesPlaceholder: 'اكتب ملاحظات الموقع الهندسي أو رقم محضر الفحص هنا...',
    stageApprovedBtn: 'معتمد',
    stageApproveAction: 'اعتماد البند',
    milestoneBadge: 'نقطة توقف هندسية',
    phaseLabel: 'المرحلة الرئيسية',
    expandAll: 'توسيع الكل',
    collapseAll: 'طي الكل',
    pdfReport: 'تقرير PDF للموقع',
    all100: 'تعيين الكل 100%',
    reset0: 'إعادة ضبط 0%',
    parallelDesc: 'تحديد نسب الإنجاز لكل مرحلة بشكل تفاعلي (0% — 25% — 50% — 75% — 100%)',
    independentParallel: 'تحديث مراحل مستقل ومتزامن',
    allPhases: 'كافة المراحل (28)',
    phase1Tab: '1. الدراسات والمخططات',
    phase2Tab: '2. الأعمال الإنشائية',
    phase3Tab: '3. التمديدات والأنظمة',
    phase4Tab: '4. التشطيبات والخدمات',
    phase5Tab: '5. التركيب والتشغيل',
    phase6Tab: '6. التسليم والاستلام',
    status100: 'مكتمل 100%',
    status75: 'جاري 75%',
    status50: 'جاري 50%',
    status25: 'جاري 25%',
    status0: 'غير منجز 0%',
    statusCompleted: 'مكتمل',
    statusInProgress: 'قيد التنفيذ',
    statusNotStarted: 'غير منجز',
    stageStatus: 'حالة التنفيذ',
    inspectionDate: 'تاريخ الفحص:',
    overallProgress: 'نسبة الإنجاز',

    fieldReportTitle: 'تقرير الفحص الهندسي ومتابعة مراحل التنفيذ — مطار الأمير محمد بن عبدالعزيز',
    date: 'التاريخ',
    locationRoom: 'الموقع / المبنى',
    barcodeAndZone: 'الباركود والمنطقة',
    phaseAndCategory: 'المرحلة والتصنيف',
    stageItemAndSpec: 'بند ومرحلة التنفيذ',
    approvedContractor: 'الجهة المنفذة والمعتمدة',
    progress: 'نسبة الإنجاز',
    inspectionCommittee: 'لجنة الفحص الهندسي وضبط الجودة المعتمدة',
    systemGeneratedNotice: 'تم إصدار هذا التقرير آلياً عبر نظام متابعة التنفيذ الميداني لمطار الأمير محمد بن عبدالعزيز الدولي',

    scannerTitle: 'ماسح الباركود و QR الميداني للمواقع',
    scannerSubtitle: 'وجّه الكاميرا نحو باركود الموقع للانتقال الفوري إلى بطاقته ومراحله الهندسية',
    scannerCameraTab: 'المسح عبر الكاميرا',
    scannerUploadTab: 'رفع صورة باركود',
    scannerManualTab: 'إدخال الرمز يدوياً',
    scannerFlipCamera: 'تبديل الكاميرا',
    toggleCamera: 'تبديل الكاميرا',
    laserAimPrompt: 'وجّه إطار الماسح نحو باركود أو QR الموقع',
    scannedSuccess: 'تم التعرف على باركود الموقع بنجاح',
    scanStatus: 'حالة المسح',
    scannerGuide: 'وجّه الكاميرا نحو ملصق الباركود المعلق على مدخل القاعة أو الموقع',
    scannerQuickList: 'أو اختر الموقع مباشرة من القائمة الميدانية:',
    quickSimulateNotice: 'يمكنك محاكاة مسح الباركود بالنقر على أي رمز موقع من القائمة أدناه',
    manualCodePlaceholder: 'أدخل رمز الموقع (مثل: M-1-05 أو A-2-01)...',
    scannerManualPlaceholder: 'أدخل رمز الموقع (مثل: M-1-05 أو A-2-01)...',
    searchBtn: 'بحث وانتقال',
    scannerSearchBtn: 'فتح بطاقة الموقع',
    uploadBarcodeImage: 'رفع صورة باركود من الجهاز',
    scannerUploadPrompt: 'اسحب صورة الباركود هنا أو انقر لاختيار ملف من جهازك',
    scannerUploadBtn: 'اختيار صورة من الجهاز',
    scannerSuccessDetected: 'تم التقاط الباركود بنجاح:',
    scannerErrorTitle: 'تنبيه الكاميرا',
    cameraError: 'تعذر تشغيل الكاميرا مباشرة. يمكنك استخدام أزرار المحاكاة السريعة أو إدخال الرمز يدوياً.',
    cameraPermissionError: 'تعذر الوصول المباشر للكاميرا (قد يتطلب تفعيل إذن الكاميرا بالمتصفح). يمكنك استخدام قائمة المواقع السريعة أدناه.',
    scannerPermissionError: 'تعذر الوصول المباشر للكاميرا (قد يتطلب تفعيل إذن الكاميرا بالمتصفح). يمكنك استخدام قائمة المواقع السريعة أدناه.',
    close: 'إغلاق',

    reportsCenterTitle: 'مركز التقارير الهندسية وملصقات الباركود',
    reportsTitle: 'مركز التقارير الهندسية، الباركود والطباعة',
    reportsSubtitle: 'تصدير وثائق الفحص الميداني، ملصقات الباركود، والتقرير الشامل للمشروع',
    overallSummaryReport: 'التقرير التنفيذي الشامل للمشروع',
    barcodeStickers: 'ملصقات الباركود و QR للمواقع',
    stickersDesc: 'بطاقات باركود و QR جاهزة للطباعة والتركيب على مداخل القاعات والغرف للمسح الميداني السريع',
    tabExecutiveSummary: 'التقرير التنفيذي الشامل',
    tabRoomCard: 'بطاقة الموقع ومراحله',
    tabQRCodes: 'ملصقات الباركود و QR (19 موقعاً)',
    exportPdf: 'تصدير PDF',
    exportPdfBtn: 'تصدير تقرير PDF معتمد',
    exportCsv: 'تصدير Excel / CSV',
    exportCsvBtn: 'تصدير بيانات Excel / CSV',
    print: 'طباعة',
    printBtn: 'طباعة الوثيقة',
    exporting: 'جاري التصدير...',
    roomDetailsTitle: 'تفاصيل الموقع ومراحل التنفيذ الهندسية',
    executiveReportTitle: 'تقرير متابعة تنفيذ مشروع مطار الأمير محمد بن عبدالعزيز الدولي',
    qrCodeGridTitle: 'ملصقات الباركود و QR الميدانية لكافة المواقع الـ 19',
    qrCodeGridSubtitle: 'جاهزة للطباعة والتثبيت على المداخل للمسح والمطابقة الميدانية',
    scanMeToInspect: 'امسح الرمز للتحقق وتحديث المراحل',
    officialSignature: 'الاعتماد الهندسي والختم الرسمي',
    residentEngineer: 'مهندس الموقع المقيم',
    projectManager: 'مدير المشروع',
    consultantRep: 'استشاري الإشراف الهندسي',
    dateStamp: 'التاريخ:',
    stageNameHeader: 'بند ومرحلة التنفيذ',
    stagePhaseHeader: 'المرحلة الرئيسية',
    stageContractorHeader: 'الجهة المنفذة',
    stageProgressHeader: 'نسبة الإنجاز',
    stageStatusHeader: 'الحالة والاعتماد',
    totalLocationsHeader: 'إجمالي المواقع المسجلة بالمشروع',
    averageProgressHeader: 'متوسط الإنجاز الإجمالي',
    filterByBuilding: 'تصفية حسب المبنى:'
  },
  en: {
    appTitle: 'Prince Mohammad Bin Abdulaziz International Airport',
    appSubtitle: 'Barcode & CAD Blueprint Construction Tracking System',
    airportFullName: 'Prince Mohammad Bin Abdulaziz International Airport (PMIA) — Madinah',
    officialProjectTitle: 'Prince Mohammad Bin Abdulaziz International Airport Project',
    officialSubtitle: 'Barcode & Blueprint Construction Progress & Compliance System',
    searchPlaceholder: 'Search by barcode (e.g. M-1-05), location name or zone...',
    searchLabel: 'Quick Search:',
    languageSelect: 'Language',
    switchLanguage: 'العربية',
    cameraScanner: 'Barcode Scanner',
    barcodeScanner: 'Barcode Scanner',
    cameraScannerDesc: 'Scan location and room barcodes with camera',
    reportsAndExport: 'Reports & Export',
    reportsAndPdf: 'Reports & PDF',
    reportsDesc: 'Export & print progress reports and QR stickers',
    saveData: 'Save & Sync',
    saveAndSync: 'Save & Sync',
    savedToast: 'Project data successfully saved and synced to database',
    saveDataSuccess: 'Project data successfully saved and synced!',
    activeRoom: 'Active Location',

    kpiOverallProgress: 'Overall Project Progress',
    overallProjectProgress: 'Overall Project Progress',
    kpiTotalRooms: 'Total Locations',
    completedLocations: 'Completed Locations (100%)',
    kpiApprovedRooms: 'Approved & Completed Locations (100%)',
    kpiUnderExecution: 'Locations Under Execution',
    kpiNotStarted: 'Not Started Locations',
    kpiTotalStages: 'Total Execution Stages (28 Standard Stages)',
    stagesCompletedCount: 'Stages Completed',
    kpiCompletedStages: 'Completed Stages',
    kpiRemainingStages: 'Remaining Stages',
    kpiRate: 'Completion Rate',
    engineeringCompliance: 'Official Engineering Compliance',
    barcodeSynced: 'Saudi Building Code & GACA Compliant',

    interactiveBlueprintTitle: 'Interactive Airport CAD Blueprint',
    cadBlueprintTitle: 'Interactive Airport CAD Blueprint',
    locationsCount: '19 Locations',
    cadLocationsCount: '19 Locations',
    blueprintInstruction: 'Click any location to jump directly to its engineering stages card',
    cadSubtitle: 'Click any location to view and update execution stages',
    filterAll: 'All (19)',
    filterDepartures: 'Departure Terminal (16)',
    filterArrivals: 'Arrival Terminal (3)',
    filterDeparture: 'Departure Terminal (16)',
    filterArrival: 'Arrival Terminal (3)',
    filterFloor1: 'Floor 1 (10)',
    filterFloor2: 'Floor 2 (9)',
    zoneDepartureFloor1: '🏢 Departure Terminal — Floor 1 (M-1-01 to M-1-10)',
    zoneDepartureFloor2: '🏢 Departure Terminal — Floor 2 (M-2-01 to M-2-06)',
    zoneArrivalFloor2: '🛬 Arrival Terminal — Floor 2 (A-2-01 to A-2-03)',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    resetZoom: 'Reset View',
    zoomReset: 'Reset View',
    colorLegend: 'Color Legend',
    legendCompleted: 'Completed (100%)',
    legendApproved: '100% Approved',
    legendInProgress: 'In Progress (50-75%)',
    legendInitial: 'Initial Stage (25%)',
    legendStarted: '25% Active',
    legendNotStarted: 'Not Started (0%)',
    selectedLocation: 'Active Location',
    area: 'Area',
    roomArea: 'Area',
    category: 'Category',
    roomCategory: 'Category',
    completedBadge: 'Completed',

    stagesChecklistTitle: 'Standard Airport Execution Stages',
    stagesCountLabel: '28 Execution Stages',
    stagesSubtitle: 'Log field progress percentages and certify deliverables per Saudi Building Code & GACA standards',
    quickJumpLocation: 'Quick jump between 19 locations:',
    switchLocation: 'Switch Location',
    officialApprovalTitle: 'Final Engineering Acceptance Signoff',
    officialApprovalSubtitle: 'Officially certify full handover of this location after all inspection criteria are met',
    officialApprovalBtn: 'Certify Location Handover',
    approvedBadge: 'Officially Certified',
    pendingBadge: 'In Progress & Monitoring',
    contractor: 'Contractor / Consultant',
    contractorLabel: 'Contractor:',
    lastInspection: 'Last Inspection',
    lastUpdatedLabel: 'Last Updated:',
    fieldNotes: 'Field Inspection Notes',
    notesLabel: 'Field Inspection Notes:',
    notesPrompt: 'Document site inspection notes and QA/QC punch lists:',
    notesPlaceholder: 'Enter inspection observations, SBC references, or QA/QC certificates...',
    enterNotesPlaceholder: 'Enter inspection observations or official test report numbers here...',
    stageApprovedBtn: 'Approved',
    stageApproveAction: 'Approve Item',
    milestoneBadge: 'Engineering Hold Point',
    phaseLabel: 'Major Phase',
    expandAll: 'Expand All',
    collapseAll: 'Collapse All',
    pdfReport: 'Location PDF Report',
    all100: 'Set All 100%',
    reset0: 'Reset to 0%',
    parallelDesc: 'Set progress percentage per stage interactively (0% — 25% — 50% — 75% — 100%)',
    independentParallel: 'Independent & Parallel Updates',
    allPhases: 'All Stages (28)',
    phase1Tab: '1. Studies & Plans',
    phase2Tab: '2. Substructure & Civil',
    phase3Tab: '3. MEP & Technical',
    phase4Tab: '4. Finishes & Services',
    phase5Tab: '5. Testing & ORAT',
    phase6Tab: '6. Final Handover',
    status100: '100% Completed',
    status75: '75% In Progress',
    status50: '50% In Progress',
    status25: '25% In Progress',
    status0: '0% Not Started',
    statusCompleted: 'Completed',
    statusInProgress: 'In Progress',
    statusNotStarted: 'Not Started',
    stageStatus: 'Execution Status',
    inspectionDate: 'Inspection Date:',
    overallProgress: 'Progress Rate',

    fieldReportTitle: 'Field Inspection & Construction Progress Report — PMIA Airport',
    date: 'Date',
    locationRoom: 'Location & Terminal',
    barcodeAndZone: 'Barcode & Zone',
    phaseAndCategory: 'Phase & Category',
    stageItemAndSpec: 'Item & Execution Stage',
    approvedContractor: 'Approved Contractor',
    progress: 'Progress',
    inspectionCommittee: 'Authorized Engineering QA/QC Inspection Committee',
    systemGeneratedNotice: 'This document was officially generated by the PMIA Barcode & Blueprint Construction Progress System',

    scannerTitle: 'Field Engineering Barcode & QR Scanner',
    scannerSubtitle: 'Point camera at a location barcode to jump directly to its engineering stages checklist',
    scannerCameraTab: 'Camera Scanner',
    scannerUploadTab: 'Upload Barcode Image',
    scannerManualTab: 'Manual Code Entry',
    scannerFlipCamera: 'Switch Camera',
    toggleCamera: 'Switch Camera',
    laserAimPrompt: 'Align barcode or QR code within the frame',
    scannedSuccess: 'Room barcode successfully recognized',
    scanStatus: 'Scan Status',
    scannerGuide: 'Align camera with the room barcode or QR sticker label',
    scannerQuickList: 'Or select a location directly from the field list:',
    quickSimulateNotice: 'Simulate barcode scan by clicking any location code from the field list',
    manualCodePlaceholder: 'Enter room code (e.g. M-1-05 or A-2-01)...',
    scannerManualPlaceholder: 'Enter room code (e.g. M-1-05 or A-2-01)...',
    searchBtn: 'Search & Jump',
    scannerSearchBtn: 'Open Location Card',
    uploadBarcodeImage: 'Upload Barcode Image from Device',
    scannerUploadPrompt: 'Drag barcode image here or click to browse files',
    scannerUploadBtn: 'Choose File from Device',
    scannerSuccessDetected: 'Barcode detected successfully:',
    scannerErrorTitle: 'Camera Notice',
    cameraError: 'Unable to start camera directly. You can use the quick simulation buttons or manual code search.',
    cameraPermissionError: 'Unable to access camera directly (may require browser camera permissions). You can select any barcode from the quick list below or enter the code manually.',
    scannerPermissionError: 'Unable to access camera directly (may require browser camera permissions). You can select any barcode from the quick list below or enter the code manually.',
    close: 'Close',

    reportsCenterTitle: 'Engineering Reports & Stickers Center',
    reportsTitle: 'Engineering Reports, Barcodes & Print Center',
    reportsSubtitle: 'Generate field inspection documents, QR stickers, and comprehensive progress reports',
    overallSummaryReport: 'Executive Overall Progress Report',
    barcodeStickers: 'Barcode & QR Stickers',
    stickersDesc: 'Printable barcode and QR code stickers ready to install at room and hall entrances for fast field inspection',
    tabExecutiveSummary: 'Executive Progress Report',
    tabRoomCard: 'Location & Stages Card',
    tabQRCodes: 'Barcode & QR Stickers (19 Locations)',
    exportPdf: 'Export PDF',
    exportPdfBtn: 'Export PDF Report',
    exportCsv: 'Export CSV / Excel',
    exportCsvBtn: 'Export Excel / CSV',
    print: 'Print',
    printBtn: 'Print Document',
    exporting: 'Exporting...',
    roomDetailsTitle: 'Location Details & Execution Stages',
    executiveReportTitle: 'Comprehensive Construction Progress Report — Prince Mohammad Bin Abdulaziz International Airport',
    qrCodeGridTitle: 'Field Barcode & QR Stickers for All 19 Locations',
    qrCodeGridSubtitle: 'Ready to print and install at entrances for field scanning and inspection',
    scanMeToInspect: 'Scan to verify & track engineering stages',
    officialSignature: 'Authorized Engineering Signatures & Stamp',
    residentEngineer: 'Resident Site Engineer',
    projectManager: 'Project Director',
    consultantRep: 'Supervising Consultant Rep',
    dateStamp: 'Date:',
    stageNameHeader: 'Stage Description',
    stagePhaseHeader: 'Major Phase',
    stageContractorHeader: 'Contractor',
    stageProgressHeader: 'Progress',
    stageStatusHeader: 'Status & Approval',
    totalLocationsHeader: 'Total Registered Locations',
    averageProgressHeader: 'Overall Average Completion',
    filterByBuilding: 'Filter by Building:'
  }
};

export interface StageI18n {
  id: number;
  stageNumber: number;
  phaseAr: ExecutionPhase;
  phaseEn: string;
  phaseNumber: 1 | 2 | 3 | 4 | 5 | 6;
  titleAr: string;
  titleEn: string;
  contractorAr: string;
  contractorEn: string;
  codeStandard?: string;
  isMilestone?: boolean;
}

export const STAGES_I18N_PROJECT: StageI18n[] = [
  // Phase 1: Studies, Preparation & Master Plans (4 stages)
  {
    id: 1,
    stageNumber: 1,
    phaseAr: 'المرحلة الأولى — الدراسات والتهيئة والمخططات',
    phaseEn: 'Phase 1: Studies, Site Preparation & Master Plans',
    phaseNumber: 1,
    titleAr: 'الدراسات الجيوتقنية والمسوحات الموقعية',
    titleEn: 'Geotechnical investigations, soil topography & site surveys',
    contractorAr: 'مكتب الاستشارات الجيوتقنية والمسوحات الهندسية',
    contractorEn: 'Geotechnical & Surveying Engineering Bureau',
    codeStandard: 'SBC 301 / GACA-ENG',
    isMilestone: true
  },
  {
    id: 2,
    stageNumber: 2,
    phaseAr: 'المرحلة الأولى — الدراسات والتهيئة والمخططات',
    phaseEn: 'Phase 1: Studies, Site Preparation & Master Plans',
    phaseNumber: 1,
    titleAr: 'التصاميم الهندسية والمخططات المعتمدة',
    titleEn: 'Approved engineering IFC designs, architectural & BIM structural models',
    contractorAr: 'دار الهندسة والاستشارات المعمارية للمطارات',
    contractorEn: 'Airport Architecture & Engineering Consultancy',
    codeStandard: 'SBC 201 / ICAO Annex 14',
    isMilestone: true
  },
  {
    id: 3,
    stageNumber: 3,
    phaseAr: 'المرحلة الأولى — الدراسات والتهيئة والمخططات',
    phaseEn: 'Phase 1: Studies, Site Preparation & Master Plans',
    phaseNumber: 1,
    titleAr: 'التجهيزات الأولية وتسليم الموقع',
    titleEn: 'Site mobilization, perimeter fencing, temporary utilities & handover protocol',
    contractorAr: 'شركة الإنشاءات والتجهيزات الميدانية',
    contractorEn: 'Field Infrastructure & Site Mobilization Co.',
    codeStandard: 'GACA-SEC-01'
  },
  {
    id: 4,
    stageNumber: 4,
    phaseAr: 'المرحلة الأولى — الدراسات والتهيئة والمخططات',
    phaseEn: 'Phase 1: Studies, Site Preparation & Master Plans',
    phaseNumber: 1,
    titleAr: 'التسويات الترابية والمنشآت السطحية',
    titleEn: 'Bulk earthworks, subgrade grading, surface leveling & temporary drainage',
    contractorAr: 'المقاول العام للبنية التحتية والتربة',
    contractorEn: 'General Infrastructure & Earthworks Contractor',
    codeStandard: 'SBC 302 / GACA-CIV'
  },

  // Phase 2: Substructure & Structural Framework (5 stages)
  {
    id: 5,
    stageNumber: 5,
    phaseAr: 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
    phaseEn: 'Phase 2: Substructure & Structural Framework',
    phaseNumber: 2,
    titleAr: 'أعمال الحفر والردم والتربة',
    titleEn: 'Excavation, structural backfilling & soil compaction testing',
    contractorAr: 'شركة أعمال التربة والأساسات العميقة',
    contractorEn: 'Deep Foundations & Earthworks Specialist',
    codeStandard: 'SBC 303'
  },
  {
    id: 6,
    stageNumber: 6,
    phaseAr: 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
    phaseEn: 'Phase 2: Substructure & Structural Framework',
    phaseNumber: 2,
    titleAr: 'الأساسات والقواعد والهيكل الخرساني',
    titleEn: 'Reinforced concrete footings, rafts, columns, shear walls & slabs',
    contractorAr: 'الشركة المتحدة للمقاولات والخرسانة المسلحة',
    contractorEn: 'United Concrete & Civil Construction Co.',
    codeStandard: 'SBC 304',
    isMilestone: true
  },
  {
    id: 7,
    stageNumber: 7,
    phaseAr: 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
    phaseEn: 'Phase 2: Substructure & Structural Framework',
    phaseNumber: 2,
    titleAr: 'الأعمال المعدنية والإنشائية العلوية',
    titleEn: 'Structural steel trusses, space frames & terminal roof arches',
    contractorAr: 'مصنع الهياكل الفولاذية والمنشآت المعدنية',
    contractorEn: 'Structural Steel & Long-Span Canopy Works',
    codeStandard: 'SBC 306 / AISC',
    isMilestone: true
  },
  {
    id: 8,
    stageNumber: 8,
    phaseAr: 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
    phaseEn: 'Phase 2: Substructure & Structural Framework',
    phaseNumber: 2,
    titleAr: 'الأسقف والغطاءات والوصلات الإنشائية',
    titleEn: 'Roof decking, skylights & seismic expansion joints',
    contractorAr: 'شركة تغطية الأسقف والوصلات المعمارية',
    contractorEn: 'Roof Decking & Structural Expansion Solutions',
    codeStandard: 'SBC 305'
  },
  {
    id: 9,
    stageNumber: 9,
    phaseAr: 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
    phaseEn: 'Phase 2: Substructure & Structural Framework',
    phaseNumber: 2,
    titleAr: 'الفحوصات والاختبارات الإنشائية واعتمادها',
    titleEn: 'Concrete core crushing tests, ultrasonic weld QA/QC & structural certification',
    contractorAr: 'مختبر ضبط الجودة والاختبارات الإنشائية',
    contractorEn: 'Structural Testing & Materials Certification Lab',
    codeStandard: 'SASO / SBC QA-QC',
    isMilestone: true
  },

  // Phase 3: MEP & Technical Systems Infrastructure (5 stages)
  {
    id: 10,
    stageNumber: 10,
    phaseAr: 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
    phaseEn: 'Phase 3: MEP & Technical Systems Infrastructure',
    phaseNumber: 3,
    titleAr: 'تمديدات وتأسيس الأعمال الكهربائية والمحولات',
    titleEn: 'MV/LV power distribution, substations, transformers & conduit networks',
    contractorAr: 'الشركة الوطنية للطاقة والتجهيزات الكهربائية',
    contractorEn: 'National Electrical Power & Substations Co.',
    codeStandard: 'SBC 401 / IEC',
    isMilestone: true
  },
  {
    id: 11,
    stageNumber: 11,
    phaseAr: 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
    phaseEn: 'Phase 3: MEP & Technical Systems Infrastructure',
    phaseNumber: 3,
    titleAr: 'تمديدات وتأسيس الأعمال الميكانيكية والتهوية',
    titleEn: 'Central chilled water piping, HVAC ductwork & air handling units (AHU)',
    contractorAr: 'شركة تبريد وتكييف مباني المطارات',
    contractorEn: 'Airport HVAC & Mechanical Climate Systems',
    codeStandard: 'SBC 501 / ASHRAE',
    isMilestone: true
  },
  {
    id: 12,
    stageNumber: 12,
    phaseAr: 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
    phaseEn: 'Phase 3: MEP & Technical Systems Infrastructure',
    phaseNumber: 3,
    titleAr: 'تمديدات الصرف الصحي والمياه والحريق',
    titleEn: 'Potable water networks, drainage, fire hydrants & sprinkler piping',
    contractorAr: 'شركة أنظمة السلامة وشبكات الإطفاء',
    contractorEn: 'Hydraulic Networks & Fire Protection Systems',
    codeStandard: 'SBC 701 / 801 / NFPA',
    isMilestone: true
  },
  {
    id: 13,
    stageNumber: 13,
    phaseAr: 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
    phaseEn: 'Phase 3: MEP & Technical Systems Infrastructure',
    phaseNumber: 3,
    titleAr: 'تأسيس أنظمة الاتصالات والشبكات والأمن',
    titleEn: 'Fiber optics backbone, ELV cabling, CCTV, Access Control & GACA IT network',
    contractorAr: 'حلول الاتصالات والأنظمة الأمنية الذكية',
    contractorEn: 'Integrated Security, ELV & Telecom Solutions',
    codeStandard: 'GACA-IT-SEC / TIA-942'
  },
  {
    id: 14,
    stageNumber: 14,
    phaseAr: 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
    phaseEn: 'Phase 3: MEP & Technical Systems Infrastructure',
    phaseNumber: 3,
    titleAr: 'أنظمة الإضاءة والمطارات واللوحات الإرشادية',
    titleEn: 'Airfield Ground Lighting (AGL), apron floodlights, dynamic wayfinding & signage',
    contractorAr: 'شركة نظم إضاءة وإرشاد المطارات',
    contractorEn: 'Airfield Lighting & Dynamic Wayfinding Systems',
    codeStandard: 'GACA Annex 14 / ICAO'
  },

  // Phase 4: Architectural Finishes & Landside Services (5 stages)
  {
    id: 15,
    stageNumber: 15,
    phaseAr: 'المرحلة الرابعة — التشطيبات والخدمات',
    phaseEn: 'Phase 4: Architectural Finishes & Landside Services',
    phaseNumber: 4,
    titleAr: 'أعمال البلاط والتركيبات الداخلية والخارجية',
    titleEn: 'High-traffic granite, terrazzo concourse flooring & ceramic wall cladding',
    contractorAr: 'شركة الرخام والجرانيت التخصصية',
    contractorEn: 'Granite, Terrazzo & Premium Stone Works',
    codeStandard: 'SBC 201'
  },
  {
    id: 16,
    stageNumber: 16,
    phaseAr: 'المرحلة الرابعة — التشطيبات والخدمات',
    phaseEn: 'Phase 4: Architectural Finishes & Landside Services',
    phaseNumber: 4,
    titleAr: 'أعمال العزل والواجهات والأسطح',
    titleEn: 'Waterproofing membranes, thermal insulation & curtain wall glazing',
    contractorAr: 'شركة العوازل الحرارية والمائية المتقدمة',
    contractorEn: 'Advanced Waterproofing & Facade Insulation Co.',
    codeStandard: 'SBC 601',
    isMilestone: true
  },
  {
    id: 17,
    stageNumber: 17,
    phaseAr: 'المرحلة الرابعة — التشطيبات والخدمات',
    phaseEn: 'Phase 4: Architectural Finishes & Landside Services',
    phaseNumber: 4,
    titleAr: 'تركيب الأبواب والنوافذ والأنظمة الزجاجية',
    titleEn: 'Fire-rated security doors, automatic sliding concourse gates & acoustic glass',
    contractorAr: 'مصنع الواجهات الزجاجية والأبواب الأوتوماتيكية',
    contractorEn: 'Aviation Glazing & Automated Door Systems',
    codeStandard: 'SBC 801 / GACA-SEC'
  },
  {
    id: 18,
    stageNumber: 18,
    phaseAr: 'المرحلة الرابعة — التشطيبات والخدمات',
    phaseEn: 'Phase 4: Architectural Finishes & Landside Services',
    phaseNumber: 4,
    titleAr: 'التشطيبات المعمارية والديكورات الداخلية',
    titleEn: 'Acoustic ceiling baffles, wall paneling, passenger counters & interior styling',
    contractorAr: 'مؤسسة التصميم الداخلي والتشطيبات المعمارية',
    contractorEn: 'Terminal Interior Architecture & Woodwork',
    codeStandard: 'SBC 201'
  },
  {
    id: 19,
    stageNumber: 19,
    phaseAr: 'المرحلة الرابعة — التشطيبات والخدمات',
    phaseEn: 'Phase 4: Architectural Finishes & Landside Services',
    phaseNumber: 4,
    titleAr: 'أعمال الطرق والممرات والساحات والمواقف',
    titleEn: 'Taxiways, service roads, passenger pick-up loops & multi-level car parks',
    contractorAr: 'شركة تعبيد الطرق والساحات الخارجية',
    contractorEn: 'Pavement, Landside Roadways & Parking Facilities',
    codeStandard: 'GACA-AP-02 / AASHTO',
    isMilestone: true
  },

  // Phase 5: Specialized Equipment, Testing & ORAT (5 stages)
  {
    id: 20,
    stageNumber: 20,
    phaseAr: 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
    phaseEn: 'Phase 5: Specialized Equipment, Testing & ORAT',
    phaseNumber: 5,
    titleAr: 'تركيب المعدات والأجهزة والأنظمة المتخصصة',
    titleEn: 'Baggage Handling System (BHS), Boarding Bridges, EDS scanners & NavAids',
    contractorAr: 'شركة التجهيزات والأنظمة الملاحية للمطارات',
    contractorEn: 'Airport Specialized Systems & BHS Engineering',
    codeStandard: 'ICAO / GACA-AVSEC',
    isMilestone: true
  },
  {
    id: 21,
    stageNumber: 21,
    phaseAr: 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
    phaseEn: 'Phase 5: Specialized Equipment, Testing & ORAT',
    phaseNumber: 5,
    titleAr: 'اختبار كل نظام على حدة والتأكد من مطابقته',
    titleEn: 'Individual subsystem SAT testing, emergency power backup & functional compliance',
    contractorAr: 'مكتب الاختبارات والمطابقة الفنية',
    contractorEn: 'Independent Systems QA/QC Testing Agency',
    codeStandard: 'SBC / SASO / NFPA',
    isMilestone: true
  },
  {
    id: 22,
    stageNumber: 22,
    phaseAr: 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
    phaseEn: 'Phase 5: Specialized Equipment, Testing & ORAT',
    phaseNumber: 5,
    titleAr: 'التشغيل التجريبي والتكامل بين الأنظمة',
    titleEn: 'Operational Readiness & Airport Transfer (ORAT) trials & simulated passenger flows',
    contractorAr: 'فريق الجاهزية التشغيلية وإدارة المطارات',
    contractorEn: 'PMIA Operational Readiness & ORAT Taskforce',
    codeStandard: 'GACA ORAT Guidelines',
    isMilestone: true
  },
  {
    id: 23,
    stageNumber: 23,
    phaseAr: 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
    phaseEn: 'Phase 5: Specialized Equipment, Testing & ORAT',
    phaseNumber: 5,
    titleAr: 'معالجة الملاحظات وضمان الجودة',
    titleEn: 'Snag list rectification, punch list closeout & final QA/QC audit',
    contractorAr: 'إدارة ضبط وتوكيد الجودة (QA/QC)',
    contractorEn: 'Project Quality Assurance & Snag Closeout Team',
    codeStandard: 'ISO 9001 / SBC'
  },
  {
    id: 24,
    stageNumber: 24,
    phaseAr: 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
    phaseEn: 'Phase 5: Specialized Equipment, Testing & ORAT',
    phaseNumber: 5,
    titleAr: 'الاعتماد الفني من الجهات المختصة',
    titleEn: 'Official technical compliance approvals from GACA, SASO & Civil Defense',
    contractorAr: 'لجان الاعتماد الفني والتراخيص الحكومية',
    contractorEn: 'Governmental & Aviation Regulatory Authorities',
    codeStandard: 'GACA Part 139 / Civil Defense',
    isMilestone: true
  },

  // Phase 6: Final Handover & Commercial Operations (4 stages)
  {
    id: 25,
    stageNumber: 25,
    phaseAr: 'المرحلة السادسة — التسليم والاستلام',
    phaseEn: 'Phase 6: Final Handover & Commercial Operations',
    phaseNumber: 6,
    titleAr: 'المراجعة النهائية لجميع الأعمال',
    titleEn: 'Comprehensive final project audit, safety verification & regulatory signoff',
    contractorAr: 'لجنة الإشراف الهندسي والاستشاري العام',
    contractorEn: 'General Engineering Supervision & Auditing Board',
    codeStandard: 'SBC / GACA Inspection Code',
    isMilestone: true
  },
  {
    id: 26,
    stageNumber: 26,
    phaseAr: 'المرحلة السادسة — التسليم والاستلام',
    phaseEn: 'Phase 6: Final Handover & Commercial Operations',
    phaseNumber: 6,
    titleAr: 'توفير كتيبات التشغيل والضمان والوثائق',
    titleEn: 'As-Built BIM models, O&M manuals, warranty certificates & spare parts logs',
    contractorAr: 'المقاول العام وإدارة الوثائق الفنية',
    contractorEn: 'Technical Documentation & As-Built Archive Dept.',
    codeStandard: 'GACA Document Handover Standard'
  },
  {
    id: 27,
    stageNumber: 27,
    phaseAr: 'المرحلة السادسة — التسليم والاستلام',
    phaseEn: 'Phase 6: Final Handover & Commercial Operations',
    phaseNumber: 6,
    titleAr: 'استلام الأعمال وفق محاضر الكود السعودي',
    titleEn: 'Official completion protocol signoff in compliance with Saudi Building Code & GACA',
    contractorAr: 'لجنة الاستلام والتسليم المعتمدة',
    contractorEn: 'Saudi Building Code & Handover Protocol Committee',
    codeStandard: 'SBC 100-800 Series / GACA Signoff',
    isMilestone: true
  },
  {
    id: 28,
    stageNumber: 28,
    phaseAr: 'المرحلة السادسة — التسليم والاستلام',
    phaseEn: 'Phase 6: Final Handover & Commercial Operations',
    phaseNumber: 6,
    titleAr: 'التسليم النهائي وبدء الخدمة',
    titleEn: 'Final airport commissioning, operational handover & commercial flight commencement',
    contractorAr: 'شركة مطارات القابضة وإدارة مطار الأمير محمد بن عبدالعزيز',
    contractorEn: 'Matarat Holding & PMIA Airport Operations Authority',
    codeStandard: 'GACA Commercial Airport Operating Certificate',
    isMilestone: true
  }
];

// Backwards compatibility alias
export const STAGES_I18N_34 = STAGES_I18N_PROJECT;

// Helper to get localized room name
export function getRoomName(room: RoomLocation, lang: Language): string {
  if (lang === 'en') {
    return room.nameEn || room.nameAr;
  }
  return room.nameAr;
}

// Helper to get localized zone
export function getRoomZone(room: RoomLocation, lang: Language): string {
  if (lang === 'en') {
    if (room.zone === 'مبنى المغادرة') return 'Departure Terminal';
    if (room.zone === 'مبنى الوصول') return 'Arrival Terminal';
    return room.zoneEn || room.zone;
  }
  return room.zone;
}

// Helper to get localized floor
export function getRoomFloor(room: RoomLocation, lang: Language): string {
  if (lang === 'en') {
    if (room.floor === 'طابق ١' || room.floor === 'طابق 1') return 'Floor 1';
    if (room.floor === 'طابق ٢' || room.floor === 'طابق 2') return 'Floor 2';
    return room.floorEn || room.floor;
  }
  return room.floor;
}

// Helper to get full room description (e.g. Departure Terminal — Floor 1 — Main Concourse)
export function getFullRoomDesc(room: RoomLocation, lang: Language): string {
  const zone = getRoomZone(room, lang);
  const floor = getRoomFloor(room, lang);
  const name = getRoomName(room, lang);
  return `${zone} — ${floor} — ${name}`;
}

// Helper to get localized stage info
export function getStageI18n(stageId: number, lang: Language) {
  const stage = STAGES_I18N_PROJECT.find(s => s.id === stageId || s.stageNumber === stageId);
  if (!stage) {
    return {
      title: `Stage ${stageId}`,
      phase: 'General',
      contractor: 'Contractor',
      phaseNumber: 1 as const,
      isMilestone: false,
      codeStandard: 'SBC'
    };
  }
  return {
    title: lang === 'en' ? stage.titleEn : stage.titleAr,
    phase: lang === 'en' ? stage.phaseEn : stage.phaseAr,
    contractor: lang === 'en' ? stage.contractorEn : stage.contractorAr,
    phaseNumber: stage.phaseNumber,
    isMilestone: stage.isMilestone,
    codeStandard: stage.codeStandard
  };
}

// Helper to get localized phase name by number
export function getPhaseTitleByNumber(phaseNumber: 1 | 2 | 3 | 4 | 5 | 6, lang: Language): string {
  const stage = STAGES_I18N_PROJECT.find(s => s.phaseNumber === phaseNumber);
  if (!stage) return '';
  return lang === 'en' ? stage.phaseEn : stage.phaseAr;
}
