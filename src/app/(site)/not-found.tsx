import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Large 404 */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-foreground animate-pulse">
            404
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto" />
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The magical page you&apos;re looking for seems to have vanished into thin air. 
            Perhaps it was moved to a different dimension?
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">
              Return to Hogwarts
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">
              Learn About Us
            </Link>
          </Button>
        </div>

        {/* Helpful links */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/"
              className="text-sm text-primary hover:underline"
            >
              Home
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link
              href="/about"
              className="text-sm text-primary hover:underline"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 