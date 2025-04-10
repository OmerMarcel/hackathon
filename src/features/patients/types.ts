export type PatientStatus = 'stable' | 'critical' | 'monitoring';

export type Patient = {
  id: string;
  name: string;
  age: number;
  stage: string;
  gfr: number;
  lastConsultation: string;
  nextVisit: string;
  status: PatientStatus;
  imageUrl: string;
  bloodGroup: string;
  allergies: string[];
  currentMedications: string[];
  consultationCount: number;
  emergencyContact: string;
  assignedDoctor: string;
  assignedLabTechnician: string;
  email: string;
  phone: string;
  dateNaissance: string;
};

export type PatientFormData = Omit<Patient, 'id' | 'consultationCount'>; 