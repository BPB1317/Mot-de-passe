/* ========================================
   MOT DE PASSE — script.js
   ======================================== */

const CONFIG = {
  warningTime: 15,
  dangerTime:  5,
};

const wordBank = [
"Éléphant","Guitare","Pyramide","Volcan","Chocolat",
"Astronaute","Bibliothèque","Caméléon","Dinosaure","Encyclopédie",
"Fantôme","Girafe","Hélicoptère","Igloo","Jongleur",
"Kangourou","Labyrinthe","Mannequin","Naufrage","Orchestre",
"Parachute","Quiche","Robot","Squelette","Trampoline",
"Vampire","Xylophone","Yéti",
"Accordéon","Boulangerie","Crocodile","Détective","Escargot",
"Forgeron","Grotte","Hamster","Idole","Jonquille",
"Kayak","Lionceau","Météore","Nomade","Optique",
"Phare","Rubis","Sorcière","Tornade","Uniforme",
"Aventure","Boussole","Cascade","Domino","Émeraude",
"Festival","Galaxie","Horloge","Invention","Jardin",
"Koala","Lanterne","Mirage","Navire","Oasis",
"Papillon","Rivière","Statue","Tempête",
"Univers","Voyage","Wagon","Xérès",
"Zèbre","Alchimiste","Brouillard","Cabane","Dauphin",
"Éclipse","Flocon","Gladiateur","Horizon","Illusion",
"Jungle","Kiosque","Montgolfière",
"Poussière","Relique","Sablier","Titan",
"Abysse","Balcon","Cactus","Diamant","Éventail",
"Fossile","Geyser","Harpon","Incendie","Jumelles",
"Kimono","Lézard","Marionnette","Nénuphar",
"Panthère","Ruche","Sarcophage","Totem",
"Whisky","Yacht",
"Armure","Bourdon","Caravane",
"Écureuil","Grimoire","Hibou",
"Javelot","Luciole","Masque","Ninja",
"Opéra","Pépite","Samouraï",
];

