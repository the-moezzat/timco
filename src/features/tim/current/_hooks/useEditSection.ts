import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { editSection } from '@/services/currentApi';

export default function useEditSection() {
  const queryClient = useQueryClient();

  function changeSectionTitle(title: string, id: number) {
    toast.promise(editSection({ title, id }), {
      loading: 'Changing section title...',
      success: (data) => {
        queryClient.invalidateQueries(['sections']);
        return `Section ${data[0].title} edited successfully`;
      },
      error: (error) => `Could not change title (${error})`,
    });
  }
  return { changeSectionTitle };
}
