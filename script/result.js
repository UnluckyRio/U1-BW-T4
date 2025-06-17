/* SCRIPT DEL RESULTS */

// Richiamo con un'evento listener l'altro script
window.addEventListener('DOMContentLoaded', () => {
  // Inidirizzo al sito locale
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
  // Funzione del testo centrale
  function testoCentrale() {
    // Chiedo se il risultato è maggiore
    if (corretti >= sbagliati) {
      return {
        // Eseguo questa
        text: "Congratulations!\nYou passed the exam.\nWe'll send you the \ncertificate in few minutes.\nCheck your email \n(including promotions / \nspam folder)",
        color: 'white', // Colore testo
        font: 'bold 20px Arial', // Font
      };
    } else {
      return {
        // Eseguo questa
        text: "Unfortunately\nYou didn't passed\nthe exam!\nRetry",
        color: 'white', // Colore testo
        font: 'bold 20px Outfit', // Font
      };
    }
  }
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
    },
    plugins: [
      {
        id: 'centerText', // Identificoi il nome del plugin
        afterDraw: (chart) => {
          // Riprendo testo, colore e font dalla funzione fatta in precedenza
          const { text, color, font } = testoCentrale();
          const ctx = chart.ctx;
          ctx.save(); // Salvo il donut allo stato corrente
          // Imposto font, colore, allineamento orizzontale e verticale
          ctx.font = font;
          ctx.fillStyle = color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const lines = text.split('\n'); // Divido il testo in più righe
          const lineHeight = 22; // Modifica per adattare il font
          // Trova il centro del grafico
          const centerY = chart.getDatasetMeta(0).data[0].y;
          const centerX = chart.getDatasetMeta(0).data[0].x;
          // Calcola l'altezza totale del blocco di testo
          const totalHeight = lineHeight * lines.length;
          // Per ogni riga, la disegna centrata
          lines.forEach((line, i) => {
            ctx.fillText(
              line, // Testo della riga
              centerX, // Posizione X (centro)
              centerY - totalHeight / 2 + i * lineHeight + lineHeight / 2 // Posizione Y, centrata
            );
          });
          ctx.restore(); // Ripristino lo stato del canvas
        },
      },
    ],
  });

  // CORRECT RESULTS

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

  // WRONG RESULT

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
