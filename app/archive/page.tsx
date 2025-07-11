import Link from "next/link";
import {
  ArrowRight,
  Search,
  Filter,
  BookOpen,
  Edit,
  Feather,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ScrollRevealItem from "@/components/ScrollRevealItem";

// Sample ritual data
const rituals = [
  {
    id: "morning-pages",
    title: "Morning Pages",
    description:
      "A daily practice of three pages of longhand, stream-of-consciousness writing to clear the mind and awaken creativity.",
    category: "Writing",
    difficulty: "Beginner",
    timeRequired: "30 minutes",
    tags: ["morning-ritual", "journaling", "creative-unblocking"],
  },
  {
    id: "visual-mapping",
    title: "Visual Thought Mapping",
    description:
      "A visual brainstorming technique that connects ideas through images, colors, and organic patterns rather than linear notes.",
    category: "Visual",
    difficulty: "Intermediate",
    timeRequired: "45 minutes",
    tags: ["brainstorming", "visual-thinking", "idea-generation"],
  },
  {
    id: "sensory-walk",
    title: "The Sensory Walk",
    description:
      "A mindful walking practice where you document observations through all five senses to heighten your perceptual awareness.",
    category: "Movement",
    difficulty: "Beginner",
    timeRequired: "60 minutes",
    tags: ["mindfulness", "observation", "nature-connection"],
  },
  {
    id: "creative-constraints",
    title: "Creative Constraints Exercise",
    description:
      "A technique that intentionally limits your tools, time, or techniques to spark innovative thinking and fresh approaches.",
    category: "Mixed",
    difficulty: "Advanced",
    timeRequired: "120 minutes",
    tags: ["problem-solving", "innovation", "limitations"],
  },
  {
    id: "object-stories",
    title: "Object Stories",
    description:
      "A storytelling ritual where you select random objects and weave narratives that connect them, revealing unexpected meanings.",
    category: "Writing",
    difficulty: "Intermediate",
    timeRequired: "45 minutes",
    tags: ["storytelling", "object-connection", "narrative"],
  },
  {
    id: "collage-meditation",
    title: "Intuitive Collage Meditation",
    description:
      "A meditative practice where you create collages without planning, allowing your intuition to guide material selection and arrangement.",
    category: "Visual",
    difficulty: "Beginner",
    timeRequired: "90 minutes",
    tags: ["intuition", "collage", "visual-expression"],
  },
];

// Category icons
const categoryIcons = {
  Writing: <Edit className="h-5 w-5" />,
  Visual: <Feather className="h-5 w-5" />,
  Movement: <BookOpen className="h-5 w-5" />,
  Mixed: <BookOpen className="h-5 w-5" />,
};

export default function ArchivePage() {
  return (
    <div className="container space-y-16 py-12 md:py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-8 text-center md:gap-12">
        <div className="space-y-4">
          <ScrollRevealItem delay={0}>
            <p className="label">Explore Our Collection</p>
          </ScrollRevealItem>
          <ScrollRevealItem delay={150}>
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              The Ritual{" "}
              <span className="squiggle-border relative inline-block">
                Index
              </span>
            </h1>
          </ScrollRevealItem>
          <ScrollRevealItem delay={300}>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              A curated collection of creative practices, experiments, and
              rituals to help you reconnect with your creative essence.
            </p>
          </ScrollRevealItem>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="mx-auto max-w-4xl flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <ScrollRevealItem delay={0} className="flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search rituals..." className="pl-9 w-full" />
            </div>
          </ScrollRevealItem>
          <ScrollRevealItem delay={150}>
            <Button variant="outline">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </div>
            </Button>
          </ScrollRevealItem>
        </div>
      </section>

      {/* Rituals Grid */}
      <section className="mx-auto max-w-6xl">
        <div className="scrapbook-grid">
          {rituals.map((ritual, index) => (
            <ScrollRevealItem key={ritual.id} delay={index * 150}>
              <Card className="index-card overflow-hidden">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        {
                          categoryIcons[
                            ritual.category as keyof typeof categoryIcons
                          ]
                        }
                        <p className="label">{ritual.category}</p>
                      </div>
                      <h3 className="font-serif text-xl font-semibold">
                        {ritual.title}
                      </h3>
                    </div>
                    <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {ritual.difficulty}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{ritual.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {ritual.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6 pt-4">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {ritual.timeRequired}
                    </p>
                    <Link href={`/archive/${ritual.id}`}>
                      <Button variant="link" className="font-medium p-0">
                        <div className="flex items-center gap-2">
                          <span>View Ritual</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </ScrollRevealItem>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="mx-auto max-w-2xl rounded-lg border-2 bg-muted/50 p-8 text-center flex flex-col gap-6">
        <ScrollRevealItem delay={0}>
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
              New Rituals Coming Soon
            </h2>
            <p className="text-muted-foreground">
              Our collection is ever-growing. Sign up to be notified when we add
              new creative practices.
            </p>
          </div>
        </ScrollRevealItem>
        <ScrollRevealItem delay={150}>
          <div>
            <Link href="/">
              <Button size="lg" className="font-medium">
                <div className="flex items-center gap-2">
                  <span>Join Our Community</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Button>
            </Link>
          </div>
        </ScrollRevealItem>
      </section>
    </div>
  );
}
