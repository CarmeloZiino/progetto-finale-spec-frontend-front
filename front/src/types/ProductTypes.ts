
type ItalianRegion =
  | "Abruzzo"
  | "Basilicata"
  | "Calabria"
  | "Campania"
  | "Emilia-Romagna"
  | "Friuli-Venezia Giulia"
  | "Lazio"
  | "Liguria"
  | "Lombardia"
  | "Marche"
  | "Molise"
  | "Piemonte"
  | "Puglia"
  | "Sardegna"
  | "Sicilia"
  | "Toscana"
  | "Trentino-Alto Adige"
  | "Umbria"
  | "Valle d'Aosta"
  | "Veneto";

export type Product = {
  title: string;
  category: string;
  format?: string;
  origin: ItalianRegion; // Qui utilizziamo il nuovo tipo
  typology: string;
  taste?: string;
  alcolContent?: number;
  image: string;
};
