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
import Loading from '@/components/Loading';
import { useState } from 'react';
import styled from 'styled-components';
import { Database } from '@/types/schema';
import Sort from '../sort/sort';
import Drag from '../drag/drag';
import Calender from '@/components/date';
interface EditBlogProps {
  defaultValues: Database['public']['Tables']['blog']['Row'];
  editFn: (newPost: {
    id: string;
    thumbnail: string | FileList;
    draft: boolean;
    oldAlbumsOrder: string[][];
    newAlbums: FileList[];
    title: string;
    content: string;
    category: string;
    createdAt: string;
    oldAlbums?: any;
  }) => void;
  isLoading: boolean;
}

const Thumbnail = styled.div<{ $src: string }>`
  width: 130px;
  height: 75px;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
`;

const formSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  thumbnail: z.any(),
  content: z.string({
    required_error: 'Content is required',
  }),
  category: z.string({
    required_error: 'Category is required',
  }),
  oldAlbums: z.any(),
  newAlbums: z.any().optional(),
  createdAt: z.string().optional(),
});

export default function Edit({
  defaultValues,
  editFn,
  isLoading,
}: EditBlogProps) {
  const [draft, setDraft] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...(defaultValues as z.infer<typeof formSchema>),
      createdAt: defaultValues.created_at,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const thumbnail: FileList = values.thumbnail;

    const newPost = {
      ...values,
      id: String(defaultValues.id),
      thumbnail: (thumbnail.length > 0
        ? thumbnail
        : defaultValues.thumbnail) as string | FileList,
      draft,
      oldAlbumsOrder: values.oldAlbums as string[][],
      newAlbums: values.newAlbums as FileList[],
      createdAt: values.createdAt || defaultValues.created_at,
    };

    editFn(newPost);
  }

  return (
    <div className=" z-50 ">
      <Sheet>
        <SheetTrigger>
          <Button size={'sm'}>
            {defaultValues.draft ? 'Continue editing' : 'Edit'}
          </Button>
        </SheetTrigger>
        <SheetContent side={'bottom'} className="w-full ">
          <SheetHeader>
            <SheetTitle>Edit Post</SheetTitle>
          </SheetHeader>
          <div className="flex items-center justify-center mt-4 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="gap-3 grid grid-cols-2 w-full"
              >
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <>
                        <FormItem className="flex gap-2 border p-2 rounded-lg items-center space-y-0">
                          <Thumbnail
                            $src={defaultValues.thumbnail as string}
                            className={
                              'rounded-md w-40 h-24 object-cover shrink-0'
                            }
                          />
                          {/* <FormLabel>Thumbnail</FormLabel> */}
                          <Input
                            disabled={isLoading}
                            type="file"
                            accept="image/*"
                            className="text-base text-gray-8 file:py-[19px] h-fit border-dashed"
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </FormItem>
                      </>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className=" space-y-1">
                        <FormLabel className="mb-0">Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="text-base text-gray-8 mt-8"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="justify-self-stretch self-stretch space-y-1">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger className="">
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

                  {defaultValues?.albums && (
                    <FormField
                      control={form.control}
                      name={'oldAlbums'}
                      render={({ field }) => (
                        <FormItem className="border p-2 rounded-md">
                          <FormLabel>Existing albums</FormLabel>
                          <FormControl>
                            <Sort
                              albums={defaultValues?.albums as string[][]}
                              onChange={(order) => field.onChange(order)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="createdAt"
                    render={({ field }) => (
                      <Calender
                        onChange={field.onChange}
                        value={defaultValues.created_at}
                      />
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
                            disabled={isLoading}
                            {...field}
                            className="text-base text-gray-8 min-h-[200px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newAlbums"
                    render={({ field }) => (
                      <FormItem className="border rounded-md p-2 space-y-1 ">
                        <FormLabel>New Albums</FormLabel>
                        <FormControl>
                          <Drag
                            onChange={(files) => {
                              field.onChange(files);
                            }}
                            onUpload={(albums) => console.log(albums)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* <div className="flex gap-2"> */}

                {/* </div> */}

                <SheetClose className=" col-span-full">
                  <div className="flex items-center gap-2 w-full">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="grow"
                      onClick={() => setDraft(false)}
                    >
                      {isLoading ? (
                        <div className=" flex gap-2 items-center">
                          <Loading
                            type="self"
                            size="small"
                            className=" text-white"
                          />
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
                          <Loading
                            type="self"
                            size="small"
                            className=" text-white"
                          />
                          Publishing...
                        </div>
                      ) : (
                        'Save as draft'
                      )}
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
