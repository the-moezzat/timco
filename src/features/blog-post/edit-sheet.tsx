/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import PostForm from './post-form';
import { useState } from 'react';
import { Database } from '@/types/schema';
import useEditPost from './useEditPost';

type Post = Database['public']['Tables']['blog']['Row'];

interface Props {
  defaultValues: Post;
}

export default function EditSheet({ defaultValues }: Props) {
  const [open, setOpen] = useState(false);
  const { editPost } = useEditPost();

  function handleSubmit(value: {
    values: {
      title: string;
      createdAt: string;
      category: string;
      content: string;
      thumbnail?: any;
      oldAlbums?: any;
      albums?: any;
      uploadedAlbums?: string[][] | undefined;
    };
    draft: boolean;
  }) {
    const { values, draft } = value;

    const album = {
      id: String(defaultValues.id),
      draft,
      title: values.title,
      content: values.content,
      category: values.category,
      thumbnail: values.thumbnail,
      oldAlbumsOrder: values.oldAlbums as string[][],
      newAlbums: values.albums as FileList[],
      uploadedAlbums: values.uploadedAlbums ? values.uploadedAlbums : [],
      createdAt: values.createdAt || defaultValues.created_at,
    };

    console.log(album);

    editPost(album);

    setOpen(false);
  }

  console.log(defaultValues);

  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger>
        <Button className="max-md:h-8 max-md:text-xs" size={'sm'}>
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent side={'right'} className="">
        <SheetHeader>
          <SheetTitle>Edit</SheetTitle>
        </SheetHeader>
        <PostForm
          handleSubmit={handleSubmit}
          defaultValues={{
            title: defaultValues.title,
            createdAt: defaultValues.created_at,
            category: defaultValues.category,
            content: defaultValues.content as string,
            thumbnail: defaultValues.thumbnail,
            oldAlbums: defaultValues.albums,
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
