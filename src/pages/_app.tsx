import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Liste des routes publiques qui ne nécessitent pas d'authentification
const publicRoutes = ['/connexion/login', '/'];

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    
    // Vérifier si l'utilisateur est authentifié
    const checkAuth = () => {
      const auth = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(auth);
      setIsLoading(false);
      
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      // et n'est pas déjà sur une route publique
      if (!auth && !publicRoutes.includes(router.pathname)) {
        router.push('/connexion/login');
      }
    };
    
    checkAuth();
    
    // Supprimer les attributs _msthidden après le montage
    const removeMstAttributes = () => {
      const elements = document.querySelectorAll('[_msthidden]');
      elements.forEach(element => {
        element.removeAttribute('_msthidden');
      });
    };
    removeMstAttributes();
  }, [router.pathname]);

  // Ne rendre le composant que côté client
  if (!isMounted || isLoading) {
    return null;
  }

  // Si l'utilisateur n'est pas authentifié et n'est pas sur une route publique,
  // ne rien afficher (la redirection est gérée dans useEffect)
  if (!isAuthenticated && !publicRoutes.includes(router.pathname)) {
    return null;
  }

  return <Component {...pageProps} />;
}
