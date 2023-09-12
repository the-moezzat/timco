import { Button } from '@/components/ui/button';
import { deleteImage, downloadImage } from '@/services/galleryApi';
import { Download, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
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
import Loading from '@/components/Loading';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

function GalleryItem({
  src,
  alt,
  id,
}: {
  src: string;
  alt: string;
  id: string;
}) {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);

  const { mutate, isLoading: isDeleting } = useMutation(deleteImage, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast.success('Image deleted successfully');
    },
  });

  const { mutate: download, isLoading: isDownloading } = useMutation(
    downloadImage,
    {
      onSuccess: (data) => saveAs(data),
    }
  );

  function toggleShow() {
    setShow((state) => !state);
  }
  return (
    <div
      onMouseEnter={toggleShow}
      onMouseLeave={toggleShow}
      className="relative"
    >
      <img src={src} alt={alt} />
      {isDeleting && (
        <div className="absolute inset-0 bg-slate-900/50 z-10">
          <Loading size="medium" type="full" />
        </div>
      )}
      {show && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-slate-900/50 p-2 to-transparent flex flex-col justify-end">
          <div className="flex gap-2 justify-end">
            <Button
              size={'icon'}
              variant={'ghost'}
              className="text-white "
              onClick={() => download(src.split('/').at(-1) as string)}
            >
              {isDownloading ? (
                <Loading size="small" type="self" />
              ) : (
                <Download />
              )}
              {/* <Download /> */}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  className="text-white hover:bg-red-200 hover:text-red-950"
                >
                  <Trash2 />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this image
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      mutate({ id, imageName: src.split('/').at(-1) as string })
                    }
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryItem;
