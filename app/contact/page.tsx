"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send, Mail, MapPin, MessageSquare, Clock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ScrollRevealItem from "@/components/ScrollRevealItem";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(_data: FormValues) {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully!", {
      description: "We'll get back to you soon.",
      duration: 5000,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    form.reset();
  }

  return (
    <div className="container space-y-16 py-12 md:py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-8 text-center md:gap-12">
        <div className="space-y-4">
          <ScrollRevealItem delay={0}>
            <p className="label">Get in Touch</p>
          </ScrollRevealItem>
          <ScrollRevealItem delay={150}>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Let&apos;s{" "}
              <span className="squiggle-border relative inline-block">
                Connect
              </span>
            </h1>
          </ScrollRevealItem>
          <ScrollRevealItem delay={300}>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Have questions, ideas, or just want to say hello? We&apos;d love
              to hear from you.
            </p>
          </ScrollRevealItem>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-8">
          <ScrollRevealItem delay={0}>
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold tracking-tight">
                Contact Information
              </h2>
              <p className="text-muted-foreground">
                Reach out and we&apos;ll respond as soon as possible. We value
                every message and look forward to connecting with you.
              </p>
            </div>
          </ScrollRevealItem>

          <div className="space-y-6">
            <ScrollRevealItem delay={150}>
              <Card className="index-card">
                <CardContent className="flex items-start gap-4 p-4">
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-sm text-muted-foreground">
                      hello@poetictoolbox.com
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollRevealItem>

            <ScrollRevealItem delay={300}>
              <Card className="index-card rotate-[-1deg]">
                <CardContent className="flex items-start gap-4 p-4">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Visit Our Studio</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Creative Lane
                      <br />
                      Imagination District
                      <br />
                      Portland, OR 97205
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollRevealItem>

            <ScrollRevealItem delay={450}>
              <Card className="index-card rotate-[1deg]">
                <CardContent className="flex items-start gap-4 p-4">
                  <Clock className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Office Hours</h3>
                    <p className="text-sm text-muted-foreground">
                      Monday – Friday: 9am – 5pm
                      <br />
                      Weekend: By appointment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollRevealItem>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-8">
          <ScrollRevealItem delay={0}>
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold tracking-tight">
                Send a Message
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem delay={150}>
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="space-y-4 text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-primary" />
                    <h3 className="text-xl font-medium">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We&apos;ve received your
                      message and will respond as soon as possible.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
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
                                <Input
                                  placeholder="Your email address"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Message subject" {...field} />
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
                                placeholder="Your message"
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </ScrollRevealItem>
        </div>
      </div>
    </div>
  );
}
