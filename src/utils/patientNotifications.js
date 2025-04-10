// Fonction pour ajouter un patient de test et déclencher une notification
export const addTestPatient = () => {
  try {
    // Générer un ID unique
    const id = Date.now();
    
    // Créer un patient de test
    const testPatient = {
      id,
      name: `Patient Test ${id % 1000}`,
      email: `patient${id % 1000}@example.com`,
      phone: `0${Math.floor(Math.random() * 900000000) + 100000000}`,
      timestamp: new Date().toISOString()
    };
    
    // Récupérer les notifications existantes
    const notifications = JSON.parse(localStorage.getItem('recentPatients') || '[]');
    
    // Ajouter le nouveau patient au début de la liste
    notifications.unshift(testPatient);
    
    // Limiter à 5 notifications maximum
    const limitedNotifications = notifications.slice(0, 5);
    
    // Sauvegarder les notifications
    localStorage.setItem('recentPatients', JSON.stringify(limitedNotifications));
    
    console.log('Patient de test ajouté:', testPatient.name);
    return testPatient;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du patient de test:', error);
    return null;
  }
};

// Fonction pour ajouter plusieurs patients de test
export const addMultipleTestPatients = (count = 3) => {
  const addedPatients = [];
  for (let i = 0; i < count; i++) {
    const patient = addTestPatient();
    if (patient) {
      addedPatients.push(patient);
    }
  }
  return addedPatients;
}; 