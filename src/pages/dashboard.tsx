// pages/dashboard.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import PatientList from '../components/PatientList';
import MedicalStats from '../components/MedicalStats';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Notifications from '../components/Notifications';

import PatientForm from '../components/PatientForm';
import { useRouter } from 'next/router';
import AnalyticsCharts from '../components/AnalyticsCharts';
import Medecin from '../components/Medecin';
import AppointmentsList from '../components/RendezVous';
import PatientCaseStudies from '../components/PatientCaseStudies';
import { TabType } from '../types';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend as ChartLegend, ChartData, ChartOptions, TooltipItem } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Users, AlertTriangle, CheckCircle, UserPlus } from 'lucide-react';
import ExamensMedicaux from '../components/ExamensMedicaux';

ChartJS.register(ArcElement, ChartTooltip, ChartLegend);

type PatientStatus = 'stable' | 'critical' | 'monitoring';

type Patient = {
  id: string;
  name: string;
  age: number;
  stage: string;
  gfr: number;
  lastConsultation: string;
  nextVisit: string;
  status: PatientStatus;
  imageUrl: string;
  bloodGroup: string;
  allergies: string[];
  currentMedications: string[];
  consultationCount: number;
  emergencyContact: string;
  assignedDoctor: string;
  assignedLabTechnician: string;
  email: string;
  phone: string;
  dateNaissance: string;
};

