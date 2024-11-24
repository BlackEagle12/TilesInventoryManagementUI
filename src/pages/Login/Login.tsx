import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '../../hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/myComponents/Loader';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  });

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    toast({
      title: 'Registration Successful',
      description: 'Your account has been created.',
    });

    navigate('/');
  }

  const onError=(e: any)=>{
      console.log('hello ',e);
      
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-modern from-amber-100 to-amber-200 p-4">
      <Card className="w-full max-w-md">
        {
          isSubmitting && <Loader />
        }
        <CardHeader className="text-xl text-center divide-y">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="johndoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex justify-between">
                <Link to="/forgot-password" className='text-blue-500'>
                    Forgot Password?
                </Link>
                <Button onClick={form.handleSubmit(onSubmit,onError)} type="submit" className="ml-auto" disabled={isSubmitting}>
                  Login 
                </Button>
              </CardFooter>
            </form>
          </Form>
          <CardFooter className='justify-center mt-3'>
            <p>Don't have account?</p>&nbsp;<Link className='text-blue-500' to="/registration">Create New</Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
