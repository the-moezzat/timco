import { Database } from '@/types/schema';

type Item = Database['public']['Tables']['current_items']['Row'];

export default function Item({ item }: { item: Item }) {
  return (
    <li className="flex gap-2">
      {item.link ? (
        item.description ? (
          <p className="flex flex-col">
            <a href={item.link} className="underline" target="_blank">
              &#8226; {item.title}
            </a>

            <span className="text-sm text-gray-600 ml-3">
              {item.description}
            </span>
          </p>
        ) : (
          <a href={item.link} className="underline" target="_blank">
            &#8226; {item.title}
          </a>
        )
      ) : item.description ? (
        <p className="flex flex-col">
          &#8226; {item.title}
          <span className="text-sm text-gray-600 ml-3">{item.description}</span>
        </p>
      ) : (
        <>&#8226; {item.title}</>
      )}
    </li>
  );
}
