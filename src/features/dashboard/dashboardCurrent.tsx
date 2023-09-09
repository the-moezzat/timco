import CurrentSeSection from '../current/dashboardSection';
import Loading from '@/components/Loading';
import AddSection from './addSection';
import { getSections } from '@/services/currentApi';
import { useQuery } from 'react-query';

export default function DashboardCurrent() {
  const { data, isLoading: sectionsLoading } = useQuery(['sections'], {
    queryFn: getSections,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-bold">Current</h1>
        <AddSection />
      </div>

      <div className="flex flex-col gap-4">
        {sectionsLoading && <Loading size="medium" type="full" />}
        {data &&
          data.map((section) => (
            <CurrentSeSection key={section.id} section={section} />
          ))}
      </div>
    </div>
  );
}
