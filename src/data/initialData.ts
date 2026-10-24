import { RoomLocation, TaskItem, StageTemplate, ExecutionPhase } from '../types';
import { safeStorage } from '../utils/storage';

export const STAGES_MASTER_PROJECT: StageTemplate[] = [
  // 🔹 المرحلة الأولى — الدراسات والتهيئة والمخططات (4 بنود)
  {
    id: 1,
    stageNumber: 1,
    phase: 'المرحلة الأولى — الدراسات والتهيئة والمخططات',
    phaseEn: 'Phase 1: Studies, Site Preparation & Master Plans',
    phaseNumber: 1,
    title: 'الدراسات الجيوتقنية والمسوحات الموقعية',
    titleEn: 'Geotechnical investigations, soil topography & site surveys',
    contractor: 'مكتب الاستشارات الجيوتقنية والمسوحات الهندسية',
    contractorEn: 'Geotechnical & Surveying Engineering Bureau',
    codeStandard: 'SBC 301 / GACA-ENG',
    isMilestone: true
  },
  {
    id: 2,
    stageNumber: 2,
    phase: 'المرحلة الأولى — الدراسات والتهيئة والمخططات',
    phaseEn: 'Phase 1: Studies, Site Preparation & Master Plans',
    phaseNumber: 1,
    title: 'التصاميم الهندسية والمخططات المعتمدة',
    titleEn: 'Approved engineering IFC designs, architectural & BIM structural models',
    contractor: 'دار الهندسة والاستشارات المعمارية للمطارات',
    contractorEn: 'Airport Architecture & Engineering Consultancy',
    codeStandard: 'SBC 201 / ICAO Annex 14',
    isMilestone: true
  },
  {
    id: 3,
    stageNumber: 3,
    phase: 'المرحلة الأولى — الدراسات والتهيئة والمخططات',
    phaseEn: 'Phase 1: Studies, Site Preparation & Master Plans',
    phaseNumber: 1,
    title: 'التجهيزات الأولية وتسليم الموقع',
    titleEn: 'Site mobilization, perimeter fencing, temporary utilities & handover protocol',
    contractor: 'شركة الإنشاءات والتجهيزات الميدانية',
    contractorEn: 'Field Infrastructure & Site Mobilization Co.',
    codeStandard: 'GACA-SEC-01',
    isMilestone: false
  },
  {
    id: 4,
    stageNumber: 4,
    phase: 'المرحلة الأولى — الدراسات والتهيئة والمخططات',
    phaseEn: 'Phase 1: Studies, Site Preparation & Master Plans',
    phaseNumber: 1,
    title: 'التسويات الترابية والمنشآت السطحية',
    titleEn: 'Bulk earthworks, subgrade grading, surface leveling & temporary drainage',
    contractor: 'المقاول العام للبنية التحتية والتربة',
    contractorEn: 'General Infrastructure & Earthworks Contractor',
    codeStandard: 'SBC 302 / GACA-CIV',
    isMilestone: false
  },

  // 🔹 المرحلة الثانية — الأعمال الإنشائية والأساسات (5 بنود)
  {
    id: 5,
    stageNumber: 5,
    phase: 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
    phaseEn: 'Phase 2: Substructure & Structural Framework',
    phaseNumber: 2,
    title: 'أعمال الحفر والردم والتربة',
    titleEn: 'Excavation, structural backfilling & soil compaction testing',
    contractor: 'شركة أعمال التربة والأساسات العميقة',
    contractorEn: 'Deep Foundations & Earthworks Specialist',
    codeStandard: 'SBC 303',
    isMilestone: false
  },
  {
    id: 6,
    stageNumber: 6,
    phase: 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
    phaseEn: 'Phase 2: Substructure & Structural Framework',
    phaseNumber: 2,
    title: 'الأساسات والقواعد والهيكل الخرساني',
    titleEn: 'Reinforced concrete footings, rafts, columns, shear walls & slabs',
    contractor: 'الشركة المتحدة للمقاولات والخرسانة المسلحة',
    contractorEn: 'United Concrete & Civil Construction Co.',
    codeStandard: 'SBC 304',
    isMilestone: true
  },
  {
    id: 7,
    stageNumber: 7,
    phase: 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
    phaseEn: 'Phase 2: Substructure & Structural Framework',
    phaseNumber: 2,
    title: 'الأعمال المعدنية والإنشائية العلوية',
    titleEn: 'Structural steel trusses, space frames & terminal roof arches',
    contractor: 'مصنع الهياكل الفولاذية والمنشآت المعدنية',
    contractorEn: 'Structural Steel & Long-Span Canopy Works',
    codeStandard: 'SBC 306 / AISC',
    isMilestone: true
  },
  {
    id: 8,
    stageNumber: 8,
    phase: 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
    phaseEn: 'Phase 2: Substructure & Structural Framework',
    phaseNumber: 2,
    title: 'الأسقف والغطاءات والوصلات الإنشائية',
    titleEn: 'Roof decking, skylights & seismic expansion joints',
    contractor: 'شركة تغطية الأسقف والوصلات المعمارية',
    contractorEn: 'Roof Decking & Structural Expansion Solutions',
    codeStandard: 'SBC 305',
    isMilestone: false
  },
  {
    id: 9,
    stageNumber: 9,
    phase: 'المرحلة الثانية — الأعمال الإنشائية والأساسات',
    phaseEn: 'Phase 2: Substructure & Structural Framework',
    phaseNumber: 2,
    title: 'الفحوصات والاختبارات الإنشائية واعتمادها',
    titleEn: 'Concrete core crushing tests, ultrasonic weld QA/QC & structural certification',
    contractor: 'مختبر ضبط الجودة والاختبارات الإنشائية',
    contractorEn: 'Structural Testing & Materials Certification Lab',
    codeStandard: 'SASO / SBC QA-QC',
    isMilestone: true
  },

  // 🔹 المرحلة الثالثة — التمديدات والأنظمة الفنية (5 بنود)
  {
    id: 10,
    stageNumber: 10,
    phase: 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
    phaseEn: 'Phase 3: MEP & Technical Systems Infrastructure',
    phaseNumber: 3,
    title: 'تمديدات وتأسيس الأعمال الكهربائية والمحولات',
    titleEn: 'MV/LV power distribution, substations, transformers & conduit networks',
    contractor: 'الشركة الوطنية للطاقة والتجهيزات الكهربائية',
    contractorEn: 'National Electrical Power & Substations Co.',
    codeStandard: 'SBC 401 / IEC',
    isMilestone: true
  },
  {
    id: 11,
    stageNumber: 11,
    phase: 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
    phaseEn: 'Phase 3: MEP & Technical Systems Infrastructure',
    phaseNumber: 3,
    title: 'تمديدات وتأسيس الأعمال الميكانيكية والتهوية',
    titleEn: 'Central chilled water piping, HVAC ductwork & air handling units (AHU)',
    contractor: 'شركة تبريد وتكييف مباني المطارات',
    contractorEn: 'Airport HVAC & Mechanical Climate Systems',
    codeStandard: 'SBC 501 / ASHRAE',
    isMilestone: true
  },
  {
    id: 12,
    stageNumber: 12,
    phase: 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
    phaseEn: 'Phase 3: MEP & Technical Systems Infrastructure',
    phaseNumber: 3,
    title: 'تمديدات الصرف الصحي والمياه والحريق',
    titleEn: 'Potable water networks, drainage, fire hydrants & sprinkler piping',
    contractor: 'شركة أنظمة السلامة وشبكات الإطفاء',
    contractorEn: 'Hydraulic Networks & Fire Protection Systems',
    codeStandard: 'SBC 701 / 801 / NFPA',
    isMilestone: true
  },
  {
    id: 13,
    stageNumber: 13,
    phase: 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
    phaseEn: 'Phase 3: MEP & Technical Systems Infrastructure',
    phaseNumber: 3,
    title: 'تأسيس أنظمة الاتصالات والشبكات والأمن',
    titleEn: 'Fiber optics backbone, ELV cabling, CCTV, Access Control & GACA IT network',
    contractor: 'حلول الاتصالات والأنظمة الأمنية الذكية',
    contractorEn: 'Integrated Security, ELV & Telecom Solutions',
    codeStandard: 'GACA-IT-SEC / TIA-942',
    isMilestone: false
  },
  {
    id: 14,
    stageNumber: 14,
    phase: 'المرحلة الثالثة — التمديدات والأنظمة الفنية',
    phaseEn: 'Phase 3: MEP & Technical Systems Infrastructure',
    phaseNumber: 3,
    title: 'أنظمة الإضاءة والمطارات واللوحات الإرشادية',
    titleEn: 'Airfield Ground Lighting (AGL), apron floodlights, dynamic wayfinding & signage',
    contractor: 'شركة نظم إضاءة وإرشاد المطارات',
    contractorEn: 'Airfield Lighting & Dynamic Wayfinding Systems',
    codeStandard: 'GACA Annex 14 / ICAO',
    isMilestone: false
  },

  // 🔹 المرحلة الرابعة — التشطيبات والخدمات (5 بنود)
  {
    id: 15,
    stageNumber: 15,
    phase: 'المرحلة الرابعة — التشطيبات والخدمات',
    phaseEn: 'Phase 4: Architectural Finishes & Landside Services',
    phaseNumber: 4,
    title: 'أعمال البلاط والتركيبات الداخلية والخارجية',
    titleEn: 'High-traffic granite, terrazzo concourse flooring & ceramic wall cladding',
    contractor: 'شركة الرخام والجرانيت التخصصية',
    contractorEn: 'Granite, Terrazzo & Premium Stone Works',
    codeStandard: 'SBC 201',
    isMilestone: false
  },
  {
    id: 16,
    stageNumber: 16,
    phase: 'المرحلة الرابعة — التشطيبات والخدمات',
    phaseEn: 'Phase 4: Architectural Finishes & Landside Services',
    phaseNumber: 4,
    title: 'أعمال العزل والواجهات والأسطح',
    titleEn: 'Waterproofing membranes, thermal insulation & curtain wall glazing',
    contractor: 'شركة العوازل الحرارية والمائية المتقدمة',
    contractorEn: 'Advanced Waterproofing & Facade Insulation Co.',
    codeStandard: 'SBC 601',
    isMilestone: true
  },
  {
    id: 17,
    stageNumber: 17,
    phase: 'المرحلة الرابعة — التشطيبات والخدمات',
    phaseEn: 'Phase 4: Architectural Finishes & Landside Services',
    phaseNumber: 4,
    title: 'تركيب الأبواب والنوافذ والأنظمة الزجاجية',
    titleEn: 'Fire-rated security doors, automatic sliding concourse gates & acoustic glass',
    contractor: 'مصنع الواجهات الزجاجية والأبواب الأوتوماتيكية',
    contractorEn: 'Aviation Glazing & Automated Door Systems',
    codeStandard: 'SBC 801 / GACA-SEC',
    isMilestone: false
  },
  {
    id: 18,
    stageNumber: 18,
    phase: 'المرحلة الرابعة — التشطيبات والخدمات',
    phaseEn: 'Phase 4: Architectural Finishes & Landside Services',
    phaseNumber: 4,
    title: 'التشطيبات المعمارية والديكورات الداخلية',
    titleEn: 'Acoustic ceiling baffles, wall paneling, passenger counters & interior styling',
    contractor: 'مؤسسة التصميم الداخلي والتشطيبات المعمارية',
    contractorEn: 'Terminal Interior Architecture & Woodwork',
    codeStandard: 'SBC 201',
    isMilestone: false
  },
  {
    id: 19,
    stageNumber: 19,
    phase: 'المرحلة الرابعة — التشطيبات والخدمات',
    phaseEn: 'Phase 4: Architectural Finishes & Landside Services',
    phaseNumber: 4,
    title: 'أعمال الطرق والممرات والساحات والمواقف',
    titleEn: 'Taxiways, service roads, passenger pick-up loops & multi-level car parks',
    contractor: 'شركة تعبيد الطرق والساحات الخارجية',
    contractorEn: 'Pavement, Landside Roadways & Parking Facilities',
    codeStandard: 'GACA-AP-02 / AASHTO',
    isMilestone: true
  },

  // 🔹 المرحلة الخامسة — التركيب والتشغيل والاختبار (5 بنود)
  {
    id: 20,
    stageNumber: 20,
    phase: 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
    phaseEn: 'Phase 5: Specialized Equipment, Testing & ORAT',
    phaseNumber: 5,
    title: 'تركيب المعدات والأجهزة والأنظمة المتخصصة',
    titleEn: 'Baggage Handling System (BHS), Boarding Bridges, EDS scanners & NavAids',
    contractor: 'شركة التجهيزات والأنظمة الملاحية للمطارات',
    contractorEn: 'Airport Specialized Systems & BHS Engineering',
    codeStandard: 'ICAO / GACA-AVSEC',
    isMilestone: true
  },
  {
    id: 21,
    stageNumber: 21,
    phase: 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
    phaseEn: 'Phase 5: Specialized Equipment, Testing & ORAT',
    phaseNumber: 5,
    title: 'اختبار كل نظام على حدة والتأكد من مطابقته',
    titleEn: 'Individual subsystem SAT testing, emergency power backup & functional compliance',
    contractor: 'مكتب الاختبارات والمطابقة الفنية',
    contractorEn: 'Independent Systems QA/QC Testing Agency',
    codeStandard: 'SBC / SASO / NFPA',
    isMilestone: true
  },
  {
    id: 22,
    stageNumber: 22,
    phase: 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
    phaseEn: 'Phase 5: Specialized Equipment, Testing & ORAT',
    phaseNumber: 5,
    title: 'التشغيل التجريبي والتكامل بين الأنظمة',
    titleEn: 'Operational Readiness & Airport Transfer (ORAT) trials & simulated passenger flows',
    contractor: 'فريق الجاهزية التشغيلية وإدارة المطارات',
    contractorEn: 'PMIA Operational Readiness & ORAT Taskforce',
    codeStandard: 'GACA ORAT Guidelines',
    isMilestone: true
  },
  {
    id: 23,
    stageNumber: 23,
    phase: 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
    phaseEn: 'Phase 5: Specialized Equipment, Testing & ORAT',
    phaseNumber: 5,
    title: 'معالجة الملاحظات وضمان الجودة',
    titleEn: 'Snag list rectification, punch list closeout & final QA/QC audit',
    contractor: 'إدارة ضبط وتوكيد الجودة (QA/QC)',
    contractorEn: 'Project Quality Assurance & Snag Closeout Team',
    codeStandard: 'ISO 9001 / SBC',
    isMilestone: false
  },
  {
    id: 24,
    stageNumber: 24,
    phase: 'المرحلة الخامسة — التركيب والتشغيل والاختبار',
    phaseEn: 'Phase 5: Specialized Equipment, Testing & ORAT',
    phaseNumber: 5,
    title: 'الاعتماد الفني من الجهات المختصة',
    titleEn: 'Official technical compliance approvals from GACA, SASO & Civil Defense',
    contractor: 'لجان الاعتماد الفني والتراخيص الحكومية',
    contractorEn: 'Governmental & Aviation Regulatory Authorities',
    codeStandard: 'GACA Part 139 / Civil Defense',
    isMilestone: true
  },

  // 🔹 المرحلة السادسة — التسليم والاستلام (4 بنود)
  {
    id: 25,
    stageNumber: 25,
    phase: 'المرحلة السادسة — التسليم والاستلام',
    phaseEn: 'Phase 6: Final Handover & Commercial Operations',
    phaseNumber: 6,
    title: 'المراجعة النهائية لجميع الأعمال',
    titleEn: 'Comprehensive final project audit, safety verification & regulatory signoff',
    contractor: 'لجنة الإشراف الهندسي والاستشاري العام',
    contractorEn: 'General Engineering Supervision & Auditing Board',
    codeStandard: 'SBC / GACA Inspection Code',
    isMilestone: true
  },
  {
    id: 26,
    stageNumber: 26,
    phase: 'المرحلة السادسة — التسليم والاستلام',
    phaseEn: 'Phase 6: Final Handover & Commercial Operations',
    phaseNumber: 6,
    title: 'توفير كتيبات التشغيل والضمان والوثائق',
    titleEn: 'As-Built BIM models, O&M manuals, warranty certificates & spare parts logs',
    contractor: 'المقاول العام وإدارة الوثائق الفنية',
    contractorEn: 'Technical Documentation & As-Built Archive Dept.',
    codeStandard: 'GACA Document Handover Standard',
    isMilestone: false
  },
  {
    id: 27,
    stageNumber: 27,
    phase: 'المرحلة السادسة — التسليم والاستلام',
    phaseEn: 'Phase 6: Final Handover & Commercial Operations',
    phaseNumber: 6,
    title: 'استلام الأعمال وفق محاضر الكود السعودي',
    titleEn: 'Official completion protocol signoff in compliance with Saudi Building Code & GACA',
    contractor: 'لجنة الاستلام والتسليم المعتمدة',
    contractorEn: 'Saudi Building Code & Handover Protocol Committee',
    codeStandard: 'SBC 100-800 Series / GACA Signoff',
    isMilestone: true
  },
  {
    id: 28,
    stageNumber: 28,
    phase: 'المرحلة السادسة — التسليم والاستلام',
    phaseEn: 'Phase 6: Final Handover & Commercial Operations',
    phaseNumber: 6,
    title: 'التسليم النهائي وبدء الخدمة',
    titleEn: 'Final airport commissioning, operational handover & commercial flight commencement',
    contractor: 'شركة مطارات القابضة وإدارة مطار الأمير محمد بن عبدالعزيز',
    contractorEn: 'Matarat Holding & PMIA Airport Operations Authority',
    codeStandard: 'GACA Commercial Airport Operating Certificate',
    isMilestone: true
  }
];