const forbiddenCards = [
{ word: "CHOCOLAT",    forbidden: ["Sucre","Cacao","Noir","Tablette","Doux"] },
{ word: "TÉLÉPHONE",   forbidden: ["Appeler","Portable","Numéro","Écran","Sonner"] },
{ word: "PISCINE",     forbidden: ["Nager","Eau","Maillot","Plonger","Chlore"] },
{ word: "BOULANGERIE", forbidden: ["Pain","Croissant","Four","Farine","Boulanger"] },
{ word: "VAMPIRE",     forbidden: ["Sang","Nuit","Cape","Chauve-souris","Dracula"] },
{ word: "PIRATE",      forbidden: ["Bateau","Trésor","Mer","Drapeau","Crochet"] },
{ word: "ASTRONAUTE",  forbidden: ["Espace","Fusée","Lune","Combinaison","Gravité"] },
{ word: "MAGICIEN",    forbidden: ["Tour","Baguette","Lapin","Chapeau","Illusion"] },
{ word: "POMPIER",     forbidden: ["Feu","Caserne","Lance","Camion","Sauver"] },
{ word: "CHÂTEAU",     forbidden: ["Roi","Moyen-Âge","Tour","Pierre","Pont-levis"] },
{ word: "DINOSAURE",   forbidden: ["Préhistoire","Fossile","Extinction","Reptile","Jurassique"] },
{ word: "ROBOT",       forbidden: ["Machine","Métal","Programme","Humanoïde","Artificiel"] },
{ word: "SORCIÈRE",    forbidden: ["Balai","Magie","Chapeau","Sort","Halloween"] },
{ word: "PRISON",      forbidden: ["Criminel","Cellule","Gardien","Peine","Barreaux"] },
{ word: "MARIAGE",     forbidden: ["Noces","Bague","Mariée","Amour","Cérémonie"] },
{ word: "ANNIVERSAIRE",forbidden: ["Gâteau","Bougie","Cadeau","Fête","Âge"] },
{ word: "SUPERMARCHÉ", forbidden: ["Courses","Caddie","Caisse","Rayon","Acheter"] },
{ word: "BIBLIOTHÈQUE",forbidden: ["Livre","Lire","Silence","Emprunt","Rayonnage"] },
{ word: "VOLCAN",      forbidden: ["Lave","Éruption","Magma","Cratère","Explosion"] },
{ word: "PHARE",       forbidden: ["Lumière","Mer","Côte","Bateau","Signaler"] },
{ word: "TRAMWAY",     forbidden: ["Rail","Ville","Transport","Wagon","Électrique"] },
{ word: "IGLOO",       forbidden: ["Glace","Neige","Esquimau","Arctique","Froid"] },
{ word: "CHAMPIGNON",  forbidden: ["Forêt","Cueillir","Chapeau","Spore","Toxique"] },
{ word: "PARAPLUIE",   forbidden: ["Pluie","Abri","Imperméable","Vent","Ouvert"] },
{ word: "ESCALIER",    forbidden: ["Monter","Marche","Étage","Descendre","Rampe"] },
{ word: "MIROIR",      forbidden: ["Reflet","Verre","Image","Regarder","Symétrie"] },
{ word: "CACTUS",      forbidden: ["Épine","Désert","Plante","Eau","Vert"] },
{ word: "FANTÔME",     forbidden: ["Mort","Transparent","Hanter","Peur","Blanc"] },
{ word: "LOCOMOTIVE",  forbidden: ["Train","Rail","Vapeur","Wagons","Gare"] },
{ word: "AQUARIUM",    forbidden: ["Poisson","Eau","Verre","Algue","Bulle"] },
{ word: "GROTTE",      forbidden: ["Caverne","Sombre","Stalactite","Chauve-souris","Profond"] },
{ word: "COURONNE",    forbidden: ["Roi","Or","Tête","Royauté","Diamant"] },
{ word: "TRAMPOLINE",  forbidden: ["Sauter","Rebondir","Élastique","Sport","Hauteur"] },
{ word: "JUMELLES",    forbidden: ["Voir","Loin","Optique","Observer","Lentille"] },
{ word: "PARACHUTE",   forbidden: ["Sauter","Avion","Chute","Voile","Atterrir"] },
{ word: "CIMETIÈRE",   forbidden: ["Mort","Tombe","Fantôme","Pierre","Enterrer"] },
{ word: "ACCORDÉON",   forbidden: ["Musique","Soufflet","Touches","Valse","Bretagne"] },
{ word: "PENDULE",     forbidden: ["Temps","Balancer","Horloge","Tic-tac","Cadran"] },
{ word: "MOULIN",      forbidden: ["Vent","Aile","Farine","Campagne","Tourner"] },
{ word: "CANAPÉ",      forbidden: ["Asseoir","Salon","Coussin","Meuble","Allonger"] },
{ word: "GUITARE",      forbidden: ["Corde","Musique","Jouer","Rock","Instrument"] },
{ word: "NUAGE",        forbidden: ["Ciel","Pluie","Blanc","Gris","Météo"] },
{ word: "BOUTEILLE",    forbidden: ["Verre","Liquide","Bouchon","Eau","Remplir"] },
{ word: "ESCALADE",     forbidden: ["Grimper","Rocher","Corde","Sommet","Sport"] },
{ word: "HIBOU",        forbidden: ["Nuit","Oiseau","Yeux","Forêt","Chouette"] },
{ word: "TAPIS",        forbidden: ["Sol","Tissu","Salon","Moelleux","Poser"] },
{ word: "CERISE",       forbidden: ["Fruit","Rouge","Queue","Gâteau","Petit"] },
{ word: "KANGOUROU",    forbidden: ["Poche","Australie","Sauter","Marsupial","Animal"] },
{ word: "LAMPE",        forbidden: ["Lumière","Ampoule","Électrique","Allumer","Bureau"] },
{ word: "CIGOGNE",      forbidden: ["Oiseau","Bébé","Blanc","Nid","Alsace"] },
{ word: "MASQUE",       forbidden: ["Visage","Cacher","Carnaval","Protection","Déguisement"] },
{ word: "TOBOGGAN",     forbidden: ["Glisser","Parc","Enfant","Descendre","Plastique"] },
{ word: "FOURMI",       forbidden: ["Insecte","Colonie","Petit","Travail","Fourmilière"] },
{ word: "BUFFET",       forbidden: ["Meuble","Cuisine","Vaisselle","Tiroir","Bois"] },
{ word: "DAUPHIN",      forbidden: ["Mer","Intelligent","Nager","Mammifère","Sonar"] },
{ word: "TORNADE",      forbidden: ["Vent","Tourbillon","Destruction","Météo","Aspirer"] },
{ word: "BRIOCHE",      forbidden: ["Pain","Boulangerie","Moelleux","Beurre","Dorée"] },
{ word: "LANTERNE",     forbidden: ["Lumière","Nuit","Flamme","Papier","Chinoise"] },
{ word: "CROCODILE",    forbidden: ["Dents","Reptile","Rivière","Vert","Dangereux"] },
{ word: "PANTOUFFLE",   forbidden: ["Pied","Maison","Confort","Chaussure","Molle"] },
{ word: "MICROSCOPE",   forbidden: ["Voir","Petit","Science","Lentille","Laboratoire"] },
{ word: "CERF-VOLANT",  forbidden: ["Vent","Ciel","Ficelle","Voler","Enfant"] },
{ word: "CONFESSION",   forbidden: ["Église","Prêtre","Péché","Secret","Pardonner"] },
];

