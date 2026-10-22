const monthNames = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
];

const dayNames = [
    'Domenica',
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì',
    'Sabato',
];

const now = new Date();
const getYear = now.getFullYear();
const getMonth = now.getMonth();
const appointments = [];

// Scriviamo il nome del mese
const printCurrentMonth = () => {
    const title = document.querySelector('h1');
    const currentMonth = monthNames[getMonth];
    title.innerText = currentMonth;
};

window.onload = (e) => {
    printCurrentMonth();
    createDays(dayInThisMonth());
};

// Calcoliamo il numero di giorni
const dayInThisMonth = () => {
    const lastDayInMonth = new Date(getYear, getMonth + 1, 0); // Gli sto chiedendo il giorno 0 del mese successivo; poiché la data non esiste e 0 è il numero che viene prima di 1, lo 0 del mese successivo sarà l'ultimo giorno del mese in corso
    const numberOfDays = lastDayInMonth.getDate();
    return numberOfDays;
};

// Creiamo la griglia
const createDays = (daysNumber) => {
    const calendarDiv = document.querySelector('#calendar');
    for (let i = 0; i < daysNumber; i++) {
        const dayCellDiv = document.createElement('div');
        dayCellDiv.classList.add('day');
        // le celle dovranno essere cliccabili
        dayCellDiv.addEventListener('click', function () {
            // scrivere la fuznione del click
        });
        // numero del giorno
        const cellValue = document.createElement('h3');
        const thisDate = i + 1;
        if (thisDate == now.getDate()) {
            dayCellDiv.classList.add('currentDay');
        }
        // domeniche in rosso
        let thisDay = new Date(now.getFullYear(), now.getMonth(), thisDate);
        if (thisDay.getDay() === 0) {
            cellValue.classList.add('sunday');
        }
        // nome del giorno
        let dayNumber = thisDay.getDay();
        let dayName = dayNames[dayNumber];
        cellValue.innerText = `${dayName} ${i + 1}`;
        dayCellDiv.appendChild(cellValue);
        calendarDiv.appendChild(dayCellDiv);
    }
};