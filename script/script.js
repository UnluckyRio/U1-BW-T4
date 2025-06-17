// script.js

const questions = [
  {
    type: "multiple",
    question: "Qual è il numero del Pokédex di Bulbasaur?",
    correct_answer: "#001",
    incorrect_answers: ["#004", "#007", "#025"],
  },
  {
    type: "multiple",
    question:
      "Quale tipo NON è presente in nessun Pokémon di Prima Generazione?",
    correct_answer: "Buio",
    incorrect_answers: ["Ghiaccio", "Drago", "Roccia"],
  },
  {
    type: "multiple",
    question: "In cosa si evolve Machop?",
    correct_answer: "Machoke",
    incorrect_answers: ["Machop non si evolve", "Hitmonlee", "Primeape"],
  },
  {
    type: "multiple",
    question: "Quanti Pokémon compongono ufficialmente la Prima Generazione??",
    correct_answer: "151",
    incorrect_answers: ["121", "101", "131"],
  },
  {
    type: "multiple",
    question: "Qual è il tipo di Gengar?",
    correct_answer: "Spettro e Veleno",
    incorrect_answers: ["Psico", "Spettro e Buio", "Spettro e Psico"],
  },
  {
    type: "multiple",
    question: "Quale Pokémon si evolve usando una Pietrafocaia?",
    correct_answer: "Eevee",
    incorrect_answers: ["Machop", "Pikachu", "Kadabra"],
  },
  {
    type: "multiple",
    question:
      "Chi è il Campione della Lega Pokémon di Kanto nei giochi Rosso e Blu?",
    correct_answer: "Gary (Blu)",
    incorrect_answers: ["Giovanni", "Brock", "Lance"],
  },
  {
    type: "multiple",
    question:
      "Quale tipo di mossa NON ha effetto contro i Pokémon di tipo Spettro?",
    correct_answer: "Normale",
    incorrect_answers: ["Buio", "Spettro", "Elettro"],
  },
  {
    type: "multiple",
    question: "Che tipo è il Pokémon Leggendario Mewtwo?",
    correct_answer: "Psico",
    incorrect_answers: ["Normale", "Veleno", "Drago"],
  },
  {
    type: "multiple",
    question:
      "Qual è l'unica mossa utilizzabile da Magikarp fino al livello 15?",
    correct_answer: "Splash",
    incorrect_answers: ["Azione", "Iper Raggio", "Pistolacqua"],
  },
];

let score = 0;
let questionNumber = 0;

// Riferimenti agli elementi del DOM
const questionContainer = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressCurrent = document.getElementById("current");
const progressTotal = document.getElementById("total");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const totalScoreEl = document.getElementById("total-score");

// Utility per mescolare l'array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Mostra la domanda corrente (o il punteggio finale)
function showQuestion() {
  // Se ho esaurito le domande, mostro il risultato
  if (questionNumber >= questions.length) {
    window.location.href = "../html/result.html?score";
    return;
  }

  // Aggiorno il tracker
  progressCurrent.textContent = questionNumber + 1;

  // Preparo la domanda e le risposte
  const q = questions[questionNumber];
  questionEl.textContent = q.question;

  let answers = [];
  if (q.type === "multiple") {
    answers = shuffle([q.correct_answer, ...q.incorrect_answers]);
  } else {
    // boolean
    answers = ["True", "False"];
  }

  // Pulisco e ricreo i bottoni
  answersEl.innerHTML = "";
  answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.classList.add("answer-btn");
    btn.textContent = ans;
    btn.addEventListener("click", () =>
      selectAnswer(btn, ans === q.correct_answer)
    );
    answersEl.appendChild(btn);
  });
}

// Gestione della selezione di una risposta
function selectAnswer(button, isCorrect) {
  if (isCorrect) {
    score++;
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }

  // Disabilito tutte le risposte per evitare doppie selezioni
  document.querySelectorAll(".answer-btn").forEach((b) => (b.disabled = true));

  // Passo alla prossima dopo una pausa
  setTimeout(() => {
    questionNumber++;
    showQuestion();
  }, 1000);
}

// Setup iniziale al caricamento della pagina
window.addEventListener("DOMContentLoaded", () => {
  // Imposto il totale per il tracker
  progressTotal.textContent = questions.length;

  // Avvio il quiz
  showQuestion();
});
