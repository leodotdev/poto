// import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfettiButton } from "@/components/ui/confetti-button";

export default function AboutPage() {
  return (
    <div className="container space-y-16 py-12 md:py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-8 text-center md:gap-12">
        <div className="space-y-4">
          <p className="label">Our Story</p>
          <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The Origin of the{" "}
            <span className="squiggle-border relative inline-block">
              Poetic Toolbox
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            How a collective of tired creatives, burned-out professionals, and
            hopeful dreamers built a sanctuary for the creative spirit.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-8">
          {/* Entry 1 */}
          <Card className="index-card mx-auto max-w-2xl">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="label">Chapter One</p>
                <p className="text-sm text-muted-foreground">Spring 2023</p>
              </div>
              <h3 className="font-serif text-xl font-semibold">
                The Creative Drought
              </h3>
              <p className="text-muted-foreground">
                It began with a question: &quot;Why do we feel so disconnected
                from our creative essence?&quot; A small group of artists,
                writers, and professionals found themselves in a shared state of
                creative drought, yearning for meaning beyond productivity
                metrics.
              </p>
              <p className="text-muted-foreground">
                The world had become too efficient, too polished, too focused on
                outcomes. We were losing the sacred joy of creation for its own
                sake, the messy middle, the delicious uncertainty of play.
              </p>
            </CardContent>
          </Card>

          {/* Entry 2 */}
          <Card className="index-card mx-auto max-w-2xl rotate-[-1deg]">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="label">Chapter Two</p>
                <p className="text-sm text-muted-foreground">Summer 2023</p>
              </div>
              <h3 className="font-serif text-xl font-semibold">
                The Kitchen Table Sessions
              </h3>
              <p className="text-muted-foreground">
                We began meeting around kitchen tables, in coffee shops, and
                over video calls. We shared our frustrations, our longings, our
                half-forgotten creative dreams. We created rituals—small,
                intentional practices that reconnected us to our innate creative
                wisdom.
              </p>
              <p className="text-muted-foreground">
                With each gathering, we discovered something profound: the
                creative process itself—messy, unpredictable, and deeply
                human—was the very thing we were missing in our optimized lives.
              </p>
            </CardContent>
          </Card>

          {/* Entry 3 */}
          <Card className="index-card mx-auto max-w-2xl rotate-[1deg]">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="label">Chapter Three</p>
                <p className="text-sm text-muted-foreground">Winter 2023</p>
              </div>
              <h3 className="font-serif text-xl font-semibold">
                The Poetic Manifesto
              </h3>
              <p className="text-muted-foreground">
                Our informal gatherings evolved into a movement. We wrote a
                manifesto—a promise to honor the sacred in the silly, the
                profound in play, the wisdom in wandering. We called it The
                Poetic Toolbox: a collection of practices, perspectives, and
                possibilities for reconnecting with creative joy.
              </p>
              <p className="text-muted-foreground">
                This wasn&apos;t about making &quot;better art&quot; or becoming
                &quot;more productive creatives.&quot; It was about remembering
                that creativity is our birthright—a way of being in the world
                that makes life worth living.
              </p>
            </CardContent>
          </Card>

          {/* Entry 4 */}
          <Card className="index-card mx-auto max-w-2xl rotate-[-0.5deg]">
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="label">Chapter Four</p>
                <p className="text-sm text-muted-foreground">Present Day</p>
              </div>
              <h3 className="font-serif text-xl font-semibold">
                The Sanctuary Expands
              </h3>
              <p className="text-muted-foreground">
                Today, The Poetic Toolbox exists as both a philosophy and a
                practical guide. We share rituals, host gatherings, publish
                zines, and create spaces—both digital and physical—where people
                can reconnect with their creative essence.
              </p>
              <p className="text-muted-foreground">
                We're building a world that values the tactile joy of making,
                the courage to create without knowing the outcome, and the
                community that forms when we share our creative journeys with
                each other.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-4xl flex flex-col gap-8">
        <div className="text-center flex flex-col gap-4">
          <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
            Our Creative Values
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground">
            The principles that guide our work and shape our community
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-xl font-semibold">
              Sacred Silliness
            </h3>
            <p className="text-muted-foreground">
              We honor play as a profound act. Whimsy, experimentation, and joy
              are not frivolous—they&apos;re essential.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-xl font-semibold">
              Poetic Disorder
            </h3>
            <p className="text-muted-foreground">
              We embrace the messy middle, the beauty of imperfection, and the
              wisdom that emerges from chaos.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-xl font-semibold">
              Tactile Weirdness
            </h3>
            <p className="text-muted-foreground">
              We create with our hands and hearts, valuing the physicality of
              making and the strangeness that makes each of us unique.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-xl font-semibold">
              Human-Centered Creation
            </h3>
            <p className="text-muted-foreground">
              We design for human souls, not algorithms. We prioritize meaning
              over metrics, connection over conversion.
            </p>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="mx-auto max-w-2xl rounded-lg border-2 bg-muted/50 p-8 text-center flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
            Join Our Creative Movement
          </h2>
          <p className="text-muted-foreground">
            Become part of our community and receive our creative manifesto.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="font-medium">
              <div className="flex items-center gap-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
          </Link>
          <ConfettiButton
            size="lg"
            confettiColors={[
              "#8B5CF6",
              "#D946EF",
              "#F97316",
              "#06B6D4",
              "#84CC16",
            ]}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Spark Joy</span>
            </div>
          </ConfettiButton>
        </div>
      </section>
    </div>
  );
}
