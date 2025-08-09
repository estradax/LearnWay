import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Search,
  Star,
  MapPin,
  Users,
  BookOpen,
  Music,
  Palette,
  Calculator,
  Heart,
  ChevronDown,
  Quote,
} from "lucide-react";
import Link from "next/link";
import TutorProfileModal from "@/components/tutor-profile-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomePage() {
  const categories = [
    {
      name: "Matematika",
      icon: Calculator,
      color: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700",
      count: "2,500+ Materi",
    },
    {
      name: "Bahasa",
      icon: BookOpen,
      color: "bg-gradient-to-br from-green-100 to-green-200 text-green-700",
      count: "1,800+ Materi",
    },
    {
      name: "Musik",
      icon: Music,
      color: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700",
      count: "950+ Materi",
    },
    {
      name: "Art & Design",
      icon: Palette,
      color: "bg-gradient-to-br from-pink-100 to-pink-200 text-pink-700",
      count: "720+ Materi",
    },
  ];

  const featuredTutors = [
    {
      id: 1,
      name: "Loissa",
      subject: "Piano",
      rating: 5,
      reviews: 35,
      location: "Kecamatan Kelapa Gading (tatap muka)",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-woman-GMVTBdhb4dpsnfRpKtiFVMJT6g8QWZ.png",
      verified: true,
      ambassador: true,
      description:
        "Asah otak si kecil dengan belajar piano! private piano lesson di kelapa gading :)",
      online: false,
      bio: "I'm a passionate piano educator with over 5 years of experience helping students achieve their musical goals.",
      education: [
        "M.Mus. Piano Performance - Jakarta Institute of Arts",
        "B.Mus. Piano - University of Indonesia",
      ],
      achievements: [
        "Concert Pianist",
        "200+ Students Taught",
        "Music Competition Judge",
      ],
      languages: ["English", "Indonesian"],
      teachingStyle:
        "I focus on building strong technical foundations while keeping lessons fun and engaging.",
      reviews_data: [
        {
          name: "Sarah Kim",
          rating: 5,
          comment:
            "Loissa is an amazing piano teacher! Very patient with children.",
          date: "1 week ago",
        },
      ],
      subjects: ["Classical Piano", "Jazz Piano", "Music Theory"],
      experience: "5+ years",
      price: 35,
      availability: "Available today",
    },
    {
      id: 2,
      name: "Anindya",
      subject: "Piano",
      rating: 4.9,
      reviews: 38,
      location: "(online)",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/chinese-teacher-woman-melqHKBZAmB7jTGnVLHjTkYAFiuRfH.png",
      verified: true,
      ambassador: true,
      description:
        "Belajar piano private online untuk pemula, fleksibel & interaktif khusus anak dan dewasa",
      online: true,
      bio: "Online piano instructor specializing in beginner-friendly interactive lessons for all ages.",
      education: [
        "B.Mus. Piano Pedagogy - Berklee Online",
        "Piano Teaching Certificate - ABRSM",
      ],
      achievements: [
        "Online Teaching Expert",
        "300+ Students Taught",
        "Curriculum Developer",
      ],
      languages: ["English", "Indonesian"],
      teachingStyle:
        "I use interactive online tools and personalized approaches for effective remote learning.",
      reviews_data: [
        {
          name: "Lisa Wang",
          rating: 5,
          comment: "Great online piano lessons! Very interactive and engaging.",
          date: "2 weeks ago",
        },
      ],
      subjects: ["Beginner Piano", "Online Piano", "Piano for Adults"],
      experience: "4+ years",
      price: 30,
      availability: "Available today",
    },
    {
      id: 3,
      name: "Daniel",
      subject: "Piano",
      rating: 5,
      reviews: 21,
      location: "Kecamatan Tanjung Priok (tatap muka & online)",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-man-UYl0E1brgRMNIdpwKtcub7BEPgdF0Y.png",
      verified: true,
      ambassador: true,
      description:
        "Siapapun bisa belajar piano! jadwal fleksibel & bisa pilih lagu yang kamu suka dan atur...",
      online: true,
      bio: "Flexible piano instructor who believes anyone can learn piano with the right approach and favorite songs.",
      education: [
        "M.Mus. Piano Performance - Royal College of Music",
        "B.A. Music - University of Indonesia",
      ],
      achievements: [
        "Flexible Teaching Award",
        "150+ Students Taught",
        "Popular Music Specialist",
      ],
      languages: ["English", "Indonesian"],
      teachingStyle:
        "I let students choose their favorite songs and adapt lessons to their musical preferences.",
      reviews_data: [
        {
          name: "Tommy Lee",
          rating: 5,
          comment:
            "Daniel makes learning piano so much fun! Love that I can play my favorite songs.",
          date: "1 month ago",
        },
      ],
      subjects: ["Popular Piano", "Flexible Learning", "Song-based Piano"],
      experience: "6+ years",
      price: 40,
      availability: "Available this week",
    },
  ];

  const studentReviews = [
    {
      name: "Sarah M.",
      subject: "Mathematics",
      rating: 5,
      comment:
        "Pengajar yang luar biasa! Kalkulus jadi jauh lebih mudah dipahami. Nilai saya naik dari C ke A hanya dalam 2 bulan..",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-woman-GMVTBdhb4dpsnfRpKtiFVMJT6g8QWZ.png",
      date: "2 weeks ago",
    },
    {
      name: "David L.",
      subject: "Piano",
      rating: 5,
      comment:
        "Belajar piano dengan tutor saya sungguh luar biasa. Sangat sabar dan beradaptasi dengan kecepatan belajar saya dengan sempurna.",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-man-UYl0E1brgRMNIdpwKtcub7BEPgdF0Y.png",
      date: "1 month ago",
    },
    {
      name: "Maria K.",
      subject: "English",
      rating: 4.8,
      comment:
        "Pengajar bahasa Inggris yang luar biasa! Membantu saya mempersiapkan IELTS dan saya mendapatkan skor yang saya butuhkan untuk universitas.",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/chinese-teacher-woman-melqHKBZAmB7jTGnVLHjTkYAFiuRfH.png",
      date: "3 weeks ago",
    },
  ];

  const faqs = [
    {
      question: "Bagaimana cara menemukan tutor yang tepat untuk saya?",
      answer:
        "Gunakan filter pencarian kami untuk menemukan tutor berdasarkan mata pelajaran, lokasi, kisaran harga, dan ketersediaan. Baca ulasan dan periksa profil mereka untuk menemukan tutor yang paling sesuai dengan gaya belajar dan tujuan Anda.",
    },
    {
      question: "Mata pelajaran apa saja yang tersedia?",
      answer:
        "Kami menawarkan bimbingan belajar dalam mata pelajaran akademis seperti Matematika, Sains, Bahasa, serta mata pelajaran kreatif seperti Musik, Seni, dan keterampilan khusus seperti Pemrograman dan Persiapan Ujian.",
    },
    {
      question: "Bagaimana cara kerja penetapan harga?",
      answer:
        "Setiap tutor menetapkan tarif per jamnya sendiri. Anda dapat memfilter berdasarkan rentang harga dan bahkan meminta harga khusus. Sebagian besar tutor menawarkan paket fleksibel dan diskon untuk beberapa sesi.",
    },
    {
      question: "Bisakah saya mengikuti pelajaran daring atau tatap muka?",
      answer:
        "Ya! Banyak tutor menawarkan les online dan tatap muka. Anda dapat memfilter sesuai preferensi dan mendiskusikan format yang paling sesuai dengan tutor pilihan Anda.",
    },
    {
      question: "Bagaimana jika saya tidak puas dengan Pengajar saya?",
      answer:
        "Kami menawarkan jaminan kepuasan. Jika Anda tidak puas dengan pelajaran pertama Anda, kami akan membantu Anda mencari tutor baru atau memberikan pengembalian dana. Kesuksesan belajar Anda adalah prioritas kami.",
    },
    {
      question: "Bagaimana cara memesan pelajaran?",
      answer:
        "Cukup telusuri Pengajar, pilih Pengajar pilihan Anda, pilih tanggal dan waktu yang sesuai, lalu kirimkan permintaan pemesanan. Pengajar akan mengonfirmasi dan Anda bisa mulai belajar.!",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full overflow-x-hidden bg-background px-2 sm:px-4 py-6 sm:py-12 md:py-20 text-center">
        <div className="max-w-5xl mx-auto w-full px-0 sm:px-2">
          <h1 className="text-xl sm:text-3xl md:text-6xl font-bold mb-4 sm:mb-8 leading-snug break-words max-w-full">
            <span>Temukan kesempurnaan dalam Belajar</span>
            <span className="block text-base sm:text-2xl md:text-4xl mt-2 sm:mt-4">
              Belajar apa saja dan dimana saja
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl mb-6 sm:mb-12 max-w-full sm:max-w-3xl mx-auto leading-relaxed break-words break-all">
            Terhubung dengan tutor berkualifikasi untuk pengalaman belajar yang dipersonalisasi.
            Dari mata pelajaran akademik hingga keterampilan kreatif, temukan yang paling cocok
            untuk perjalanan belajar Anda.
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-10 sm:mb-16">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4 p-2 sm:p-3 shadow-xs border rounded-lg">
              <div className="flex-1 relative min-w-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6" />
                <Input
                  placeholder="Kamu mau belajar apa?"
                  className="pl-12 border-0 focus-visible:ring-0 text-base sm:text-lg h-12 sm:h-14 shadow-none"
                />
              </div>
              <div className="flex-1 relative min-w-0">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6" />
                <Input
                  placeholder="Lokasi kamu"
                  className="pl-12 border-0 focus-visible:ring-0 text-base sm:text-lg h-12 sm:h-14 shadow-none"
                />
              </div>
              <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-10 font-semibold w-full md:w-auto text-base sm:text-lg">
                Cari
              </Button>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto mt-8">
            <div className="text-center p-4 sm:p-6 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold mb-2">1,000+</div>
              <div className="font-medium text-base">Pengajar Berpengalaman</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold mb-2">20,000+</div>
              <div className="font-medium text-base">Siswa Terbantu</div>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-bold mb-2">200+</div>
              <div className="font-medium text-base">Topik</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories */}
      <section className="container mx-auto px-2 sm:px-4 py-8 sm:py-16 md:py-20">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Kategori Favorit</h2>
          <p className="text-base sm:text-xl max-w-3xl mx-auto">
            Jelajahi berbagai macam subjek kami mulai dari keterampilan akademis hingga kreatif
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-sm transition-all duration-300 cursor-pointer group border shadow-xs bg-background rounded-card"
            >
              <CardContent className="p-4 sm:p-8 text-center">
                <div
                  className={`w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs border`}
                >
                  <category.icon className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-sm">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Tutors - Superprof Style */}
      <section className="container mx-auto px-2 sm:px-4 py-8 sm:py-16 md:py-20">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Beberapa guru berpengalaman</h2>
          <p className="text-base sm:text-xl max-w-3xl mx-auto">
            Temukan Pengajar kesukaan dan mulai perjalanan belajar Anda hari ini
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {featuredTutors.map((tutor) => (
            <div key={tutor.id} className="group cursor-pointer">
              <Card className="overflow-hidden border-0 shadow-xs hover:shadow-sm transition-all duration-300 group-hover:-translate-y-2 bg-background border pt-0">
                <div className="relative h-56 sm:h-80">
                  <img
                    src={tutor.image || "/placeholder.svg"}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Heart Icon */}
                  <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center transition-colors">
                    <Heart className="w-6 h-6 text-foreground fill-primary-foreground" />
                  </button>

                  {/* Tutor Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{tutor.name}</h3>
                    <p className="text-white/90 text-sm mb-3">
                      {tutor.location}
                    </p>
                    {tutor.online && (
                      <Badge className="border-0 mb-2">Online Available</Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span className="font-bold text-base">{tutor.rating}</span>
                      <span className="text-sm">
                        ({tutor.reviews} reviews)
                      </span>
                    </div>
                    {tutor.ambassador && (
                      <Button size="sm" className="px-4 text-sm">
                        Ambassador
                      </Button>
                    )}
                  </div>

                  <p className="text-sm leading-relaxed mb-4">
                    {tutor.description}
                  </p>

                  <TutorProfileModal
                    tutor={tutor}
                    triggerButton={
                      <Button className="w-full font-semibold py-3 text-base">
                        Lihat Pengajar
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link href="/tutors" passHref legacyBehavior>
            <Button
              as="a"
              variant="outline"
              size="lg"
              className="border-2 px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-base"
            >
              Lihat lebih banyak pengajar
            </Button>
          </Link>
        </div>
      </section>

      {/* Student Reviews Section */}
      <section className="container mx-auto px-2 sm:px-4 py-8 sm:py-16 md:py-20">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Apa yang siswa katakan</h2>
          <p className="text-base sm:text-xl max-w-3xl mx-auto">
            Umpan balik nyata dari siswa yang telah mengubah perjalanan belajar mereka
            bersama kami
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {studentReviews.map((review, index) => (
            <Card
              key={index}
              className="border-0 shadow-xs overflow-hidden hover:shadow-sm transition-all duration-300 bg-background border hover:-translate-y-2"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-base">{review.name}</h4>
                    <p className="font-medium text-sm">{review.subject}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(review.rating) ? "" : "opacity-30"}`}
                        />
                      ))}
                      <span className="text-sm ml-2">{review.rating}</span>
                    </div>
                  </div>
                </div>

                <Quote className="w-8 h-8 mb-4" />
                <p className="leading-relaxed mb-4 italic text-sm">
                  "{review.comment}"
                </p>
                <p className="text-sm">{review.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto">
            Segala hal yang perlu Anda ketahui tentang menemukan dan bekerja dengan tutor
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Cara Kerjanya</h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto">
            Memulai dengan TutorHome itu sederhana dan mudah
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs border">
              <Search className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">1. Cari dan telusuri</h3>
            <p className="leading-relaxed">
              Temukan tutor berdasarkan mata pelajaran, lokasi, dan kisaran harga. Baca ulasan dan bandingkan profil untuk menemukan tutor yang tepat.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs border">
              <Users className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">2. Hubungkan & Pesan</h3>
            <p className="leading-relaxed">
              Hubungi Pengajar pilihan Anda, diskusikan tujuan pembelajaran Anda, dan jadwalkan pelajaran pertama Anda sesuai keinginan Anda.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs border">
              <BookOpen className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">3. Mulai Belajar</h3>
            <p className="leading-relaxed">
              Mulailah perjalanan belajar personal Anda dengan bimbingan ahli dan raih tujuan pendidikan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <div>
              <div className="text-3xl font-bold mb-6">LearnWay</div>
              <p className="leading-relaxed mb-6 text-base">
                Menghubungkan siswa dengan tutor berkualifikasi untuk pengalaman belajar yang dipersonalisasi
                yang mengubah hidup.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Untuk Siswa</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="transition-colors">
                    Temukan Pengajar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Bagaimana cara kerjanya
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Harga
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Cerita Kesuksesan
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Untuk Pengajar</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="transition-colors">
                    Become a Tutor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Tutor Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Ambassador Program
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Tutor Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Safety & Trust
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-base">
          <p>
            &copy; 2025 learnWay. All rights reserved. Made with heart for
            learners everywhere.
          </p>
        </div>
      </footer>
    </>
  );
}
