const MIN = 1;
const MAX = 90;
const LEVEL = 5;

const play = document.getElementById('play');
const memorize = document.getElementById('memorize');
const box = document.getElementById('box');
memorize.classList.add('invisible');
box.classList.add('invisible');

play.addEventListener('click', function() {

    // invisibile il bottone play
    play.classList.add('invisible');
    // visibili i numeri
    box.classList.remove('invisible');
    box.classList.add('visible');
    // visibile il messaggio di memorizzazione
    memorize.classList.remove('invisible');
    memorize.classList.add('visible');
    
    // genero la sequenza di numeri
    const numbers = generateSequence(); 

    //stampo dentro a box la sequenza con gli spazi
    const displayNumbers = numbers.map(number => {
        return ' ' + number;
    });
    box.innerHTML = displayNumbers;

    //dopo 30 secondi i numeri spariscono e viene chiesto di indovinarli
    setTimeout(() => {
        // invisibili i numeri
        box.classList.remove('visible');
        box.classList.add('invisible');
        // invisibile il messaggio di memorizzazione
        memorize.classList.remove('visible');
        memorize.classList.add('invisible');

        // chiedo i numeri all'utente eliminando le ripetizioni
        //senza usare lo spread (con parentesi quadre), userSequence sarebbe stato un oggetto Set,
        //cioè una collection di valori unici presi dall'array restituito da askSequence();
        //l'operatore spread serve ad espandere un oggetto iterabile (es: array, collection, ecc) 
        //e ad accedere a ciascuno dei suoi elementi, quindi copio tutti gli elementi del set dentro a userSequence
        let userSequence = [...new Set(askSequence())];

        //se l'utente NON ha cliccato annulla in input, salvo in array i numeri indovinati e termino il gioco
        if(userSequence.length != 0) { 
            const guessedNumbers = [];
            userSequence.forEach(number => {
                if(numbers.includes(number)) {
                    guessedNumbers.push(number);
                }
            });
            // stampo messaggio di fine partita
            gameOver(guessedNumbers);
        }
        //se l'utente clicca annulla stampo sulla pagina ":("
        else {
            const boo = document.getElementById('boo');
            boo.innerHTML = ':(';
        }
    }, 30000);
    
    
});



// genera e ritorna l'array contenente i numeri da indovinare
function generateSequence() {
    const array = [];
    while(array.length < LEVEL) {
        let currentNumber = randomNumber(MIN, MAX);
        if(!array.includes(currentNumber)) {
            array.push(currentNumber);
        }
    }

    return array;
}



// ritorna numero casuare compreso tra 1 e 90
function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// chiede i numeri all'utente effettuando controlli sul dato, restituisce la sequenza inserita
function askSequence () {

    let i = 1;
    let exit = false;
    const inputSequence = [];

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
            // aggiungo il numero in input alla sequenza di input
            inputSequence.push(parseInt(input));
            // incremento il contatore del ciclo
            i++;
        }
    } while (!exit && i<=LEVEL); //esco se l'utente clicca annulla o se ho ciclato tutti i numeri

    return inputSequence;
}



// stampa messaggio di fine partita
function gameOver(guessedNumbers){
    const gameOver = document.getElementById('game-over');
    if (guessedNumbers.length == 1) {
        gameOver.innerHTML = `${guessedNumbers.length} numero indovinato - game over`;
    } else if (guessedNumbers.length < LEVEL) {
        gameOver.innerHTML = `${guessedNumbers.length} numeri indovinati  - game over`;
    } else {
        gameOver.innerHTML = 'win win - hai indovinato tutti i numeri!';
    }

    // stampo i numeri indovinati
    box.classList.remove('invisible');
    box.classList.add('visible');
    box.innerHTML = guessedNumbers;
}

