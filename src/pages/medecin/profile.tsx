import { useState, ChangeEvent, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "Centre Hospitalier Universitaire",
    specialty: "Néphrologie",
    registration: "RPPS 10012345678",
    address: "25 avenue des Hôpitaux, 75014 Paris",
    bio: "Néphrologue spécialisé dans le suivi des patients atteints de maladies rénales chroniques avec plus de 10 ans d'expérience dans le domaine.",
  });

  // Charger les informations de l'utilisateur depuis le localStorage
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/connexion/login');
      return;
    }

    const firstName = localStorage.getItem('userFirstName') || '';
    const lastName = localStorage.getItem('userLastName') || '';
    const email = localStorage.getItem('userEmail') || '';
    
    setFormData(prev => ({
      ...prev,
      fullName: `${firstName} ${lastName}`,
      email: email,
    }));
  }, [router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Sauvegarder les modifications dans le localStorage
    const [firstName, lastName] = formData.fullName.split(' ');
    localStorage.setItem('userFirstName', firstName);
    localStorage.setItem('userLastName', lastName);
    localStorage.setItem('userEmail', formData.email);
    
    // Afficher un message de succès
    alert('Profil mis à jour avec succès !');
  };

  const handleLogout = () => {
    // Supprimer les informations d'authentification
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userRole');
    
    // Rediriger vers la page de connexion
    router.push('/connexion/login');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-green-800">Consultez et modifiez vos informations personnelles</h1>
        <Button onClick={handleLogout} className="bg-red-600 hover:bg-danger-700">
          Déconnexion
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profil à gauche */}
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center">
          <div className="w-24 h-24 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
            {formData.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <h2 className="mt-4 text-lg font-semibold text-green-800">{formData.fullName}</h2>
          <p className="text-sm text-green-600">{formData.specialty}</p>
          <div className="mt-4 text-sm space-y-1 text-center">
            <p className="text-secondary-600">📧 {formData.email}</p>
            <p className="text-secondary-600">📞 {formData.phone}</p>
            <p className="text-secondary-600">🏥 {formData.institution}</p>
            <p className="text-secondary-600">🆔 {formData.registration}</p>
          </div>
          <div className="mt-4 text-xs text-secondary-500">
            📅 Dernière connexion : Aujourd'hui à 09:45
          </div>
        </div>

        {/* Formulaire à droite */}
        <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Modifier vos informations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-secondary-700">Nom complet</label>
              <Input name="fullName" value={formData.fullName} onChange={handleChange} className="border-secondary-200 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="text-sm text-secondary-700">Messagerie électronique</label>
              <Input name="email" value={formData.email} onChange={handleChange} className="border-secondary-200 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="text-sm text-secondary-700">Téléphone</label>
              <Input name="phone" value={formData.phone} onChange={handleChange} className="border-secondary-200 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="text-sm text-secondary-700">Spécialité</label>
              <Input name="specialty" value={formData.specialty} onChange={handleChange} className="border-secondary-200 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="text-sm text-secondary-700">Institution</label>
              <Input name="institution" value={formData.institution} onChange={handleChange} className="border-secondary-200 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="text-sm text-secondary-700">Numéro d'inscription</label>
              <Input name="registration" value={formData.registration} onChange={handleChange} className="border-secondary-200 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-secondary-700">Adresse professionnelle</label>
              <Input name="address" value={formData.address} onChange={handleChange} className="border-secondary-200 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-secondary-700">Biographie</label>
              <Textarea name="bio" value={formData.bio} onChange={handleChange} className="border-secondary-200 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-secondary-700">Photo de profil</label>
              <Input type="file" accept=".jpg,.png" className="border-secondary-200 focus:ring-green-500 focus:border-green-500" />
              <p className="text-xs text-secondary-500 mt-1">Formats acceptés : JPG, PNG. Taille max : 5 MB</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button className="bg-secondary-200 hover:bg-secondary-300">Annuler</Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">Enregistrer</Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
