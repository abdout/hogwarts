"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Site error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-mono break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = "/"}
          >
            Go home
          </Button>
        </div>
      </div>
    </main>
  );
} 