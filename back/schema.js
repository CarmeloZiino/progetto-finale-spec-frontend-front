// THIS FILE IS AUTO-GENERATED from types.ts - DO NOT EDIT DIRECTLY
import z from 'zod';


// Schema generated from types.ts ItalianRegion type
const ItalianRegionSchema = z.object({
  
}).strict(); // Add strict mode to reject extra properties

// Schema generated from types.ts Product type
export const ProductSchema = z.object({
  id: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  title: z.string({ required_error: "Title is required" }),
  category: z.string({ required_error: "Category is required" }),
  format: z.string(),
  origin: z.enum(["Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche", "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana", "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"], {
            errorMap: () => ({ message: "Invalid value for 'origin'. Expected one of the allowed values for ItalianRegion." })
          }),
  typology: z.string(),
  taste: z.string(),
  alcolContent: z.number(),
  image: z.string(),
}).strict(); // Add strict mode to reject extra properties


export function validateProduct(data) {
  try {
    const result = ProductSchema.parse(data);
    return { valid: true, data: result };
  } catch (error) {
    return { 
      valid: false, 
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    };
  }
}

// Export all validators as a map for dynamic usage
export const validators = {
  "product": validateProduct
};

// Export readonly properties for each type to prevent updates
export const readonlyProperties = {
  "product": []
};
