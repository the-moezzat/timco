/* eslint-disable @typescript-eslint/no-explicit-any */
import FormRow from '@/components/formRow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { AddPost } from '@/services/blogApi';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';

export default function AddBlog() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: AddPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      reset();
    },
  });

  function onSubmit(data: any) {
    console.log(data);
    mutate(data);
  }

  function onError(errors: any) {
    console.log(errors);
  }
  return (
    <div className=" z-50 ">
      <Sheet>
        <SheetTrigger>
          <Button>Add new</Button>
        </SheetTrigger>
        <SheetContent side={'bottom'}>
          <SheetHeader>
            <SheetTitle>Add blog</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-center mt-4 ">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex flex-col gap-2 rounded-md w-8/12"
            >
              <FormRow label="Title" error={errors?.title?.message as string}>
                <Input
                  {...register('title', {
                    required: 'This field is required',
                  })}
                  className="text-base text-gray-8"
                  disabled={isLoading}
                />
              </FormRow>

              <FormRow
                label="Thumbnail"
                error={errors?.image?.message as string}
              >
                <Input
                  {...register('thumbnail', {
                    required: 'This field is required',
                  })}
                  type="file"
                  accept="image/*"
                  className="text-base text-gray-8"
                  disabled={isLoading}
                />
              </FormRow>
              <FormRow
                label="Content"
                error={errors?.content?.message as string}
              >
                <Textarea
                  {...register('content', {
                    required: 'This field is required',
                  })}
                  className="text-base text-gray-8 min-h-[200px]"
                  disabled={isLoading}
                />
              </FormRow>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Publishing...' : 'Publish'}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
