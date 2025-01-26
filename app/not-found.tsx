"use client";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="mx-auto text-center p-24">
      <h2 className="p-2">Can not find the page you are looking for...</h2>
      <p className="p-2">
        Go back to{" "}
        <Link href="/">
          <strong>Home</strong>
        </Link>
      </p>
    </div>
  );
}
