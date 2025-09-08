<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-4 md:p-8">
    <div class="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- En-tête -->
      <header class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <img 
            src="C:\Users\user\OneDrive\Desktop\cv\mon-projet-nuxt\app\photo.jpg" 
            alt="Photo de MATCHATOM Balakibawi" 
            class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white border-opacity-30 shadow-lg"
          >
          
          <div class="text-center md:text-left">
            <h1 class="text-3xl md:text-4xl font-bold mb-2">MATCHATOM Balakibawi</h1>
            <p class="text-xl opacity-90">Développeur IA & Data Science</p>
            
            <div class="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
              <a href="https://www.linkedin.com/in/votre-profil" class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300">
                <i class="fab fa-linkedin"></i> LinkedIn
              </a>
              <a href="https://github.com/votre-profil" class="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300">
                <i class="fab fa-github"></i> GitHub
              </a>
              <a href="#certificates" class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300">
                <i class="fas fa-certificate"></i> Certificats
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- Contenu principal -->
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <!-- Colonne de gauche -->
        <div class="bg-gray-50 p-6 md:p-8">
          <!-- Section Contact -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4 relative">
              Contact
              <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-emerald-500"></span>
            </h2>
            
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <i class="fas fa-phone"></i>
                </div>
                <div>
                  <p class="font-semibold">Téléphone</p>
                  <p>+228 97 41 80 76</p>
                  <p>+228 71 39 51 77</p>
                </div>
              </div>
              
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <i class="fas fa-envelope"></i>
                </div>
                <div>
                  <p class="font-semibold">Email</p>
                  <p>balakibawimatchatom@gmail.com</p>
                </div>
              </div>
              
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p class="font-semibold">Adresse</p>
                  <p>Togblékopé LOME TOGO</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Section Compétences -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4 relative">
              Compétences
              <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-emerald-500"></span>
            </h2>
            
            <div class="grid gap-4">
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <h3 class="font-semibold text-blue-800 mb-2">Langages</h3>
                <p>Python, Java, JavaScript (Node.js)</p>
              </div>
              
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <h3 class="font-semibold text-blue-800 mb-2">IA & Traitement de données</h3>
                <p>pandas, scikit-learn, spaCy, OpenCV, librosa, seaborn, matplotlib</p>
              </div>
              
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <h3 class="font-semibold text-blue-800 mb-2">Modélisation et Analyse</h3>
                <p>SVM, Random Forest, KMeans, LDA, TF-IDF, WordCloud</p>
              </div>
              
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <h3 class="font-semibold text-blue-800 mb-2">Bases de données</h3>
                <p>MySQL, PostgreSQL</p>
              </div>
              
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <h3 class="font-semibold text-blue-800 mb-2">Systèmes</h3>
                <p>Windows, Linux</p>
              </div>
              
              <div class="bg-white p-4 rounded-lg shadow-sm">
                <h3 class="font-semibold text-blue-800 mb-2">Modélisation</h3>
                <p>UML, MERISE</p>
              </div>
            </div>
          </section>

          <!-- Section Langues -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4 relative">
              Langues
              <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-emerald-500"></span>
            </h2>
            
            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-1">
                  <span>Français (courant)</span>
                  <span>95%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 95%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between mb-1">
                  <span>Anglais (bon niveau)</span>
                  <span>75%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
                </div>
              </div>
              
              <div>
                <div class="flex justify-between mb-1">
                  <span>Ewe (langue maternelle)</span>
                  <span>100%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 100%"></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Colonne de droite -->
        <div class="p-6 md:p-8">
          <!-- Section Formation -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4 relative">
              Formation
              <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-emerald-500"></span>
            </h2>
            
            <div class="border-l-2 border-blue-600 pl-6 ml-3 space-y-8">
              <div class="relative">
                <div class="absolute -left-9 w-6 h-6 bg-blue-600 rounded-full"></div>
                <h3 class="font-bold text-lg">Licence fondamentale en Intelligence Artificielle & Big Data</h3>
                <p class="text-blue-600 font-medium">2022 - Présent</p>
                <p>Ecole Polytechnique de Lomé</p>
              </div>
              
              <div class="relative">
                <div class="absolute -left-9 w-6 h-6 bg-blue-600 rounded-full"></div>
                <h3 class="font-bold text-lg">Baccalauréat Série D</h3>
                <p class="text-blue-600 font-medium">2021 – 2022</p>
                <p>Lycée Togblékopé</p>
              </div>
            </div>
          </section>

          <!-- Section Expériences -->
          <section class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4 relative">
              Expériences
              <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-emerald-500"></span>
            </h2>
            
            <div class="border-l-2 border-blue-600 pl-6 ml-3 space-y-8">
              <div class="relative">
                <div class="absolute -left-9 w-6 h-6 bg-blue-600 rounded-full"></div>
                <h3 class="font-bold text-lg">Chef de groupe – Système de gestion de notes</h3>
                <p class="text-blue-600 font-medium">Nov. 2024 – Présent</p>
                <p>Conception d'interfaces dynamiques avec Express.js et EJS pour la saisie et gestion des notes.</p>
              </div>
              
              <div class="relative">
                <div class="absolute -left-9 w-6 h-6 bg-blue-600 rounded-full"></div>
                <h3 class="font-bold text-lg">Projet universitaire – NLP médical</h3>
                <p class="text-blue-600 font-medium">Avril 2025</p>
                <p>Extraction de texte (.docx), prétraitement linguistique (spaCy), TF-IDF, clustering (LDA, KMeans), visualisation.</p>
              </div>
              
              <div class="relative">
                <div class="absolute -left-9 w-6 h-6 bg-blue-600 rounded-full"></div>
                <h3 class="font-bold text-lg">Projet universitaire – Data Cleaning</h3>
                <p class="text-blue-600 font-medium">Mars 2025</p>
                <p>Nettoyage de données CSV, détection/correction d'anomalies, normalisation, remplacement des valeurs manquantes.</p>
              </div>
              
              <div class="relative">
                <div class="absolute -left-9 w-6 h-6 bg-blue-600 rounded-full"></div>
                <h3 class="font-bold text-lg">Projet universitaire – Modèle de prédiction énergétique</h3>
                <p class="text-blue-600 font-medium">Mars – Mai 2025</p>
                <p>Modélisation ML (scikit-learn), API Flask, interface web JavaScript, visualisation avec Chart.js.</p>
              </div>
              
              <div class="relative">
                <div class="absolute -left-9 w-6 h-6 bg-blue-600 rounded-full"></div>
                <h3 class="font-bold text-lg">Stage en développement backend</h3>
                <p class="text-blue-600 font-medium">Août – Nov. 2024</p>
                <p>Développement d'une app web Node.js pour la gestion de boissons, intégration MySQL, tests automatisés et documentation technique.</p>
              </div>
            </div>
          </section>

          <!-- Section Certificats -->
          <section id="certificates" class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4 relative">
              Certificats
              <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-emerald-500"></span>
            </h2>
            
            <div class="space-y-4">
              <div class="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50 rounded-r">
                <h3 class="font-bold">Data Science Fundamentals</h3>
                <p class="text-emerald-700">Coursera - 2023</p>
                <a href="#" class="text-emerald-600 hover:text-emerald-800 text-sm flex items-center gap-1 mt-1">
                  <i class="fas fa-external-link-alt text-xs"></i> Voir le certificat
                </a>
              </div>
              
              <div class="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50 rounded-r">
                <h3 class="font-bold">Machine Learning avec Python</h3>
                <p class="text-emerald-700">Udemy - 2023</p>
                <a href="#" class="text-emerald-600 hover:text-emerald-800 text-sm flex items-center gap-1 mt-1">
                  <i class="fas fa-external-link-alt text-xs"></i> Voir le certificat
                </a>
              </div>
              
              <div class="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50 rounded-r">
                <h3 class="font-bold">Développement Web Full Stack</h3>
                <p class="text-emerald-700">OpenClassrooms - 2022</p>
                <a href="#" class="text-emerald-600 hover:text-emerald-800 text-sm flex items-center gap-1 mt-1">
                  <i class="fas fa-external-link-alt text-xs"></i> Voir le certificat
                </a>
              </div>
            </div>
          </section>

          <!-- Section Références -->
          <section>
            <h2 class="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4 relative">
              Références
              <span class="absolute bottom-0 left-0 w-12 h-0.5 bg-emerald-500"></span>
            </h2>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-bold text-lg">M. APEKE Séna</h3>
              <p class="text-blue-600">Chief de département Génie Informatique – EPL</p>
              <p class="mt-2"><span class="font-semibold">Téléphone:</span> +33 6 11 14 25 15</p>
              <p><span class="font-semibold">Email:</span> apekekodjo@gmail.com</p>
            </div>
          </section>
        </div>
      </div>

      <!-- Pied de page -->
      <footer class="bg-gray-800 text-white text-center p-6">
        <p>© 2023 MATCHATOM Balakibawi. Tous droits réservés.</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.animateElements();
    window.addEventListener('scroll', this.animateElements);
  },
  methods: {
    animateElements() {
      const elements = document.querySelectorAll('.border-l-4, .border-l-2');
      elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (position < screenPosition) {
          el.classList.add('animate-pulse');
        }
      });
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}
</style>