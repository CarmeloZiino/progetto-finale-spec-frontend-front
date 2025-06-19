# 🍸 Gintastic - Catalogo e Comparatore di Gin Artigianali Italiani

Un'applicazione web moderna per esplorare, filtrare e confrontare gin artigianali italiani.

## 📋 Panoramica

Gintastic permette agli appassionati di gin di:

- Sfogliare un catalogo completo di gin artigianali italiani
- Filtrare i prodotti per metodo di distillazione
- Cercare gin specifici tramite una barra di ricerca ottimizzata
- Ordinare i risultati alfabeticamente
- Salvare i gin preferiti in una wishlist personale
- Confrontare le caratteristiche di diversi gin

## 🚀 Installazione

### Prerequisiti

- Node.js (v16 o superiore)
- npm/yarn

### Passaggi per l'installazione

1. **Clona il repository**

   ```bash
   git clone <url-repository>
   cd Progetto\ Finale
   ```

2. **Installa le dipendenze del backend**

   ```bash
   cd backend
   npm install
   ```

3. **Installa le dipendenze del frontend**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configurazione**
   - Assicurati che nel frontend sia presente un file `.env` con:
     ```
     VITE_API_URL=http://localhost:3001
     ```

## 🏃‍♂️ Avvio dell'applicazione

1. **Avvia il backend**

   ```bash
   cd backend
   npm run start
   ```

   Il server sarà disponibile su http://localhost:3001

2. **Avvia il frontend (in un altro terminale)**
   ```bash
   cd frontend
   npm run dev
   ```
   L'applicazione sarà disponibile su http://localhost:5173

## 🧰 Utilizzo dell'applicazione

### Navigazione principale

- La **home page** mostra il catalogo completo dei gin
- Usa il menu di navigazione per accedere alla funzione di confronto

### Ricerca e filtri

- Usa la **barra di ricerca** in alto per trovare rapidamente un gin specifico
  - La ricerca è ottimizzata con debounce per una migliore esperienza utente
  - La funzione rimuove automaticamente spazi e caratteri speciali
- Filtra i gin per **metodo di distillazione** usando l'icona del filtro
- Ordina i risultati in ordine **alfabetico** usando l'icona di ordinamento

### Wishlist

- Aggiungi gin alla tua wishlist cliccando sull'icona a forma di bottiglia
- Accedi alla wishlist tramite l'icona nel menu di navigazione
- La wishlist viene salvata nel localStorage e persiste tra le sessioni

### Confronto

- Vai alla pagina "Confronta" per selezionare un gin e vedere tutti i suoi dettagli
- Usa il menu a tendina per selezionare e confrontare diversi gin

### Pagina dettaglio

- Clicca su un gin per visualizzare la pagina di dettaglio con tutte le informazioni

## 🧩 Funzionalità principali

- **Catalogo prodotti**: Visualizzazione di tutti i gin disponibili
- **Ricerca con debounce**: Ricerca ottimizzata per migliorare le performance
- **Filtri per categoria**: Filtraggio per metodo di distillazione
- **Ordinamento**: Ordinamento alfabetico dei risultati
- **Wishlist persistente**: Salvataggio dei gin preferiti in localStorage
- **Confronto prodotti**: Confronto dettagliato tra diversi gin
- **Interfaccia responsive**: Design ottimizzato per dispositivi mobili e desktop

## 🔧 Tecnologie utilizzate

- **Frontend**:

  - React.js
  - Context API per la gestione dello stato
  - Custom Hooks
  - CSS (con supporto Bootstrap)
  - React Router
  - React Icons

- **Backend**:
  - Node.js
  - Express
  - Zod per la validazione dei dati
  - File system per la persistenza dei dati

## 👨‍💻 Sviluppato da

Carmelo Ziino
