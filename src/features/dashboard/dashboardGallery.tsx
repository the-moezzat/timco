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
import { useMutation, useQueryClient } from 'react-query';
import { uploadImage } from '@/services/galleryApi';
import Gallery from '../gallery/gallery';
import usePics from '@/hooks/usePics';
import GalleryItem from './galleryItem';
import { toast } from 'react-hot-toast';

function DashboardGallery() {
  const queryClient = useQueryClient();
  const { data, isLoading: isDataLoading } = usePics();
  const { register, handleSubmit, reset } = useForm();

  const { mutate, isLoading } = useMutation(uploadImage, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success('Image uploaded successfully');
      reset();
    },
    onError() {
      toast.error('Something went wrong');
    }
  });

  function onSubmit(data: any) {
    const image: FileList =
      typeof data.image === 'string' ? data.image : data.image;
    Array.from(image).map((file) => mutate(file));
  }

  function onError(errors: any) {
    console.log(errors);
  }

  return (
    <div className=" space-y-8">
      <div className="flex items-center justify-between">
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
              className="flex flex-col gap-2 bg-white p-6 rounded-md w-full"
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
      </div>
      {isDataLoading ? (
        'loading'
      ) : (
        <Gallery
          render={() =>
            data?.map((pic) => (
              <GalleryItem
                id={String(pic.id)}
                src={pic.img as string}
                alt={pic.name as string}
                key={pic.id}
              />
            ))
          }
        />
      )}
    </div>
  );
}

export default DashboardGallery;
