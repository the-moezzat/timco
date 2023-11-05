import Loading from '@/components/Loading';
import CurrentSeSection from '@/features/current/dashboardSection';
import { getSections } from '@/services/currentApi';
import { useQuery } from 'react-query';
import Header from '../_components/header';
import FormSection from './_components/form-section';
import useAddSection from './_hooks/useAddSection';

export default function Current() {
  const { data, isLoading: sectionsLoading } = useQuery(['sections'], {
    queryFn: getSections,
  });
  const { createSection } = useAddSection();

  return (
    <div>
      <Header title="Current">
        <FormSection onSubmit={(values) => createSection(values.title)} />
      </Header>

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
