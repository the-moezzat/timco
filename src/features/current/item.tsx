import { Database } from '@/types/schema';

type Item = Database['public']['Tables']['current_items']['Row'];

export default function Item({ item }: { item: Item }) {
  return (
    <li className="bg-white border border-gray-300 rounded-md p-2 flex gap-2">
      {item.link ? (
        item.description ? (
          <p className="flex flex-col">
            <a href={item.link} className="underline" target="_blank">
              - {item.title}
            </a>

            <span className="text-sm text-gray-600 ml-3">
              {item.description}
            </span>
          </p>
        ) : (
          item.title
        )
      ) : item.description ? (
        <p className="flex flex-col">
          - {item.title}
          <span className="text-sm text-gray-600 ml-3">{item.description}</span>
        </p>
      ) : (
        `- ${item.title}`
      )}
    </li>
  );
}
