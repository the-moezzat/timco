/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import Drag from '../drag/drag';
import Calender from '@/components/date';

const formSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  thumbnail: z.any().optional(),
  content: z.string({
    required_error: 'Content is required',
  }),
  category: z.string({
    required_error: 'Category is required',
  }),
  albums: z.any().optional(),
  uploadedAlbums: z.array(z.array(z.string())).optional(),
  createdAt: z.string(),
});

export default function Add({
  addFn,
}: {
  addFn: (values: {
    thumbnail?: FileList;
    draft: boolean;
    title: string;
    content: string;
    category: string;
    albums?: any;
    createdAt?: string;
    uploadedAlbums?: string[][];
  }) => void;
}) {
  const [draft, setDraft] = useState(false);
  const [thumb, setThumb] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      createdAt: new Date().toISOString(),
      uploadedAlbums: [],
    },
  });

  // console.log(form.getValues());

  function onSubmit(values: z.infer<typeof formSchema>) {
    const thumbnail: FileList = thumb ? values.thumbnail : undefined;
    const albums: FileList[] = values.albums;
    // setOpen(false);
    // console.log({
    //   ...values,
    //   thumbnail,
    //   draft,
    //   albums,
    // });

    setThumb(false);

    addFn({ ...values, thumbnail, draft, albums });
    form.resetField('title');
    form.resetField('content');
    form.resetField('uploadedAlbums');
    form.resetField('category');
  }

  return (
    <div className=" z-50 ">
      <Sheet>
        <SheetTrigger>
          <Button className="max-md:h-8 max-md:text-xs">Add new</Button>
        </SheetTrigger>
        <SheetContent side={'bottom'}>
          <SheetHeader>
            <SheetTitle>Add blog</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-center mt-4 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3 w-8/12"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} className="text-base text-gray-8" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail</FormLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        className="text-base text-gray-8"
                        onChange={(e) => {
                          setThumb(true);
                          field.onChange(e.target.files);
                        }}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="createdAt"
                  render={({ field }) => <Calender onChange={field.onChange} />}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="growth">Growth</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="projects">Projects</SelectItem>
                          <SelectItem value="other">other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="text-base text-gray-8 min-h-[200px]"
                        />
                      </FormControl>
                      <FormDescription>
                        to put albums or images in post use "//=//=//=//" and
                        upload them in order
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={'uploadedAlbums'}
                  render={({ field }) => (
                    <FormItem className="border p-2 rounded-md">
                      <FormLabel>Uploaded albums</FormLabel>
                      <FormControl>
                        {/* <Sort
                          albums={uploaded}
                          onChange={(order) => field.onChange(order)}
                          /> */}
                        <ul className="flex flex-col gap-2 list-disc ml-4">
                          {field.value?.map((album, index) => (
                            <li key={index}>
                              Album-{index + 1} ({album.length} photos)
                            </li>
                          ))}
                        </ul>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="albums"
                  render={({ field }) => (
                    <Drag
                      onChange={(files) => {
                        field.onChange(files);
                      }}
                      onUpload={(albums) => {
                        form.setValue('uploadedAlbums', [
                          ...(form.getValues().uploadedAlbums as string[][]),
                          albums,
                        ]);
                      }}
                    />
                  )}
                />

                <SheetClose>
                  <div className="flex items-center gap-2 w-full">
                    <Button type="submit" className="grow">
                      Publish
                    </Button>
                    <Button
                      type="submit"
                      variant={'outline'}
                      onClick={() => setDraft(true)}
                    >
                      Save as draft
                    </Button>
                  </div>
                </SheetClose>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
