"use client";

import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/client/auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function Header() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  // Determine user type from session data
  const userType = session?.user?.role === "teacher" ? "teacher" : "student";

  React.useEffect(() => {
    if (!session && !sessionLoading) {
      router.push("/login");
    }
  }, [session, sessionLoading, router]);

  // Redirect if not authenticated
  if (sessionLoading) {
    return null;
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary">LearnWay</div>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/tutors"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            find tutors
          </Link>
          <Link href="/dashboard" className="text-primary font-medium">
            dashboard
          </Link>
        </nav>
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={session.user?.image || "/placeholder.svg"} />
            <AvatarFallback className="text-sm">
              {session.user?.firstName?.[0]}
              {session.user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <Button variant="ghost" onClick={handleSignOut}>
            sign out
          </Button>
        </div>
      </div>
    </header>
  );
}
