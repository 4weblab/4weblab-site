# Black Friday nelle pagine servizio: ripristino

Questa integrazione riguarda home, Professionisti e Aziende. Il piano Negozi, sitemap, robots.txt e la landing Black Friday dedicata restano invariati.

## Interruttore unico

In `src/config/black-friday.ts`, impostare `BLACK_FRIDAY.enabled` a `false`, poi eseguire `npm run build` e pubblicare il risultato con il normale rilascio Git/Netlify.

Questo elimina avvisi, evidenze nelle schede, prezzi promozionali, FAQ aggiuntive, metadata promozionali e campi campagna dei form dalle tre pagine. Ripristina prezzi ordinari, CTA e oggetti dei messaggi ordinari. Anche `/llms.txt` torna al testo che aveva prima di questa integrazione, conservato in `src/data/llms-base.txt`.

La correzione “fino a 3 pagine iniziali” nella pagina Professionisti rimane: corregge una contraddizione del testo precedente, indipendente dall'offerta.

Per un test locale senza cambiare il file, in PowerShell:

```powershell
$env:BLACK_FRIDAY_ENABLED = 'false'
npm run build
Remove-Item Env:BLACK_FRIDAY_ENABLED
```

La variabile `BLACK_FRIDAY_ENABLED=false` forza la disattivazione; non può forzare l'attivazione oltre la scadenza o quando `enabled` è `false`.

## Scadenza

La valutazione avviene durante la build, con date esplicite nel fuso di Roma. Una build successiva al 27 novembre 2026 alle 23:59:59 ripristina automaticamente le tre pagine ordinarie anche lasciando `enabled: true`. Prima del 2 novembre gli avvisi indicano che il prezzo promozionale sarà valido dal 2 novembre.

Essendo il sito statico, il passaggio della data da solo non modifica i file già pubblicati: il 28 novembre occorre una nuova build e pubblicazione. Non è stato configurato alcun deploy programmato. Non nascondere l'offerta soltanto con JavaScript: HTML e dati strutturati devono restare coerenti.

Il testo originale di `/llms.txt` e la landing dedicata contengono già l'offerta datata; questo interruttore ripristina lo stato precedente dell'integrazione, non riscrive né ritira la campagna originale. Un'eventuale archiviazione della landing va gestita separatamente.

## Verifica prima del rilascio

Test delle date, dei prezzi e dell'interruttore: `node --experimental-strip-types --test tests/black-friday.test.mjs`.

- Home: nessun richiamo Black Friday e nessuna scelta promozionale nel form.
- Professionisti: da 990 € + IVA; Aziende: da 1.890 € + IVA.
- FAQ, meta description e JSON-LD riportano gli stessi prezzi ordinari.
- Moduli: oggetti ordinari, nessun campo `campaign` o `plan` promozionale.
- `/llms.txt`: uguale a `src/data/llms-base.txt`.
- `npm run build` supera il controllo degli URL; sitemap e robots.txt restano invariati.

## Verifica dei contatti

I moduli usano il componente già condiviso `FormFeedback` per validazione, honeypot, singolo invio, errore e ripristino del pulsante. Le prove di successo/errore vanno fatte intercettando Web3Forms nel browser, senza inviare contatti reali.

Nella home la campagna viene attribuita solo quando si seleziona uno dei due servizi promozionali. Cambiare scelta o completare l'invio ripristina i metadati corretti. Senza JavaScript la scelta resta leggibile nel campo `esigenza` inviato dal form HTML.
