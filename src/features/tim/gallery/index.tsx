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
import usePics from '@/hooks/usePics';
import GalleryItem from './_components/galleryItem';
import Header from '../_components/header';
import SortImage from '@/components/album-sort/drag';
import { AlbumSortItem } from '@/components/album-sort/album-sort-item';
import { Fragment, useState } from 'react';
import { Database } from '@/types/schema';
import { useAddImage } from './_hooks/useAddImg';
import { DialogClose } from '@radix-ui/react-dialog';
import { useReorderGallery } from './_hooks/useReorderGallery';

type ImgGallery = Database['public']['Tables']['gallery']['Row'];

function Gallery() {
  const { data, isLoading: isDataLoading } = usePics();
  const { register, handleSubmit, reset } = useForm();
  const [newOrder, setNewOrder] = useState<{ id: number; order: number }[]>([]);
  const { addImage, loading: isLoading } = useAddImage();
  const { reorderImages } = useReorderGallery();

  // const { mutate, isLoading } = useMutation(uploadImage, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['gallery'] });
  //     toast.success('Image uploaded successfully');
  //     reset();
  //   },
  //   onError() {
  //     toast.error('Something went wrong');
  //   },
  // });

  function onSubmit(data: any) {
    const image: FileList =
      typeof data.image === 'string' ? data.image : data.image;

    Array.from(image).map((file) =>
      addImage(file, () => {
        reset();
      })
    );
  }

  function onError(errors: any) {
    console.log(errors);
  }

  function handleReorderImage(newOrder: string[], gallery: ImgGallery[]) {
    if (gallery.length === 0) return;

    const newGallery = newOrder
      .map((id, index) => {
        const img = gallery.find((img) => img.id === +id);

        if (img?.order === index) return;

        return {
          id: +id,
          order: index,
        };
      })
      .filter((img) => img !== undefined);

    console.log(newGallery);

    setNewOrder(newGallery as { id: number; order: number }[]);
  }

  return (
    <div className=" space-y-8 max-md:space-y-2">
      <Header title="Gallery">
        {newOrder.length > 0 && (
          <Button
            className="max-md:h-8 max-md:text-xs"
            onClick={() => {
              reorderImages(newOrder);
            }}
          >
            Save new order
          </Button>
        )}

        <Dialog>
          <DialogTrigger>
            <Button className="max-md:h-8 max-md:text-xs">
              Upload new memories
            </Button>
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

              <DialogClose>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Uploading...' : 'Upload'}
                </Button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
      </Header>

      {isDataLoading ? (
        'loading'
      ) : (
        <SortImage
          album={data ? data.map((img) => String(img.id)) : []}
          onChange={(items) => handleReorderImage(items, data ? data : [])}
          render={(items) => {
            return (
              <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-2">
                {items.map((id) => (
                  <Fragment key={id}>
                    <AlbumSortItem key={id} id={id}>
                      <GalleryItem
                        id={String(id)}
                        src={data?.find((img) => img.id === +id)?.img as string}
                        alt={
                          data?.find((img) => img.id === +id)?.name as string
                        }
                      />
                    </AlbumSortItem>
                  </Fragment>
                ))}
              </div>
            );
          }}
        />
      )}
    </div>
  );
}

export default Gallery;
