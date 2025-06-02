# Workflow per lo sviluppo del Comparatore di Prodotti in React con TypeScript

## Panoramica del progetto

Questo documento fornisce una guida dettagliata per sviluppare un'applicazione Single Page Application (SPA) in React utilizzando TypeScript. L'applicazione sarà un comparatore di prodotti (in questo caso Gin) che permetterà di visualizzare, cercare, filtrare, confrontare e salvare come preferiti diversi record.

## Fase 1: Preparazione e analisi dei tipi

### 1.1 Completa la definizione dei tipi in `types.ts`

Estendi il tipo `Product` già definito con i campi necessari:

```typescript
// Estensione per gestire i campi generati dal server
export type ProductWithId = Product & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

// Tipo per i parametri di ricerca
export type ProductSearchParams = {
  search?: string;
  category?: string;
};

// Tipo per le opzioni di ordinamento
export type SortOption =
  | "title-asc"
  | "title-desc"
  | "category-asc"
  | "category-desc";
```

### 1.2 Crea tipi per lo stato dei preferiti e degli elementi da confrontare

```typescript
// Tipo per la gestione dei preferiti
export type FavoritesState = {
  items: ProductWithId[];
  add: (product: ProductWithId) => void;
  remove: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
};

// Tipo per la gestione degli elementi da confrontare
export type CompareState = {
  items: ProductWithId[];
  add: (product: ProductWithId) => void;
  remove: (productId: string) => void;
  clear: () => void;
  isComparing: (productId: string) => boolean;
};
```

## Fase 2: Sviluppo dei servizi di base

### 2.1 Espandi `useProduct.ts` per supportare tutte le operazioni API necessarie

Implementa queste funzioni:

- `getProduct(id: string)`: recupera un singolo prodotto per ID
- `searchProducts(params: ProductSearchParams)`: cerca e filtra prodotti
- `sortProducts(products: ProductWithId[], option: SortOption)`: ordina i prodotti

Aggiungi gestione dello stato di caricamento e degli errori:

```typescript
type ProductHookState = {
  products: ProductWithId[];
  loading: boolean;
  error: Error | null;
};
```

### 2.2 Crea un hook per gestire i preferiti (`useFavorites.ts`)

Implementa:

- Funzione per aggiungere ai preferiti
- Funzione per rimuovere dai preferiti
- Funzione per verificare se un prodotto è nei preferiti
- Persistenza con localStorage

```typescript
export function useFavorites(): FavoritesState {
  const [favorites, setFavorites] = useState<ProductWithId[]>([]);

  // Carica i preferiti dal localStorage all'avvio
  useEffect(() => {
    // implementazione...
  }, []);

  // Salva i preferiti nel localStorage quando cambiano
  useEffect(() => {
    // implementazione...
  }, [favorites]);

  const add = (product: ProductWithId) => {
    // implementazione...
  };

  const remove = (productId: string) => {
    // implementazione...
  };

  const isFavorite = (productId: string): boolean => {
    // implementazione...
  };

  return { items: favorites, add, remove, isFavorite };
}
```

### 2.3 Crea un hook per gestire gli elementi da confrontare (`useCompare.ts`)

Implementa:

- Funzione per aggiungere al comparatore
- Funzione per rimuovere dal comparatore
- Funzione per verificare se un prodotto è nel comparatore
- Funzione per svuotare il comparatore

## Fase 3: Sviluppo dei Context API

### 3.1 Crea `FavoritesContext.tsx`

```typescript
// Crea un context per i preferiti
const FavoritesContext = createContext<FavoritesState | undefined>(undefined);

// Crea un provider che utilizzi l'hook useFavorites
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const favoritesState = useFavorites();
  return (
    <FavoritesContext.Provider value={favoritesState}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook per utilizzare il context
export const useFavoritesContext = (): FavoritesState => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
};
```

### 3.2 Crea `CompareContext.tsx`

Implementa una struttura simile a quella dei preferiti ma per la funzionalità di confronto.