/* ========================================
   ÉTAT
   ======================================== */
const state = {
  teams:       ["Équipe 1", "Équipe 2"],
  scores:      [0, 0],
  manche:      1,
  activeTeam:  0,
  toursMax:    [3, 3],
  toursPlayed: [[0, 0], [0, 0]],
  timerMax:    [60, 45],
  timerLeft:   60,
  timerInterval: null,
  turnScore:   0,
  usedWords:   [],
  cardIndex:   0,
  shuffledCards: [],
};

/* ========================================
   UTILITAIRES
   ======================================== */
function $(id) { return document.getElementById(id); }

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
}

function showPanel(id) {
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  $(id).classList.add("active");
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function flash(type) {
  const el = $("flash-overlay");
  el.className = `flash-overlay ${type} show`;
  setTimeout(() => el.classList.remove("show"), 300);
}

function spawnConfettis(n) {
  const c = $("confetti-container");
  c.innerHTML = "";
  const colors = ["#e94560","#f5a623","#2ecc71","#3498db","#9b59b6","#fff"];
  for (let i = 0; i < n; i++) {
    const p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.left     = Math.random() * 100 + "vw";
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration  = (Math.random() * 2 + 2) + "s";
    p.style.animationDelay     = (Math.random() * 2) + "s";
    p.style.borderRadius       = Math.random() > 0.5 ? "50%" : "2px";
    c.appendChild(p);
  }
}

/* ========================================
   SETUP
   ======================================== */
function initSetup() {
  // rien de spécial, les valeurs par défaut sont dans le HTML
}

function startGame() {
  const t1 = $("team1-name").value.trim() || "Équipe 1";
  const t2 = $("team2-name").value.trim() || "Équipe 2";
  state.teams  = [t1, t2];
  state.scores = [0, 0];

  const tm1 = parseInt($("timer1").value) || 60;
  const tm2 = parseInt($("timer2").value) || 45;
  state.timerMax = [tm1, tm2];

  const tr1 = parseInt($("tours1").value) || 3;
  const tr2 = parseInt($("tours2").value) || 3;
  state.toursMax    = [tr1, tr2];
  state.toursPlayed = [[0, 0], [0, 0]];

  state.manche     = 1;
  state.activeTeam = 0;
  state.usedWords  = [];
  state.cardIndex  = 0;
  state.shuffledCards = shuffle(forbiddenCards);

  showScreen("game-screen");
  updateHeader();
  startIdle();
}

/* ========================================
   HEADER
   ======================================== */
function updateHeader() {
  $("header-team0").textContent  = state.teams[0];
  $("header-team1").textContent  = state.teams[1];
  $("header-score0").textContent = state.scores[0];
  $("header-score1").textContent = state.scores[1];
  $("manche-badge").textContent  = `Manche ${state.manche}`;
}

/* ========================================
   IDLE
   ======================================== */
function startIdle() {
  const m  = state.manche - 1;
  const t  = state.activeTeam;
  const played = state.toursPlayed[m][t];
  const max    = state.toursMax[m];

  $("idle-team-name").textContent = state.teams[t];
  $("idle-info").textContent = `Tour ${played + 1} / ${max}`;
  showPanel("idle-panel");
  resetTimerDisplay();
}

function resetTimerDisplay() {
  const m = state.manche - 1;
  const max = state.timerMax[m];
  $("timer-display").textContent = max;
  updateRing(max, max);
  $("timer-display").style.color = "";
}

/* ========================================
   DÉBUT DE TOUR
   ======================================== */
function beginTurn() {
  state.turnScore = 0;
  updateTurnScore();
  startTimer();

  if (state.manche === 1) {
    loadNextWord();
    showPanel("turn-panel");
  } else {
    loadNextForbiddenCard();
    showPanel("forbidden-panel");
  }
}

/* ========================================
   MANCHE 1 — MOTS
   ======================================== */
function loadNextWord() {
  const available = wordBank.filter(w => !state.usedWords.includes(w));
  if (available.length === 0) {
    state.usedWords = [];
    return loadNextWord();
  }
  const word = available[Math.floor(Math.random() * available.length)];
  state.usedWords.push(word);
  $("current-word").textContent = word;
}

/* ========================================
   MANCHE 2 — CARTES INTERDITES
   ======================================== */
function loadNextForbiddenCard() {
  if (state.cardIndex >= state.shuffledCards.length) {
    state.cardIndex = 0;
    state.shuffledCards = shuffle(forbiddenCards);
  }
  const card = state.shuffledCards[state.cardIndex++];
  $("forbidden-word").textContent = card.word;
  const list = $("forbidden-list");
  list.innerHTML = "";
  card.forbidden.forEach(f => {
    const tag = document.createElement("span");
    tag.className = "forbidden-tag";
    tag.textContent = f;
    list.appendChild(tag);
  });
}

/* ========================================
   ACTIONS EN COURS DE TOUR
   ======================================== */
function correctWord() {
  state.turnScore++;
  flash("green");
  updateTurnScore();
  if (state.manche === 1) loadNextWord();
  else loadNextForbiddenCard();
}

function wrongWord() {
  flash("red");
  if (state.manche === 1) loadNextWord();
  else loadNextForbiddenCard();
}

function updateTurnScore() {
  $("turn-score").textContent  = state.turnScore;
  $("turn-score-2").textContent = state.turnScore;
}

/* ========================================
   TIMER
   ======================================== */
function startTimer() {
  const m = state.manche - 1;
  state.timerLeft = state.timerMax[m];
  clearInterval(state.timerInterval);

  state.timerInterval = setInterval(() => {
    state.timerLeft--;
    $("timer-display").textContent = state.timerLeft;
    updateRing(state.timerLeft, state.timerMax[m]);

    // Couleur
    if (state.timerLeft <= CONFIG.dangerTime) {
      $("ring-fg").style.stroke = "var(--red)";
      $("timer-display").style.color = "var(--red)";
    } else if (state.timerLeft <= CONFIG.warningTime) {
      $("ring-fg").style.stroke = "var(--gold)";
      $("timer-display").style.color = "var(--gold)";
    } else {
      $("ring-fg").style.stroke = "var(--green)";
      $("timer-display").style.color = "";
    }

    if (state.timerLeft <= 0) {
      clearInterval(state.timerInterval);
      endTurn();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(state.timerInterval);
}

function updateRing(left, max) {
  const circumference = 264;
  const offset = circumference - (left / max) * circumference;
  $("ring-fg").style.strokeDashoffset = offset;
}

/* ========================================
   FIN DE TOUR
   ======================================== */
function endTurn() {
  const t = state.activeTeam;
  const m = state.manche - 1;

  state.scores[t] += state.turnScore;
  state.toursPlayed[m][t]++;

  updateHeader();

  $("end-turn-score").textContent = state.turnScore;
  $("end-turn-team").textContent  = `+${state.turnScore} pts pour ${state.teams[t]}`;
  showPanel("end-turn-panel");
}

function nextTurn() {
  const m = state.manche - 1;

  // Vérifier si les deux équipes ont fini leurs tours
  const eq0fini = state.toursPlayed[m][0] >= state.toursMax[m];
  const eq1fini = state.toursPlayed[m][1] >= state.toursMax[m];

  if (eq0fini && eq1fini) {
    // Manche terminée
    if (state.manche === 1) {
      // Passer manche 2
      state.manche = 2;
      state.activeTeam = 0;
      updateHeader();
      startIdle();
    } else {
      // Partie terminée
      showEndScreen();
    }
    return;
  }

  // Changer d'équipe si l'autre n'a pas fini
  const autreTeam = state.activeTeam === 0 ? 1 : 0;
  if (state.toursPlayed[m][autreTeam] < state.toursMax[m]) {
    state.activeTeam = autreTeam;
  }
  // sinon on reste sur la même équipe

  startIdle();
}

/* ========================================
   FIN DE PARTIE
   ======================================== */
function showEndScreen() {
  showScreen("end-screen");

  $("end-team0").textContent  = state.teams[0];
  $("end-team1").textContent  = state.teams[1];
  $("end-score0").textContent = state.scores[0];
  $("end-score1").textContent = state.scores[1];

  let winnerText;
  if (state.scores[0] > state.scores[1]) {
    winnerText = `🏆 ${state.teams[0]} gagne !`;
  } else if (state.scores[1] > state.scores[0]) {
    winnerText = `🏆 ${state.teams[1]} gagne !`;
  } else {
    winnerText = "🤝 ÉGALITÉ !";
  }

  $("end-winner").textContent = winnerText;
  spawnConfettis(80);
}

/* ========================================
   ADMIN
   ======================================== */
function toggleAdmin() {
  $("admin-panel").classList.toggle("open");
  updateAdminPanel();
}

function closeAdmin() {
  $("admin-panel").classList.remove("open");
}

function updateAdminPanel() {
  $("admin-score-0").textContent = state.scores[0];
  $("admin-score-1").textContent = state.scores[1];
  $("admin-team-0").textContent  = state.teams[0];
  $("admin-team-1").textContent  = state.teams[1];
  $("admin-manche-info").textContent = `Manche ${state.manche}`;

  for (let m = 0; m < 2; m++) {
    for (let t = 0; t < 2; t++) {
      const el = $(`admin-tours-${m}-${t}`);
      if (el) el.textContent = `${state.toursPlayed[m][t]}/${state.toursMax[m]}`;
    }
  }
}

function adminScore(teamIdx, delta) {
  state.scores[teamIdx] = Math.max(0, state.scores[teamIdx] + delta);
  updateHeader();
  updateAdminPanel();
}

function adminNextManche() {
  if (state.manche < 2) {
    state.manche = 2;
    state.activeTeam = 0;
    state.cardIndex = 0;
    state.toursPlayed[1] = [0, 0];
    pauseTimer();
    closeAdmin();
    updateHeader();
    startIdle();
  }
}

function adminNextTeam() {
  state.activeTeam = state.activeTeam === 0 ? 1 : 0;
  pauseTimer();
  closeAdmin();
  startIdle();
}

function adminReset() {
  if (!confirm("Réinitialiser la partie ?")) return;
  pauseTimer();
  state.scores      = [0, 0];
  state.toursPlayed = [[0, 0], [0, 0]];
  state.manche      = 1;
  state.activeTeam  = 0;
  state.usedWords   = [];
  state.cardIndex   = 0;
  state.turnScore   = 0;
  closeAdmin();
  showScreen("setup-screen");
}

/* ========================================
   PLEIN ÉCRAN
   ======================================== */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

/* ========================================
   INIT
   ======================================== */
document.addEventListener("DOMContentLoaded", () => {
  showScreen("setup-screen");
});


