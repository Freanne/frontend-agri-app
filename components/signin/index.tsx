import React from 'react'

const Signin = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='max-w-xl w-full mx-auto p-12 border rounded-lg '>
        <h1 className='text-center mb-4 text-xl font-bold'>CONNEXION</h1>
        <form action="" method="get">

          <input 
            type="text"
            className='border w-full p-2 mb-4 bg-'
            placeholder="Entrez votre nom d'utilisateur"
          />
          <input 
            type='email'
            className='border w-full p-2 mb-4'
            placeholder="Entrez votre mail"
          />
          <input 
            type='text'
            className='border w-full p-2 mb-4'
            placeholder="Entrez votre numéro"
          />
          <button type="submit" className='w-full p-2 bg-green-500 text-white'>
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signin