// Backwards compatibility alias
export const STAGES_MASTER_34 = STAGES_MASTER_PROJECT;

function generateProjectTasks(defaultProgressArr?: number[]): TaskItem[] {
  return STAGES_MASTER_PROJECT.map((stg, idx) => {
    const prog = defaultProgressArr && defaultProgressArr[idx] !== undefined ? defaultProgressArr[idx] : 0;
    return {
      id: stg.id,
      stageNumber: stg.stageNumber,
      phase: stg.phase,
      phaseEn: stg.phaseEn,
      phaseNumber: stg.phaseNumber,
      title: stg.title,
      titleEn: stg.titleEn,
      progress: prog,
      contractor: stg.contractor,
      contractorEn: stg.contractorEn,
      codeStandard: stg.codeStandard,
      lastUpdated: '2026-08-17',
      notes: prog === 100 
        ? 'تم الفحص الهندسي والمطابقة الميدانية وفق الكود السعودي ومعايير GACA بنجاح' 
        : prog > 0 
        ? 'العمل جاري بالتوازي وفق الخطة الزمنية المعتمدة' 
        : 'متاح للتنفيذ والمطابقة والتحديث الميداني الفوري',
      isApproved: prog === 100
    };
  });
}

function calculateAverageProgress(tasks: TaskItem[]): number {
  if (!tasks || tasks.length === 0) return 0;
  const sum = tasks.reduce((acc, t) => acc + (t.progress || 0), 0);
  return Math.round(sum / tasks.length);
}

