// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.

// Milestone 4, opzionale per oggi:
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

// Milestone 5
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
// Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti.

Vue.config.devtools = true;
const app = new Vue({
	el: '#root',
	data: {
		showUnderMenu: false,
		activeContact: 0,
		userMessage: '',
		userFilter: '',
		contacts: [
			{
				name: 'Michele',
				avatar: '_1',
				visible: true,
				lastAccess: dayjs().format('16:15'),
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Hai portato a spasso il cane?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:50:00',
						text: 'Ricordati di dargli da mangiare',
						status: 'sent'
					},
					{
						date: '10/01/2020 16:15:22',
						text: 'Tutto fatto!',
						status: 'received'
					}
				]
			},
			{
				name: 'Fabio',
				avatar: '_2',
				visible: true,
				lastAccess: dayjs().format('16:30'),
				messages: [
					{
						date: '20/03/2020 16:30:00',
						text: 'Ciao come stai?',
						status: 'sent'
					},
					{
						date: '20/03/2020 16:30:55',
						text: 'Bene grazie! Stasera ci vediamo?',
						status: 'received'
					},
					{
						date: '20/03/2020 16:35:00',
						text: 'Mi piacerebbe ma devo andare a fare la spesa.',
						status: 'sent'
					}
				]
			},
			{
				name: 'Samuele',
				avatar: '_3',
				visible: true,
				lastAccess: dayjs().format('16:15'),
				messages: [
					{
						date: '28/03/2020 10:10:40',
						text: 'La Marianna va in campagna',
						status: 'received'
					},
					{
						date: '28/03/2020 10:20:10',
						text: 'Sicuro di non aver sbagliato chat?',
						status: 'sent'
					},
					{
						date: '28/03/2020 16:15:22',
						text: 'Ah scusa!',
						status: 'received'
					}
				]
			},
			{
				name: 'Luisa',
				avatar: '_4',
				visible: true,
				lastAccess: dayjs().format('15:50'),
				messages: [
					{
						date: '10/01/2020 15:30:55',
						text: 'Lo sai che ha aperto una nuova pizzeria?',
						status: 'sent'
					},
					{
						date: '10/01/2020 15:50:00',
						text: 'Si, ma preferirei andare al cinema',
						status: 'received'
					}
				]
			}
		]
	},
	created() {
		// (1) Pushare nuova key all'interno di un oggetto\\\\\\\\\!!!!
		// this.contacts.forEach((contact) => {
		// 	contact.messages.forEach((message) => {
		// 		// message.showUnderMenu = false;
		// 		message = Object.assign({showUnderMenu:false},)
		// 	});
		// });
	},
	methods: {
		selectActiveContact: function(index) {
			this.activeContact = index;
		},
		sendMessage: function() {
			if (this.userMessage.trim() === '') return;
			this.contacts[this.activeContact].messages.push({
				text: this.userMessage,
				status: 'sent',
				date: dayjs().format('DD/MM/YYYY HH:mm:ss')
				// (1) showUnderMenu: false
			});
			this.userMessage = '';
			this.automaticMessage();
		},
		automaticMessage: function() {
			setTimeout(() => {
				this.contacts[this.activeContact].messages.push({
					text: 'ok',
					status: 'received',
					date: dayjs().format('DD/MM/YYYY HH:mm:ss')
					// (1) showUnderMenu: false
				});
				this.contacts[this.activeContact].lastAccess = dayjs().format('HH:mm');
			}, 1000);
		},
		filterContact: function() {
			this.contacts.forEach((element) => {
				if (element.name.toLowerCase().includes(this.userFilter.toLowerCase().trim())) {
					element.visible = true;
				} else {
					element.visible = false;
				}
			});
		},
		toggleShowUnderMenu: function(index) {
			// (1) console.log(this.contacts[this.activeContact].messages[index].showUnderMenu);
			// (1) this.contacts[this.activeContact].messages[index].showUnderMenu = true;
			console.log('PRE: ', this.showUnderMenu, index);
			if (this.showUnderMenu !== index) {
				this.showUnderMenu = index;
			} else {
				this.showUnderMenu = false;
			}
			console.log('post: ', this.showUnderMenu, index);
		},
		deleteMessage: function(index) {
			this.contacts[this.activeContact].messages.splice(index, 1);
			console.log(this.showUnderMenu);
			this.showUnderMenu = false;
		}
	}
});
