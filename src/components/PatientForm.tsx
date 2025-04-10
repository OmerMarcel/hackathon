import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type PatientFormProps = {
  patientId?: string | null;
  onSuccess?: () => void;
};

export default function PatientForm({ patientId, onSuccess }: PatientFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    genre: '',
    groupeSanguin: '',
    adresse: '',
    dateNaissance: '',
    status: 'stable' as 'stable' | 'critical' | 'monitoring',
    photo: null,
    occupation: '',
    problem: '',
    specialist: '',
    biography: '',
  });

  useEffect(() => {
    if (patientId) {
      const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
      const patientToEdit = storedPatients.find((patient: any) => patient.id === patientId);
      if (patientToEdit) {
        setFormData(patientToEdit);
      }
    }
  }, [patientId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');

    if (patientId) {
      // Modifier un patient existant
      const updatedPatients = storedPatients.map((patient: any) =>
        patient.id === patientId ? { ...formData, id: patientId } : patient
      );
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
    } else {
      // Ajouter un nouveau patient
      const generateSequentialId = () => {
        if (storedPatients.length === 0) return "1";
        const maxId = Math.max(...storedPatients.map((p: any) => parseInt(p.id)));
        return (maxId + 1).toString();
      };

      const newPatient = { ...formData, id: generateSequentialId() };
      const updatedPatients = [...storedPatients, newPatient];
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation
          </label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex: Enseignant, Ingénieur..."
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Sélectionner</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>

        {/* Groupe sanguin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Groupe sanguin
          </label>
          <select
            name="groupeSanguin"
            value={formData.groupeSanguin}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Sélectionner</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Adresse */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse
          </label>
          <textarea
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
          />
        </div>

        {/* Date de naissance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de naissance *
          </label>
          <input
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="stable">Stable</option>
            <option value="critical">Critique</option>
            <option value="monitoring">À surveiller</option>
          </select>
        </div>

        {/* Problème */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Problème
          </label>
          <input
            type="text"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex: Maladie, Trauma..."
          />
        </div>

        {/* Spécialiste */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Spécialiste
          </label>
          <input
            type="text"
            name="specialist"
            value={formData.specialist}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ex: Dr. John Doe"
          />
        </div>

        {/* Biographie */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Biographie
          </label>
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => onSuccess ? onSuccess() : router.push('/dashboard')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
        >
          {patientId ? 'Modifier' : 'Ajouter'} le patient
        </button>
      </div>
    </form>
  );
} 