"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/components/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center gap-4 p-4">
      <h2>Something went wrong!</h2>
      <h2>Error Code: {error.digest}</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
