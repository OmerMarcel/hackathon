import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>AI4CKD - Plateforme de suivi de Maladie Rénale Chronique</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Solution innovante pour améliorer le dépistage et le suivi des patients atteints de maladie rénale chronique." />
      </Head>
      <main className="bg-white min-h-screen text-secondary-800">
        {/* Header */}
        <header className="flex bg-green-100 justify-between items-center px-8 py-6 shadow-sm">
          <div className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-green-800">AI4CKD</span>
          </div>
          <Link href="/connexion/login" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 text-sm">
            Connexion
          </Link>
        </header>

        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-8 py-12 max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-green-800">
              Plateforme de suivi de <br /> Maladie Rénale Chronique
            </h1>
            <p className="text-secondary-600 mb-6">
              Solution innovante pour améliorer le dépistage et le suivi des patients atteints de maladie rénale chronique.
            </p>
            <div className="flex gap-4">
              <Link href="/connexion/login" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
                Accéder à la plateforme
              </Link>
              <Link href="/connexion/login" className="border border-green-600 text-green-600 px-6 py-3 rounded hover:bg-green-50">
                En savoir plus
              </Link>
            </div>
          </div>
          <div>
            <img
              src="/assets/images/renale1.jpg"
              alt="#"
              className="rounded-xl shadow-lg h-120 ml-25"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-12 max-w-7xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6 border border-secondary-200">
            <div className="text-green-600 text-2xl mb-2">👤</div>
            <h3 className="font-semibold text-lg mb-2 text-green-800">Suivi patient optimisé</h3>
            <p className="text-secondary-600 text-sm">
              Suivez l'évolution de vos patients atteints de MRC avec des tableaux de bord personnalisés et des alertes intelligentes.
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 border border-secondary-200">
            <div className="text-green-600 text-2xl mb-2">📄</div>
            <h3 className="font-semibold text-lg mb-2 text-green-800">Rapports détaillés</h3>
            <p className="text-secondary-600 text-sm">
              Générez des rapports complets et personnalisés pour une meilleure prise de décision clinique.
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 border border-secondary-200">
            <div className="text-green-600 text-2xl mb-2">🔒</div>
            <h3 className="font-semibold text-lg mb-2 text-green-800">Sécurité des données</h3>
            <p className="text-secondary-600 text-sm">
              Vos données sont protégées avec les plus hauts standards de sécurité et de confidentialité médicale.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-green-800 text-white px-8 py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-white text-xl font-bold mb-2">AI4CKD</div>
              <p className="text-sm text-secondary-400">
                Plateforme innovante pour le suivi des maladies rénales chroniques, conçue par des professionnels de santé pour des professionnels de santé.
              </p>
            </div>
            <div className="flex flex-col md:items-end">
              <h4 className="text-white font-semibold mb-2">Liens rapides</h4>
              <ul className="text-sm text-secondary-300 space-y-1">
                <li><Link href="/connexion/login" className="hover:text-green-400">Connexion</Link></li>
                <li><Link href="/connexion/login" className="hover:text-green-400">Documentation</Link></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-secondary-500 text-sm mt-8">
            © 2025 AI4CKD – Tous droits réservés
          </div>
        </footer>
      </main>
    </>
  );
}
