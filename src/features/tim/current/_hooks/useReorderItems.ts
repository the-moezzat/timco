import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { updateOrder } from '../currentApi';
import { useState } from 'react';
import { Item } from '../_types/types';

export default function useReorderItems({ sectionId }: { sectionId: number }) {
  const [newOrder, setNewOrder] = useState<{ id: number; order: number }[]>([]);
  const queryClient = useQueryClient();

  function handleReorderItems(newOrder: string[], items: Item[]) {
    const newItems = newOrder
      .map((id, index) => {
        const img = items.find((item) => item.id === +id);

        if (img?.order === index) return;

        return {
          id: +id,
          order: index,
        };
      })
      .filter((img) => img !== undefined);

    setNewOrder(newItems as { id: number; order: number }[]);
  }

  function changeItemsOrder() {
    toast.promise(updateOrder(newOrder), {
      loading: 'Changing section order...',
      success: () => {
        queryClient.invalidateQueries(['sections', sectionId]);
        setNewOrder([]);
        return `Section reordered successfully!`;
      },
      error: (error) => `Could not reorder this section (${error})`,
    });
  }
  return { changeItemsOrder, handleReorderItems, newOrder };
}
