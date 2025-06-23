export interface RuleSection {
	id: string;
	title: string;
	content: string[];
}

export const rulesSections: RuleSection[] = [
	{
		id: "intro",
		title: "Introduzione e Obiettivo del Gioco",
		content: [
			"Benvenuto a Happy Little Dinosaurs! In questo gioco, sei un Dinosauro e la vita cerca ripetutamente di prenderti a pugni in faccia. Farai del tuo meglio per evitare disastri Naturali, Predatori ed Emozionali mentre schivi le Meteore e, proprio come nel mondo reale, probabilmente fallirai.",
			"Ma continua a rialzarti, perché il primo Dinosauro a raggiungere 50 punti (o l'ultimo Dinosauro rimasto in gioco) vince la partita! Yay!",
			"Obiettivo: Essere il primo a raggiungere 50 punti sulla propria Pista di Fuga o essere l'ultimo Dinosauro rimasto in gioco.",
		],
	},
	{
		id: "how-to-play",
		title: "Come si Gioca (Svolgimento di un Round)",
		content: [
			"1. Rivela Disastro: Gira a faccia in su la prima carta del Mazzo Disastri e leggila ad alta voce.",
			"2. Gioca Carte Punto: Ogni giocatore sceglie una Carta Punto dalla propria mano e la piazza a faccia in giù. Se un giocatore non ha Carte Punto, scarta la mano e pesca 5 nuove carte (ripetendo finché non ha una Carta Punto).",
			"3. Rivela Carte Punto: Tutti i giocatori rivelano simultaneamente le loro Carte Punto.",
			"4. Calcolo Punteggio: Il giocatore con il punteggio più alto (dato dal valore della Carta Punto più eventuali bonus/malus da Tratti Dinosauro, effetti di carte) guadagna punti pari al suo punteggio e muove la sua pedina sulla Pista di Fuga.",
			"5. Assegna Disastro: Il giocatore con il punteggio più basso aggiunge la Carta Disastro scoperta alla sua Area Disastri. Se un giocatore aggiunge una Carta Disastro, può scartare una carta dalla sua mano.",
			"6. Fine Round: Ogni giocatore muove la sua pedina Dinosauro avanti sulla Pista di Fuga di un numero di spazi pari al numero di disastri nella sua Area Disastri. Poi, ogni giocatore pesca carte dal Mazzo Principale fino ad averne 5 in mano. Le Carte Punto e Istantanee giocate vanno nella pila degli scarti.",
		],
	},
	{
		id: "disaster-cards",
		title: "Carte Disastro",
		content: [
			"Tipi: Naturali (simbolo foglia, verdi), Predatori (simbolo artiglio, rosse), Emozionali (simbolo cuore spezzato, blu/viola).",
			"Carte Meteora: Sono Carte Disastro speciali che contano come jolly per qualsiasi tipo di disastro.",
			"Eliminazione: Sei eliminato se collezioni 3 Carte Disastro dello stesso tipo OPPURE 3 Carte Disastro di tipi diversi (una Meteora può completare un set).",
			"Bonus Punti Disastro: Alla fine di ogni round, per ogni Carta Disastro nella tua Area Disastri, muovi la tua pedina Dinosauro avanti di 1 spazio sulla Pista di Fuga.",
		],
	},
	{
		id: "dino-traits",
		title: "Tratti dei Dinosauri",
		content: [
			"Ogni Plancia Giocatore elenca i tratti specifici del Dinosauro. Questi tratti forniscono bonus (punti aggiuntivi) o malus (punti sottratti) al valore della tua Carta Punto quando affronti certi tipi di Carte Disastro.",
		],
	},
	{
		id: "point-cards",
		title: "Carte Punto",
		content: [
			"Hanno un valore da 0 a 9. Alcune hanno effetti speciali che si attivano dopo aver rivelato la carta ma prima del calcolo del punteggio. Se più giocatori giocano carte con effetti, si risolvono in ordine dal valore di carta più basso.",
		],
	},
	{
		id: "instant-cards",
		title: "Carte Istantanee",
		content: [
			"Possono essere giocate in momenti specifici, come indicato sulla carta, per modificare il gioco o salvarsi da un disastro.",
		],
	},
	{
		id: "tie-resolution",
		title: "Risoluzione dei Pareggi",
		content: [
			"Punteggio più Alto: Se più giocatori pareggiano per il punteggio più alto, tutti quei giocatori guadagnano punti.",
			"Punteggio più Basso: Se più giocatori pareggiano per il punteggio più basso, tutti quei giocatori aggiungono la Carta Disastro alla loro Area Disastri (sì, è brutto!). Se il Mazzo Disastri si esaurisce, il giocatore con più punti totali sceglie chi prende l'ultima Carta Disastro tra quelli in pareggio.",
		],
	},
	{
		id: "how-to-win",
		title: "Come Vincere",
		content: [
			"Il primo giocatore a raggiungere 50 punti sulla sua Pista di Fuga vince immediatamente!",
			"Alternativamente, se tutti gli altri giocatori sono stati eliminati, l'ultimo Dinosauro rimasto in gioco vince, indipendentemente dal suo punteggio.",
		],
	},
	{
		id: "two-player-rules",
		title: "Regole per 2 Giocatori",
		content: [
			"Quando si gioca in 2, ogni giocatore controlla due Dinosauri (due plance, due mani di carte separate, due pedine). Si gioca normalmente, ma si considera ogni Dinosauro come un giocatore separato per la vittoria e l'eliminazione.",
			"In alternativa, si può giocare con un solo Dinosauro a testa. In questo caso, se c'è un pareggio per il punteggio più basso, nessun giocatore prende la Carta Disastro.",
		],
	},
	{
		id: "player-count",
		title: "Numero di Giocatori",
		content: [
			"Il gioco base è progettato per 2-4 giocatori.",
			"Con le espansioni (come '5-6 Player Expansion'), il gioco può supportare fino a 6 giocatori. Le regole di base rimangono le stesse, ma ci sono più componenti e potenzialmente nuove carte.",
		],
	},
];
