/* SCRIPT DEL RESULTS */

// Inidirizzo al sito locale
window.addEventListener('DOMContentLoaded', () => {
  const resultsDonut = new URLSearchParams(window.location.search);
  // Salvo in una variabile gli score corretti
  const corretti = parseInt(resultsDonut.get('score'), 10);
  // Salvo in una variabile i corretti più il totale
  const totale = parseInt(resultsDonut.get('total'), 10);
  // Salvo in una varibile il totale - i corretti
  const sbagliati = totale - corretti;

  // Ciambella results
  const datiDonut = [sbagliati, corretti]; // Dati del donut
  // Grafico donut
  const ctx = document.getElementById('myDonutChart').getContext('2d');
  const myDonutChart = new Chart(ctx, {
    type: 'doughnut', // Scelgo il tipo di grafico che voglio visualizzare
    data: {
      datasets: [
        {
          data: datiDonut, // Mostro nel grafico il risultato
          backgroundColor: [' #900080', '#0ff'], // Font del grafico
          borderWidth: 0, // Bordi del grafico (di default sono visibili)
        },
      ],
    },
    options: {
      cutout: '70%', // Formato del grafico
      plugins: {
        centerText: {
          text: 'Ciao',
          color: ' #900080',
        },
      },
    },
    plugins: [CenterTextPlugin],
  });

  // Correct Results
  // Creo una funzione che mostri le risposte corrette in HTML
  const correct = () => {
    const correct_results = document.getElementById('left');
    // Creo 2 elementi (h1, p)
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    // Faccio la percentuale di risposte giuste
    const percentuale = Math.round((corretti / totale) * 100);
    // Mostro la percentuale di risposte corrette
    h2.textContent = `${percentuale}%`;
    // Mostro il numero di risposte corrette su risposte totali
    p.textContent = `${corretti}/${totale} Questions`;
    // Appendo il padre ai suoi rispettivi figli
    correct_results.appendChild(h2);
    correct_results.appendChild(p);
  };
  // Richiamo la funzione
  correct();

  // Wrong Resutls
  // Creo una funzione che mostri le rosposte sbagliate in HTML
  const wrong = function () {
    const wrong_results = document.getElementById('right');
    // Creo 2 elementi (h2, p)
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    // Faccio la percentuale di risposte sbagliate
    const percentuale = Math.round((sbagliati / totale) * 100);
    // Mostro la percentuale di risposte sbaglaite
    h2.textContent = `${percentuale}%`;
    // Mostro il numero di risposte sbagliate su risposte totali
    p.textContent = `${sbagliati}/${totale} Questions`;
    // Appendo i figli rispettivi al padre
    wrong_results.appendChild(h2);
    wrong_results.appendChild(p);
    console.log(wrong_results);
  };
  // Richiamo la funzione
  wrong();
});
