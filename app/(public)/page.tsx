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
      name: "Mathematics",
      icon: Calculator,
      color: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700",
      count: "2,500+ tutors",
    },
    {
      name: "Languages",
      icon: BookOpen,
      color: "bg-gradient-to-br from-green-100 to-green-200 text-green-700",
      count: "1,800+ tutors",
    },
    {
      name: "Music",
      icon: Music,
      color: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700",
      count: "950+ tutors",
    },
    {
      name: "Art & Design",
      icon: Palette,
      color: "bg-gradient-to-br from-pink-100 to-pink-200 text-pink-700",
      count: "720+ tutors",
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
        "Amazing tutor! Made calculus so much easier to understand. My grades improved from C to A in just 2 months.",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-woman-GMVTBdhb4dpsnfRpKtiFVMJT6g8QWZ.png",
      date: "2 weeks ago",
    },
    {
      name: "David L.",
      subject: "Piano",
      rating: 5,
      comment:
        "Learning piano with my tutor has been incredible. Very patient and adapts to my learning pace perfectly.",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-man-UYl0E1brgRMNIdpwKtcub7BEPgdF0Y.png",
      date: "1 month ago",
    },
    {
      name: "Maria K.",
      subject: "English",
      rating: 4.8,
      comment:
        "Excellent English tutor! Helped me prepare for IELTS and I got the score I needed for university.",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/chinese-teacher-woman-melqHKBZAmB7jTGnVLHjTkYAFiuRfH.png",
      date: "3 weeks ago",
    },
  ];

  const faqs = [
    {
      question: "How do I find the right tutor for me?",
      answer:
        "Use our search filters to find tutors by subject, location, price range, and availability. Read reviews and check their profiles to find the perfect match for your learning style and goals.",
    },
    {
      question: "What subjects are available?",
      answer:
        "We offer tutoring in academic subjects like Math, Science, Languages, as well as creative subjects like Music, Art, and specialized skills like Programming and Test Preparation.",
    },
    {
      question: "How does pricing work?",
      answer:
        "Each tutor sets their own hourly rate. You can filter by price range and even request custom pricing. Most tutors offer flexible packages and discounts for multiple sessions.",
    },
    {
      question: "Can I have online or in-person lessons?",
      answer:
        "Yes! Many tutors offer both online and in-person lessons. You can filter by your preference and discuss the format that works best for you with your chosen tutor.",
    },
    {
      question: "What if I'm not satisfied with my tutor?",
      answer:
        "We offer a satisfaction guarantee. If you're not happy with your first lesson, we'll help you find a new tutor or provide a refund. Your learning success is our priority.",
    },
    {
      question: "How do I book a lesson?",
      answer:
        "Simply browse tutors, select your preferred tutor, choose a date and time that works for you, and send a booking request. The tutor will confirm and you can start learning!",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Find Your Perfect <span>Tutor</span>
            <br />
            <span className="text-4xl md:text-5xl">
              Learn Anything, Anywhere
            </span>
          </h1>
          <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with qualified tutors for personalized learning experiences.
            From academic subjects to creative skills, find the perfect match
            for your learning journey.
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row gap-4 p-3 shadow-xs border">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" />
                <Input
                  placeholder="What do you want to learn?"
                  className="pl-12 border-0 focus-visible:ring-0 text-lg h-14 shadow-none"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6" />
                <Input
                  placeholder="Your location"
                  className="pl-12 border-0 focus-visible:ring-0 text-lg h-14 shadow-none"
                />
              </div>
              <Button size="lg" className="h-14 px-10 font-semibold">
                search
              </Button>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-2xl">
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="font-medium">Expert Tutors</div>
            </div>
            <div className="text-center p-6 rounded-2xl">
              <div className="text-4xl font-bold mb-2">100,000+</div>
              <div className="font-medium">Happy Students</div>
            </div>
            <div className="text-center p-6 rounded-2xl">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="font-medium">Subjects Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Popular Categories</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our wide range of subjects from academic to creative skills
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="hover:shadow-sm transition-all duration-300 cursor-pointer group border shadow-xs bg-background rounded-card"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs border`}
                >
                  <category.icon className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-sm">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Tutors - Superprof Style */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Featured Piano Tutors</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Meet our top-rated piano tutors ready to help you master the keys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featuredTutors.map((tutor) => (
            <div key={tutor.id} className="group cursor-pointer">
              <Card className="overflow-hidden border-0 shadow-xs hover:shadow-sm transition-all duration-300 group-hover:-translate-y-2 bg-background border pt-0">
                <div className="relative h-80">
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span className="font-bold">{tutor.rating}</span>
                        <span className="text-sm">
                          ({tutor.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    {tutor.ambassador && (
                      <Button size="sm" className="px-4">
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
                      <Button className="w-full font-semibold py-3">
                        view profile
                      </Button>
                    }
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-2 px-8 py-3 font-semibold"
          >
            view all piano tutors
          </Button>
        </div>
      </section>

      {/* Student Reviews Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">What Our Students Say</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Real feedback from students who've transformed their learning
            journey with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {studentReviews.map((review, index) => (
            <Card
              key={index}
              className="border-0 shadow-xs overflow-hidden hover:shadow-sm transition-all duration-300 bg-background border hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="font-medium">{review.subject}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(review.rating) ? "" : ""
                          }`}
                        />
                      ))}
                      <span className="text-sm ml-2">{review.rating}</span>
                    </div>
                  </div>
                </div>

                <Quote className="w-8 h-8 mb-4" />
                <p className="leading-relaxed mb-4 italic">
                  "{review.comment}"
                </p>
                <p className="text-sm">{review.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Everything you need to know about finding and working with tutors
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
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Getting started with TutorHome is simple and straightforward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs border">
              <Search className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">1. Search & Browse</h3>
            <p className="leading-relaxed">
              Find tutors by subject, location, and price range. Read reviews
              and compare profiles to find your perfect match.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs border">
              <Users className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">2. Connect & Book</h3>
            <p className="leading-relaxed">
              Contact your chosen tutor, discuss your learning goals, and
              schedule your first lesson at your convenience.
            </p>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xs border">
              <BookOpen className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4">3. Start Learning</h3>
            <p className="leading-relaxed">
              Begin your personalized learning journey with expert guidance and
              achieve your educational goals.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="text-3xl font-bold mb-6">LearnWay</div>
              <p className="leading-relaxed mb-6">
                Connecting students with qualified tutors for personalized
                learning experiences that transform lives.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">For Students</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="transition-colors">
                    Find Tutors
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">For Tutors</h4>
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
        <div className="border-t mt-12 pt-8 text-center">
          <p>
            &copy; 2024 TutorHome. All rights reserved. Made with ❤️ for
            learners everywhere.
          </p>
        </div>
      </footer>
    </>
  );
}
