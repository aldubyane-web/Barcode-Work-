export type Language = 'ar' | 'en';

export type ExecutionPhase = 
  | 'المرحلة الأولى — الدراسات والتهيئة والمخططات'
  | 'المرحلة الثانية — الأعمال الإنشائية والأساسات'
  | 'المرحلة الثالثة — التمديدات والأنظمة الفنية'
  | 'المرحلة الرابعة — التشطيبات والخدمات'
  | 'المرحلة الخامسة — التركيب والتشغيل والاختبار'
  | 'المرحلة السادسة — التسليم والاستلام'
  | 'مرحلة التأسيس والتمديدات'
  | 'مرحلة التهيئة والبناء'
  | 'مرحلة التشطيبات النهائية'
  | 'مرحلة الاختبار والتسليم';

export type TaskStatus = 
  | 'completed'       // 100%
  | 'in_progress_75'  // 75%
  | 'in_progress_50'  // 50%
  | 'in_progress_25'  // 25%
  | 'not_started';    // 0%

export interface StageTemplate {
  id: number;
  stageNumber: number;
  phase: ExecutionPhase;
  phaseEn?: string;
  phaseNumber: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  titleEn?: string;
  contractor: string;
  contractorEn?: string;
  isMilestone?: boolean;
  codeStandard?: string;
}

export interface TaskItem {
  id: number;
  stageNumber: number;
  phase: ExecutionPhase;
  phaseEn?: string;
  phaseNumber: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  titleEn?: string;
  progress: number; // 0, 25, 50, 75, 100
  contractor: string;
  contractorEn?: string;
  lastUpdated: string;
  notes?: string;
  isApproved?: boolean;
  codeStandard?: string;
}

export interface RoomLocation {
  id: string;
  barcode: string; // e.g. M-1-01, M-2-01, A-2-01 (NEVER CHANGES)
  nameAr: string;
  nameEn: string;
  zone: string; // مبنى المغادرة, مبنى الوصول
  zoneEn?: string;
  floor: string; // طابق ١, طابق ٢
  floorEn?: string;
  areaM2: number;
  category: string;
  categoryEn?: string;
  blueprint: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  tasks: TaskItem[];
  overallProgress: number; // 0 - 100
  isOfficiallyApproved?: boolean;
  approvalDate?: string;
  notes?: string;
  lastInspectionDate: string;
}

export interface ProjectStats {
  totalRooms: number;
  completedRooms: number;
  inProgressRooms: number;
  notStartedRooms: number;
  totalStagesCount: number;
  completedStagesCount: number;
  overallPercentage: number;
}
