import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  genre: string;
  groupeSanguin: string;
  adresse: string;
  dateNaissance: string;
  status: 'stable' | 'critical' | 'monitoring';
  photo: string | null;
  occupation: string;
  problem: string;
  specialist: string;
  biography: string;
};

const Info = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex gap-2">
    <span className="font-medium">{label} :</span>
    <span className="text-gray-700">{value}</span>
  </div>
);

export default function PatientProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
      const foundPatient = storedPatients.find((p: Patient) => p.id === id);
      if (foundPatient) {
        setPatient(foundPatient);
      }
    }
  }, [id]);

  if (!patient) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg flex">
        {/* Photo */}
        <div className="w-1/3 p-6 flex flex-col items-center border-r">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200">
            {patient.photo ? (
              <Image
                src={patient.photo}
                width={160}
                height={160}
                alt="Photo du patient"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl text-gray-400">👤</span>
              </div>
            )}
          </div>
          <h2 className="mt-4 text-xl font-bold text-center">{patient.name}</h2>
          <p className="text-gray-500">{patient.occupation || 'Non renseigné'}</p>
        </div>

        {/* Infos */}
        <div className="w-2/3 p-6 space-y-4">
          <div className="text-2xl font-semibold text-teal-700">Information sur le patient</div>

          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <Info label="Nom" value={patient.name} />
            <Info label="Date de naissance" value={new Date(patient.dateNaissance).toLocaleDateString('fr-FR')} />
            <Info label="Adresse" value={patient.adresse || 'Non renseignée'} />
            <Info label="Problème" value={patient.problem || 'Non renseigné'} />
            <Info label="Messagerie électronique" value={patient.email} />
            <Info label="Spécialiste" value={patient.specialist || 'Non renseigné'} />
            <Info label="Téléphone" value={patient.phone || 'Non renseigné'} />
            <Info label="Groupe sanguin" value={patient.groupeSanguin || 'Non renseigné'} />
            <Info label="Genre" value={patient.genre || 'Non renseigné'} />
            <Info label="Occupation" value={patient.occupation || 'Non renseigné'} />
            <Info label="Biographie" value={patient.biography || 'Non renseignée'} />
            <Info 
              label="Statut" 
              value={
                <span className={`font-semibold ${
                  patient.status === 'stable' ? 'text-green-600' :
                  patient.status === 'critical' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {patient.status === 'stable' ? 'Stable' :
                   patient.status === 'critical' ? 'Critique' : 'À surveiller'}
                </span>
              } 
            />
          </div>

          <div className="flex justify-end mt-4 gap-4">
            <button
              onClick={() => router.push(`/formulaire-patient?id=${patient.id}`)}
              className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded"
            >
              Éditer
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-50"
            >
              Retour à la liste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 