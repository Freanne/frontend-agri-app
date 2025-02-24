// 'use client'
// import React, { ModifierKey, useEffect, useRef, useState } from 'react'
// import { BsSearch } from 'react-icons/bs'
// import { IoNotificationsOutline } from "react-icons/io5";
// import Avatar from 'react-avatar';
// import { IoIosArrowDown } from "react-icons/io";
// import { FiMenu } from 'react-icons/fi';
// import { MdClose } from 'react-icons/md';
// import SidebarFarmer from './sidebar';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import LoadingAgriculture from '../common/loading';


// interface UserData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   // Ajoute d'autres champs en fonction des données retournées par ton API
// }


// const Header = () => {

//   const [isMenuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const handleLogout = async () => {
//     try {
//         // Appel à l'API pour révoquer le token
//         await axios.post(
//             "http://127.0.0.1:8000/api/logout", 
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Assure-toi d'envoyer le token pour révoquer la session côté serveur
//                 },
//             }
//         );

//         // Supprimer le token du localStorage
//         localStorage.removeItem("auth_token");

//         // Rediriger l'utilisateur vers la page de login
//         router.push("/signin");
//     } catch (error) {
//         console.error("Erreur lors de la déconnexion:", error);
//     }
// };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       // Vérifie si le clic est en dehors du menu
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false); // Ferme le menu
//       }
//     };

//     // Ajouter l'écouteur de clics
//     document.addEventListener('mousedown', handleClickOutside);

//     // Nettoyer l'écouteur lors du démontage
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleToggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem("auth_token");
      
//       if (token) {
//         try {
//           const response = await axios.get('http://localhost:8000/api/user', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             }
//           });
//           setUserData(response.data);
//         } catch (error) {
//           console.error("Erreur lors de la récupération des données utilisateur:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

//   // if (loading) {
//   //   return <div>Chargement...</div>;
//   // }

//   // if (!userData) {
//   //   return <div>Aucune donnée trouvée.</div>;
//   // }


//   return (
//     <div className='m-2 grid grid-cols-2 '>

//       <div className='flex items-center gap-3'>
//           <button
//               className="block lg:hidden text-2xl"
//               onClick={() => setMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <MdClose/> : <FiMenu className=' text-xl font-semibold'/>}
//           </button>
//           <div className='rounded-full hover:bg-green-50'>

//              <IoNotificationsOutline size={20} className='m-3'/>

//           </div>
//       </div>

//       {/* <div className='ml-auto flex items-center gap-2 hover:bg-green-50 p-2 rounded-lg'>
//           <Avatar  name="" size="30" round={true} src='/pot-mais.jpg' color='green' />
//           <div className='flex items-center gap-2'>
//             <p className='textbase'>Hi, <span className='font-semibold'>Anna</span></p>
//             <IoIosArrowDown size={20}/>
//           </div>
//       </div> */}
      
//       <div className="ml-auto flex items-center gap-2 relative">
//       <div
//         className="flex items-center gap-2 hover:bg-green-50 p-2 rounded-lg cursor-pointer"
//         onClick={handleToggleDropdown}
//       >
//         <Avatar name="" size="30" round={true} src="/pot-mais.jpg" color="green" />
//         <div className="flex items-center gap-2">
//           {
//             loading ? ( <LoadingAgriculture/>): (<p className="text-base">Hi, <span className="font-semibold">{userData.first_name}</span></p>)
//           }
//           <IoIosArrowDown size={20} />
//         </div>
//       </div>

//       {isDropdownOpen && (
//         <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg w-44 z-10">
//           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//             <li>
//               <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                 Mon profil
//               </a>
//             </li>
//             <li>
//               <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                 Mon compte
//               </a>
//             </li>
//             <li>
//               <button onClick={handleLogout} className=" border border-green-500 rounded-full text-center text-green-600 mx-2 block px-4 py-2 hover:bg-green-100 mt-2">
//                 Se déconnecter
//               </button>
//             </li>
//           </ul>
//         </div>
//       )}
//       </div>
//       <div
//         ref={menuRef}
//         className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
//           isMenuOpen ? 'translate-x-0' : '-translate-x-full'
//         } lg:hidden`}
//       >
//         <SidebarFarmer />
//       </div>
//     </div>
//   )
// }

// export default Header


'use client'
import React, { useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { IoNotificationsOutline } from "react-icons/io5";
import Avatar from 'react-avatar';
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import SidebarFarmer from './sidebar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LoadingAgriculture from '../common/loading';
import { useAuth } from '@/context/AuthContext';

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [userData, setUserData] = useState<UserData | null>(null);
  // const [loading, setLoading] = useState(true);
    const { user, loading,logout } = useAuth();
  const router = useRouter();


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };



  // On affiche un message de chargement ou un message d'erreur si aucune donnée n'est récupérée
  if (loading) {
    return <LoadingAgriculture />;
  }

  // if (!userData) {
  //   return <div>Aucune donnée trouvée.</div>;
  // }

  return (
    <div className='m-2 grid grid-cols-2'>
      <div className='flex items-center gap-3'>
        <button
          className="block lg:hidden text-2xl"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <MdClose /> : <FiMenu className='text-xl font-semibold' />}
        </button>
        <div className='rounded-full hover:bg-green-50'>
          <IoNotificationsOutline size={20} className='m-3' />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 relative">
        <div
          className="flex items-center gap-2 hover:bg-green-50 p-2 rounded-lg cursor-pointer"
          onClick={handleToggleDropdown}
        >
          <Avatar name={user?.first_name} size="30" round={true} src="/pot-mais.jpg" color="green" />
          <div className="flex items-center gap-2">
            <p className="text-base">Hi, <span className="font-semibold">{user?.first_name}</span></p>
            <IoIosArrowDown size={20} />
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg w-44 z-10">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <a href="/dashboard-farmer/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Mon profil
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  Mon compte
                </a>
              </li>
              <li>
                <button onClick={logout} className="border border-green-500 rounded-full text-center text-green-600 mx-2 block px-4 py-2 hover:bg-green-100 mt-2">
                  Se déconnecter
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <SidebarFarmer />
      </div>
    </div>
  );
};

export default Header;
