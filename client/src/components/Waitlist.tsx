import { useState, useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useInView } from '../lib/hooks';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle } from 'lucide-react';

// Form schema matches the waitlist schema from the server
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Waitlist() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  // Define form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  
  // Define mutation for submitting the form
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const response = await apiRequest('POST', '/api/waitlist', values);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Successfully joined the waitlist!",
        description: "Thank you for your interest. I'll be in touch soon.",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error joining waitlist",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  // Form submission handler
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };
  
  return (
    <section 
      id="waitlist"
      ref={sectionRef}
      className="py-20 bg-primary/5"
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Join My <span className="text-primary">Waitlist</span>
          </h2>
          
          <p className={`text-center text-muted-foreground mb-12 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Be among the first to know about my upcoming projects, voiceover services, and web development offerings.
          </p>
          
          <div className={`transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {isSubmitted ? (
              <div className="text-center p-8 border border-border rounded-lg bg-card">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Your information has been added to my waitlist. I'll keep you updated about new projects and opportunities.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" type="email" {...field} />
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
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What services are you interested in?"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Let me know if you're interested in web development, voiceover work, or both.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-center">
                    <Button 
                      type="submit" 
                      size="lg"
                      disabled={mutation.isPending}
                      className="min-w-[200px]"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Join Waitlist"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
