// // components/Input.tsx
// import React from 'react';
// import { FieldError } from 'react-hook-form';

// interface InputProps {
//   type: string;
//   name: string;
//   placeholder: string;
//   value: string | number;
//   onChange: React.ChangeEventHandler<HTMLInputElement>;
//   error?:  string | FieldError;
//   required?: boolean;
// }

// const Input: React.FC<InputProps> = ({
//   type,
//   name,
//   placeholder,
//   value,
//   onChange,
//   error,
//   required = false,
// }) => {
//   return (
//     <div className="relative">
//     <input
//       type={type}
//       name={name}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       required={required}
//       className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//     />
//     {error && (
//         <p className="text-red-500 text-sm mt-1">
//           {typeof error === 'string' ? error : error.message}
//         </p>
//       )}
//      </div> 
//   );
// };

// export default Input;

import React from 'react';
import { FieldError } from 'react-hook-form';  // Importation de FieldError

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string | FieldError;  // Simplification pour accepter FieldError ou string
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = true,
}) => {
  // Gestion des erreurs plus flexible
  const errorMessage = typeof error === 'string' ? error : error?.message;
  
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={type !== 'file' ? value : undefined}
        onChange={onChange}
        required={required}
        className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;


// import React from 'react';
// import { FieldError } from 'react-hook-form';

// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   name: string;
//   error?: string | FieldError;
// }

// const Input: React.FC<InputProps> = ({ name, error, ...rest }) => {
//   const errorMessage = typeof error === 'string' ? error : error?.message;

//   return (
//     <div className="relative">
//       <input
//         {...rest}
//         name={name}
//         className={`mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 ${
//           errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
//         }`}
//       />
//       {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
//     </div>
//   );
// };

// export default Input;
