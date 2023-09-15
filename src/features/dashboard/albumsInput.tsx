import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash } from '@phosphor-icons/react';
import { useState } from 'react';

interface AlbumInputProps {
  onChange: (value: FileList[]) => void;
}

export default function AlbumsInput({ onChange }: AlbumInputProps) {
  const [album, setAlbum] = useState<{ [key: number]: FileList | undefined }>(
    {}
  );
  const [albumNum, setAlbumNum] = useState(1);

  return (
    <div className=" space-y-2">
      {Array.from({ length: albumNum }).map((_, index) => (
        <div className="flex gap-2">
          <Input
            type="file"
            accept="image/*"
            multiple
            className="text-base text-gray-8"
            onChange={(e) => {
              setAlbum((state) => ({
                ...state,
                [index]: e.target.files as FileList,
              }));

              onChange(
                Object.values({
                  ...album,
                  [index]: e.target.files as FileList,
                }).filter((item) => item !== undefined) as FileList[]
              );
            }}
            key={index}
          />
          <Button
            type="button"
            size={'icon'}
            variant={'destructive'}
            className="text-xl"
            onClick={() => {
              setAlbumNum((state) => state - 1);
              setAlbum((state) => ({
                ...state,
                [index]: undefined,
              }));
            }}
          >
            <Trash />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() => setAlbumNum((state) => state + 1)}
        className=" self-start"
      >
        Add album
      </Button>
    </div>
  );
}
