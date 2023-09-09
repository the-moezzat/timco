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
import { useToast } from '@/components/ui/use-toast';
import { deleteSection, getItems } from '@/services/currentApi';
import { Trash } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import EditSection from './editSection';
import AddItem from './addItem';
import CurrentItem from './dashboardItem';
import { Database } from '@/types/schema';

type Section = Database['public']['Tables']['current_sections']['Row'];

export default function CurrentSeSection({ section }: { section: Section }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery(['section', [section.id]], {
    queryFn: () => getItems(section.id),
  });

  const { mutate, isLoading: deleteLoading } = useMutation(deleteSection, {
    onSuccess: () => {
      queryClient.invalidateQueries(['sections']);
      toast({
        title: 'Section deleted',
      });
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-neutral-800">
          {section.title}
        </h2>
        <div className="flex gap-2">
          <EditSection section={section} />

          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                size={'icon'}
                variant={'ghost'}
                className="text-white text-lg bg-red-500 transition-all hover:bg-red-400 h-8 w-8 hover:text-red-50"
              >
                {deleteLoading ? (
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
                  This action cannot be undone. This will permanently delete
                  this section and all items in this section.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => mutate(section.id)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {isLoading && 'Loading...'}
      <div className=" space-y-2">
        <ul className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-1 items-start">
          {data?.map((item) => (
            <CurrentItem key={item.id} item={item} />
          ))}
        </ul>
        <AddItem section={section} />
      </div>
    </div>
  );
}
