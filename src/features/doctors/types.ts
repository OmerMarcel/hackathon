export type DoctorSpecialty = 'nephrologist' | 'generalist' | 'cardiologist' | 'endocrinologist';

export type Doctor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: DoctorSpecialty;
  licenseNumber: string;
  imageUrl: string;
  bio: string;
  availability: {
    monday: { start: string; end: string }[];
    tuesday: { start: string; end: string }[];
    wednesday: { start: string; end: string }[];
    thursday: { start: string; end: string }[];
    friday: { start: string; end: string }[];
    saturday: { start: string; end: string }[];
    sunday: { start: string; end: string }[];
  };
  patients: string[]; // IDs des patients
  createdAt: string;
  updatedAt: string;
};

export type DoctorFormData = Omit<Doctor, 'id' | 'createdAt' | 'updatedAt' | 'patients'>; 