// 19 Locations in Prince Mohammad Bin Abdulaziz International Airport (PMIA)
export const initialRoomsData: RoomLocation[] = [
  // 🏢 مبنى المغادرة — طابق ١ (10 مواقع نموذجية)
  {
    id: 'M-1-01',
    barcode: 'M-1-01',
    nameAr: 'صالة المغادرة الرئيسية',
    nameEn: 'Main Departure Concourse',
    zone: 'مبنى المغادرة',
    floor: 'طابق ١',
    areaM2: 850,
    category: 'صالات وركاب',
    blueprint: { x: 45, y: 55, width: 75, height: 68 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ١ — صالة المغادرة الرئيسية (GACA Gate 1-10)',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-1-02',
    barcode: 'M-1-02',
    nameAr: 'منطقة إنهاء إجراءات السفر والوزن',
    nameEn: 'Check-in Desks & Baggage Drop',
    zone: 'مبنى المغادرة',
    floor: 'طابق ١',
    areaM2: 620,
    category: 'صالات وركاب',
    blueprint: { x: 128, y: 55, width: 75, height: 68 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ١ — منطقة كاونترات الوزن وسيور الحقائب المركزية',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-1-03',
    barcode: 'M-1-03',
    nameAr: 'منطقة الجوازات والتدقيق الأمني',
    nameEn: 'Passport Control & Security Screening',
    zone: 'مبنى المغادرة',
    floor: 'طابق ١',
    areaM2: 480,
    category: 'صالات وركاب',
    blueprint: { x: 211, y: 55, width: 75, height: 68 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ١ — بوابات الجوازات الذكية وأجهزة التفتيش الأمنية X-Ray',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-1-04',
    barcode: 'M-1-04',
    nameAr: 'السوق الحرة وصالة المطاعم',
    nameEn: 'Duty Free Plaza & Food Court',
    zone: 'مبنى المغادرة',
    floor: 'طابق ١',
    areaM2: 750,
    category: 'خدمات ومرافق',
    blueprint: { x: 294, y: 55, width: 75, height: 68 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ١ — المنطقة التجارية وصالات المطاعم والضيافة',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-1-05',
    barcode: 'M-1-05',
    nameAr: 'بوابات المغادرة وجسور الصعود',
    nameEn: 'Boarding Gates & Passenger Bridges',
    zone: 'مبنى المغادرة',
    floor: 'طابق ١',
    areaM2: 920,
    category: 'صالات وركاب',
    blueprint: { x: 45, y: 132, width: 75, height: 68 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ١ — بوابات الصعود وجسور الربط بالطائرات (PBB)',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-1-06',
    barcode: 'M-1-06',
    nameAr: 'صالة الفرسان وكبار الشخصيات',
    nameEn: 'Alfursan & VIP Executive Lounge',
    zone: 'مبنى المغادرة',
    floor: 'طابق ١',
    areaM2: 380,
    category: 'صالات وركاب',
    blueprint: { x: 128, y: 132, width: 75, height: 68 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ١ — صالة ضيوف الدرجة الأولى ورجال الأعمال',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-1-07',
    barcode: 'M-1-07',
    nameAr: 'مركز العمليات ومكاتب الطيران',
    nameEn: 'Airport Operations & Airline Offices',
    zone: 'مبنى المغادرة',
    floor: 'طابق ١',
    areaM2: 310,
    category: 'مكاتب وتشغيل',
    blueprint: { x: 211, y: 132, width: 75, height: 68 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ١ — مكاتب شركات الطيران الوطنية والدولية',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-1-08',
    barcode: 'M-1-08',
    nameAr: 'غرفة التحكم الأمني والمراقبة',
    nameEn: 'Security Control & CCTV Center',
    zone: 'مبنى المغادرة',
    floor: 'طابق ١',
    areaM2: 240,
    category: 'مكاتب وتشغيل',
    blueprint: { x: 294, y: 132, width: 75, height: 68 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ١ — المركز الموحد للمراقبة الأمنية وكاميرات المطار',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-1-09',
    barcode: 'M-1-09',
    nameAr: 'مجمع الخدمات والمصليات',
    nameEn: 'Restrooms & Prayer Facilities',
    zone: 'مبنى المغادرة',
    floor: 'طابق ١',
    areaM2: 290,
    category: 'خدمات ومرافق',
    blueprint: { x: 377, y: 55, width: 88, height: 68 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ١ — مصلى الرجال والنساء ومجمع دورات المياه الفاخرة',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-1-10',
    barcode: 'M-1-10',
    nameAr: 'السلالم الكهربائية والمصاعد',
    nameEn: 'Vertical Circulation & Escalators',
    zone: 'مبنى المغادرة',
    floor: 'طابق ١',
    areaM2: 180,
    category: 'خدمات ومرافق',
    blueprint: { x: 377, y: 132, width: 88, height: 68 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ١ — منظومة المصاعد البانورامية وسلالم الطوارئ',
    lastInspectionDate: '2026-08-17'
  },

  // 🏢 مبنى المغادرة — طابق ٢ (6 مواقع استراتيجية)
  {
    id: 'M-2-01',
    barcode: 'M-2-01',
    nameAr: 'صالة الحجاج والمعتمرين الموسمية',
    nameEn: 'Hajj & Umrah Seasonal Terminal',
    zone: 'مبنى المغادرة',
    floor: 'طابق ٢',
    areaM2: 1450,
    category: 'صالات وركاب',
    blueprint: { x: 45, y: 242, width: 132, height: 82 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ٢ — صالة استقبال وتفويج ضيوف الرحمن المجهزة',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-2-02',
    barcode: 'M-2-02',
    nameAr: 'برج المراقبة الجوية والعمليات',
    nameEn: 'Air Traffic Control Tower & Radar',
    zone: 'مبنى المغادرة',
    floor: 'طابق ٢',
    areaM2: 680,
    category: 'مكاتب وتشغيل',
    blueprint: { x: 185, y: 242, width: 135, height: 82 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ٢ — منظومة الملاحة الجوية والرادار وكابينة المراقبة (ATC Cab)',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-2-03',
    barcode: 'M-2-03',
    nameAr: 'ساحة ومواقف الطائرات والمدرج',
    nameEn: 'Apron, Aircraft Stands & Runway Area',
    zone: 'مبنى المغادرة',
    floor: 'طابق ٢',
    areaM2: 2400,
    category: 'صالات وركاب',
    blueprint: { x: 328, y: 242, width: 137, height: 82 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ٢ — ساحة وقوف الطائرات ونقاط التزود بالوقود ومدرج 17/35',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-2-04',
    barcode: 'M-2-04',
    nameAr: 'قرية الشحن الجوي واللوجستيات',
    nameEn: 'Air Cargo Village & Logistics Hub',
    zone: 'مبنى المغادرة',
    floor: 'طابق ٢',
    areaM2: 950,
    category: 'مكاتب وتشغيل',
    blueprint: { x: 45, y: 334, width: 132, height: 76 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ٢ — مستودعات التبريد ومناولة الطرود والشحن السريع',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-2-05',
    barcode: 'M-2-05',
    nameAr: 'هانجر صيانة الطائرات',
    nameEn: 'Aircraft Maintenance Hangar',
    zone: 'مبنى المغادرة',
    floor: 'طابق ٢',
    areaM2: 1200,
    category: 'مكاتب وتشغيل',
    blueprint: { x: 185, y: 334, width: 135, height: 76 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ٢ — هانجر الفحص الدوري والصيانة الخفيفة للطائرات',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'M-2-06',
    barcode: 'M-2-06',
    nameAr: 'محطة الإطفاء والإنقاذ الرئيسية',
    nameEn: 'ARFF - Airport Rescue & Fire Station',
    zone: 'مبنى المغادرة',
    floor: 'طابق ٢',
    areaM2: 820,
    category: 'خدمات ومرافق',
    blueprint: { x: 328, y: 334, width: 137, height: 76 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى المغادرة — طابق ٢ — وحدة الاستجابة السريعة لمكافحة الحرائق وحوادث الطيران',
    lastInspectionDate: '2026-08-17'
  },

  // 🏢 مبنى الوصول — طابق ٢ (3 مواقع رئيسية)
  {
    id: 'A-2-01',
    barcode: 'A-2-01',
    nameAr: 'صالة القدوم الدولية والجمارك',
    nameEn: 'International Arrival Hall & Customs',
    zone: 'مبنى الوصول',
    floor: 'طابق ٢',
    areaM2: 960,
    category: 'صالات وركاب',
    blueprint: { x: 505, y: 55, width: 350, height: 110 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى الوصول — طابق ٢ — صالة استقبال الرحلات الدولية ومنطقة الجمارك والتفتيش',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'A-2-02',
    barcode: 'A-2-02',
    nameAr: 'منطقة استلام الأمتعة والسيور',
    nameEn: 'Baggage Claim Carousels',
    zone: 'مبنى الوصول',
    floor: 'طابق ٢',
    areaM2: 880,
    category: 'صالات وركاب',
    blueprint: { x: 505, y: 175, width: 350, height: 110 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى الوصول — طابق ٢ — سيور توزيع واستلام الأمتعة الحديثة عالية السرعة',
    lastInspectionDate: '2026-08-17'
  },
  {
    id: 'A-2-03',
    barcode: 'A-2-03',
    nameAr: 'الصالة الملكية والاستقبال الرسمي',
    nameEn: 'Royal & Protocol Reception Lounge',
    zone: 'مبنى الوصول',
    floor: 'طابق ٢',
    areaM2: 720,
    category: 'صالات وركاب',
    blueprint: { x: 505, y: 295, width: 350, height: 115 },
    tasks: generateProjectTasks(),
    overallProgress: 0,
    isOfficiallyApproved: false,
    notes: 'مبنى الوصول — طابق ٢ — الصالة الملكية وصالة استقبال الوفود الرسمية والدبلوماسية',
    lastInspectionDate: '2026-08-17'
  }
];

const LOCAL_STORAGE_KEY = 'pmia_airport_tracking_data_v4';

export function getInitialRoomsData(): RoomLocation[] {
  const saved = safeStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure all loaded rooms match the standard tasks format
        return parsed.map((r: RoomLocation) => {
          // If previous data had fewer/more tasks, merge cleanly with STAGES_MASTER_PROJECT
          const mappedTasks = STAGES_MASTER_PROJECT.map(template => {
            const existing = r.tasks?.find((t: TaskItem) => t.stageNumber === template.stageNumber || t.id === template.id);
            if (existing) {
              return {
                ...existing,
                phase: template.phase,
                phaseEn: template.phaseEn,
                phaseNumber: template.phaseNumber,
                title: template.title,
                titleEn: template.titleEn,
                contractor: template.contractor,
                contractorEn: template.contractorEn,
                codeStandard: template.codeStandard
              };
            }
            return {
              id: template.id,
              stageNumber: template.stageNumber,
              phase: template.phase,
              phaseEn: template.phaseEn,
              phaseNumber: template.phaseNumber,
              title: template.title,
              titleEn: template.titleEn,
              progress: 0,
              contractor: template.contractor,
              contractorEn: template.contractorEn,
              codeStandard: template.codeStandard,
              lastUpdated: '2026-08-17',
              notes: 'متاح للتنفيذ والمطابقة والتحديث الميداني الفوري',
              isApproved: false
            };
          });

          const currentTemplate = initialRoomsData.find(initR => initR.id === r.id);

          return {
            ...r,
            nameAr: currentTemplate ? currentTemplate.nameAr : r.nameAr,
            nameEn: currentTemplate ? currentTemplate.nameEn : r.nameEn,
            zone: currentTemplate ? currentTemplate.zone : r.zone,
            floor: currentTemplate ? currentTemplate.floor : r.floor,
            areaM2: currentTemplate ? currentTemplate.areaM2 : r.areaM2,
            category: currentTemplate ? currentTemplate.category : r.category,
            blueprint: currentTemplate ? currentTemplate.blueprint : r.blueprint,
            tasks: mappedTasks,
            overallProgress: calculateAverageProgress(mappedTasks)
          };
        });
      }
    } catch (e) {
      console.error('Error parsing stored rooms data', e);
    }
  }
  return initialRoomsData;
}

export function saveRoomsDataLocally(rooms: RoomLocation[]): RoomLocation[] {
  safeStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rooms));
  return rooms;
}

export const getInitialProjectData = getInitialRoomsData;

export function saveProjectData(rooms: RoomLocation[]): RoomLocation[] {
  saveRoomsDataLocally(rooms);
  syncRoomsWithServer(rooms);
  return rooms;
}

export async function fetchRoomsFromServer(): Promise<RoomLocation[] | null> {
  try {
    const res = await fetch('/api/rooms');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (e) {
    // Graceful fallback to local storage
  }
  return null;
}

export async function syncRoomsWithServer(rooms: RoomLocation[]): Promise<void> {
  try {
    await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rooms })
    });
  } catch (e) {
    // Ignore offline/network errors
  }
}