## Fase 4: Sviluppo delle componenti UI di base

### 4.1 Aggiorna `ProductRow.tsx`

Aggiungi:

- Pulsante per aggiungere/rimuovere dai preferiti
- Pulsante per aggiungere/rimuovere dal comparatore
- Link alla pagina di dettaglio

```typescript
interface ProductRowProps {
  product: ProductWithId;
  isFavorite: boolean;
  isComparing: boolean;
  onAddToFavorites: (product: ProductWithId) => void;
  onAddToCompare: (product: ProductWithId) => void;
}
```

### 4.2 Crea componente `SearchBar.tsx`

Implementa una barra di ricerca con debounce:

```typescript
interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
  placeholder?: string;
}
```

### 4.3 Crea componente `CategoryFilter.tsx`

Implementa un filtro per categorie:

```typescript
interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}
```

### 4.4 Crea componente `SortSelector.tsx`

Implementa un selettore per l'ordinamento:

```typescript
interface SortSelectorProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}
```

### 4.5 Crea componenti per pulsanti di azione

- `FavoriteButton.tsx`: pulsante per aggiungere/rimuovere dai preferiti
- `CompareButton.tsx`: pulsante per aggiungere/rimuovere dal comparatore

### 4.6 Aggiorna `Header.tsx`

Aggiungi navigazione per:

- Home (lista prodotti)
- Preferiti
- Comparatore

## Fase 5: Sviluppo delle pagine principali

### 5.1 Aggiorna `ProductList.tsx`

Implementa:

- Lista dei prodotti con ricerca, filtro e ordinamento
- Pulsanti per aggiungere ai preferiti e al comparatore
- Gestione dello stato vuoto

```typescript
export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("title-asc");

  // Usa i context
  const {
    items: products,
    loading,
    error,
  } = useProductsWithFilters(searchTerm, category, sortOption);
  const { add: addToFavorites, isFavorite } = useFavoritesContext();
  const { add: addToCompare, isComparing } = useCompareContext();

  // Implementa la logica di rendering...
}
```

### 5.2 Crea `ProductDetail.tsx`

Crea una pagina di dettaglio che mostri tutte le proprietà del prodotto:

```typescript
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id);
  const {
    add: addToFavorites,
    remove: removeFromFavorites,
    isFavorite,
  } = useFavoritesContext();
  const {
    add: addToCompare,
    remove: removeFromCompare,
    isComparing,
  } = useCompareContext();

  // Implementa la logica di rendering...
}
```

### 5.3 Crea `FavoritesList.tsx`

Crea una pagina che mostri i prodotti preferiti:

```typescript
export default function FavoritesList() {
  const { items: favorites, remove } = useFavoritesContext();
  const { add: addToCompare, isComparing } = useCompareContext();

  // Implementa la logica di rendering...
}
```

### 5.4 Crea `CompareProducts.tsx`

Crea una pagina per confrontare i prodotti:

```typescript
export default function CompareProducts() {
  const { items: comparing, remove, clear } = useCompareContext();
  const { add: addToFavorites, isFavorite } = useFavoritesContext();

  // Implementa la logica di rendering...
}
```

## Fase 6: Implementa funzionalità di debounce e persistenza

### 6.1 Crea `useDebounce.ts`

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

### 6.2 Implementa la persistenza dei preferiti

Usa localStorage per salvare/caricare i preferiti:

```typescript
// Salva preferiti
localStorage.setItem("favorites", JSON.stringify(favorites));

// Carica preferiti
const storedFavorites = localStorage.getItem("favorites");
if (storedFavorites) {
  setFavorites(JSON.parse(storedFavorites));
}
```

## Fase 7: Aggiorna l'App principale e il routing

### 7.1 Aggiorna `App.tsx`

```typescript
function App() {
  return (
    <FavoritesProvider>
      <CompareProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" Component={ProductList} />
              <Route path="/product/:id" Component={ProductDetail} />
              <Route path="/favorites" Component={FavoritesList} />
              <Route path="/compare" Component={CompareProducts} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CompareProvider>
    </FavoritesProvider>
  );
}
```

