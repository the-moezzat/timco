import { Button } from '@/components/ui/button';
import { sendMessage } from '@/services/contact';
import { useMutation } from 'react-query';
import { useToast } from '@/components/ui/use-toast';
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
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
  }),
  lastName: z.string({
    required_error: 'Last name is required',
  }),
  email: z.string().email(),
  message: z.string({
    required_error: 'Message is required',
  }),
});

export default function Contact() {
  const { toast } = useToast();
  const { mutate, isLoading } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      toast({
        title: 'Your message has been sent',
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className=" my-8">
      <div className="flex items-start justify-between gap-4 flex-col">
        <h1 className="text-6xl font-bold text-neutral-900 max-lg:text-4xl">
          Let's chat
        </h1>
        <p className="text-lg text-neutral-700 max-lg:text-base">
          Please feel free to reach out. I am always open to have a chat and
          connect! Happy to chat: programming, entrepreneurship, finance,
          passive investing, dogs, and food
        </p>
      </div>

      <div className="flex gap-4 mt-4 max-lg:text-sm max-sm:flex-col max-sm:gap-2">
        <div>
          <p className="font-medium">
            Email:{' '}
            <a
              href="mailto:tcco.tim@gmail.com"
              className="text-blue-500 underline font-normal"
            >
              tcco.tim@gmail.com
            </a>
          </p>
        </div>
        <div>
          <p className="font-medium">
            Phone:{' '}
            <a
              href="tel:650-430-7593"
              className="text-blue-500 underline font-normal"
            >
              650-430-7593
            </a>
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-8/12 mx-auto mt-8 max-md:w-full"
        >
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
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
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
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
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="text-base text-gray-8"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
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
          <Button disabled={isLoading}>
            {isLoading ? 'sending' : 'Send message'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
