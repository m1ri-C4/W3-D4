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
    //JavaScript considera Domenica il giorno 0 
    'Domenica',
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì',
    'Sabato',
];

const now = new Date(); //creo un oggetto Date con data e ora attuali
const getYear = now.getFullYear(); //ottengo l'anno corrente
const getMonth = now.getMonth(); // ottengo il mese corrente (0-11)
// creo un array vuoto che conterrà tutti gli impegni
// successivamente ogni giorno avrà il proprio array
const appointments = [];

// scriviamo il nome del mese
const printCurrentMonth = () => {
    const title = document.querySelector('h1'); //seleziono l'elemento h1 da HTML
    const currentMonth = monthNames[getMonth]; // uso getMonth come indice dell'array monthNames, se getMonth è 9 ottengo "Ottobre"
    title.innerText = currentMonth; // inserisco il nome del mese come testo dell'h1
};

// quando la pagina ha terminato il caricamento, viene eseguita questa funzione 
window.onload = (e) => {
    printCurrentMonth(); // richiamo la funzione che stampa il nome 

    //creo i giorni del calendario 
    //dayInThisMonth() restituisce quanti giorni ha il mese 
    //il risultato viene passato a createDAys()
    createDays(dayInThisMonth());
};

//creo una funzione che restituisce il numero di giorni del mese corrente 
const dayInThisMonth = () => {

    /* creo una data indicando:
    getYear = anno corrente 
    getMonth + 1 = mese successivo
    0 = ultimo giorno del mese precedente, quindi l'ultimo giorno del mese corrente  */
    const lastDayInMonth = new Date(getYear, getMonth + 1, 0);
    const numberOfDays = lastDayInMonth.getDate(); // getDate restituisce il numero del giorno del mese, rispetto al mese sarà 28, 29, 30 o 31
    return numberOfDays; // restituisco il numero di giorni alla funzione che ha chiamato dayInThisMonth
};

// creo una funzione che riceve il numero di giorni del mese
const createDays = (daysNumber) => {

    // seleziono il div HTML con id="calendar", sarà il contenitore di tutte le caselle
    const calendarDiv = document.querySelector('#calendar');

    // ciclo for: ripeto il codice per ogni giorno, i parte da 0 e arriva fino a daysNumber - 1
    for (let i = 0; i < daysNumber; i++) {
        const dayCellDiv = document.createElement('div');  // creo un nuovo elemento div per il giorno
        dayCellDiv.classList.add('day'); // aggiungo la classe CSS "day" al div
        dayCellDiv.addEventListener('click', function () { // aggiungo un evento click alla casella del giorno
            unselectAllDays();// rimuovo la selezione dal giorno precedente
            dayCellDiv.classList.add('selected');// aggiungo la classe selected al giorno cliccato
            changeMeetingDaySection(i);// aggiorno la sezione di inserimento impegni, passo i, cioè l'indice del giorno cliccato

            // controllo se l'array del giorno contiene impegni, length > 0 significa che c'è almeno un impegno
            if (appointments[i].length > 0) {
                showAppointments(i);// mostro gli impegni del giorno cliccato
            } else {
                document.querySelector('#appointments').style.display = 'none'; // se non ci sono impegni, nascondo la sezione
            }
        });

        const cellValue = document.createElement('h3');  // creo un elemento h3 per mostrare il giorno
        const thisDate = i + 1;// converto l'indice i nel numero reale del giorno, i = 0 significa giorno 1
        if (thisDate == now.getDate()) {// controllo se il giorno creato corrisponde a oggi
            dayCellDiv.classList.add('currentDay');// aggiungo la classe CSS currentDay, per evidenziare il giorno corrente
        }
        // creo una data relativa al giorno del ciclo, mi serve per conoscere il giorno della settimana
        let thisDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            thisDate
        );
        if (thisDay.getDay() === 0) { // getDay() restituisce un numero da 0 a 6, 0 corrisponde alla domenica
            cellValue.classList.add('sunday');// aggiungo la classe sunday all'h3, per colorare di rosso le domeniche
        }
        const dayNumber = thisDay.getDay();// ottengo il numero del giorno della settimana
        const dayName = dayNames[dayNumber];// uso il numero per ottenere il nome da dayNames
        cellValue.innerText = `${dayName} ${i + 1}`;  // inserisco nell'h3 il nome e il numero del giorno
        dayCellDiv.appendChild(cellValue); // inserisco l'h3 all'interno del div del giorno
        calendarDiv.appendChild(dayCellDiv); // inserisco il div del giorno nel calendario

        appointments.push([]);// creo un array vuoto per il giorno corrente e lo aggiungo all'array generale appointments
    }
};


const unselectAllDays = () => {
    const previousSelected = document.querySelector('.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
};

const changeMeetingDaySection = (dayNumber) => {
    const newMeetingDay = document.querySelector('#newMeetingDay');
    newMeetingDay.innerText = dayNumber + 1;
    newMeetingDay.classList.add('hasDay');
};

const showAppointments = (dayNumber) => {
    const dayAppointments = appointments[dayNumber];
    const appointmentsList = document.querySelector('#appointments ul');
    appointmentsList.textContent = '';
    dayAppointments.forEach((appointment) => {
        const newLi = document.createElement('li');
        newLi.innerText = appointment;
        appointmentsList.appendChild(newLi);
    });
    document.querySelector('#appointments').style.display = 'block';
};

// Inserimento impegni
const meetingForm = document.querySelector('form');
const timeSelect = document.querySelector('#newMeetingTime');
const inputName = document.querySelector('#newMeetingName');
const submitBtn = document.querySelector('form button');

// Verifica form
timeSelect.addEventListener('blur', function (e) {
    if (timeSelect.value === '' || inputName.value === '') {
        return;
    } else {
        submitBtn.removeAttribute('disabled');
        submitBtn.classList.remove('disabled');
    }
});

inputName.addEventListener('blur', function (e) {
    if (timeSelect.value === '' || inputName.value === '') {
        return;
    } else {
        submitBtn.removeAttribute('disabled');
        submitBtn.classList.remove('disabled');
    }
});

meetingForm.addEventListener('submit', formSubmit);

function formSubmit(e) {
    e.preventDefault();
    const selectedDay = document.querySelector('#newMeetingDay').textContent;
    if (selectedDay === 'Clicca su un giorno') {
        alert("Selezionare un giorno prima di inserire l'evento");
        meetingForm.reset();
        return;
    }
    const meetingTime = document.querySelector('#newMeetingTime').value;
    const meetingName = document.querySelector('#newMeetingName').value;
    const meetingString = `${meetingTime} - ${meetingName}`;
    const dayIndex = Number(selectedDay) - 1;
    appointments[dayIndex].push(meetingString);
    meetingForm.reset();
    showAppointments(dayIndex);

    // Pallino nei giorni con impegni
    const dot = document.createElement('span');
    dot.classList.add('dot');
    const selectedCell = document.querySelector('.selected');
    if (!selectedCell.querySelector('dot')) {
        selectedCell.appendChild(dot);
    }
}