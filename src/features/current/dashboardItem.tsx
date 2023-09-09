import Loading from '@/components/Loading';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteItem } from '@/services/currentApi';
import { Database } from '@/types/schema';
import { Trash } from '@phosphor-icons/react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

type Item = Database['public']['Tables']['current_items']['Row'];

export default function CurrentItem({ item }: { item: Item }) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteItem, {
    onSuccess: () => {
      toast.success('Item deleted successfully');
      queryClient.invalidateQueries(['section']);
    },
    onError: () => {
      toast.error('Something gone wrong');
    },
  });
  return (
    <li className="bg-white border border-gray-300 rounded-md p-2 flex gap-2 justify-between items-start">
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
          <a href={item.link} className="underline" target="_blank">
            - {item.title}
          </a>
        )
      ) : item.description ? (
        <p className="flex flex-col">
          - {item.title}
          <span className="text-sm text-gray-600 ml-3">{item.description}</span>
        </p>
      ) : (
        `- ${item.title}`
      )}

      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            size={'icon'}
            variant={'ghost'}
            className="text-white text-base bg-red-500 transition-all hover:bg-red-400 h-6 w-6 hover:text-red-50"
          >
            {isLoading ? (
              <Loading type="self" size="small" />
            ) : (
              <Trash weight="bold" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              section and all items in this section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutate(item.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
