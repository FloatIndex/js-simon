const MIN = 1;
const MAX = 90;
const LEVEL = 5;

const displayNumbers = [];
const numbers = [];
const box = document.getElementById('box');

// creo displayNumbers[] e differenzio i due array solo per spaziare i numeri nell'html
for (let i = 0; i < LEVEL; i++) {
    numbers.push(randomNumber(MIN, MAX));
    displayNumbers.push(' ' + numbers[i]);
}

box.innerHTML = numbers;

let i = 1;
let exit = false;
let guessed = 0;
do {
    let input = prompt('Inserisci ' + i + '° numero');
    // controllo se l'utente clicca annulla
    if (input == null) {
        alert("Va bene, giocheremo un'altra volta :)");
        exit = true;
    // messaggio di errore se non viene inserito un dato corretto
    } else if (isNaN(parseInt(input))) {
        alert('Dato non corretto');
    // il dato è corretto
    } else { 
        // controllo se il numero corrisponde a uno tra quelli dati
        if (numbers.includes(parseInt(input))) {
            // incremento il contatore dei tentativi azzeccati
            guessed++;
        }
        // incremento il contatore del ciclo
        i++;
    }
} while (!exit && i<=LEVEL); //esco se l'utente clicca annulla o se ho ciclato tutti i numeri


const gameOver = document.getElementById('game-over');
if (guessed == 1) {
    gameOver.innerHTML = `${guessed} numero indovinato - game over`;
} else if (guessed < LEVEL) {
    gameOver.innerHTML = `${guessed} numeri indovinati  - game over`;
} else {
    gameOver.innerHTML = 'win win';
}







/* FUNZIONI */

function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}