import { getSections } from '@/services/currentApi';
import { useQuery } from 'react-query';
import Loading from '@/components/Loading';
import Section from './section';

function MainCurrent() {
  const { data, isLoading: sectionsLoading } = useQuery(['sections'], {
    queryFn: getSections,
  });

  return (
    <div className="my-8">
      <div className="flex flex-col gap-4">
        {sectionsLoading && <Loading size="medium" type="full" />}
        {data &&
          data.map((section) => <Section key={section.id} section={section} />)}
      </div>
    </div>
  );
}

export default MainCurrent;
