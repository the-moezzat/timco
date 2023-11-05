import Loading from '@/components/Loading';
import { getSections } from '@/features/tim/current/currentApi';
import { useQuery } from 'react-query';
import Header from '../_components/header';
import FormSection from './_components/form-section';
import useAddSection from './_hooks/useAddSection';
import Section from './_components/section';
import { Button } from '@/components/ui/button';

export default function Current() {
  const { data, isLoading: sectionsLoading } = useQuery(['sections'], {
    queryFn: getSections,
  });
  const { createSection } = useAddSection();

  return (
    <div>
      <Header title="Current">
        <FormSection onSubmit={(values) => createSection(values.title)}>
          <Button className="max-md:h-8 max-md:text-xs">Add section</Button>
        </FormSection>
      </Header>

      <div className="flex flex-col gap-4">
        {sectionsLoading && <Loading size="medium" type="full" />}
        {data &&
          data.map((section) => <Section key={section.id} section={section} />)}
      </div>
    </div>
  );
}
