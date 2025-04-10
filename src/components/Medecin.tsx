import React, { useState, useEffect } from "react";
import { Search, Plus, X, Edit2, User, Mail, Phone, Building, Activity, ArrowLeft, Users, Eye } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  status: string;
}

interface DoctorFormData {
  name: string;
  email: string;
  phone: string;
  department: string;
  status: string;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
  doctorId: number;
}

// Fonction pour initialiser la base de données IndexedDB
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    // Augmenter la version pour forcer la mise à jour du schéma
    const request = indexedDB.open('DoctorsDB', 2);
    
    request.onerror = () => {
      console.error("Erreur lors de l'ouverture de la base de données");
      reject(request.error);
    };
    
    request.onsuccess = () => {
      console.log("Base de données ouverte avec succès");
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      console.log("Mise à jour de la base de données, version:", db.version);
      
      // Créer l'object store 'doctors' s'il n'existe pas
      if (!db.objectStoreNames.contains('doctors')) {
        const store = db.createObjectStore('doctors', { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: false });
        console.log("Object store 'doctors' créé");
      }
      
      // Créer l'object store 'patients' s'il n'existe pas
      if (!db.objectStoreNames.contains('patients')) {
        const store = db.createObjectStore('patients', { keyPath: 'id', autoIncrement: true });
        store.createIndex('doctorId', 'doctorId', { unique: false });
        console.log("Object store 'patients' créé");
      }
    };
  });
};

// Fonction pour récupérer tous les médecins
const getAllDoctors = async (): Promise<Doctor[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['doctors'], 'readonly');
    const store = transaction.objectStore('doctors');
    const request = store.getAll();
    
    request.onsuccess = () => {
      console.log("Médecins récupérés:", request.result);
      resolve(request.result);
    };
    
    request.onerror = () => {
      console.error("Erreur lors de la récupération des médecins");
      reject(request.error);
    };
  });
};

// Fonction pour récupérer les patients d'un médecin
const getPatientsByDoctorId = async (doctorId: number): Promise<Patient[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['patients'], 'readonly');
    const store = transaction.objectStore('patients');
    const index = store.index('doctorId');
    const request = index.getAll(doctorId);
    
    request.onsuccess = () => {
      console.log("Patients récupérés pour le médecin:", doctorId, request.result);
      resolve(request.result);
    };
    
    request.onerror = () => {
      console.error("Erreur lors de la récupération des patients");
      reject(request.error);
    };
  });
};

// Fonction pour ajouter un médecin
const addDoctor = async (doctor: Omit<Doctor, 'id'>): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['doctors'], 'readwrite');
    const store = transaction.objectStore('doctors');
    const request = store.add(doctor);
    
    request.onsuccess = () => {
      console.log("Médecin ajouté avec l'ID:", request.result);
      resolve(request.result as number);
    };
    
    request.onerror = () => {
      console.error("Erreur lors de l'ajout du médecin");
      reject(request.error);
    };
  });
};

// Fonction pour mettre à jour un médecin
const updateDoctor = async (doctor: Doctor): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['doctors'], 'readwrite');
    const store = transaction.objectStore('doctors');
    const request = store.put(doctor);
    
    request.onsuccess = () => {
      console.log("Médecin mis à jour avec succès");
      resolve();
    };
    
    request.onerror = () => {
      console.error("Erreur lors de la mise à jour du médecin");
      reject(request.error);
    };
  });
};

// Fonction pour supprimer tous les médecins (réinitialisation)
const clearDoctors = async (): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['doctors'], 'readwrite');
    const store = transaction.objectStore('doctors');
    const request = store.clear();
    
    request.onsuccess = () => {
      console.log("Tous les médecins ont été supprimés");
      resolve();
    };
    
    request.onerror = () => {
      console.error("Erreur lors de la suppression des médecins");
      reject(request.error);
    };
  });
};

// Fonction pour ajouter un patient
const addPatient = async (patient: Omit<Patient, 'id'>): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['patients'], 'readwrite');
    const store = transaction.objectStore('patients');
    const request = store.add(patient);
    
    request.onsuccess = () => {
      console.log("Patient ajouté avec l'ID:", request.result);
      resolve(request.result as number);
    };
    
    request.onerror = () => {
      console.error("Erreur lors de l'ajout du patient");
      reject(request.error);
    };
  });
};

