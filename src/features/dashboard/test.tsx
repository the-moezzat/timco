/* eslint-disable @typescript-eslint/no-explicit-any */
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import Dnd from '../dnd';
import Drag from '../drag/drag';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { useForm } from 'react-hook-form';
// import { Textarea } from '@/components/ui/textarea';
// import Loading from '@/components/Loading';
// import { useState } from 'react';
// import AlbumsInput from './albumsInput';

// const formSchema = z.object({
//   thumbnail: z.any(),
//   content: z.string({
//     required_error: 'Content is required',
//   }),
// });

export default function Test() {
  // const [albums, setAlbum] = useState<FileList[]>([]);
  // // const [albumNum, setAlbumNum] = useState(1);
  // const [draft, setDraft] = useState(false);
  // const isLoading = false;
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  // });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   const thumbnail: FileList = values.thumbnail;
  //   console.log({ ...values, thumbnail, draft, albums });
  // }

  return (
    <div className=" z-50 ">
      {/* <div className="flex items-center justify-center mt-4 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-8/12"
          >
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <Input
                disabled={isLoading}
                type="file"
                accept="image/*"
                className="text-base text-gray-8"
                {...form.register('thumbnail', {
                  required: 'This field is required',
                })}
              />
            </FormItem>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      {...field}
                      className="text-base text-gray-8 min-h-[10px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlbumsInput onChange={(files) => setAlbum(files)} />

            <div className="flex items-center gap-2 w-full">
              <Button type="submit" disabled={isLoading} className="grow">
                {isLoading ? (
                  <div className=" flex gap-2 items-center">
                    <Loading type="self" size="small" className=" text-white" />
                    Publishing...
                  </div>
                ) : (
                  'Publish'
                )}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                variant={'outline'}
                onClick={() => setDraft(true)}
              >
                {isLoading ? (
                  <div className=" flex gap-2 items-center">
                    <Loading type="self" size="small" className=" text-white" />
                    Publishing...
                  </div>
                ) : (
                  'Save as draft'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div> */}
      <div>
        <Drag onChange={(files) => console.log(files)} />

        {/* <Dnd
          albumsId={[
            'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.8262905654904962-chuttersnap-ftG8WcHwg7o-unsplash.jpg',

            'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.5000781112561725-chuttersnap-UhCT6punsplash.jpg',
          ]}
        /> */}
      </div>
    </div>
  );
}
