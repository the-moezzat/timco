import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { addItem } from '@/features/tim/current/currentApi';
import { Section } from '../_types/types';

export default function useAddItem(section: Section) {
  const queryClient = useQueryClient();

  function createItem({
    title,
    description,
    link,
  }: {
    title: string;
    description?: string;
    link?: string;
  }) {
    toast.promise(
      addItem({
        title,
        description,
        link,
        section_id: section.id,
      }),
      {
        loading: 'Adding Item...',
        success: (data) => {
          queryClient.invalidateQueries(['section', [section.id]]);
          return `Section ${data[0].title} added successfully`;
        },
        error: (error) => `Could not add section (${error})`,
      }
    );
  }

  return { createItem };
}
