import React, { useState, useEffect } from "react";
import { useFloating, offset, flip, shift } from "@floating-ui/react";
import User from "@/components/ui/assets/circle-user-round.svg";
import { useSession } from "next-auth/react";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Registration } from "./Registration";

export function UserButton() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const { x, y, strategy, update, refs } = useFloating({
    placement: "bottom",
    middleware: [offset(8), flip(), shift()],
  });

  // Recalculate popover position on window resize
  useEffect(() => {
    if (!open) return;

    function handleResize() {
      update();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, update]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      const reference = refs.reference.current;
      const floating = refs.floating.current;

      // Check if refs are DOM elements and support contains()
      const isReferenceElement = reference instanceof Element;
      const isFloatingElement = floating instanceof Element;

      if (
        isReferenceElement &&
        isFloatingElement &&
        !reference.contains(event.target as Node) &&
        !floating.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, refs]);

  return (
    <>
      <User
        ref={refs.setReference}
        onClick={() => {
          setOpen(!open);
          update();
        }}
        className="w-9 h-9 cursor-pointer text-primary-800 mr-4"
      />

      {open && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          className="z-10 mt-2 w-56 p-4 bg-white rounded shadow-lg border border-gray-200"
        >
          {!session && (
            <>
              <p>You are not logged in</p>
              <Login />
              <p>New user?</p>
              <Registration />
            </>
          )}

          {session?.roles?.includes("USER") && (
            <>
              <p>{session.user?.name}</p>
              <p>{session.user?.email}</p>
              <Logout />
            </>
          )}
        </div>
      )}
    </>
  );
}
