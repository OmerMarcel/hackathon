export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

export type Appointment = {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number; // en minutes
  status: AppointmentStatus;
  reason: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type AppointmentFormData = Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>; 