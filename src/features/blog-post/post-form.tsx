/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import styled from 'styled-components';
import Sort from '../sort/sort';

type FormValues = z.infer<typeof formSchema>;

interface FormProps {
  defaultValues?: FormValues;
  handleSubmit: (values: { values: FormValues; draft: boolean }) => void;
}

const Thumbnail = styled.div<{ $src: string }>`
  width: 130px;
  height: 75px;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
`;

const formSchema = z.object({
  thumbnail: z.any().optional(),
  title: z.string({
    required_error: 'Title is required',
  }),
  createdAt: z.string(),
  category: z.string({
    required_error: 'Category is required',
  }),
  content: z.string({
    required_error: 'Content is required',
  }),
  oldAlbums: z.any(),
  albums: z.any().optional(),
  uploadedAlbums: z.array(z.array(z.string())).optional(),
});

export default function PostForm({ handleSubmit, defaultValues }: FormProps) {
  const [draft, setDraft] = useState(false);
  // const [thumb, setThumb] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      createdAt: '2023-10-16T01:42:34.169+00:00',
      uploadedAlbums: [],
    },
  });

  // console.log(form.getValues());

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmit({ values, draft });

    // setThumb(false);

    // form.resetField('title');
    // form.resetField('content');
    // form.resetField('uploadedAlbums');
    // form.resetField('category');
  }

  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <>
              <FormItem className="flex gap-2 border p-2 rounded-lg items-center space-y-0">
                {(selectedImage || defaultValues?.thumbnail) && (
                  <Thumbnail
                    $src={
                      selectedImage ? selectedImage : defaultValues?.thumbnail
                    }
                    className={'rounded-md w-40 h-24 object-cover shrink-0'}
                  />
                )}
                {/* <FormLabel>Thumbnail</FormLabel> */}
                <Input
                  // disabled={isLoading}
                  type="file"
                  accept="image/*"
                  className="text-base text-gray-8 file:py-[19px] h-fit border-dashed"
                  onChange={(e) => {
                    console.log(e.target.files);
                    handleImageChange(e);
                    field.onChange(e.target.files);
                  }}
                />
              </FormItem>
            </>
          )}
        />

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
          name="createdAt"
          render={({ field }) => <Calender onChange={field.onChange} />}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                to put albums or images in post use "//=//=//=//" and upload
                them in order
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
                const uploadedAlbums = form.getValues().uploadedAlbums
                  ? form.getValues().uploadedAlbums
                  : [];
                form.setValue('uploadedAlbums', [
                  ...(uploadedAlbums as string[][]),
                  albums,
                ]);
              }}
            />
          )}
        />

        {defaultValues?.oldAlbums && (
          <FormField
            control={form.control}
            name={'oldAlbums'}
            render={({ field }) => (
              <FormItem className="border p-2 rounded-md">
                <FormLabel>Existing albums</FormLabel>
                <FormControl>
                  <Sort
                    albums={defaultValues?.oldAlbums as string[][]}
                    onChange={(order) => field.onChange(order)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

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
      </form>
    </Form>
  );
}
