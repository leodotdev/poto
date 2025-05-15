import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Plus, Star, Filter, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Sample product data
const products = [
  {
    id: "creative-manifesto",
    name: "The Creative Manifesto",
    description: "Our hand-printed zine that outlines the core philosophy of The Poetic Toolbox movement.",
    price: 15,
    image: "/globe.svg", // placeholder - would be actual product image
    category: "Print",
    featured: true,
    inStock: true
  },
  {
    id: "ritual-cards",
    name: "Ritual Practice Cards",
    description: "A deck of 52 cards with creative rituals and prompts to spark your imagination daily.",
    price: 25,
    image: "/file.svg", // placeholder - would be actual product image
    category: "Tools",
    featured: true,
    inStock: true
  },
  {
    id: "notebook",
    name: "Field Notebook",
    description: "Hand-bound notebook with prompts, blank pages, and creative exercises to document your journey.",
    price: 18,
    image: "/window.svg", // placeholder - would be actual product image
    category: "Print",
    featured: false,
    inStock: true
  },
  {
    id: "creative-toolkit",
    name: "The Tactile Toolkit",
    description: "A collection of physical tools and materials to engage your senses during creative practice.",
    price: 45,
    image: "/next.svg", // placeholder - would be actual product image
    category: "Tools",
    featured: true,
    inStock: false
  },
  {
    id: "poetry-prints",
    name: "Poetic Postcards",
    description: "Set of 10 letterpress postcards featuring poetic prompts and artistic illustrations.",
    price: 12,
    image: "/vercel.svg", // placeholder - would be actual product image
    category: "Print",
    featured: false,
    inStock: true
  },
  {
    id: "creative-course",
    name: "Creative Reconnection Course",
    description: "Digital course with 8 modules to help you develop a sustainable creative practice.",
    price: 75,
    image: "/globe.svg", // placeholder - would be actual product image
    category: "Digital",
    featured: false,
    inStock: true
  },
];

export default function ShopPage() {
  return (
    <div className="container space-y-16 py-12 md:py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-8 text-center md:gap-12">
        <div className="space-y-4">
          <p className="typewriter-label">Our Collection</p>
          <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The Gift{" "}
            <span className="squiggle-border relative inline-block">
              Shop
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            Tactile tools, thoughtfully designed artifacts, and creative resources to support 
            your journey back to creative reconnection.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="mx-auto max-w-4xl space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              className="pl-9" 
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-6xl space-y-6">
        <h2 className="font-serif text-2xl font-bold tracking-tight">Featured Items</h2>
        <div className="scrapbook-grid">
          {products
            .filter(product => product.featured)
            .map(product => (
              <Card key={product.id} className="index-card overflow-hidden">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6"
                  />
                  {product.featured && (
                    <div className="absolute top-2 right-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="typewriter-label">{product.category}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <Star className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </div>
                    <h3 className="font-serif text-lg font-semibold">{product.name}</h3>
                    <p className="text-muted-foreground line-clamp-2">{product.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6 pt-4">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold">${product.price}</p>
                    <Button disabled={!product.inStock}>
                      {product.inStock ? (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </>
                      ) : (
                        "Out of Stock"
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </section>

      {/* All Products */}
      <section className="mx-auto max-w-6xl space-y-6">
        <h2 className="font-serif text-2xl font-bold tracking-tight">All Products</h2>
        <div className="scrapbook-grid">
          {products.map(product => (
            <Card key={product.id} className="index-card overflow-hidden">
              <div className="aspect-square relative overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <p className="rounded-md bg-background/90 px-3 py-1 text-sm font-medium">
                      Out of Stock
                    </p>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="space-y-1">
                  <p className="typewriter-label">{product.category}</p>
                  <h3 className="font-serif text-lg font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground line-clamp-2">{product.description}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t p-6 pt-4">
                <div className="flex w-full items-center justify-between">
                  <p className="text-lg font-semibold">${product.price}</p>
                  <Button disabled={!product.inStock} variant={product.inStock ? "default" : "outline"}>
                    {product.inStock ? (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    ) : (
                      "Notify Me"
                    )}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Custom Orders */}
      <section className="mx-auto max-w-2xl rounded-lg border-2 bg-muted/50 p-8 text-center">
        <h2 className="font-serif text-2xl font-bold tracking-tight md:text-3xl">
          Looking for Something Custom?
        </h2>
        <p className="mt-4 text-muted-foreground">
          We create bespoke creative tools and resources for individuals and organizations.
          Get in touch to discuss your needs.
        </p>
        <div className="mt-6">
          <Link href="/contact">
            <Button size="lg" className="font-medium">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}