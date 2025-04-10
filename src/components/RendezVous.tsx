import React, { useState, useEffect } from "react";
import { Search, Plus, X, Edit2, Calendar, Clock, User, ArrowLeft } from "lucide-react";

interface Doctor {
  id: number;
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

interface Appointment {
  id: number;
  doctorId: number;
  patientId: number;
  date: string;
  time: string;
  status: string;
  notes: string;
}

interface AppointmentFormData {
  doctorId: number;
  patientId: number;
  date: string;
  time: string;
  status: string;
  notes: string;
}

// Fonction pour initialiser la base de données IndexedDB
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('DoctorsDB', 3);
    
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
      
      // Créer l'object store 'appointments' s'il n'existe pas
      if (!db.objectStoreNames.contains('appointments')) {
        const store = db.createObjectStore('appointments', { keyPath: 'id', autoIncrement: true });
        store.createIndex('doctorId', 'doctorId', { unique: false });
        store.createIndex('patientId', 'patientId', { unique: false });
        store.createIndex('date', 'date', { unique: false });
        console.log("Object store 'appointments' créé");
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

// Fonction pour récupérer tous les patients
const getAllPatients = async (): Promise<Patient[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['patients'], 'readonly');
    const store = transaction.objectStore('patients');
    const request = store.getAll();
    
    request.onsuccess = () => {
      console.log("Patients récupérés:", request.result);
      resolve(request.result);
    };
    
    request.onerror = () => {
      console.error("Erreur lors de la récupération des patients");
      reject(request.error);
    };
  });
};

// Fonction pour récupérer tous les rendez-vous
const getAllAppointments = async (): Promise<Appointment[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['appointments'], 'readonly');
    const store = transaction.objectStore('appointments');
    const request = store.getAll();
    
    request.onsuccess = () => {
      console.log("Rendez-vous récupérés:", request.result);
      resolve(request.result);
    };
    
    request.onerror = () => {
      console.error("Erreur lors de la récupération des rendez-vous");
      reject(request.error);
    };
  });
};

// Fonction pour ajouter un rendez-vous
const addAppointment = async (appointment: Omit<Appointment, 'id'>): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['appointments'], 'readwrite');
    const store = transaction.objectStore('appointments');
    const request = store.add(appointment);
    
    request.onsuccess = () => {
      console.log("Rendez-vous ajouté avec l'ID:", request.result);
      resolve(request.result as number);
    };
    
    request.onerror = () => {
      console.error("Erreur lors de l'ajout du rendez-vous");
      reject(request.error);
    };
  });
};

// Fonction pour mettre à jour un rendez-vous
const updateAppointment = async (appointment: Appointment): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['appointments'], 'readwrite');
    const store = transaction.objectStore('appointments');
    const request = store.put(appointment);
    
    request.onsuccess = () => {
      console.log("Rendez-vous mis à jour avec succès");
      resolve();
    };
    
    request.onerror = () => {
      console.error("Erreur lors de la mise à jour du rendez-vous");
      reject(request.error);
    };
  });
};

// Fonction pour supprimer un rendez-vous
const deleteAppointment = async (id: number): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['appointments'], 'readwrite');
    const store = transaction.objectStore('appointments');
    const request = store.delete(id);
    
    request.onsuccess = () => {
      console.log("Rendez-vous supprimé avec succès");
      resolve();
    };
    
    request.onerror = () => {
      console.error("Erreur lors de la suppression du rendez-vous");
      reject(request.error);
    };
  });
};

// Fonction pour réinitialiser les rendez-vous
const clearAppointments = async (): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['appointments'], 'readwrite');
    const store = transaction.objectStore('appointments');
    const request = store.clear();
    
    request.onsuccess = () => {
      console.log("Tous les rendez-vous ont été supprimés");
      resolve();
    };
    
    request.onerror = () => {
      console.error("Erreur lors de la suppression des rendez-vous");
      reject(request.error);
    };
  });
};

const AppointmentsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<AppointmentFormData>({
    doctorId: 0,
    patientId: 0,
    date: new Date().toISOString().split('T')[0],
    time: "09:00",
    status: "Planifié",
    notes: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Charger les données depuis IndexedDB au chargement du composant
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log("Chargement des données depuis IndexedDB");
        
        // Charger les médecins
        const loadedDoctors = await getAllDoctors();
        console.log("Médecins chargés:", loadedDoctors);
        setDoctors(loadedDoctors);
        
        // Charger les patients
        const loadedPatients = await getAllPatients();
        console.log("Patients chargés:", loadedPatients);
        setPatients(loadedPatients);
        
        // Charger les rendez-vous
        const loadedAppointments = await getAllAppointments();
        console.log("Rendez-vous chargés:", loadedAppointments);
        setAppointments(loadedAppointments);
        setFilteredAppointments(loadedAppointments);
        setTotalPages(Math.ceil(loadedAppointments.length / 10));
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = appointments.filter(appointment => {
      const doctor = doctors.find(d => d.id === appointment.doctorId);
      const patient = patients.find(p => p.id === appointment.patientId);
      
      return (
        (doctor?.name.toLowerCase().includes(term) || false) ||
        (patient?.name.toLowerCase().includes(term) || false) ||
        appointment.date.includes(term) ||
        appointment.time.includes(term)
      );
    });
    
    setFilteredAppointments(filtered);
    setTotalPages(Math.ceil(filtered.length / 10));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      notes: appointment.notes
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      try {
        await deleteAppointment(id);
        setAppointments(prev => prev.filter(appointment => appointment.id !== id));
        setFilteredAppointments(prev => prev.filter(appointment => appointment.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression du rendez-vous:", error);
        alert("Une erreur est survenue lors de la suppression du rendez-vous. Veuillez réessayer.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingAppointment) {
        // Mode édition
        console.log("Mode édition - Rendez-vous à modifier:", editingAppointment);
        const updatedAppointment = { ...editingAppointment, ...formData };
        await updateAppointment(updatedAppointment);
        
        const updatedAppointments = appointments.map(appointment => 
          appointment.id === editingAppointment.id ? updatedAppointment : appointment
        );
        
        setAppointments(updatedAppointments);
        setFilteredAppointments(updatedAppointments);
      } else {
        // Mode ajout
        console.log("Mode ajout - Formulaire:", formData);
        const newAppointmentId = await addAppointment(formData);
        const newAppointment: Appointment = {
          id: newAppointmentId,
          ...formData
        };
        
        setAppointments(prev => [...prev, newAppointment]);
        setFilteredAppointments(prev => [...prev, newAppointment]);
      }

      setIsModalOpen(false);
      setEditingAppointment(null);
      setFormData({
        doctorId: 0,
        patientId: 0,
        date: new Date().toISOString().split('T')[0],
        time: "09:00",
        status: "Planifié",
        notes: ""
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du rendez-vous:", error);
      alert("Une erreur est survenue lors de la sauvegarde. Veuillez réessayer.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
    setFormData({
      doctorId: 0,
      patientId: 0,
      date: new Date().toISOString().split('T')[0],
      time: "09:00",
      status: "Planifié",
      notes: ""
    });
  };

  // Fonction pour réinitialiser les données
  const resetData = async () => {
    try {
      console.log("Réinitialisation des rendez-vous");
      await clearAppointments();
      setAppointments([]);
      setFilteredAppointments([]);
      alert("Tous les rendez-vous ont été réinitialisés.");
    } catch (error) {
      console.error("Erreur lors de la réinitialisation:", error);
      alert("Une erreur est survenue lors de la réinitialisation.");
    }
  };

  // Fonction pour obtenir le nom d'un médecin à partir de son ID
  const getDoctorName = (doctorId: number): string => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : "Médecin inconnu";
  };

  // Fonction pour obtenir le nom d'un patient à partir de son ID
  const getPatientName = (patientId: number): string => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : "Patient inconnu";
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-purple-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-right text-gray-600">Tableau De Bord &gt; <span className="text-green-600">Rendez-vous</span></p>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Rendez-vous</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-green-700 text-white text-sm rounded px-4 py-2 flex items-center gap-2 hover:bg-green-800"
            >
              <Plus className="h-4 w-4" />
              Ajouter un rendez-vous
            </button>
            <button 
              onClick={resetData}
              className="bg-red-600 text-white text-sm rounded px-4 py-2 hover:bg-red-700"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un rendez-vous..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Chargement des données...</p>
            </div>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-green-100">
                  <th className="px-4 py-2  text-gray-600">ID</th>
                  <th className="px-4 py-2  text-gray-600">Nom du médecin</th>
                  <th className="px-4 py-2  text-gray-600">Nom du patient</th>
                  <th className="px-4 py-2  text-gray-600">Date du rendez-vous</th>
                  <th className="px-4 py-2  text-gray-600">Heure du rendez-vous</th>
                  <th className="px-4 py-2  text-gray-600">Statut</th>
                  <th className="px-6 py-4  text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Aucun rendez-vous n'a été ajouté. Cliquez sur "Ajouter un rendez-vous" pour commencer.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment, index) => (
                    <tr
                      key={appointment.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 text-gray-900">{appointment.id}</td>
                      <td className="px-6 py-4 text-gray-900">{getDoctorName(appointment.doctorId)}</td>
                      <td className="px-6 py-4 text-gray-900">{getPatientName(appointment.patientId)}</td>
                      <td className="px-6 py-4 text-gray-900">{appointment.date}</td>
                      <td className="px-6 py-4 text-gray-900">{appointment.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === "Planifié" ? "bg-green-100 text-green-800" :
                          appointment.status === "Confirmé" ? "bg-green-100 text-green-800" :
                          appointment.status === "Annulé" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button 
                          onClick={() => handleEdit(appointment)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(appointment.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Affichage de {filteredAppointments.length} rendez-vous
            </p>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-white border hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal pour ajouter/modifier un rendez-vous */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingAppointment ? "Modifier un rendez-vous" : "Ajouter un rendez-vous"}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Médecin
                </label>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Sélectionner un médecin</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient
                </label>
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Sélectionner un patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="Planifié">Planifié</option>
                  <option value="Confirmé">Confirmé</option>
                  <option value="Annulé">Annulé</option>
                  <option value="Terminé">Terminé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                >
                  {editingAppointment ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList; 