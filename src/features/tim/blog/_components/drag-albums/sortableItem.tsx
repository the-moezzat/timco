import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DotsSixVertical, Trash } from '@phosphor-icons/react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { uploadAlbums } from '@/services/blogApi';
import Loading from '@/components/Loading';
import toast from 'react-hot-toast';

export function SortableItem({
  id,
  onDelete,
  onAddition,
  onUpload,
}: {
  id: string;
  index: number;
  onDelete: (index: string) => void;
  onAddition: React.Dispatch<
    React.SetStateAction<{
      [key: number]: FileList | undefined;
    }>
  >;
  onUpload: (files: string[]) => void;
}) {
  const [album, setAlbum] = useState<FileList>();

  const { mutate, isLoading } = useMutation({
    mutationFn: uploadAlbums,
    onSuccess: (data) => {
      toast.success('Album uploaded successfully');
      console.log(data)
      console.log(data[0])
      onUpload(data[0]);
      onDelete(id);
    },
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="flex gap-2 items-center">
        <div className=" cursor-grab active:first-line:cursor-grabbing">
          <DotsSixVertical size={32} />
        </div>
        <Input
          type="file"
          accept="image/*"
          multiple
          // value={album}
          className="text-base text-gray-8"
          onChange={(e) => {
            setAlbum(e.target.files as FileList);
            onAddition((state) => ({
              ...state,
              [id]: e.target.files as FileList,
            }));
          }}
        />
        <Button
          type="button"
          variant={'default'}
          onMouseDown={() => {
            mutate([album] as FileList[]);
          }}
        >
          {isLoading ? <Loading size="small" type="self" /> : 'Upload'}
        </Button>
        <Button
          type="button"
          size={'icon'}
          variant={'destructive'}
          className="text-xl flex-grow shrink-0"
          onMouseDown={() => {
            onDelete(id);
          }}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}
