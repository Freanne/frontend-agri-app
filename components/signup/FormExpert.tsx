'use client'
import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Input from './Input';

const FormExpert = () => {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    ifu: '',
    speciality: '',
    experience: '',
    availability:'',
    diplome: undefined as File | undefined,
    user_type: 'expert'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'diplome') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files ? e.target.files[0] : undefined, // Utilise `undefined` au lieu de `null`
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  

      if (formData.password !== formData.password_confirmation) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }

      // if (formData.user_type === 'expert' && !formData.specialiality) {
      //   toast.error("Le champ Spécialité est obligatoire pour les experts.");
      //   return;
      // }

      const experience = formData.experience ? Number(formData.experience) : 0;
      const isFormValid = formData.first_name && formData.last_name && formData.email && formData.password && formData.diplome;
  

      if (!isFormValid) {
        toast.error("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      try {
        await register({
          ...formData,
        experience, // Si l'expérience est une chaîne, assurez-vous qu'elle est bien convertie
        diplome: formData.diplome, 
        });
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <div>
       <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-8 mt-8'>

          <Input name="last_name" type="text" placeholder="Nom" value={formData.last_name} onChange={handleChange} />
          <Input name="first_name" type="text" placeholder="Prénom" value={formData.first_name} onChange={handleChange} />
          <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <Input name="phone" type="tel" placeholder="Téléphone" value={formData.phone} onChange={handleChange} />
          <Input name="password" type="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} />
          <Input name="password_confirmation" type="password" placeholder="Confirmer le mot de passe" value={formData.password_confirmation} onChange={handleChange} />
          <Input name="ifu" type="text" placeholder="IFU" value={formData.ifu} onChange={handleChange} />
          <Input name="speciality" type="text" placeholder="Spécialité" value={formData.speciality} onChange={handleChange} />
          <Input name="experience" type="number" placeholder="Expérience (en années)" value={formData.experience} onChange={handleChange} />
          <Input name="availability" type="text" placeholder="Disponibilité" value={formData.availability} onChange={handleChange} />
          
          <input
              type="file"
              name="diplome"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
        </div>

        <div className="flex justify-center items-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="text-lg rounded w-full mx-8 font-semibold px-16 py-2 bg-green-600 text-white hover:bg-green-700"
          >
            {loading ? 'Enregistrement...' : 'S\'inscrire'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormExpert;
