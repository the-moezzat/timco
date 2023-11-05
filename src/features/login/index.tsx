import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/services/auth';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

function Login() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(login, {
    mutationKey: ['user'],
    onSuccess() {
      navigate('/tim');
      window.location.reload();
    },
    onError(error) {
      console.log(error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="max-w-[1440px] mx-auto z-50 h-screen grid items-center justify-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 bg-white p-6 rounded-md w-96"
        >
          <div className=" space-y-1">
            <h1 className="text-2xl font-bold text-gray-8 tracking-tight text-gray-800">
              Hello, <span className="font-medium">Tim</span>
            </h1>
            <p className="text-base text-gray-600">
              Sign in now and start making memories
            </p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-base text-gray-7">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    disabled={isLoading}
                    className="text-base text-gray-8"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full space-y-1">
                <FormLabel className="text-base text-gray-7">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="password"
                    type="password"
                    {...field}
                    className="mt-0 w-full space-y-0 text-base text-gray-8"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Login;
