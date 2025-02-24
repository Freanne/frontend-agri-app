'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  ifu: string;
  farm_count?: number;
  total_area?: number;
  location?: string;
  speciality?: string,
  experience?: number,
  availability?:string,
  diplome?:File,
  user_type: string;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  ifu: string;
  farm_count?: number;
  total_area?: number;
  location?: string;
  speciality?: string,
  experience?: number,
  availability?:string,
  diplome?:File,
  user_type: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (data: RegisterData) => Promise<void>;
  // register : (last_name : string, first_name: string, email :string, password:string, phone : string, ifu : string, user_type: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Vérifier si l'utilisateur est déjà authentifié (au montage du composant)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUser(response.data);
      } catch (error) {
        console.error('Erreur de vérification de l\'authentification', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  //Fonction d'inscription 
  const register = async (
    data: RegisterData
    // last_name : string, first_name: string, email :string, password:string, phone : string, ifu : string, user_type: string
  ) => {
    setLoading(true);

    // const formData = new FormData();
    // Object.keys(data).forEach(key => {
    //   if (key === 'diplome' && data[key]) {
    //     formData.append(key, data[key] as File);
    //   } else if (data[key] !== undefined) {
    //     formData.append(key, data[key] as string);
    //   }
    // });

    try {
      await axios('http://localhost:8000/sanctum/csrf-cookie',
        {
          withCredentials: true,
        }
      )

      const response = await axios.post(
        'http://localhost:8000/api/register',
        { ...data},
        { withCredentials: true }
      )
      localStorage.setItem('auth_token', response.data.token);
      setUser(response.data.user)
      console.log(response.data.user)
      router.push('/signin');


    } catch(error: any) {
      console.error('Erreur d\'inscription', error);
      throw new Error(error.response?.data?.message || 'Échec de l\'inscription');
    } finally {
      setLoading(false);
    }


  }
 
  // Fonction de connexion
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      const response = await axios.post(
        'http://localhost:8000/api/login',
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem('auth_token', response.data.token);
      setUser(response.data.user);
      // router.push(response.data.user.user_type === 'farmer' ? '/dashboard/agriculteur' : '/dashboard/expert');

      router.push(
        response.data.user.user_type === 'farmer'
          ? '/dashboard/agriculteur'
          : response.data.user.user_type === 'admin'
            ? '/dashboard/admin'
            : '/dashboard/expert'
      );
    } catch (error: any) {
      console.error('Erreur de connexion', error);
      throw new Error(error.response?.data?.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    router.push('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé avec un AuthProvider');
  }
  return context;
};
