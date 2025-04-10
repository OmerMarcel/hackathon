export type CaseStudyStatus = 'active' | 'completed' | 'archived';

export type CaseStudy = {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  title: string;
  description: string;
  diagnosis: string;
  treatment: string;
  outcome: string;
  status: CaseStudyStatus;
  createdAt: string;
  updatedAt: string;
  attachments: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  tags: string[];
};

export type CaseStudyFormData = Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>; 