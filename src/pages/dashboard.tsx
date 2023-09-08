import Loading from '@/components/Loading';
import DashboardHeader from '@/features/dashboard/dashboardHeader';
import { getCurrentUser } from '@/services/auth';
import { Suspense } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useNavigate } from 'react-router-dom';

function Dashboard() {
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
    <div className="max-w-[1440px] mx-auto px-4 py-4">
      <DashboardHeader />
      <main className="p-2 pt-4">
        <Suspense fallback={<Loading type="full" size="large" />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default Dashboard;
