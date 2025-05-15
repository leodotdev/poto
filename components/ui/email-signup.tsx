"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ConfettiButton } from "@/components/ui/confetti-button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

type FormValues = z.infer<typeof formSchema>

export function EmailSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast.success("Welcome to The Poetic Toolbox!", {
          description: result.message || "Your digital zine is on its way to your inbox.",
          duration: 5000,
        })
        setIsSubmitted(true)
      } else {
        toast.error("Oops! Something went wrong", {
          description: result.error || "Please try again later.",
          duration: 5000,
        })
      }
    } catch (error) {
      toast.error("Connection error", {
        description: "Please check your internet connection and try again.",
        duration: 5000,
      })
      console.error("Error submitting email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="index-card mx-auto max-w-md space-y-4 text-center">
        <div className="space-y-2">
          <p className="label">Magic incoming</p>
          <h2 className="text-2xl font-bold tracking-tight">Check Your Inbox!</h2>
          <p className="text-muted-foreground">
            Your digital zine is on its way. While you wait, explore our site or drop another creative spark.
          </p>
        </div>
        <ConfettiButton
          onClick={() => setIsSubmitted(false)}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Drop Another Spark</span>
          </div>
        </ConfettiButton>
      </div>
    )
  }

  return (
    <div className="index-card mx-auto max-w-md space-y-4">
      <div className="space-y-2">
        <p className="label">Free digital zine</p>
        <h2 className="text-2xl font-bold tracking-tight">Join the Movement</h2>
        <p className="text-muted-foreground">
          Sign up to receive our creative manifesto and occasional sparks of inspiration.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    className="bg-background/50"
                    type="email"
                    autoComplete="email"
                    aria-label="Email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full hover-lift"
            disabled={isSubmitting}
            aria-label="Subscribe to newsletter"
          >
            {isSubmitting ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-background"></span>
                  <span>Sending...</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span>Send Me the Zine</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}