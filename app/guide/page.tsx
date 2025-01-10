export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Guide de Sécurité Email</h1>
        
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Les bonnes pratiques essentielles</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <div>
                  <h3 className="font-medium">Vérifiez l'expéditeur</h3>
                  <p className="text-gray-600">Méfiez-vous des adresses email qui ressemblent à celles d'entreprises légitimes mais qui contiennent des fautes ou des variations subtiles.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <div>
                  <h3 className="font-medium">Ne cliquez pas sur les liens douteux</h3>
                  <p className="text-gray-600">Survolez les liens avec votre souris pour voir l'URL réelle. En cas de doute, accédez au site directement via votre navigateur.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <div>
                  <h3 className="font-medium">Méfiez-vous des pièces jointes</h3>
                  <p className="text-gray-600">N'ouvrez jamais de pièces jointes provenant d'expéditeurs inconnus ou suspects.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <div>
                  <h3 className="font-medium">Attention aux demandes urgentes</h3>
                  <p className="text-gray-600">Les emails créant un sentiment d'urgence sont souvent des tentatives de manipulation psychologique.</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Signes d'un email frauduleux</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">⚠</span>
                <div>
                  <h3 className="font-medium">Fautes d'orthographe</h3>
                  <p className="text-gray-600">Les emails frauduleux contiennent souvent des erreurs de français ou des formulations maladroites.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">⚠</span>
                <div>
                  <h3 className="font-medium">Demandes de données sensibles</h3>
                  <p className="text-gray-600">Les organisations légitimes ne demandent jamais vos informations sensibles par email.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">⚠</span>
                <div>
                  <h3 className="font-medium">Offres trop belles</h3>
                  <p className="text-gray-600">Méfiez-vous des promesses de gains exceptionnels ou d'offres trop avantageuses.</p>
                </div>
              </li>
            </ul>
          </section>

          <div className="text-center">
            <a 
              href="/"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Retourner au quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 