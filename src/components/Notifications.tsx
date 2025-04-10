import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, CheckCircle, UserPlus, Calendar, Activity, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationsProps {
  patients?: any[];
}

const Notifications: React.FC<NotificationsProps> = ({ patients = [] }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  // Générer des notifications basées sur les données des patients
  useEffect(() => {
    if (patients.length > 0) {
      const newNotifications: Notification[] = [];
      
      // Patients à risque (GFR < 30)
      const criticalPatients = patients.filter(p => p.gfr < 30);
      if (criticalPatients.length > 0) {
        newNotifications.push({
          id: 'critical-patients',
          type: 'warning',
          title: 'Patients à risque',
          message: `${criticalPatients.length} patient(s) ont un GFR inférieur à 30 ml/min/1.73m² et nécessitent une attention immédiate.`,
          timestamp: new Date(),
          read: false
        });
      }
      
      // Patients avec rendez-vous aujourd'hui
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const patientsWithAppointmentToday = patients.filter(p => {
        if (!p.nextVisit) return false;
        const appointmentDate = new Date(p.nextVisit);
        appointmentDate.setHours(0, 0, 0, 0);
        return appointmentDate.getTime() === today.getTime();
      });
      
      if (patientsWithAppointmentToday.length > 0) {
        newNotifications.push({
          id: 'appointments-today',
          type: 'info',
          title: 'Rendez-vous aujourd\'hui',
          message: `Vous avez ${patientsWithAppointmentToday.length} rendez-vous prévu(s) aujourd'hui.`,
          timestamp: new Date(),
          read: false
        });
      }
      
      // Patients avec GFR en baisse
      const patientsWithDecliningGFR = patients.filter(p => {
        // Vérifier si le patient a des données de GFR historiques
        if (!p.gfrHistory || p.gfrHistory.length < 2) return false;
        
        // Comparer les deux dernières valeurs de GFR
        const lastTwoValues = p.gfrHistory.slice(-2);
        return lastTwoValues[1] < lastTwoValues[0];
      });
      
      if (patientsWithDecliningGFR.length > 0) {
        newNotifications.push({
          id: 'declining-gfr',
          type: 'warning',
          title: 'GFR en baisse',
          message: `${patientsWithDecliningGFR.length} patient(s) présentent une baisse de leur GFR.`,
          timestamp: new Date(),
          read: false
        });
      }
      
      // Nouveaux patients ajoutés récemment
      const recentPatients = patients.filter(p => {
        if (!p.createdAt) return false;
        const creationDate = new Date(p.createdAt);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return creationDate > oneWeekAgo;
      });
      
      if (recentPatients.length > 0) {
        newNotifications.push({
          id: 'new-patients',
          type: 'success',
          title: 'Nouveaux patients',
          message: `${recentPatients.length} nouveau(x) patient(s) ajouté(s) cette semaine.`,
          timestamp: new Date(),
          read: false
        });
      }
      
      // Patients stables (GFR > 60)
      const stablePatients = patients.filter(p => p.gfr > 60);
      if (stablePatients.length > 0) {
        newNotifications.push({
          id: 'stable-patients',
          type: 'success',
          title: 'Patients stables',
          message: `${stablePatients.length} patient(s) ont un GFR supérieur à 60 ml/min/1.73m² et sont considérés comme stables.`,
          timestamp: new Date(),
          read: false
        });
      }
      
      setNotifications(newNotifications);
    }
  }, [patients]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Bell className="h-6 w-6 text-gray-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                {getUnreadCount() > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {getUnreadCount()}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                {getUnreadCount() > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Tout marquer comme lu
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="mt-2 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  Aucune notification
            </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <li 
                      key={notification.id} 
                      className={`py-3 ${notification.read ? 'opacity-70' : ''}`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {notification.type === 'success' ? <CheckCircle className="w-5 h-5 text-success-600" /> :
                           notification.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
                           <Info className="w-5 h-5 text-info-600" />}
          </div>
                        <div className="ml-3 w-full">
                          <div className="flex justify-between">
                            <p className={`text-sm font-medium ${notification.read ? 'text-gray-500' : 'text-gray-900'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
        </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {notification.message}
                          </p>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                            >
                              Marquer comme lu
                            </button>
                          )}
              </div>
            </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;