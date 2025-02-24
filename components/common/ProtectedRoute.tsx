'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ClimbingBoxLoader, ClipLoader, GridLoader, HashLoader, MoonLoader, RiseLoader } from 'react-spinners';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading) return <div className='flex items-center justify-center min-h-screen'>
    <RiseLoader size={50} color="green" className='text-green-700 text-2xl'  />
  </div>;

  return user ? children : null;
};

export default ProtectedRoute;