type StatsData = {
  totalPatients: number;
  criticalPatients: number;
  stablePatients: number;
  avgGFR: number;
  recentConsultations: number;
  newPatients: number;
};

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  const monthlyData = [
    { name: "Jan", users: 65, fill: "#22c55e" },
    { name: "Feb", users: 75, fill: "#22c55e" },
    { name: "Mar", users: 63, fill: "#22c55e" },
    { name: "Apr", users: 85, fill: "#22c55e" },
    { name: "May", users: 70, fill: "#22c55e" },
    { name: "Jun", users: 78, fill: "#22c55e" },
    { name: "Jul", users: 58, fill: "#22c55e" },
    { name: "Aug", users: 70, fill: "#22c55e" },
    { name: "Sep", users: 42, fill: "#22c55e" },
    { name: "Oct", users: 5, fill: "#22c55e" },
    { name: "Nov", users: 4, fill: "#22c55e" },
    { name: "Dec", users: 6, fill: "#22c55e" },
  ];

  // Effet pour marquer le composant comme monté (côté client uniquement)
  useEffect(() => {
    setIsMounted(true);
    // Récupérer les informations de l'utilisateur depuis le localStorage
    const firstName = localStorage.getItem('userFirstName') || '';
    const lastName = localStorage.getItem('userLastName') || '';
    setUserName(`${firstName} ${lastName}`);
    // Pour l'instant, on utilise une photo par défaut
    setUserPhoto('https://ui-avatars.com/api/?name=' + encodeURIComponent(`${firstName}+${lastName}`));
  }, []);

  // Charger les patients depuis localStorage (côté client uniquement)
  useEffect(() => {
    if (isMounted) {
      try {
        const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
        setPatients(storedPatients);
      } catch (error) {
        console.error('Erreur lors du chargement des patients:', error);
      }
    }
  }, [isMounted]);

  // Mettre à jour la date et l'heure (côté client uniquement)
  useEffect(() => {
    if (isMounted) {
      const updateDateTime = () => {
        const now = new Date();
        // Utiliser un format de date fixe pour éviter les problèmes d'hydratation
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setCurrentDateTime(formattedDate);
      };
      
      updateDateTime();
      const interval = setInterval(updateDateTime, 60000);
      return () => clearInterval(interval);
    }
  }, [isMounted]);

  const handleViewPatient = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setActiveTab('patientProfile');
    }
  };

  const handleEditPatient = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setActiveTab('patientForm');
    }
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setActiveTab('patientForm');
  };

  const handleFormSuccess = () => {
    setActiveTab('patients');
    setSelectedPatient(null);
    if (isMounted) {
      try {
        const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
        setPatients(storedPatients);
      } catch (error) {
        console.error('Erreur lors du chargement des patients:', error);
      }
    }
  };

  const statsData: StatsData = {
    totalPatients: patients.length,
    criticalPatients: patients.filter((p) => p.status === 'critical').length,
    stablePatients: patients.filter((p) => p.status === 'stable').length,
    avgGFR: Math.round(patients.reduce((sum, p) => sum + (p.gfr || 0), 0) / (patients.length || 1)),
    recentConsultations: patients.filter((p) => p.lastConsultation).length,
    newPatients: 0, // Assuming newPatients is not provided in the original data
  };

  const renderDashboard = () => {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-100 to-green-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-green-800">Tableau de bord</h1>
            <p className="text-secondary-600">Bienvenue sur votre espace de suivi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-600">Total Patients</p>
                <h3 className="text-2xl font-bold text-green-800">{statsData.totalPatients}</h3>
              </div>
              <div className="bg-green-50 p-3 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-success-600 text-sm">↑ 12% depuis le mois dernier</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-600">Patients à risque</p>
                <h3 className="text-2xl font-bold text-red-600">{statsData.criticalPatients}</h3>
              </div>
              <div className="bg-danger-50 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-danger-600 text-sm">↑ 5% depuis le mois dernier</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-600">Patients stables</p>
                <h3 className="text-2xl font-bold text-success-600">{statsData.stablePatients}</h3>
              </div>
              <div className="bg-success-50 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-success-600 text-sm">↑ 8% depuis le mois dernier</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary-600">Nouveaux patients</p>
                <h3 className="text-2xl font-bold text-green-600">{statsData.newPatients}</h3>
              </div>
              <div className="bg-green-50 p-3 rounded-full">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-secondary-600 text-sm">↑ 15% depuis le mois dernier</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Distribution des stades MRC</h3>
            <div className="h-64">
              <Pie
                data={{
                  labels: ['Stade 1', 'Stade 2', 'Stade 3A', 'Stade 3B', 'Stade 4', 'Stade 5'],
                  datasets: [
                    {
                      data: [15, 25, 20, 18, 12, 10],
                      backgroundColor: [
                        '#4CAF50', // Vert clair pour stade 1
                        '#8BC34A', // Vert pour stade 2
                        '#FFC107', // Jaune pour stade 3A
                        '#FF9800', // Orange pour stade 3B
                        '#FF5722', // Orange foncé pour stade 4
                        '#F44336', // Rouge pour stade 5
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        font: {
                          size: 12,
                        },
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context: TooltipItem<'pie'>) {
                          const label = context.label || '';
                          const value = context.raw as number || 0;
                          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                          const percentage = Math.round((value / total) * 100);
                          return `${label}: ${value} patients (${percentage}%)`;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Évolution du GFR</h3>
            <div className="h-64">
              {/* Chart component will go here */}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Activité récente</h3>
          <div className="space-y-4">
            {/* recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.type === 'consultation' ? 'bg-green-100' :
                  activity.type === 'examen' ? 'bg-success-100' :
                  'bg-warning-100'
                }`}>
                  {activity.type === 'consultation' ? <Calendar className="w-5 h-5 text-green-600" /> :
                   activity.type === 'examen' ? <FileText className="w-5 h-5 text-success-600" /> :
                   <AlertTriangle className="w-5 h-5 text-red-600" />}
                </div>
                <div>
                  <p className="text-secondary-900 font-medium">{activity.description}</p>
                  <p className="text-secondary-500 text-sm">{activity.time}</p>
                </div>
              </div>
            )) */}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    // Ne rendre le contenu que côté client
    if (!isMounted) return null;

    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'patients':
        return (
          <div className="space-y-6 p-6">
            <PatientList 
              patients={patients} 
              onViewPatient={handleViewPatient}
              onEditPatient={handleEditPatient}
              onAddPatient={handleAddPatient}
            />
          </div>
        );
      case 'patientForm':
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {selectedPatient ? 'Modifier le patient' : 'Ajouter un nouveau patient'}
                </h2>
                <PatientForm 
                  patientId={selectedPatient?.id} 
                  onSuccess={handleFormSuccess}
                />
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <MedicalStats stats={statsData} />
            <AnalyticsCharts patients={patients} />
          </div>
        );
      case 'medecins':
        return (
          <div className="space-y-6">
            <Medecin />
          </div>
        );
      case 'rendezVous':
        return <AppointmentsList />;
      case 'caseStudies':
        return <PatientCaseStudies />;
      case 'examens':
        return <ExamensMedicaux />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard | AI4CKD</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Tableau de bord de suivi des patients atteints de maladie rénale chronique" />
      </Head>

      <div className="flex h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-green-800">
                {activeTab === 'patients'
                  ? 'Gestion des Patients'
                  : activeTab === 'analytics'
                  ? 'Analytiques Médicales'
                  : activeTab === 'workflows'
                  ? 'Gestion des Workflows'
                  : activeTab === 'medecins'
                  ? 'Gestion des Médecins'
                  : activeTab === 'rendezVous'
                  ? 'Gestion des Rendez-vous'
                  : activeTab === 'caseStudies'
                  ? 'Études de Cas'
                  : activeTab === 'examens'
                  ? 'Examens Médicaux'
                  : 'Tableau de Bord'}
              </h1>
              
              <div className="flex items-center space-x-6">
                <div className="text-sm text-gray-500">
                  {currentDateTime}
                </div>
                
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <div className="flex items-center">
                  <img 
                    className="h-10 w-10 rounded-full" 
                    src={userPhoto}
                    alt={userName}
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">{userName}</span>
                </div>
              </div>
            </div>
          </header>

          {showNotifications && <Notifications patients={patients} />}

          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}