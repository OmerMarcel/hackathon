import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEdit, FaTrash, FaPlus, FaFilter } from 'react-icons/fa';
import { Eye, Edit2 } from 'lucide-react';

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
  email: string;
  phone: string;
};

interface PatientListProps {
  patients: Patient[];
  onViewPatient: (id: string) => void;
  onEditPatient: (id: string) => void;
  onAddPatient: () => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onViewPatient, onEditPatient, onAddPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [filterAge, setFilterAge] = useState<string>('');
  const router = useRouter();

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-green-100 text-green-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'monitoring':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-secondary-100 text-secondary-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-green-800">Patients</h1>
          <p className="text-sm text-secondary-600">Gérez vos patients et leurs informations</p>
        </div>
        <button onClick={onAddPatient} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          + Nouveau patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
          placeholder="Rechercher un patient..."
          className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="stable">Stable</option>
          <option value="critical">Critique</option>
          <option value="monitoring">À surveiller</option>
        </select>

        <select
          className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filterAge}
          onChange={(e) => setFilterAge(e.target.value)}
        >
          <option value="">Tous les âges</option>
          <option value="0-18">0-18 ans</option>
          <option value="19-30">19-30 ans</option>
          <option value="31-50">31-50 ans</option>
          <option value="51+">51+ ans</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-secondary-200">
          <thead className="bg-secondary-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-secondary-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-green-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{patient.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{patient.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{patient.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    patient.status === 'stable' ? 'bg-green-100 text-green-800' :
                    patient.status === 'critical' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {patient.status === 'stable' ? 'Stable' :
                     patient.status === 'critical' ? 'Critique' :
                     'À surveiller'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-green-600 hover:text-green-800 mr-3"
                    onClick={() => onViewPatient(patient.id)}
                    title="Voir"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-secondary-600 hover:text-secondary-800"
                    onClick={() => onEditPatient(patient.id)}
                    title="Modifier"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;