import Footer from '@/components/footer';
import Header from '@/components/header';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="max-w-[1480px] mx-auto py-2 px-4 flex flex-col h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
