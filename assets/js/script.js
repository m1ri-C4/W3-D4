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

//funzione per rimuovere la selezione precedente 
const unselectAllDays = () => {
    const previousSelected = document.querySelector('.selected');//cerco l'elemento che ha la classe selected
    if (previousSelected) {
        previousSelected.classList.remove('selected'); // se esiste rimuovo la classe selected
    }
};

//la funzione riceve l'indice del giorno selezionato 
const changeMeetingDaySection = (dayNumber) => {
    const newMeetingDay = document.querySelector('#newMeetingDay'); //seleziona lo span che contiene inizialmente 'clicca su un giorno'
    newMeetingDay.innerText = dayNumber + 1; //sostituisco il testo con il numero delò giorno +1 perchè l'indice parte da 0
    newMeetingDay.classList.add('hasDay');// aggiungola classe CSS per modificare l'aspetto del numero selezionato
};

//funzione che mostra gli impegni del giorno selezionato
const showAppointments = (dayNumber) => {
    const dayAppointments = appointments[dayNumber]; //recupero l'array degli impegni di quel giorno
    const appointmentsList = document.querySelector('#appointments ul'); //seleziono l'ul dentro il div appointments
    appointmentsList.textContent = ''; //svuoto il contenuto precedente della lista affinchè non mostri gli impegni degli altri giorni 
    dayAppointments.forEach((appointment) => { //scorro tutti gli impegni del giorno con un forEach
        const newLi = document.createElement('li'); // creo un nuovo elemento li 
        newLi.innerText = appointment; //inserisco il testo dell'impegno dentro il li 
        appointmentsList.appendChild(newLi); //aggiungo il li al ul
    });
    document.querySelector('#appointments').style.display = 'block'; //rendo visibile la sezione degli impegni
};

// seleziono gli elementi per l'inserimento impegni
const meetingForm = document.querySelector('form');
const timeSelect = document.querySelector('#newMeetingTime');
const inputName = document.querySelector('#newMeetingName');
const submitBtn = document.querySelector('form button');

// aggiungo l'evento blur all'input orario che verrà eseguito quando esco dal campo 
timeSelect.addEventListener('blur', function (e) {
    if (timeSelect.value === '' || inputName.value === '') { // controllo se l'orario oppure il nome sono vuoti
        return; // se manca il valore interrompo la funzione
    } else {
        submitBtn.removeAttribute('disabled'); // rimuovo l'attributo disabled dal pulsante per permettere all'utente di cliccarlo 
        submitBtn.classList.remove('disabled'); // rimuovo anche la classe CSS disabled
    }
});

//aggiungo l'evento blur anche all'input del nome (fa le stesse cose della funzione dell'orario)
inputName.addEventListener('blur', function (e) {
    if (timeSelect.value === '' || inputName.value === '') {
        return;
    } else {
        submitBtn.removeAttribute('disabled');
        submitBtn.classList.remove('disabled');
    }
});

meetingForm.addEventListener('submit', formSubmit); //aggiungo l'evento submit al form, quando invio il form viene chiamata la funzione forSubmit

//creo la funzione che gestisce il salvataggio 
function formSubmit(e) {
    e.preventDefault(); //impedisco il comportamento predefinito del form, evbitando il caricamento della pagina 
    const selectedDay = document.querySelector('#newMeetingDay').textContent; // recuper il testo dello span che mostra il testo il giorno selezionato 
    if (selectedDay === 'Clicca su un giorno') { // se il giorno non è stato selezionato 
        alert("Selezionare un giorno prima di inserire l'evento"); // stampo l'alert
        meetingForm.reset(); //svuoto i campi del form
        return;//interrompo la fuzione senza salvare l'impegno
    }
    const meetingTime = document.querySelector('#newMeetingTime').value; //recupero il valore dell'input dell'orario
    const meetingName = document.querySelector('#newMeetingName').value; //recupero il valore dell'input del nome
    const meetingString = `${meetingTime} - ${meetingName}`; //crea una stringa usando orario e nome 
    const dayIndex = Number(selectedDay) - 1; //converto il giorno selezionato in numero e sottraggo 1 per ottenere l'indice dell'array
    appointments[dayIndex].push(meetingString);//aggiungo l'impegno nell'array del giorno corretto 
    meetingForm.reset();//svuoto i campi del form dopo il salvataggio
    showAppointments(dayIndex); //aggiorno la lista degli impegni del giorno

    // creo un elemento span per il pallino nei giorni con impegni
    const dot = document.createElement('span');
    dot.classList.add('dot');// assegno la classe dot allo span
    const selectedCell = document.querySelector('.selected'); //seleziono la casella del giorno attualmente selezionato 
    if (!selectedCell.querySelector('dot')) { //se nella casella non è presente un elemento dot
        selectedCell.appendChild(dot); //aggiungi il pallino alla casella del giorno 
    }
}