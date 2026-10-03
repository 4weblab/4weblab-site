type Zone = {
  name: string; territory: string; title: string; description: string; heroTitle: string; heroLead: string;
  territoryHeading: string; detail: string; benefitIntro: string;
  benefits: { title: string; text: string }[]; audience: string[]; faqs: readonly [string, string][];
};

const pricingFaq = (place: string): readonly [string, string] => [`Quanto costa un sito web a ${place}?`, 'Il costo dipende da pagine, contenuti, obiettivi e funzioni necessarie. Prima definiamo il perimetro del progetto, poi prepariamo un preventivo leggibile.'];
const timingFaq = (place: string): readonly [string, string] => [`Quanto tempo serve per realizzare un sito a ${place}?`, 'I tempi dipendono dalla struttura e dalla disponibilità dei contenuti. Dopo il primo confronto definiamo una sequenza di lavoro e una consegna realistica per il progetto.'];

export const areas = {
  padova: {
    name: 'Padova', territory: 'Padova e area urbana', title: 'Realizzazione e creazione siti web Padova | 4 Web Lab', description: 'Realizzazione siti web a Padova per attività locali, professionisti e PMI: struttura chiara, design su misura e SEO tecnica.',
    heroTitle: 'Siti web che generano clienti a Padova e provincia.', heroLead: 'Il web studio locale per artigiani, professionisti e PMI che vogliono crescere online. Chi cerca il tuo servizio a Padova deve trovare te, non il concorrente.',
    territoryHeading: 'Una città dove la ricerca conta.', detail: 'Padova concentra commercio, servizi, studi professionali e imprese con esigenze molto diverse. Un sito locale non deve limitarsi a nominare la città: deve spiegare bene l’offerta, rendere credibili competenze e contatti e farsi trovare nelle ricerche che precedono una scelta.',
    benefitIntro: 'Tre basi concrete per dare alla presenza digitale un ruolo utile nella ricerca locale.',
    benefits: [{ title: 'Presenza locale chiara', text: 'Servizi, area di lavoro e contatti diventano immediatamente leggibili per chi cerca da Padova e provincia.' }, { title: 'SEO tecnica e contenuti', text: 'Struttura, pagine e dati essenziali aiutano Google a comprendere attività, servizi e contesto territoriale.' }, { title: 'Un contatto semplice', text: 'Telefono, form e CTA accompagnano il passaggio dalla ricerca al confronto, senza complicarlo.' }],
    audience: ['Artigiani e attività locali', 'Professionisti e studi', 'PMI e aziende B2B'],
    faqs: [pricingFaq('Padova'), timingFaq('Padova'), ['Offrite SEO locale per posizionarsi su Padova?', 'Sì. Ogni progetto parte da una base SEO on-page: title, meta description, contenuti, collegamenti interni e dati strutturati sono progettati per rendere la pagina comprensibile ai motori di ricerca e alle persone.']],
  },
  legnaro: {
    name: 'Legnaro', territory: 'Legnaro e Saccisica', title: 'Web agency Legnaro | Siti web per attività e PMI | 4 Web Lab', description: 'Realizzazione siti web a Legnaro e nella Saccisica per attività, professionisti e PMI: confronto diretto, struttura chiara e SEO tecnica.',
    heroTitle: 'Sviluppo siti web a Legnaro per negozi e PMI.', heroLead: 'Sei un’attività della zona di Legnaro o della Saccisica? Progettiamo siti web chiari, sicuri e pronti a sostenere la ricerca su Google e i motori di risposta.',
    territoryHeading: 'Un territorio dall’identità mista.', detail: 'Legnaro non è solo la nostra sede operativa: qui convivono una tradizione agricola secolare, una zona industriale e artigianale attiva e un polo di ricerca di rilievo nazionale con i Laboratori Nazionali di Legnaro e le facoltà di Agraria e Medicina Veterinaria dell’Università di Padova. Che la tua attività sia agricola, artigianale o legata alla ricerca, il sito deve rispecchiarne l’identità: non essere un template generico.',
    benefitIntro: 'Tre vantaggi concreti per le attività di Legnaro, Saonara e di tutta la Saccisica.',
    benefits: [{ title: 'Prossimità reale', text: 'Nessun passaggio superfluo: parli direttamente con chi progetta e sviluppa il sito.' }, { title: 'Una base solida', text: 'Una struttura essenziale e manutenibile evita di aggiungere complessità dove non serve.' }, { title: 'Pronti per la ricerca', text: 'Il sito è organizzato per essere capito da Google e dai motori di risposta, oltre che dalle persone.' }],
    audience: ['Attività locali e servizi', 'Professionisti della Saccisica', 'Aziende agricole, artigianali e PMI'],
    faqs: [pricingFaq('Legnaro'), timingFaq('Legnaro'), ['Lavorate anche con aziende agricole o legate alla ricerca di Legnaro?', 'Sì. Seguiamo siti per aziende agricole e artigianali, attività scientifiche e formative: il progetto parte dalla specificità del lavoro e dalle informazioni che un potenziale cliente deve trovare.']],
  },
  'piove-di-sacco': {
    name: 'Piove di Sacco', territory: 'Piove di Sacco e Saccisica', title: 'Web agency Piove di Sacco | Siti web per negozi e PMI | 4 Web Lab', description: 'Realizzazione siti web a Piove di Sacco e nella Saccisica per negozi, professionisti e PMI: struttura chiara e SEO tecnica.',
    heroTitle: 'Sviluppo siti web a Piove di Sacco per negozi, studi e PMI.', heroLead: 'Per attività commerciali e professionisti della Saccisica: un sito utile per spiegare l’offerta, farsi trovare e rendere naturale il primo contatto.',
    territoryHeading: 'Il capoluogo della Saccisica.', detail: 'Piove di Sacco è il capoluogo non ufficiale della Saccisica, con un centro storico medievale e un commercio locale che punta a valorizzare botteghe storiche e negozi di vicinato. Il sito web è il passo naturale nella stessa direzione: deve rendere immediati prodotti, servizi e contatti.',
    benefitIntro: 'Tre vantaggi concreti per le attività di Piove di Sacco, Codevigo, Ponte Longo e della Saccisica.',
    benefits: [{ title: 'Un referente diretto', text: 'Il confronto parte da attività, pubblico e obiettivo: senza intermediazioni inutili.' }, { title: 'Informazioni in ordine', text: 'Il sito organizza ciò che serve prima di una visita, una chiamata o una richiesta di preventivo.' }, { title: 'Visibilità che ha un contesto', text: 'SEO locale e contenuti lavorano insieme per rendere l’attività più riconoscibile nella ricerca.' }],
    audience: ['Negozi e attività commerciali', 'Servizi alla persona', 'PMI della Saccisica'],
    faqs: [pricingFaq('Piove di Sacco'), timingFaq('Piove di Sacco'), ['Realizzate siti per negozi del centro storico di Piove di Sacco?', 'Sì. Un sito ben strutturato è il naturale completamento della presenza fisica: aiuta a valorizzare botteghe, prodotti, servizi e contatti anche prima della visita in negozio.']],
  },
  'ponte-san-nicolo': {
    name: 'Ponte San Nicolò', territory: 'Ponte San Nicolò e Piovese', title: 'Web agency Ponte San Nicolò | Siti web per attività e PMI | 4 Web Lab', description: 'Realizzazione siti web a Ponte San Nicolò per attività, artigiani e imprese della Piovese: struttura chiara e SEO tecnica.',
    heroTitle: 'Sviluppo siti web a Ponte San Nicolò per attività e imprese.', heroLead: 'Per realtà della Piovese che devono presentare servizi e competenze in modo leggibile, credibile e pronto a sostenere la ricerca locale.',
    territoryHeading: 'Una porta verso Padova e la Saccisica.', detail: 'Ponte San Nicolò è da sempre un punto di passaggio tra Padova, la Piovese e la Saccisica. Qui convivono attività di servizio, commercio, artigianato e realtà produttive: il sito deve aiutare chi cerca a capire velocemente se siete il fornitore giusto.',
    benefitIntro: 'Tre vantaggi concreti per Ponte San Nicolò, Roncaglia, Roncajette, Rio e la Piovese.',
    benefits: [{ title: 'Confronto vicino', text: 'Un rapporto diretto rende più semplice tradurre competenze e servizi in un percorso digitale chiaro.' }, { title: 'Struttura senza attrito', text: 'Pagine, navigazione e contenuti fanno trovare ciò che serve senza costringere l’utente a cercare troppo.' }, { title: 'Ricerca locale e B2B', text: 'La base SEO aiuta sia chi cerca un servizio vicino sia chi valuta un fornitore in modo più ragionato.' }],
    audience: ['Aziende e artigiani', 'Commercio e servizi', 'Professionisti della Piovese'],
    faqs: [pricingFaq('Ponte San Nicolò'), timingFaq('Ponte San Nicolò'), ['Realizzate siti per aziende della zona industriale di Ponte San Nicolò?', 'Sì. Per realtà artigianali e industriali progettiamo siti che chiariscono competenze, servizi, referenze e canali di contatto: gli elementi che precedono una richiesta B2B.']],
  },
  albignasego: {
    name: 'Albignasego', territory: 'Albignasego e cintura sud di Padova', title: 'Web agency Albignasego | Siti web per attività e PMI | 4 Web Lab', description: 'Realizzazione siti web ad Albignasego e nella zona sud di Padova per negozi, professionisti e PMI.',
    heroTitle: 'Sviluppo siti web ad Albignasego per attività e PMI.', heroLead: 'Per chi opera nella cintura sud di Padova e deve rendere offerta, differenze e contatti più facili da trovare e capire.',
    territoryHeading: 'Un territorio con un’identità precisa.', detail: 'Albignasego è uno dei comuni più popolosi della provincia di Padova: un territorio denso, connesso alla città e caratterizzato da attività, negozi, professionisti e imprese in concorrenza diretta. Per molte realtà non basta esserci: serve un sito che renda riconoscibile il valore prima del confronto con alternative online.',
    benefitIntro: 'Tre vantaggi concreti per Albignasego, Selvazzano Dentro, Maserà di Padova e la cintura sud.',
    benefits: [{ title: 'Un percorso diretto', text: 'Chi cerca capisce senza deviazioni cosa fai, per chi lavori e come può contattarti.' }, { title: 'Base tecnica ordinata', text: 'Il progetto è pensato per restare comprensibile e facile da far evolvere, senza dipendenze superflue.' }, { title: 'Visibilità prima dei concorrenti', text: 'Contenuti e segnali SEO aiutano il sito a competere in un’area con molte offerte simili.' }],
    audience: ['Attività locali', 'Studi professionali', 'Imprese della cintura sud'],
    faqs: [pricingFaq('Albignasego'), timingFaq('Albignasego'), ['Coprite anche i quartieri di Albignasego?', 'Sì, lavoriamo con attività del centro e delle aree più periferiche verso la cintura sud di Padova. Il progetto non cambia per il quartiere, ma per obiettivo, pubblico e tipo di servizio.']],
  },
  vigonza: {
    name: 'Vigonza', territory: 'Vigonza e Padova nord-est', title: 'Web agency Vigonza | Siti web per attività e PMI | 4 Web Lab', description: 'Realizzazione siti web a Vigonza e nella zona nord-est di Padova per attività, professionisti e PMI.',
    heroTitle: 'Sviluppo siti web a Vigonza per negozi, professionisti e PMI.', heroLead: 'Una presenza digitale chiara per attività della zona nord-est di Padova, pensata per crescere insieme al territorio e alle richieste.',
    territoryHeading: 'Un territorio in crescita.', detail: 'Vigonza è tra i comuni più popolosi della provincia di Padova e si sviluppa lungo vie di comunicazione verso Padova, Venezia e Treviso. Busa, Codiverno, Pionca, Peraga e San Vito hanno identità diverse: il sito deve raccontare un’attività in crescita, non limitarsi a un indirizzo in provincia.',
    benefitIntro: 'Tre vantaggi concreti per Vigonza, Vigodarzere, Camposampiero e l’area nord-est.',
    benefits: [{ title: 'Progetto vicino al contesto', text: 'La struttura parte dal tipo di ricerca e dal modo in cui le persone valutano un’attività sul territorio.' }, { title: 'Sito pronto a crescere', text: 'Pagine e contenuti possono evolvere senza perdere chiarezza quando cambiano servizi o priorità.' }, { title: 'Ricerca e motori di risposta', text: 'Il sito usa una base semantica e tecnica utile a Google e alle nuove modalità di ricerca.' }],
    audience: ['Commercio e retail', 'Servizi professionali', 'PMI del nord-est padovano'],
    faqs: [pricingFaq('Vigonza'), timingFaq('Vigonza'), ['Lavorate con attività della frazione di Busa o delle altre frazioni di Vigonza?', 'Sì, seguiamo attività della frazione di Busa e delle altre realtà del comune, come Codiverno, Pionca, Peraga e San Vito.']],
  },
  'abano-terme': {
    name: 'Abano Terme', territory: 'Abano Terme e Bacino Euganeo', title: 'Web agency Abano Terme | Siti web per hotel e attività | 4 Web Lab', description: 'Realizzazione siti web ad Abano Terme per hotel, attività termali, commercio e servizi del Bacino Euganeo.',
    heroTitle: 'Sviluppo siti web ad Abano Terme per hotel, negozi e attività termali.', heroLead: 'Un sito veloce e ben strutturato è spesso il primo contatto per chi cerca ospitalità, benessere o servizi nel Bacino Euganeo.',
    territoryHeading: 'Il cuore del termale euganeo.', detail: 'Abano Terme fa parte del Bacino Termale Euganeo, la più grande destinazione termale d’Europa. L’economia non vive solo di hotel: coinvolge agroalimentare, artigianato e servizi legati al turismo del benessere. Per una struttura ricettiva o un’attività locale, il sito deve rendere chiari servizi e contatti a chi pianifica un soggiorno anche da un’altra città o dall’estero.',
    benefitIntro: 'Tre vantaggi concreti per hotel, centri benessere e attività di Abano Terme, Montegrotto e Bacino Euganeo.',
    benefits: [{ title: 'Presentazione che accoglie', text: 'Servizi, camere, trattamenti e contatti vengono ordinati per chi deve scegliere prima di arrivare.' }, { title: 'Affidabile nei picchi di stagione', text: 'Una base tecnica sobria e solida evita di sovraccaricare il sito quando l’attenzione e le richieste aumentano.' }, { title: 'Ricerca di prossimità', text: 'Contenuti e struttura aiutano il sito a rispondere alle ricerche per ospitalità, benessere e servizi locali.' }],
    audience: ['Hotel e strutture ricettive', 'Benessere e salute', 'Commercio e professionisti'],
    faqs: [pricingFaq('Abano Terme'), timingFaq('Abano Terme'), ['Realizzate siti per hotel e strutture termali di Abano Terme?', 'Sì. Un sito chiaro e veloce è spesso il primo contatto con chi pianifica un soggiorno: per questo curiamo con particolare attenzione presentazione dei servizi, richieste e percorsi verso la prenotazione.']],
  },
  cittadella: {
    name: 'Cittadella', territory: 'Cittadella e Alta Padovana', title: 'Web agency Cittadella | Siti web per negozi, artigiani e PMI | 4 Web Lab', description: 'Realizzazione siti web a Cittadella e nell’Alta Padovana per negozi, artigiani e PMI.',
    heroTitle: 'Sviluppo siti web a Cittadella per negozi, artigiani e PMI.', heroLead: 'Per attività dell’Alta Padovana che devono rendere più visibili competenze, servizi e contatti, senza perdere identità.',
    territoryHeading: 'Il cuore dell’Alta Padovana.', detail: 'Cittadella, con la sua cinta muraria medievale tra le meglio conservate del Veneto, è il cuore dell’Alta Padovana: un’area con solida tradizione artigianale e industriale, ai confini con Vicenza e Treviso. Il commercio locale investe già in strumenti digitali per valorizzare negozi e attività ricettive: un sito web professionale è il passo naturale successivo.',
    benefitIntro: 'Tre vantaggi concreti per Cittadella e le attività dell’Alta Padovana.',
    benefits: [{ title: 'Competenze in evidenza', text: 'Un sito tecnico o artigianale rende visibili servizi, casi d’uso e ragioni per scegliere l’impresa.' }, { title: 'Struttura che semplifica', text: 'Una navigazione ordinata fa trovare ciò che interessa senza richiedere tempo a chi deve decidere.' }, { title: 'Presenza digitale territoriale', text: 'SEO locale e contenuti chiariscono il legame fra attività, servizi e area di lavoro.' }],
    audience: ['Artigiani e imprese tecniche', 'Attività commerciali', 'PMI dell’Alta Padovana'],
    faqs: [pricingFaq('Cittadella'), timingFaq('Cittadella'), ['Realizzate siti per negozi e attività del centro storico di Cittadella?', 'Sì. Un sito professionale aiuta a valorizzare attività, prodotti e contatti per chi scopre il centro, prepara una visita o cerca un servizio nell’area.']],
  },
} satisfies Record<string, Zone>;
