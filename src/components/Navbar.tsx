"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link className="text-xl font-bold mb-4 md:mb-0" href="/">
          AnonNotes
        </Link>
        {session ? (
          <>
            <span>Welcome, {user?.username || user?.email}</span>
            <Button className="w-full md:w-auto" onClick={() => signOut()}>
              Signout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto">Signin</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
