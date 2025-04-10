import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

type Patient = {
  id: string;
  name: string;
  age: number;
  stage: string;
  gfr: number;
  lastConsultation: string;
  nextVisit: string;
  status: 'stable' | 'critical' | 'monitoring';
  imageUrl: string;
  bloodGroup: string;
  allergies: string[];
  currentMedications: string[];
  consultationCount: number;
  emergencyContact: string;
  assignedDoctor: string;
  assignedLabTechnician: string;
};

export default function PatientOverview() {
  const router = useRouter();
  const { id } = router.query;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
      const foundPatient = storedPatients.find((p: Patient) => p.id === id);
      setPatient(foundPatient || null);
    }
  }, [id]);

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Patient non trouvé</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{patient.name} - AI4CKD</title>
      </Head>
      
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={patient.imageUrl || 'https://via.placeholder.com/150'} 
                alt={patient.name}
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                <p className="text-gray-600">{patient.age} ans</p>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  patient.status === 'critical' ? 'bg-red-100 text-red-800' :
                  patient.status === 'stable' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {patient.status === 'critical' ? 'Critique' : 
                   patient.status === 'stable' ? 'Stable' : 
                   'À surveiller'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Informations médicales</h2>
                  <div className="space-y-2">
                    <p><span className="font-medium">Stade MRC:</span> {patient.stage}</p>
                    <p><span className="font-medium">DFG:</span> {patient.gfr} mL/min</p>
                    <p><span className="font-medium">Groupe sanguin:</span> {patient.bloodGroup}</p>
                    <p><span className="font-medium">Allergies:</span> {patient.allergies.join(', ')}</p>
                    <p><span className="font-medium">Médicaments actuels:</span> {patient.currentMedications.join(', ')}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Consultations</h2>
                  <div className="space-y-2">
                    <p><span className="font-medium">Dernière consultation:</span> {patient.lastConsultation}</p>
                    <p><span className="font-medium">Prochaine visite:</span> {patient.nextVisit}</p>
                    <p><span className="font-medium">Nombre de consultations:</span> {patient.consultationCount}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Équipe médicale</h2>
                  <div className="space-y-2">
                    <p><span className="font-medium">Médecin assigné:</span> {patient.assignedDoctor}</p>
                    <p><span className="font-medium">Technicien de laboratoire:</span> {patient.assignedLabTechnician}</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact d'urgence</h2>
                  <p>{patient.emergencyContact}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button 
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Retour au tableau de bord
              </button>
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Planifier une consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 