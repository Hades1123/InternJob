export interface CompanyAPIRes {
  shortName: string;
  fullName: string;
  _id: string;
}

export interface JobAPIRes {
  error: string | null;
  item: {
    maxAcceptedStudent: number;
    maxRegister: number;
    adminMaxRegister: number;
    acceptedIntern: number;
    studentRegister: number;
    studentAccepted: number;
    address: string;
    fullname: string;
    shortname: string;
    internshipFiles: {
      _id: string;
      name: string;
      path: string;
    }[];
  };
}
