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
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
  });

function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    // navigate('/');
    
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
          <CardTitle>Forgot Password</CardTitle>
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
              <CardFooter className="flex justify-between">
               <Button onClick={()=>{
                navigate('/login')
               }} type="button"  disabled={isSubmitting}>
                  Back
                </Button>
                <Button onClick={form.handleSubmit(onSubmit,onError)} type="submit" className="ml-auto" disabled={isSubmitting}>
                  Confirm
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;
