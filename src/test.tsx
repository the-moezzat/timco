/* eslint-disable @typescript-eslint/no-explicit-any */
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import Dnd from '../dnd';
import Drag from './features/drag/drag';
import Sort from './features/sort/sort';

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
        <Sort
          onChange={(files) => console.log(files)}
          albums={[
            [
              'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.7268579448436101-patrick-perkins-3wylDrjxH-E-unsplash.jpg',
              'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.5003624091367382-giorgio-trovato-5TXz228u4eo-unsplash.jpg',
            ],
            [
              'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.6328017245901563-kari-shea-tOVmshavtoo-unsplash.jpg',
              'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.4236470822301701-jason-leung-PjloV_e0zX8-unsplash.jpg',
              'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.9835074200749083-sven-brandsma-GZ5cKOgeIB0-unsplash.jpg',
            ],
            [
              'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.4195098862250213-chuttersnap-ftG8WcHwg7o-unsplash.jpg',
              'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.7465268595841614-kenny-eliason-Cx188P-L_HY-unsplash.jpg',
              'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.19801460522628012-steven-ungermann-0dAXtVhtBgg-unsplash.jpg',
              'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.5735370067384582-chuttersnap-JUO3MGEHTrQ-unsplash.jpg',
              'https://wfhvwuxaecldkqrcrgvw.supabase.co/storage/v1/object/public/images/0.17792541437406562-frugal-flyer-NYpT6hsGQoc-unsplash.jpg',
            ],
          ]}
        />

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
