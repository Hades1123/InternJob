interface APIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  page?: number;
  pageSize?: number;
  total?: number;
}

interface ICompany {
  _id: string;
  companyId: string;
  address: string;
  allTechStacks: string[];
  companyIcon: string;
  createdAt: Date;
  files: IFile[];
  fullName: string;
  shortName: string;
  stat: IStat;
  updatedAt: Date;
  GeminiSumary: IGeminiSummary;
  checked: boolean;
  liked: boolean;
}

interface IGeminiSummary {
  positions: [
    {
      title: string;
      techStack: string[];
      requirements: string;
      description: string;
    },
  ];
  generalNotes: string;
  updatedAt: Date;
  _id: string;
}

interface IFile {
  path: string;
  name: string;
  fileType: 'docx' | 'pdf' | 'unknown';
  isProcessed: boolean;
  processedAt: Date;
}

interface IStat {
  maxAcceptedStudent: number;
  maxRegister: number;
  adminMaxRegister: number;
  acceptedIntern: boolean;
  studentRegister: number;
  studentAccepted: number;
}
