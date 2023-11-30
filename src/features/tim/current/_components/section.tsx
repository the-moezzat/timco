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
import { deleteSection, getItems } from '@/features/tim/current/currentApi';
import { Pencil, Trash } from '@phosphor-icons/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FormSection from './form-section';
import useEditSection from '../_hooks/useEditSection';
import FormSectionItem from './form-item';
import useAddItem from '../_hooks/useAddItem';
import { Section as SectionType } from '../_types/types';
import Sorty from './sort-items/sorty';
import useReorderItems from '../_hooks/useReorderItems';

export default function Section({ section }: { section: SectionType }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { changeSectionTitle } = useEditSection();
  const { createItem } = useAddItem(section);

  const { changeItemsOrder, handleReorderItems, newOrder } = useReorderItems({
    sectionId: section.id,
  });

  const { data, isLoading } = useQuery(['section', section.id], {
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

        {newOrder.length > 0 && (
          <Button onClick={() => changeItemsOrder()}>Save New Order</Button>
        )}

        <div className="flex gap-2">
          <FormSectionItem onSubmit={(values) => createItem(values)}>
            <Button size={'sm'}>Add Item</Button>
          </FormSectionItem>
          {/* <AddItem section={section} /> */}
          <FormSection
            onSubmit={(values) => changeSectionTitle(values.title, section.id)}
            defaultValues={{
              title: section.title!,
            }}
          >
            <Button
              size={'icon'}
              className="text-lg transition-all h-8 w-8 "
              variant={'outline'}
            >
              <Pencil weight="bold" />
            </Button>
          </FormSection>
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
        <ul className="grid grid-cols-1 gap-2 items-start">
          {data && <Sorty items={data} onOrderChange={handleReorderItems} />}
        </ul>
      </div>
    </div>
  );
}
