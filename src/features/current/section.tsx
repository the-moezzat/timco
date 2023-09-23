import { getItems } from '@/services/currentApi';
import { useQuery } from 'react-query';
import { Database } from '@/types/schema';
import Item from './item';

type Section = Database['public']['Tables']['current_sections']['Row'];
function Section({ section }: { section: Section }) {
  const { data, isLoading } = useQuery(['section', [section.id]], {
    queryFn: () => getItems(section.id),
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-800 mb-3">
          {section.title}
        </h2>
      </div>
      {isLoading && 'Loading...'}
      <div className=" space-y-2">
        <ul className="grid grid-cols-1 gap-2 items-start">
          {data?.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Section;
