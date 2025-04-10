import { FC } from 'react';
import { FaEdit, FaTrash, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserMd } from 'react-icons/fa';

interface PatientProfileProps {
  patient: {
    id: string;
    name: string;
    age: number;
    stage: string;
    gfr: number;
    lastConsultation: string;
    nextVisit: string;
    status: 'stable' | 'critical' | 'monitoring';
    email: string;
    phone: string;
    address?: string;
    specialist?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const PatientProfile: FC<PatientProfileProps> = ({ patient, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <span className="text-2xl font-medium text-blue-600">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{patient.name}</h2>
            <p className="text-gray-600">{patient.age} ans</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-900"
          >
            <FaEdit className="text-xl" />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-900"
          >
            <FaTrash className="text-xl" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Informations de contact</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <FaEnvelope className="mr-2" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaPhone className="mr-2" />
                <span>{patient.phone}</span>
              </div>
              {patient.address && (
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{patient.address}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Statut du patient</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Stade MRC</span>
                <span className="font-medium text-gray-900">{patient.stage}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">GFR</span>
                <span className="font-medium text-gray-900">{patient.gfr} mL/min/1.73m²</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Statut</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Suivi médical</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Dernière consultation</span>
                <span className="font-medium text-gray-900">{patient.lastConsultation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Prochaine visite</span>
                <span className="font-medium text-gray-900">{patient.nextVisit}</span>
              </div>
              {patient.specialist && (
                <div className="flex items-center text-gray-600">
                  <FaUserMd className="mr-2" />
                  <span>{patient.specialist}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile; 