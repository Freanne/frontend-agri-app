import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schéma Zod pour la validation de l'inscription
export const schema = z.object({
  first_name: z.string().min(1, 'Le prénom est requis'),
  last_name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide').min(1, 'L\'email est requis'),
  phone: z.string().min(10, 'Le numéro de téléphone doit comporter au moins 10 caractères').regex(/^[0-9]+$/, 'Le numéro de téléphone doit être numérique'),
  ifu: z.string().min(1, 'L\'IFU est requis'),
  password: z.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères'),
  password_confirmation: z.string().min(8, 'Le mot de passe de confirmation est requis'),
  user_type: z.enum(['farmer', 'expert']), // ou tu ajoutes 'admin' si nécessaire

  // Champs spécifiques pour farmer
  farm_count: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),z.number().min(1, 'Le nombre de fermes est requis pour un fermier')),
  total_area: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),z.number().min(0.1, 'La superficie doit être positive')),
  location: z.string().optional(),

  // Champs spécifiques pour expert
  speciality: z.string(),
  experience: z.number(),
  availability: z.string(),
  diploma_path: z.instanceof(File),
});
