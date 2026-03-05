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
  "Ukulélé","Vampire","Xylophone","Yéti","Zeppelin",
  "Accordéon","Boulangerie","Crocodile","Détective","Escargot",
  "Forgeron","Grotte","Hamster","Idole","Jonquille",
  "Kayak","Lionceau","Météore","Nomade","Optique",
  "Phare","Rubis","Sorcière","Tornade","Uniforme",
];

const forbiddenCards = [
  { word: "SOLEIL",    forbidden: ["Astre","Chaleur","Lumière","Étoile","Jour"] },
  { word: "PLAGE",     forbidden: ["Mer","Sable","Vacances","Baignade","Bronzer"] },
  { word: "VOITURE",   forbidden: ["Auto","Conduire","Roue","Route","Moteur"] },
  { word: "MAISON",    forbidden: ["Habiter","Toit","Porte","Mur","Logement"] },
  { word: "CHAT",      forbidden: ["Animal","Félin","Ronron","Griffes","Moustaches"] },
  { word: "PIANO",     forbidden: ["Musique","Touche","Instrument","Jouer","Notes"] },
  { word: "FOOTBALL",  forbidden: ["Ballon","But","Terrain","Joueur","Sport"] },
  { word: "PIZZA",     forbidden: ["Fromage","Italie","Four","Tomate","Pâte"] },
  { word: "LIVRE",     forbidden: ["Lire","Page","Auteur","Roman","Bibliothèque"] },
  { word: "MONTAGNE",  forbidden: ["Sommet","Neige","Ski","Altitude","Rocher"] },
  { word: "CINÉMA",    forbidden: ["Film","Acteur","Écran","Salle","Ticket"] },
  { word: "BATEAU",    forbidden: ["Mer","Naviguer","Voile","Capitaine","Flotter"] },
  { word: "FORÊT",     forbidden: ["Arbre","Bois","Nature","Animal","Ombre"] },
  { word: "AVION",     forbidden: ["Voler","Aéroport","Pilote","Ciel","Aile"] },
  { word: "ÉCOLE",     forbidden: ["Élève","Classe","Professeur","Apprendre","Cahier"] },
  { word: "CHIEN",     forbidden: ["Animal","Aboyer","Laisse","Race","Fidèle"] },
  { word: "CUISINE",   forbidden: ["Cuisinier","Recette","Casserole","Feu","Manger"] },
  { word: "JARDIN",    forbidden: ["Fleur","Plante","Arroser","Pelouse","Nature"] },
  { word: "HÔPITAL",   forbidden: ["Médecin","Malade","Infirmier","Soin","Urgence"] },
  { word: "DÉSERT",    forbidden: ["Sable","Chaleur","Oasis","Dune","Sahara"] },
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
