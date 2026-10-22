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
		dayCellDiv.addEventListener('click', function () {
			unselectAllDays(); // per deselezionare il giorno eventualmente selezionato prima
			dayCellDiv.classList.add('selected');
			changeMeetingDaySection(i);
			if (appointments[i].length > 0) {
				showAppointments(i);
			} else {
				document.querySelector('#appointments').style.display = 'none';
			}
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
		// Ci serve un array per ogni giorno, da pushare nell'array generale
		appointments.push([]);
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