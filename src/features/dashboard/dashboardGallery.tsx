/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useMutation, useQuery } from 'react-query';
import { getImages, uploadImage } from '@/services/galleryApi';

function DashboardGallery() {
  const { mutate, isLoading } = useMutation(uploadImage, {
    onSuccess: (data) => console.log(data),
  });
  const { data, isLoading: isDataLoading } = useQuery(['gallery'], {
    queryFn: getImages,
  });
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    mutate(image);
    // console.log(image);
  }

  function onError(errors: any) {
    console.log(errors);
  }

  return (
    <div>
      <header className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Gallery</h1>
        <Dialog>
          <DialogTrigger>
            <Button>Upload new memories</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload new memories</DialogTitle>
            </DialogHeader>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex flex-col gap-2 bg-white p-6 rounded-md w-96"
            >
              <Input
                {...register('image', {
                  required: 'This field is required',
                })}
                type="file"
                accept="image/*"
                multiple
                className="text-base text-gray-8"
                disabled={isLoading}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </header>
      {isDataLoading
        ? 'loading'
        : data?.map((pic) => (
            <img src={pic.img as string} alt={pic.name as string} />
          ))}
    </div>
  );
}

export default DashboardGallery;
