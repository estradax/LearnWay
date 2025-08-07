import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">LearnWay</div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/tutors" className="transition-colors font-medium">
              Temukkan Pengajar
            </Link>
            <Link
              href="/become-tutor"
              className="transition-colors font-medium"
            >
              Cara Menjadi Pengajar
            </Link>
            <Link
              href="/how-it-works"
              className="transition-colors font-medium"
            >
              Bagaimana cara kerjanya
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button className="px-6">Daftar</Button>
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
