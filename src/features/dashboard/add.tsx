/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
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
import { useMutation, useQueryClient } from 'react-query';
import { AddPost } from '@/services/blogApi';
import Loading from '@/components/Loading';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
});

export default function Add() {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: AddPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      form.reset();
      toast.success('Post added successfully');
    },
    onError: () => {
      toast.error('Field to add post');
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const thumbnail: FileList = values.thumbnail;
    mutate({ ...values, thumbnail, draft });
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
                        <Input
                          {...field}
                          className="text-base text-gray-8"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
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
                          disabled={isLoading}
                          {...field}
                          className="text-base text-gray-8 min-h-[200px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2 w-full">
                  <Button type="submit" disabled={isLoading} className="grow">
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
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
