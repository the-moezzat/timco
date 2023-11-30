import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { editItem } from '@/features/tim/current/currentApi';
import { Item } from '../_types/types';

export default function useEditItem(item: Item) {
  const queryClient = useQueryClient();

  function updateItem({
    title,
    description,
    link,
  }: {
    title: string;
    description: string;
    link: string;
  }) {
    toast.promise(
      editItem({
        id: item.id,
        title,
        description,
        link,
      }),
      {
        loading: `Editing ${item.title}...`,
        success: (data) => {
          queryClient.invalidateQueries(['section', item.section_id]);
          return `${data[0].title} updated successfully`;
        },
        error: (error) => `Could not update ${item.title} (${error})`,
      }
    );
  }

  return { updateItem };
}