export default function DoctorsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [doctorPatients, setDoctorPatients] = useState<Patient[]>([]);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [filterSpecialty, setFilterSpecialty] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Homme",
    condition: "",
    lastVisit: new Date().toISOString().split('T')[0]
  });
  const [formData, setFormData] = useState<DoctorFormData>({
    name: "",
    email: "",
    phone: "",
    department: "",
    status: "Actif"
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Charger les données depuis IndexedDB au chargement du composant
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setIsLoading(true);
        console.log("Chargement des médecins depuis IndexedDB");
        const loadedDoctors = await getAllDoctors();
        console.log("Médecins chargés:", loadedDoctors);
        setDoctors(loadedDoctors);
        setFilteredDoctors(loadedDoctors);
        setTotalPages(Math.ceil(loadedDoctors.length / 10));
      } catch (error) {
        console.error("Erreur lors du chargement des médecins:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctors();
  }, []);

  // Charger les patients d'un médecin lorsqu'un médecin est sélectionné
  useEffect(() => {
    const loadPatients = async () => {
      if (selectedDoctor) {
        try {
          setIsLoading(true);
          console.log("Chargement des patients pour le médecin:", selectedDoctor.id);
          const patients = await getPatientsByDoctorId(selectedDoctor.id);
          console.log("Patients chargés:", patients);
          setDoctorPatients(patients);
        } catch (error) {
          console.error("Erreur lors du chargement des patients:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadPatients();
  }, [selectedDoctor]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(term) ||
      doctor.email.toLowerCase().includes(term) ||
      doctor.phone.includes(term)
    );
    
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePatientInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      department: doctor.department,
      status: doctor.status
    });
    setIsModalOpen(true);
  };

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBackToList = () => {
    setSelectedDoctor(null);
    setDoctorPatients([]);
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDoctor) return;
    
    try {
      const patientData = {
        ...newPatient,
        age: parseInt(newPatient.age),
        doctorId: selectedDoctor.id
      };
      
      const newPatientId = await addPatient(patientData);
      const addedPatient: Patient = {
        id: newPatientId,
        ...patientData
      };
      
      setDoctorPatients(prev => [...prev, addedPatient]);
      setIsAddingPatient(false);
      setNewPatient({
        name: "",
        age: "",
        gender: "Homme",
        condition: "",
        lastVisit: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du patient:", error);
      alert("Une erreur est survenue lors de l'ajout du patient. Veuillez réessayer.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingDoctor) {
        // Mode édition
        console.log("Mode édition - Médecin à modifier:", editingDoctor);
        const updatedDoctor = { ...editingDoctor, ...formData };
        await updateDoctor(updatedDoctor);
        
        const updatedDoctors = doctors.map(doctor => 
          doctor.id === editingDoctor.id ? updatedDoctor : doctor
        );
        
        setDoctors(updatedDoctors);
        setFilteredDoctors(updatedDoctors);
      } else {
        // Mode ajout
        console.log("Mode ajout - Formulaire:", formData);
        const newDoctorId = await addDoctor(formData);
        const newDoctor: Doctor = {
          id: newDoctorId,
          ...formData
        };
        
        setDoctors(prev => [...prev, newDoctor]);
        setFilteredDoctors(prev => [...prev, newDoctor]);
      }

      setIsModalOpen(false);
      setEditingDoctor(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        status: "Actif"
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du médecin:", error);
      alert("Une erreur est survenue lors de la sauvegarde. Veuillez réessayer.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      status: "Actif"
    });
  };

  // Fonction pour réinitialiser les données
  const resetData = async () => {
    try {
      console.log("Réinitialisation des données");
      await clearDoctors();
      setDoctors([]);
      setFilteredDoctors([]);
      alert("Toutes les données ont été réinitialisées.");
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      alert("Une erreur est survenue lors de la réinitialisation.");
    }
  };

  // Afficher le profil du médecin si un médecin est sélectionné
  if (selectedDoctor) {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-purple-100 min-h-screen">

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center mb-6">
            <button 
              onClick={handleBackToList}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-semibold">Profil du Dr. {selectedDoctor.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
          <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Nom complet</p>
                    <p className="font-medium">{selectedDoctor.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedDoctor.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium">{selectedDoctor.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Département</p>
                    <p className="font-medium">{selectedDoctor.department}</p>
            </div>
            </div>
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Statut</p>
                    <p className={`font-medium ${selectedDoctor.status === 'Actif' ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedDoctor.status}
                    </p>
            </div>
            </div>
          </div>
        </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Patients</p>
                  <p className="text-2xl font-bold text-green-600">{doctorPatients.length}</p>
            </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Consultations</p>
                  <p className="text-2xl font-bold text-blue-600">{doctorPatients.length * 3}</p>
            </div>
          </div>
        </div>
      </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Liste des patients</h3>
              <button 
                onClick={() => setIsAddingPatient(true)}
                className="bg-green-700 text-white text-sm rounded px-4 py-2 flex items-center gap-2 hover:bg-green-800"
              >
                <Plus className="h-4 w-4" />
                Ajouter un patient
              </button>
        </div>
        
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Chargement des patients...</p>
              </div>
            ) : doctorPatients.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Aucun patient n'a été ajouté pour ce médecin.</p>
                <button 
                  onClick={() => setIsAddingPatient(true)}
                  className="mt-4 text-green-700 hover:text-green-800 font-medium"
                >
                  Ajouter un patient
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-6 py-4 text-base">Nom</th>
                      <th className="px-6 py-4 text-base">Âge</th>
                      <th className="px-6 py-4 text-base">Genre</th>
                      <th className="px-6 py-4 text-base">Condition</th>
                      <th className="px-6 py-4 text-base">Dernière visite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorPatients.map((patient, index) => (
                      <tr
                        key={patient.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                      >
                        <td className="px-6 py-4">{patient.name}</td>
                        <td className="px-6 py-4">{patient.age}</td>
                        <td className="px-6 py-4">{patient.gender}</td>
                        <td className="px-6 py-4">{patient.condition}</td>
                        <td className="px-6 py-4">{patient.lastVisit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          </div>
            )}
          </div>
        </div>

        {/* Modal pour ajouter un patient */}
        {isAddingPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-50 rounded-lg p-6 w-full max-w-md shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Ajouter un patient</h3>
                <button 
                  onClick={() => setIsAddingPatient(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleAddPatient} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newPatient.name}
                    onChange={handlePatientInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Âge
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={newPatient.age}
                    onChange={handlePatientInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                    min="0"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genre
                  </label>
                  <select
                    name="gender"
                    value={newPatient.gender}
                    onChange={handlePatientInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Condition
                  </label>
                  <input
                    type="text"
                    name="condition"
                    value={newPatient.condition}
                    onChange={handlePatientInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dernière visite
                  </label>
                  <input
                    type="date"
                    name="lastVisit"
                    value={newPatient.lastVisit}
                    onChange={handlePatientInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
      </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddingPatient(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                  >
                    Ajouter
            </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-green-800">Médecins</h1>
          <p className="text-sm text-secondary-600">Gérez les médecins et leurs informations</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          + Nouveau médecin
        </button>
      </div>

      {/* Modal pour ajouter/modifier un médecin */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-800">
                {editingDoctor ? "Modifier un médecin" : "Ajouter un médecin"}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-secondary-500 hover:text-secondary-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Département
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Sélectionner un département</option>
                  <option value="Service ambulatoire (OPD)">Service ambulatoire (OPD)</option>
                  <option value="Urgences">Urgences</option>
                  <option value="Pédiatrie">Pédiatrie</option>
                  <option value="Cardiologie">Cardiologie</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Statut
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-secondary-200 rounded-md hover:bg-secondary-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  {editingDoctor ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Rechercher un médecin..."
          className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filterSpecialty}
          onChange={(e) => setFilterSpecialty(e.target.value)}
        >
          <option value="">Toutes les spécialités</option>
          <option value="generaliste">Généraliste</option>
          <option value="cardiologue">Cardiologue</option>
          <option value="dermatologue">Dermatologue</option>
          <option value="pediatre">Pédiatre</option>
        </select>

        <select
          className="w-full rounded-md border border-secondary-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
          <option value="vacation">En congé</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-secondary-200">
          <thead className="bg-secondary-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Spécialité</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
          <tbody className="bg-white divide-y divide-secondary-200">
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-green-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{doctor.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{doctor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{doctor.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{doctor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">{doctor.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    doctor.status === 'active' ? 'bg-green-100 text-green-800' :
                    doctor.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doctor.status === 'active' ? 'Actif' :
                     doctor.status === 'inactive' ? 'Inactif' :
                     'En congé'}
                    </span>
                  </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-green-600 hover:text-green-800 mr-3"
                    onClick={() => handleDoctorClick(doctor)}
                    title="Voir"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-secondary-600 hover:text-secondary-800"
                    onClick={() => handleEdit(doctor)}
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
} 
