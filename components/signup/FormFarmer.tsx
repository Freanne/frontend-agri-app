'use client'
import { useAuth } from '@/context/AuthContext';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Input from './Input';


const FormFarmer = () => {
 
  const { register, loading } = useAuth(); // Récupérer la fonction register
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    ifu: '',
    farm_count: '',
    total_area: '',
    location: '',
    user_type: 'farmer'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
   // Soumission du formulaire
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await register({
        ...formData,
        farm_count: Number(formData.farm_count),
        total_area: Number(formData.total_area),
      });
    } catch (error) {
      console.error(error);
    }
  };
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
          <Input name="farm_count" type="number" placeholder="Nombre de fermes" value={formData.farm_count} onChange={handleChange} />
          <Input name="total_area" type="number" placeholder="Superficie (en ha)" value={formData.total_area} onChange={handleChange} />
          <Input name="location" type="text" placeholder="Localisation" value={formData.location} onChange={handleChange} />
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

export default FormFarmer;


// 'use client'
// import { useAuth } from '@/context/AuthContext';
// import React from 'react';
// import { toast } from 'react-toastify';
// import Input from './Input';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// // 🛠 Définition du schéma Yup
// const schema = yup.object().shape({
//   first_name: yup.string().required("Le nom est requis"),
//   last_name: yup.string().required("Le prénom est requis"),
//   email: yup.string().email("Email invalide").required("L'email est requis"),
//   phone: yup.string().matches(/^\d{8,15}$/, "Numéro invalide").required("Le téléphone est requis"),
//   password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").required("Mot de passe requis"),
//   password_confirmation: yup.string()
//     .oneOf([yup.ref("password"), null], "Les mots de passe ne correspondent pas")
//     .required("Confirmation requise"),
//   ifu: yup.string().required("IFU requis"),
//   farm_count: yup.number().typeError("Doit être un nombre").min(1, "Au moins une ferme").required("Champ requis"),
//   total_area: yup.number().typeError("Doit être un nombre").min(0.1, "Superficie invalide").required("Champ requis"),
//   location: yup.string().required("Localisation requise"),
// });

// const FormFarmer = () => {
//   const { register: authRegister, loading } = useAuth();

//   // 🎯 Utilisation de React Hook Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // 📌 Soumission du formulaire
//   const onSubmit = async (data) => {
//     try {
//       await authRegister({
//         ...data,
//         farm_count: Number(data.farm_count),
//         total_area: Number(data.total_area),
//       });
//       toast.success("Inscription réussie !");
//     } catch (error) {
//       console.error(error);
//       toast.error("Erreur lors de l'inscription");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-8 mt-8'>
//           <Input name="first_name" type="text" placeholder="Nom" {...register("first_name")} />
//           {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}

//           <Input name="last_name" type="text" placeholder="Prénom" {...register("last_name")} />
//           {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}

//           <Input name="email" type="email" placeholder="Email" {...register("email")} />
//           {errors.email && <p className="text-red-500">{errors.email.message}</p>}

//           <Input name="phone" type="tel" placeholder="Téléphone" {...register("phone")} />
//           {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

//           <Input name="password" type="password" placeholder="Mot de passe" {...register("password")} />
//           {errors.password && <p className="text-red-500">{errors.password.message}</p>}

//           <Input name="password_confirmation" type="password" placeholder="Confirmer le mot de passe" {...register("password_confirmation")} />
//           {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}

//           <Input name="ifu" type="text" placeholder="IFU" {...register("ifu")} />
//           {errors.ifu && <p className="text-red-500">{errors.ifu.message}</p>}

//           <Input name="farm_count" type="number" placeholder="Nombre de fermes" {...register("farm_count")} />
//           {errors.farm_count && <p className="text-red-500">{errors.farm_count.message}</p>}

//           <Input name="total_area" type="number" placeholder="Superficie (en ha)" {...register("total_area")} />
//           {errors.total_area && <p className="text-red-500">{errors.total_area.message}</p>}

//           <Input name="location" type="text" placeholder="Localisation" {...register("location")} />
//           {errors.location && <p className="text-red-500">{errors.location.message}</p>}
//         </div>

//         <div className="flex justify-center items-center mt-8">
//           <button
//             type="submit"
//             disabled={loading}
//             className="text-lg rounded w-full mx-8 font-semibold px-16 py-2 bg-green-600 text-white hover:bg-green-700"
//           >
//             {loading ? 'Enregistrement...' : 'S\'inscrire'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormFarmer;


// 'use client'
// import { useAuth } from '@/context/AuthContext';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { toast } from 'react-toastify';
// import Input from './Input';

// // Définition du schéma de validation avec Yup
// const schema = yup.object().shape({
//   first_name: yup.string().required("Le prénom est requis"),
//   last_name: yup.string().required("Le nom est requis"),
//   email: yup.string().email("Email invalide").required("L'email est requis"),
//   phone: yup.string().matches(/^\d+$/, "Le téléphone doit être un nombre").required("Le téléphone est requis"),
//   password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").required("Le mot de passe est requis"),
//   password_confirmation: yup.string().oneOf([yup.ref('password')], "Les mots de passe ne correspondent pas"),
//   ifu: yup.string().required("L'IFU est requis"),
//   farm_count: yup.number().typeError("Doit être un nombre").min(1, "Au moins 1 ferme"),
//   total_area: yup.number().typeError("Doit être un nombre").min(0.1, "La superficie doit être positive"),
//   location: yup.string().required("La localisation est requise"),
// });

// const FormFarmer = () => {
//   const { register: authRegister, loading } = useAuth(); // Récupérer la fonction d'inscription

//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors } 
//   } = useForm({
//     resolver: yupResolver(schema)  // Utilisation de Yup pour la validation
//   });

//   // Fonction de soumission du formulaire
//   const onSubmit = async (data: any) => {
//     try {
//       await authRegister({
//         ...data,
//         farm_count: Number(data.farm_count),
//         total_area: Number(data.total_area),
//       });
//       toast.success("Inscription réussie !");
//     } catch (error) {
//       console.error(error);
//       toast.error("Erreur lors de l'inscription");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mx-8 mt-8'>
//           <Input type="text" placeholder="Nom" {...register("last_name")}  error={errors.last_name} />
//           <Input  type="text" placeholder="Prénom" {...register("first_name")} error={errors.first_name} />
//           <Input type="email" placeholder="Email" {...register("email")} error={errors.email} />
//           <Input  type="tel" placeholder="Téléphone" {...register("phone")} error={errors.phone} />
//           <Input  type="password" placeholder="Mot de passe" {...register("password")} error={errors.password} />
//           <Input  type="password" placeholder="Confirmer le mot de passe" {...register("password_confirmation")} error={errors.password_confirmation} />
//           <Input type="text" placeholder="IFU" {...register("ifu")} error={errors.ifu} />
//           <Input  type="number" placeholder="Nombre de fermes" {...register("farm_count")} error={errors.farm_count} />
//           <Input type="number" placeholder="Superficie (en ha)" {...register("total_area")} error={errors.total_area} />
//           <Input  type="text" placeholder="Localisation" {...register("location")} error={errors.location} />
//         </div>

//         <div className="flex justify-center items-center mt-8">
//           <button
//             type="submit"
//             disabled={loading}
//             className="text-lg rounded w-full mx-8 font-semibold px-16 py-2 bg-green-600 text-white hover:bg-green-700"
//           >
//             {loading ? 'Enregistrement...' : 'S\'inscrire'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormFarmer;
