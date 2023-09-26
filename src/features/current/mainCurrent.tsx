import { getSections } from '@/services/currentApi';
import { useQuery } from 'react-query';
import Loading from '@/components/Loading';
import Section from './section';

function MainCurrent() {
  const { data, isLoading: sectionsLoading } = useQuery(['sections'], {
    queryFn: getSections,
  });

  return (
    <div className="my-8 max-w-3xl mx-auto px-4">
      <div className="flex flex-row flex-wrap gap-x-20   gap-y-10 min-w-min mx-auto ">
        {sectionsLoading && <Loading size="medium" type="full" />}
        {data &&
          data.map((section) => <Section key={section.id} section={section} />)}
      </div>
    </div>
  );
}

export default MainCurrent;
