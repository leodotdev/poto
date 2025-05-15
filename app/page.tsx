import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Brush, HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfettiButton } from "@/components/ui/confetti-button";
import { EmailSignup } from "@/components/ui/email-signup";

export default function Home() {
  return (
    <div className="container space-y-24 py-16 md:py-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-8 text-center md:gap-12 py-12">
        <div className="space-y-4">
          <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            The Poetic{" "}
            <span className="squiggle-border relative inline-block text-gradient">
              Toolbox
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            A sanctuary for artists, thoughtful humans, tired professionals, curious skeptics, 
            recovering perfectionists, and overthinkers with good hearts.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <ConfettiButton
            confettiColors={["#8B5CF6", "#D946EF", "#F97316", "#06B6D4", "#84CC16"]}
            size="lg"
            className="hover-lift"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Spark Creativity
          </ConfettiButton>
          <Link href="/archive">
            <Button variant="outline" size="lg" className="hover-lift">
              Explore Rituals
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Email Signup */}
      <section className="mx-auto max-w-md">
        <EmailSignup />
      </section>

      {/* Features */}
      <section className="space-y-12 noise-bg py-12 rounded-lg">
        <div className="text-center">
          <p className="typewriter-label mb-2">discover</p>
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-gradient">
            What We Offer
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tools for reconnecting with your creative essence
          </p>
        </div>
        <div className="scrapbook-grid">
          <Card className="index-card hover-lift">
            <CardContent className="p-6">
              <BookOpen className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-serif text-xl font-semibold">Creative Rituals</h3>
              <p className="text-muted-foreground">
                Structured practices to help you unlock your creativity, break through blocks,
                and establish consistent creative habits.
              </p>
            </CardContent>
          </Card>
          
          <Card className="index-card rotate-[-1deg] hover-lift">
            <CardContent className="p-6">
              <Brush className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-serif text-xl font-semibold">Artistic Exploration</h3>
              <p className="text-muted-foreground">
                A space to experiment with new forms, media, and perspectives without the
                pressure of perfection or productivity.
              </p>
            </CardContent>
          </Card>
          
          <Card className="index-card rotate-[1.5deg] hover-lift">
            <CardContent className="p-6">
              <HeartHandshake className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-serif text-xl font-semibold">Community Connection</h3>
              <p className="text-muted-foreground">
                Join a sanctuary of like-minded souls seeking to reconnect with their 
                creative essence in a world that often values productivity over process.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="mx-auto max-w-2xl rounded-lg border-2 bg-muted/50 p-8 text-center noise-bg">
        <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
          Ready to <span className="text-gradient">Join the Movement</span>?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Sign up for our free digital zine and begin your journey toward creative reconnection.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="#email-signup">
            <Button size="lg" className="font-medium hover-lift">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}