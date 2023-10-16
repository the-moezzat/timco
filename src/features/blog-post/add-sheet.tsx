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
import useAddPost from './useAddPost';

export default function AddSheet() {
  const [open, setOpen] = useState(false);

  const { publishPost } = useAddPost();

  function handleSubmit(values: {
    values: {
      title: string;
      createdAt: string;
      category: string;
      content: string;
      thumbnail?: any;
      albums?: any;
      uploadedAlbums?: string[][] | undefined;
    };
    draft: boolean;
  }) {
    const thumbnail: FileList = values.values.thumbnail;
    const albums: FileList[] = values.values.albums;

    console.log(1);
    publishPost({ ...values.values, thumbnail, albums, draft: values.draft });
    console.log({ ...values.values, thumbnail, albums, draft: values.draft });
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger>
        <Button className="max-md:h-8 max-md:text-xs">Add new</Button>
      </SheetTrigger>
      <SheetContent side={'right'} className="">
        <SheetHeader>
          <SheetTitle>Add blog</SheetTitle>
        </SheetHeader>
        <PostForm handleSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
}
