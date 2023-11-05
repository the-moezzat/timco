import Loading from '@/components/Loading';
import { getCurrentUser } from '@/services/auth';
import { Suspense } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './_components/navbar';

export default function Tim() {
  const navigate = useNavigate();

  useQuery(['user'], {
    queryFn: getCurrentUser,
    staleTime: Infinity,
    onSuccess: (data) => {
      if (!data) navigate('/login');
    },
    onError: () => {
      navigate('/login');
    },
  });

  return (
    <div className="max-w-[1440px] mx-auto p-4 font-poppins max-md:p-2">
      <Navbar />
      <main className="p-2 pt-4">
        <Suspense fallback={<Loading type="full" size="large" />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
