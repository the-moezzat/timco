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
import { updatePost } from '@/services/blogApi';
import { useForm } from 'react-hook-form';
import { useQueryClient, useMutation } from 'react-query';
import styled from 'styled-components';

const Thumbnail = styled.div<{ $src: string }>`
  width: 130px;
  height: 75px;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
`;

export default function EditBlog({
  defaultValues,
}: {
  defaultValues: {
    content: string | null;
    created_at: string;
    id: number;
    thumbnail: string | null;
    title: string | null;
  };
}) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState } = useForm({
    defaultValues,
  });
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: updatePost,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      queryClient.invalidateQueries({ queryKey: ['post', String(data[0].id)] });
    },
  });

  function onSubmit(data: any) {
    const newPost: {
      id: string;
      title: string;
      content: string;
      thumbnail: string | FileList;
    } = {
      id: String(defaultValues.id),
      title: data.title,
      content: data.content,
      thumbnail:
        data.thumbnail.length > 0 ? data.thumbnail : defaultValues.thumbnail,
    };
    console.log(data);
    mutate(newPost);
  }

  function onError(errors: any) {
    console.log(errors);
  }
  return (
    <div className=" z-50 ">
      <Sheet>
        <SheetTrigger>
          <Button>Edit</Button>
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

              <div className="flex gap-2">
                <Thumbnail
                  $src={defaultValues.thumbnail as string}
                  className={'rounded-md w-40 h-24 object-cover'}
                />
                <FormRow
                  label="Thumbnail"
                  error={errors?.thumbnail?.message as string}
                >
                  <Input
                    {...register('thumbnail', {
                      value: defaultValues.thumbnail,
                    })}
                    type="file"
                    accept="image/*"
                    className="text-base text-gray-8"
                    disabled={isLoading}
                  />
                </FormRow>
              </div>
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
                {isLoading ? 'Updating...' : 'Update'}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