## Fase 8: Gestione degli stati vuoti

### 8.1 Crea componente `EmptyState.tsx`

```typescript
interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

Utilizza questo componente per gestire:

- Nessun risultato trovato
- Lista preferiti vuota
- Nessun elemento selezionato nel comparatore

## Fase 9: Testing e pulizia

### 9.1 Testa tutte le funzionalità

- Verifica che tutte le funzionalità richieste funzionino
- Controlla che i tipi TypeScript siano corretti
- Testa i casi d'uso principali

### 9.2 Pulizia del codice

- Rimuovi codice inutilizzato o commentato
- Migliora i nomi delle variabili e la struttura del codice
- Assicurati che non ci siano errori TypeScript

## Consigli per la tipizzazione in TypeScript

### Usa tipi specifici invece di `any`

```typescript
// NO
const data: any = fetchData();

// SÌ
const data: Product[] = fetchData();
```

### Sfrutta l'inferenza di tipo quando possibile

```typescript
// Non necessario
const [count, setCount] = useState<number>(0);

// TypeScript inferisce il tipo
const [count, setCount] = useState(0);
```

### Usa i type guard per gestire i casi di errore

```typescript
try {
  // codice che può generare errori
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Errore sconosciuto", error);
  }
}
```

### Definisci le props dei componenti React con interfacce chiare

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = "primary",
}) => {
  // implementazione...
};
```

### Utilizza tipi di utilità TypeScript

- `Partial<T>`: rende tutte le proprietà opzionali
- `Pick<T, K>`: seleziona solo alcune proprietà
- `Omit<T, K>`: omette alcune proprietà
- `Required<T>`: rende tutte le proprietà obbligatorie
- `Readonly<T>`: rende tutte le proprietà di sola lettura

### Usa Discriminated Unions per gestire stati differenti

```typescript
type ProductState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "success"; data: ProductWithId[] };

function renderContent(state: ProductState) {
  switch (state.status) {
    case "loading":
      return <Loader />;
    case "error":
      return <ErrorMessage error={state.error} />;
    case "success":
      return <ProductList products={state.data} />;
  }
}
```

## Struttura del progetto finale

```
front/
  src/
    components/
      ProductRow.tsx           // Riga prodotto nella lista
      ProductDetail.tsx        // Componente dettaglio prodotto
      CategoryFilter.tsx       // Componente per filtraggio categoria
      SortSelector.tsx         // Componente per ordinamento
      SearchBar.tsx            // Barra di ricerca con debounce
      FavoriteButton.tsx       // Pulsante per gestire i preferiti
      CompareButton.tsx        // Pulsante per aggiungere al comparatore
      EmptyState.tsx           // Componente per stati vuoti
    context/
      FavoritesContext.tsx     // Context per gestire i preferiti
      CompareContext.tsx       // Context per gestire gli elementi da confrontare
    hooks/
      useProduct.ts            // Hook per gestire le API dei prodotti
      useFavorites.ts          // Hook per gestire i preferiti
      useCompare.ts            // Hook per gestire il comparatore
      useDebounce.ts           // Hook per implementare il debounce
    pages/
      ProductList.tsx          // Lista prodotti con filtri e ordinamento
      ProductDetail.tsx        // Pagina dettaglio singolo prodotto
      FavoritesList.tsx        // Pagina con i prodotti preferiti
      CompareProducts.tsx      // Pagina per confrontare i prodotti
    types/
      ProductTypes.ts          // Definizione dei tipi per i prodotti e altre entità
```

Questo workflow ti guiderà attraverso lo sviluppo completo dell'applicazione, affrontando tutti i requisiti minimi e alcuni dei requisiti aggiuntivi. La struttura è modulare, il che ti permetterà di estendere facilmente l'applicazione se desideri implementare anche i requisiti avanzati.
