import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { editSection } from '@/services/currentApi';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Database } from '@/types/schema';
import toast from 'react-hot-toast';

const formSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
});

type Section = Database['public']['Tables']['current_sections']['Row'];

export default function EditSection({ section }: { section: Section }) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: section.title as string,
    },
  });

  const { mutate, isLoading } = useMutation(editSection, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['sections']);
      toast.success(`Title has changed successfully`);
      form.reset({ title: data[0]?.title as string | undefined });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ title: values.title, id: section.id });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={'sm'} variant={'outline'}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Section</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-base text-gray-8"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
