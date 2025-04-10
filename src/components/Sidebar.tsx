import { FC, useEffect, useState } from 'react';
import { TabType } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart2, 
  UserPlus, 
  UserCircle, 
  FileText,
  Stethoscope,
  ClipboardList
} from 'lucide-react';
import { useRouter } from 'next/router';

type SidebarProps = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

const Sidebar: FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const router = useRouter();
  // Utiliser un état pour s'assurer que le rendu est cohérent entre le serveur et le client
  const [isMounted, setIsMounted] = useState(false);
  const [userName, setUserName] = useState('');

  // Marquer le composant comme monté après le premier rendu côté client
  useEffect(() => {
    setIsMounted(true);
    // Récupérer le nom de l'utilisateur depuis le localStorage
    const firstName = localStorage.getItem('userFirstName') || '';
    const lastName = localStorage.getItem('userLastName') || '';
    setUserName(`${firstName} ${lastName}`);
  }, []);

  // Si le composant n'est pas encore monté, retourner une version simplifiée
  if (!isMounted) {
    return (
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-green-600">AI4CKD</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {/* Version simplifiée pour le rendu côté serveur */}
                <div className="h-10"></div>
                <div className="h-10"></div>
                <div className="h-10"></div>
                <div className="h-10"></div>
                <div className="h-10"></div>
                <div className="h-10"></div>
                <div className="h-10"></div>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-gray-200"></div>
                <div className="ml-3">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Version complète pour le rendu côté client
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-green-600">AI4CKD</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-green-50 text-green-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Tableau de bord</span>
                </button>

                <button
                  onClick={() => setActiveTab('medecins')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'medecins'
                      ? 'bg-green-50 text-green-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  <Stethoscope className="w-5 h-5" />
                  <span>Médecins</span>
                </button>

                <button
                  onClick={() => setActiveTab('patients')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'patients'
                      ? 'bg-green-50 text-green-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Patients</span>
                </button>

                <button
                  onClick={() => setActiveTab('rendezVous')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'rendezVous'
                      ? 'bg-green-50 text-green-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Rendez-vous</span>
                </button>

                <button
                  onClick={() => setActiveTab('caseStudies')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'caseStudies'
                      ? 'bg-green-50 text-green-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Études de Cas</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'analytics'
                      ? 'bg-green-50 text-green-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  <BarChart2 className="w-5 h-5" />
                  <span>Analytiques</span>
                </button>

                <button
                  onClick={() => setActiveTab('examens')}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'examens'
                      ? 'bg-green-50 text-green-600'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  }`}
                >
                  <ClipboardList className="w-5 h-5" />
                  <span>Examens</span>
                </button>
              </div>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-secondary-200 p-4">
            <div className="flex items-center">
              <div>
                <UserCircle className="h-9 w-9 text-secondary-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-secondary-700">Dr. {userName}</p>
                <button 
                  onClick={() => router.push('/medecin/profile')}
                  className="text-xs font-medium text-green-600 hover:text-green-700"
                >
                  Voir profil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;