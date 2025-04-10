import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { User, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Login() {
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    
    // Vérifier si l'utilisateur est déjà connecté
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Vérification des identifiants par défaut
    if (email === 'admin@gmail.com' && password === 'admin') {
      // Stockage de l'état de connexion et des informations utilisateur
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userFirstName', firstName || 'Dr. Jean');
      localStorage.setItem('userLastName', lastName || 'Dupont');
      localStorage.setItem('userRole', 'admin');
      
      // Redirection vers le tableau de bord
      router.push('/dashboard');
    } else {
      setError('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  if (!isMounted) {
    return null; // Ne rien rendre pendant l'hydratation
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-green-50 flex flex-col items-center justify-center px-4">
      {/* Bouton Retour */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-secondary-600 hover:text-green-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour à l'accueil</span>
        </button>
      </div>

      {/* Logo + Title */}
      <div className="text-center mb-8">
        <div className="text-3xl text-green-800 font-bold mb-2">AI4CKD</div>
        <p className="text-secondary-600">Plateforme de suivi de Maladie Rénale Chronique</p>
      </div>

      {/* Login Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-secondary-200">
        <h2 className="text-2xl font-semibold text-center text-green-800 mb-6">Connexion</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Prénom
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Votre prénom"
                className="w-full border border-secondary-200 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-secondary-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Nom
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                👤
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Messagerie électronique
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="votre.email@exemple.fr"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                📧
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Votre mot de passe"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                🔒
              </span>
            </div>
            <div className="text-right mt-1">
              <a href="#" className="text-sm text-green-800 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            Se connecter
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="text-xs text-gray-500 mt-6 text-center">
          <p>Identifiants de démonstration :</p>
          <p>Admin : admin@gmail.com / admin</p>
          <p>Nom : Dr. Jean Dupont</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-gray-500 text-xs mt-6">
        © 2025 AI4CKD – Tous droits réservés
      </footer>
    </div>
  );
}