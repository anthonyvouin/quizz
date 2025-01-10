import Image from 'next/image';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Guide Complet de Sécurité Email</h1>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Apprenez à identifier et à vous protéger contre les différentes formes de fraudes par email.
        </p>

        <div className="space-y-12">
          {/* Section 1: Types de fraudes courantes */}
          <section className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Types de fraudes courantes</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="grid gap-8">
                <div className="bg-red-50 p-6 rounded-lg border border-red-100 h-[200px] flex flex-col">
                  <h3 className="text-xl font-medium text-red-800 mb-2">Phishing (Hameçonnage)</h3>
                  <p className="text-gray-700 mb-2">Imitation d'entreprises légitimes pour voler vos données personnelles.</p>
                  <ul className="mt-auto space-y-1 text-gray-600">
                    <li>• Fausses pages de connexion</li>
                    <li>• Imitation de banques</li>
                    <li>• Copies de sites marchands</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100 h-[200px] flex flex-col">
                  <h3 className="text-xl font-medium text-orange-800 mb-2">Scam (Arnaque)</h3>
                  <p className="text-gray-700 mb-2">Tentatives d'extorsion d'argent via des histoires inventées.</p>
                  <ul className="mt-auto space-y-1 text-gray-600">
                    <li>• Faux héritage</li>
                    <li>• Gains de loterie</li>
                    <li>• Arnaques sentimentales</li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-8">
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100 h-[200px] flex flex-col">
                  <h3 className="text-xl font-medium text-yellow-800 mb-2">Ransomware (Rançongiciel)</h3>
                  <p className="text-gray-700 mb-2">Logiciels malveillants qui cryptent vos données.</p>
                  <ul className="mt-auto space-y-1 text-gray-600">
                    <li>• Fausses factures en pièce jointe</li>
                    <li>• Faux documents administratifs</li>
                    <li>• Liens vers des logiciels malveillants</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 h-[200px] flex flex-col">
                  <h3 className="text-xl font-medium text-purple-800 mb-2">Spear Phishing</h3>
                  <p className="text-gray-700 mb-2">Attaques ciblées utilisant des informations personnelles.</p>
                  <ul className="mt-auto space-y-1 text-gray-600">
                    <li>• Usurpation d'identité de collègues</li>
                    <li>• Faux messages de la direction</li>
                    <li>• Demandes de virements urgents</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Comment identifier une fraude */}
          <section className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Comment identifier une tentative de fraude ?</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Indices visuels 🔍</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    <div>
                      <h4 className="font-medium">Logo de mauvaise qualité</h4>
                      <p className="text-gray-600 text-sm">Les images et logos sont souvent pixelisés ou légèrement différents des originaux.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    <div>
                      <h4 className="font-medium">Mise en page douteuse</h4>
                      <p className="text-gray-600 text-sm">Alignements incorrects, espaces irréguliers, polices de caractères mélangées.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    <div>
                      <h4 className="font-medium">Fautes d'orthographe</h4>
                      <p className="text-gray-600 text-sm">Erreurs grammaticales, syntaxe incorrecte, accents manquants.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Indices comportementaux 🎭</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    <div>
                      <h4 className="font-medium">Urgence excessive</h4>
                      <p className="text-gray-600 text-sm">Pression pour agir rapidement, menaces de conséquences graves.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    <div>
                      <h4 className="font-medium">Offres irréalistes</h4>
                      <p className="text-gray-600 text-sm">Promesses de gains exceptionnels, héritages inattendus.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">⚠</span>
                    <div>
                      <h4 className="font-medium">Demandes inhabituelles</h4>
                      <p className="text-gray-600 text-sm">Sollicitations d'informations personnelles ou de virements urgents.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-blue-800 mb-4">Exemple d'analyse d'un email frauduleux</h3>
              <div className="bg-white p-4 rounded-lg border border-blue-100">
                <div className="space-y-2">
                  <p className="text-sm text-gray-800"><strong>De:</strong> <span className="text-red-600">service-client.banque@secure-banking-valid.com</span> ⚠️ Domaine suspect</p>
                  <p className="text-sm text-gray-800"><strong>Objet:</strong> <span className="text-red-600">URGENT: Votre compte sera bloqué</span> ⚠️ Création d'urgence</p>
                  <p className="text-sm text-gray-800"><strong>Message:</strong></p>
                  <div className="pl-4 border-l-2 border-gray-200">
                    <p className="text-sm text-gray-600">Cher(e) client(e),</p>
                    <p className="text-sm text-gray-600">Nous avons detecté une activité <span className="text-red-600">suspicious</span> sur votre compte. ⚠️ Faute d'orthographe</p>
                    <p className="text-sm text-gray-600">Pour éviter le blocage, <span className="text-red-600">cliquez ici</span> pour verifier vos informations. ⚠️ Lien suspect</p>
                    <p className="text-sm text-gray-600">Vous avez <span className="text-red-600">24h pour agir</span>. ⚠️ Pression temporelle</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Bonnes pratiques */}
          <section className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Les bonnes pratiques de sécurité</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-green-800 mb-4">Avant d'ouvrir</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <p className="text-gray-700">Vérifier l'adresse complète de l'expéditeur</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <p className="text-gray-700">Examiner l'objet du message</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <p className="text-gray-700">Vérifier si vous attendiez ce message</p>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-green-800 mb-4">Pendant la lecture</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <p className="text-gray-700">Ne pas cliquer sur les liens suspects</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <p className="text-gray-700">Ne pas télécharger les pièces jointes douteuses</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <p className="text-gray-700">Repérer les incohérences dans le message</p>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-green-800 mb-4">En cas de doute</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <p className="text-gray-700">Contacter directement l'organisme concerné</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <p className="text-gray-700">Utiliser un autre canal de communication</p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <p className="text-gray-700">Signaler l'email frauduleux</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: En cas de piratage */}
          <section className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Que faire en cas de piratage ?</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-red-800 mb-4">Actions immédiates</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">1. Sécuriser ses comptes</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Changer tous les mots de passe</li>
                      <li>• Activer la double authentification</li>
                      <li>• Déconnecter tous les appareils</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Protéger ses finances</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Contacter sa banque</li>
                      <li>• Surveiller ses comptes</li>
                      <li>• Bloquer ses cartes bancaires</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-yellow-800 mb-4">Démarches officielles</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">3. Signaler l'incident</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Porter plainte à la police</li>
                      <li>• Signaler sur cybermalveillance.gouv.fr</li>
                      <li>• Informer la CNIL</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">4. Prévenir son entourage</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Alerter ses contacts</li>
                      <li>• Informer son employeur</li>
                      <li>• Contacter les services concernés</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-blue-800 mb-4">Numéros utiles</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800">Info Escroqueries</h4>
                    <p className="text-blue-600 font-bold">0 805 805 817</p>
                    <p className="text-sm text-gray-600">Numéro gratuit</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800">Carte bancaire</h4>
                    <p className="text-blue-600 font-bold">0 892 705 705</p>
                    <p className="text-sm text-gray-600">Opposition 24/7</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800">Urgence</h4>
                    <p className="text-blue-600 font-bold">17</p>
                    <p className="text-sm text-gray-600">Police secours</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Nouvelle Section: Créer des mots de passe sécurisés */}
          <section className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Créer des mots de passe sécurisés</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-indigo-800 mb-4">Les règles d'or</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">✓</span>
                    <div>
                      <h4 className="font-medium">Longueur minimale</h4>
                      <p className="text-gray-600">Au moins 12 caractères</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">✓</span>
                    <div>
                      <h4 className="font-medium">Complexité</h4>
                      <p className="text-gray-600">Mélanger majuscules, minuscules, chiffres et caractères spéciaux</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 mr-2">✓</span>
                    <div>
                      <h4 className="font-medium">Unicité</h4>
                      <p className="text-gray-600">Un mot de passe différent pour chaque compte</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-indigo-800 mb-4">Exemple de création sécurisée</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-medium mb-2">Méthode de la phrase :</p>
                    <p className="text-gray-600 text-sm">"J'ai acheté 2 croissants à la boulangerie en 2024 !"</p>
                    <p className="text-gray-600 text-sm">Devient :</p>
                    <p className="text-blue-600 font-mono">Ja2c@lb2024!</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-medium text-red-600">À éviter absolument :</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Dates de naissance</li>
                      <li>• Noms de famille</li>
                      <li>• Suites simples (123456, azerty)</li>
                      <li>• Mots du dictionnaire</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Nouvelle Section: Outils de protection recommandés */}
          <section className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Outils de protection recommandés</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-teal-800 mb-4">Gestionnaires de mots de passe</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Bitwarden (Gratuit, Open Source)</li>
                  <li>• 1Password (Payant, très sécurisé)</li>
                  <li>• KeePass (Gratuit, local)</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">Pour stocker vos mots de passe de manière sécurisée</p>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-teal-800 mb-4">Antivirus recommandés</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Windows Defender (Intégré)</li>
                  <li>• Malwarebytes (Anti-malware)</li>
                  <li>• Bitdefender (Protection complète)</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">Pour protéger votre ordinateur des menaces</p>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-teal-800 mb-4">Extensions navigateur</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• uBlock Origin (Bloqueur de pub)</li>
                  <li>• HTTPS Everywhere (Connexion sécurisée)</li>
                  <li>• Privacy Badger (Protection vie privée)</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">Pour une navigation plus sûre</p>
              </div>
            </div>
          </section>

          {/* Nouvelle Section: Mythes et réalités */}
          <section className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Mythes et réalités sur la sécurité</h2>
            
            <div className="space-y-4">
              <div className="bg-pink-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-medium text-pink-800 mb-4">Mythes courants</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <div>
                          <h4 className="font-medium">"Je n'ai rien à cacher"</h4>
                          <p className="text-gray-600 text-sm">Vos données personnelles ont de la valeur et peuvent être utilisées contre vous.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <div>
                          <h4 className="font-medium">"Mon antivirus me protège de tout"</h4>
                          <p className="text-gray-600 text-sm">L'antivirus est une protection parmi d'autres, mais ne suffit pas seul.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-pink-800 mb-4">Réalités importantes</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <div>
                          <h4 className="font-medium">La sécurité est l'affaire de tous</h4>
                          <p className="text-gray-600 text-sm">Chaque utilisateur doit être vigilant et adopter les bonnes pratiques.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <div>
                          <h4 className="font-medium">La prévention est la meilleure protection</h4>
                          <p className="text-gray-600 text-sm">Il est plus facile de prévenir une attaque que de gérer ses conséquences.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-4">
            <p className="text-sm text-gray-500 italic text-center">
              Ce guide a été réalisé en s'inspirant des recommandations de La Banque Postale sur la sécurité numérique.
              <a 
                href="https://www.labanquepostale.fr/particulier/footer/alertes-et-fraudes/internet-reseaux-sociaux.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1"
              >
                Voir la source
              </a>
            </p>

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
    </div>
  );
} 