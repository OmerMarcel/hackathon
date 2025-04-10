'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PatientForm() {
  const router = useRouter();
  const { id } = router.query; // Récupérer l'ID du patient depuis l'URL
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    motDePasse: '',
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
    if (id) {
      // Charger les données du patient à modifier
      const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
      const patientToEdit = storedPatients.find((patient: any) => patient.id === id);
      if (patientToEdit) {
        setFormData(patientToEdit);
      }
    }
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');

    if (id) {
      // Modifier un patient existant
      const updatedPatients = storedPatients.map((patient: any) =>
        patient.id === id ? { ...formData, id } : patient
      );
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
    } else {
      // Ajouter un nouveau patient
      const generateSequentialId = () => {
        if (storedPatients.length === 0) return "1";
        const maxId = Math.max(...storedPatients.map((p: any) => parseInt(p.id)));
        return (maxId + 1).toString();
      };

      const newPatient = { ...formData, id: generateSequentialId() }; // Générer un ID séquentiel
      const updatedPatients = [...storedPatients, newPatient];
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
    }

    router.push('/dashboard'); // Rediriger vers la liste des patients
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
      {/* Nom */}
      <div>
        <label className="block mb-1 font-medium">Nom *</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Nom"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-medium">Messagerie électronique *</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Mot de passe */}
      <div>
        <label className="block mb-1 font-medium">Mot de passe *</label>
        <input
          name="motDePasse"
          value={formData.motDePasse}
          onChange={handleChange}
          type="password"
          placeholder="********"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Téléphone */}
      <div>
        <label className="block mb-1 font-medium">Téléphone</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          placeholder="Numéro"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Genre */}
      <div>
        <label className="block mb-1 font-medium">Genre</label>
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Choisir</option>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
        </select>
      </div>

      {/* Groupe sanguin */}
      <div>
        <label className="block mb-1 font-medium">Groupe sanguin</label>
        <select
          name="groupeSanguin"
          value={formData.groupeSanguin}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Choisir</option>
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

      {/* Photo */}
      <div className="md:col-span-2">
        <label className="block mb-1 font-medium">Photo</label>
        <input
          name="photo"
          type="file"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Adresse */}
      <div>
        <label className="block mb-1 font-medium">Adresse</label>
        <textarea
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      {/* Date de naissance */}
      <div>
        <label className="block mb-1 font-medium">Date de naissance *</label>
        <input
          name="dateNaissance"
          type="date"
          value={formData.dateNaissance}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Statut */}
      <div>
        <label className="block mb-1 font-medium">Statut *</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="stable">Stable</option>
          <option value="critical">Critique</option>
          <option value="monitoring">À surveiller</option>
        </select>
      </div>

      {/* Occupation */}
      <div>
        <label className="block mb-1 font-medium">Occupation</label>
        <input
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          type="text"
          placeholder="Ex: Enseignant, Ingénieur..."
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Problem */}
      <div>
        <label className="block mb-1 font-medium">Problème</label>
        <input
          name="problem"
          value={formData.problem}
          onChange={handleChange}
          type="text"
          placeholder="Ex: Maladie, Trauma..."
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Specialist */}
      <div>
        <label className="block mb-1 font-medium">Spécialiste</label>
        <input
          name="specialist"
          value={formData.specialist}
          onChange={handleChange}
          type="text"
          placeholder="Ex: Dr. John Doe"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Biography */}
      <div>
        <label className="block mb-1 font-medium">Biographie</label>
        <textarea
          name="biography"
          value={formData.biography}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>

      {/* Boutons */}
      <div className="md:col-span-2 flex gap-4 mt-4">
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
          Envoyer
        </button>
        <button
          type="button"
          className="border border-gray-400 px-6 py-2 rounded"
          onClick={() => router.push('/dashboard')} // Annuler et revenir à la liste
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
