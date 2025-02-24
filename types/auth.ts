export interface RegisterData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    ifu: string;
    password: string;
    password_confirmation: string;
    user_type: "farmer" | "expert";
    farmName: string;
    location: string;
    speciality: string;
    experience: string;
    availability: string;
    diploma: string;
  }
  
//   export interface FarmerData extends RegisterData {
//     user_type: "farmer";
//     farmName: string;
//     location: string;
//   }
  
//   export interface ExpertData extends RegisterData {
//     user_type: "expert";
//     speciality: string;
//     experience: string;
//     availability: string;
//     diploma: string;
//   }
  
//   // Union type for all user data types
//   export type UserData = FarmerData | ExpertData;

  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user" | "farmer"; // Ajoute d'autres rôles si nécessaire
  }

  export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    register: (data: RegisterData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
  }
  