import Loading from '@/components/Loading';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

function UserSide() {
  return (
    <div className="max-w-[1480px] mx-auto py-2 px-4 flex flex-col h-screen max-md:px-2">
      <Header />
      <Suspense fallback={<Loading type="full" size="large" />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

export default UserSide;
