import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaFilter } from 'react-icons/fa';
import PatientCaseForm from './PatientCaseForm';
import { Dialog } from '@headlessui/react';
import { CalendarDays } from 'lucide-react';

type PatientCaseStudy = {
  id: string;
  name: string;
  email: string;
  phone: string;
  foodAllergies: string[];
  heartDisease: boolean;
  diabetic: boolean;
  hypertension: string;
  accident: string;
  surgery: string;
  familyHistory: string;
  other: string;
  pregnancy: string;
  currentMedications: string;
  healthInsurance: string;
  breastfeeding: string;
};

export default function PatientCaseStudies() {
  const [filter, setFilter] = useState<string>('');
  const [caseStudies, setCaseStudies] = useState<PatientCaseStudy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCase, setSelectedCase] = useState<PatientCaseStudy | null>(null);

  useEffect(() => {
    const storedCaseStudies = JSON.parse(localStorage.getItem('patientCaseStudies') || '[]');
    setCaseStudies(storedCaseStudies);
  }, []);

  const filteredCaseStudies = caseStudies.filter((study) => {
    const name = study.name?.toLowerCase() || '';
    const email = study.email?.toLowerCase() || '';
    const phone = study.phone || '';
    const filterLower = filter.toLowerCase();

    return (
      name.includes(filterLower) ||
      email.includes(filterLower) ||
      phone.includes(filterLower)
    );
  });

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cette étude de cas ?');
    if (confirmDelete) {
      const updatedCaseStudies = caseStudies.filter((study) => study.id !== id);
      setCaseStudies(updatedCaseStudies);
      localStorage.setItem('patientCaseStudies', JSON.stringify(updatedCaseStudies));
    }
  };

  const handleEdit = (study: PatientCaseStudy) => {
    setSelectedCase(study);
    setShowForm(true);
  };

  const handleFormSubmit = (data: any) => {
    if (selectedCase) {
      // Modification
      const updatedCaseStudies = caseStudies.map(study => 
        study.id === selectedCase.id ? { ...study, ...data } : study
      );
      setCaseStudies(updatedCaseStudies);
      localStorage.setItem('patientCaseStudies', JSON.stringify(updatedCaseStudies));
    } else {
      // Ajout
      const newCase = {
        id: Date.now().toString(),
        ...data
      };
      const updatedCaseStudies = [...caseStudies, newCase];
      setCaseStudies(updatedCaseStudies);
      localStorage.setItem('patientCaseStudies', JSON.stringify(updatedCaseStudies));
    }
    setShowForm(false);
    setSelectedCase(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedCase(null);
  };

  const exportToCSV = () => {
    const csvRows = [
      ['Nom', 'Messagerie électronique', 'Téléphone', 'Allergie alimentaire', 'Maladie cardiaque', 'Diabétique'],
      ...filteredCaseStudies.map((study) => [
        study.name,
        study.email,
        study.phone,
        study.foodAllergies.join('; '),
        study.heartDisease ? 'Oui' : 'Non',
        study.diabetic ? 'Oui' : 'Non',
      ]),
    ];

    const csvContent = csvRows
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'etudes_de_cas_patients.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (showForm) {
    return (
      <PatientCaseForm 
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        initialData={selectedCase}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-green-800">Études de cas</h1>
          <p className="text-sm text-secondary-600">Consultez et gérez les études de cas des patients</p>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          + Nouvelle étude de cas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Rechercher une étude de cas..."
          className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        
        <select
          className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Tous les types</option>
          {/* Add unique types dynamically */}
        </select>

        <select
          className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Tous les patients</option>
          {/* Add unique patients dynamically */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredCaseStudies.map((caseStudy, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 shadow-md space-y-2">
            <h3 className="text-lg font-semibold text-green-800">{caseStudy.name}</h3>
            <p className="text-sm text-secondary-500">📅 {/* Add date dynamically */}</p>
            <p><strong>Patient :</strong> {caseStudy.name}</p>
            <div>
              <p className="font-semibold">Résultats :</p>
              <div className="text-sm text-secondary-700 whitespace-pre-line">{/* Add results dynamically */}</div>
            </div>
            <div>
              <p className="font-semibold">Commentaire :</p>
              <p className="text-sm text-secondary-700">{/* Add comment dynamically */}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewCaseStudyModal({ isOpen, setIsOpen, onAddCaseStudy }: { 
  isOpen: boolean; 
  setIsOpen: (v: boolean) => void;
  onAddCaseStudy: (caseStudy: any) => void;
}) {
  const [patient, setPatient] = useState('')
  const [caseType, setCaseType] = useState('')
  const [date, setDate] = useState('')
  const [results, setResults] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (!patient || !caseType || !date || !results) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    const newCaseStudy = {
      type: caseType,
      date: new Date(date).toLocaleDateString('fr-FR', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      patient,
      results,
      comment
    }

    onAddCaseStudy(newCaseStudy)
    
    // Reset form
    setPatient('')
    setCaseType('')
    setDate('')
    setResults('')
    setComment('')
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold text-green-800 mb-4">Nouvelle étude de cas</Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700">Patient</label>
              <select
                className="w-full mt-1 rounded-md border border-secondary-200 p-2 focus:ring-green-500 focus:border-green-500"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
              >
                <option value="">Sélectionner un patient</option>
                <option value="1">Martin Robert</option>
                <option value="2">Dubois Marie</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full mt-1 rounded-md border border-secondary-200 p-2 pr-10 focus:ring-green-500 focus:border-green-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <CalendarDays className="absolute right-3 top-3 text-secondary-400" size={18} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700">Type d'étude</label>
                <select
                  className="w-full mt-1 rounded-md border border-secondary-200 p-2 focus:ring-green-500 focus:border-green-500"
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                >
                  <option value="">Sélectionner</option>
                  <option value="suivi">Suivi régulier</option>
                  <option value="urgence">Cas d'urgence</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700">Résultats</label>
              <textarea
                className="w-full mt-1 rounded-md border border-secondary-200 p-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
                value={results}
                onChange={(e) => setResults(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700">Commentaire (optionnel)</label>
              <textarea
                className="w-full mt-1 rounded-md border border-secondary-200 p-2 focus:ring-green-500 focus:border-green-500"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button 
                className="px-4 py-2 text-sm text-secondary-600 rounded-md hover:bg-secondary-50" 
                onClick={() => setIsOpen(false)}
              >
                Annuler
              </button>
              <button 
                className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                onClick={handleSubmit}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 