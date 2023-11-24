/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import PostForm from './post-form';
import { useState } from 'react';
import useEditPost from '../_hooks/useEditPost';
import { PostType } from '../_types/types';
import { Pencil } from '@phosphor-icons/react';

interface Props {
  defaultValues: PostType;
}

export default function EditPost({ defaultValues }: Props) {
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
      <SheetTrigger className="w-full text-left py-1.5 px-1.5 text-lg hover:bg-slate-100 rounded-md border ">
        {/* <Button className="max-md:h-8 max-md:text-xs w-full" size={'sm'}> */}
        <Pencil />
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent side={'right'} className="">
        <SheetHeader>
          <SheetTitle>Edit</SheetTitle>
        </SheetHeader>
        <PostForm
          handleSubmit={handleSubmit}
          defaultValues={{
            id: String(defaultValues.id),
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
