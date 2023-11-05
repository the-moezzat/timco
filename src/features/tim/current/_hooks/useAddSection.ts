import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { addSection } from '@/features/tim/current/currentApi';

export default function useAddSection() {
  const queryClient = useQueryClient();

  function createSection(title: string) {
    toast.promise(addSection(title), {
      loading: 'Adding section...',
      success: (data) => {
        queryClient.invalidateQueries(['sections']);
        return `Section ${data[0].title} added successfully`;
      },
      error: (error) => `Could not add section (${error})`,
    });
  }

  return { createSection };
}
