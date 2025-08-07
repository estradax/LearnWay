"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Star,
  MapPin,
  Clock,
  BookOpen,
  SlidersHorizontal,
  Check,
} from "lucide-react";
import Link from "next/link";
import TutorProfileModal from "@/components/tutor-profile-modal";
import ContactTutorModal from "@/components/contact-tutor-modal";

export default function TutorsPage() {
  const [priceRange, setPriceRange] = useState([10, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const tutors = [
    {
      id: 1,
      name: "Sarah Johnson",
      subject: "Mathematics",
      subjects: ["Algebra", "Calculus", "Statistics"],
      rating: 4.9,
      reviews: 127,
      price: 25,
      location: "Jakarta",
      murid: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-woman-GMVTBdhb4dpsnfRpKtiFVMJT6g8QWZ.png",
      verified: true,
      experience: "5+ years",
      description:
        "Experienced math tutor specializing in high school and college level mathematics.",
      availability: "Available today",
      bio: "I'm a passionate mathematics educator with over 5 years of experience helping students achieve their academic goals. I believe in making math accessible and enjoyable for everyone, regardless of their starting level.",
      education: [
        "M.S. Mathematics - University of Indonesia",
        "B.S. Applied Mathematics - ITB",
      ],
      achievements: [
        "Top 1% Math Tutor on Platform",
        "500+ Students Taught",
        "95% Success Rate",
      ],
      languages: ["English", "Indonesian", "Mandarin"],
      teachingStyle:
        "I use a personalized approach that adapts to each student's learning style. My lessons are interactive and focus on building strong foundational understanding before moving to advanced concepts.",
      reviews_data: [
        {
          name: "Alex Chen",
          rating: 5,
          comment:
            "Sarah helped me improve my calculus grade from C to A! Her explanations are clear and she's very patient.",
          date: "2 weeks ago",
        },
        {
          name: "Maria Rodriguez",
          rating: 5,
          comment:
            "Excellent tutor! Made statistics much easier to understand. Highly recommended!",
          date: "1 month ago",
        },
      ],
    },
    {
      id: 2,
      name: "David Chen",
      subject: "English Literature",
      subjects: ["Writing", "Literature", "Grammar"],
      rating: 4.8,
      reviews: 89,
      price: 30,
      location: "Surabaya",
      murid: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-woman-GMVTBdhb4dpsnfRpKtiFVMJT6g8QWZ.png",
      verified: true,
      experience: "3+ years",
      description:
        "Native English speaker with expertise in literature and creative writing.",
      availability: "Available tomorrow",
      bio: "As a native English speaker with a passion for literature, I help students develop their writing skills and appreciate the beauty of English literature.",
      education: [
        "M.A. English Literature - University of Cambridge",
        "B.A. English - Oxford University",
      ],
      achievements: [
        "Published Author",
        "300+ Students Taught",
        "98% Pass Rate",
      ],
      languages: ["English", "Indonesian"],
      teachingStyle:
        "I focus on developing critical thinking skills through literature analysis and creative writing exercises.",
      reviews_data: [
        {
          name: "Lisa Wang",
          rating: 5,
          comment:
            "David helped me improve my essay writing significantly. Great teacher!",
          date: "1 week ago",
        },
      ],
    },
    {
      id: 3,
      name: "Maria Santos",
      subject: "Piano",
      subjects: ["Classical", "Jazz", "Pop"],
      rating: 5.0,
      reviews: 45,
      price: 35,
      location: "Bandung",
      murid: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-woman-GMVTBdhb4dpsnfRpKtiFVMJT6g8QWZ.png",
      verified: true,
      experience: "7+ years",
      description:
        "Professional pianist offering lessons for all skill levels and ages.",
      availability: "Available this week",
      bio: "I'm a professional pianist with 7 years of teaching experience. I love sharing my passion for music and helping students discover their musical potential.",
      education: [
        "Master of Music - Berklee College of Music",
        "Bachelor of Music - Jakarta Institute of Arts",
      ],
      achievements: [
        "Concert Pianist",
        "200+ Students Taught",
        "Music Competition Judge",
      ],
      languages: ["English", "Indonesian", "Spanish"],
      teachingStyle:
        "I believe in making music fun and accessible while maintaining proper technique and musical understanding.",
      reviews_data: [
        {
          name: "Tommy Lee",
          rating: 5,
          comment:
            "Maria is an amazing piano teacher! Very patient and encouraging.",
          date: "3 weeks ago",
        },
      ],
    },
    {
      id: 4,
      name: "Ahmad Rahman",
      subject: "Physics",
      subjects: ["Mechanics", "Thermodynamics", "Optics"],
      rating: 4.7,
      reviews: 156,
      price: 28,
      location: "Jakarta",
      murid: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-woman-GMVTBdhb4dpsnfRpKtiFVMJT6g8QWZ.png",
      verified: true,
      experience: "6+ years",
      description:
        "PhD in Physics with extensive teaching experience in universities.",
      availability: "Available today",
      bio: "With a PhD in Physics and 6 years of university teaching experience, I specialize in making complex physics concepts understandable and engaging.",
      education: ["Ph.D. Physics - MIT", "M.S. Physics - ITB"],
      achievements: [
        "Published Researcher",
        "University Professor",
        "600+ Students Taught",
      ],
      languages: ["English", "Indonesian", "Arabic"],
      teachingStyle:
        "I use real-world examples and hands-on experiments to make physics concepts come alive.",
      reviews_data: [
        {
          name: "Sarah Kim",
          rating: 5,
          comment:
            "Dr. Ahmad makes physics so much easier to understand. Excellent teacher!",
          date: "2 weeks ago",
        },
      ],
    },
    {
      id: 5,
      name: "Lisa Wang",
      subject: "Mandarin",
      subjects: ["Conversation", "HSK Prep", "Business Chinese"],
      rating: 4.9,
      reviews: 78,
      price: 32,
      location: "Jakarta",
      murid: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-woman-GMVTBdhb4dpsnfRpKtiFVMJT6g8QWZ.png",
      verified: true,
      experience: "4+ years",
      description:
        "Native Mandarin speaker with certification in teaching Chinese as a foreign language.",
      availability: "Available tomorrow",
      bio: "As a native Mandarin speaker with teaching certification, I help students master Chinese language skills for personal and professional growth.",
      education: [
        "M.A. Chinese Language Teaching - Beijing University",
        "B.A. Chinese Literature - Tsinghua University",
      ],
      achievements: [
        "HSK Examiner",
        "400+ Students Taught",
        "Language School Director",
      ],
      languages: ["Mandarin", "English", "Indonesian"],
      teachingStyle:
        "I focus on practical communication skills while building strong grammar foundations.",
      reviews_data: [
        {
          name: "John Smith",
          rating: 5,
          comment: "Lisa helped me pass HSK Level 4! Great teaching methods.",
          date: "1 month ago",
        },
      ],
    },
    {
      id: 6,
      name: "Robert Taylor",
      subject: "Guitar",
      subjects: ["Acoustic", "Electric", "Music Theory"],
      rating: 4.8,
      reviews: 92,
      price: 40,
      location: "Bandung",
      murid: 50,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/professional-teacher-woman-GMVTBdhb4dpsnfRpKtiFVMJT6g8QWZ.png",
      verified: true,
      experience: "8+ years",
      description:
        "Professional guitarist and music producer with studio experience.",
      availability: "Available this week",
      bio: "I'm a professional guitarist and music producer with 8 years of experience. I've worked in studios and performed in various bands.",
      education: [
        "Diploma in Music Production - SAE Institute",
        "Guitar Performance Certificate - Musicians Institute",
      ],
      achievements: [
        "Studio Musician",
        "Band Performer",
        "300+ Students Taught",
      ],
      languages: ["English", "Indonesian"],
      teachingStyle:
        "I teach both technical skills and creative expression, helping students find their unique musical voice.",
      reviews_data: [
        {
          name: "Mike Johnson",
          rating: 5,
          comment:
            "Robert is an excellent guitar teacher. Learned so much in just a few months!",
          date: "2 weeks ago",
        },
      ],
    },
  ];

  const subjects = [
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Economics",
    "Piano",
    "Guitar",
    "Violin",
    "Art",
    "Photography",
    "Programming",
    "Languages",
  ];

  const handleViewProfile = (tutor) => {
    setSelectedTutor(tutor);
    setShowProfileModal(true);
  };

  const handleContactTutor = (tutor) => {
    setSelectedTutor(tutor);
    setShowContactModal(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <Input
                placeholder="Cari berdasarkan subjek, nama tutor, atau kata kunci..."
                className="pl-10 text-lg"
              />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Semua Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject.toLowerCase()}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="px-4"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                filters
              </Button>
              <Button className="px-8">Cari</Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="mb-6 border shadow-xs bg-background">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">
                      Kisaran Harga (per hour)
                    </h4>
                    <div className="space-y-3">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={100}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Pengalaman</h4>
                    <div className="space-y-2">
                      {["1-2 years", "3-5 years", "5+ years", "10+ years"].map(
                        (exp) => (
                          <div
                            key={exp}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={exp} />
                            <label htmlFor={exp} className="text-sm">
                              {exp}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Ketersediaan</h4>
                    <div className="space-y-2">
                      {[
                        "Tersedia hari ini",
                        "Tersedia besok",
                        "Tersedia minggu ini",
                        "Jadwal fleksibel",
                      ].map((avail) => (
                        <div
                          key={avail}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={avail} />
                          <label htmlFor={avail} className="text-sm">
                            {avail}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Pengajar Tersedia</h1>
            <p>{tutors.length} Pengajar ditemukan</p>
          </div>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
              <SelectItem value="price-low">Harga : Murah sampai mahal</SelectItem>
              <SelectItem value="price-high">Harga : Mahal sampai murah</SelectItem>
              <SelectItem value="experience">Tinggi Pengalaman</SelectItem>
              <SelectItem value="reviews">Tinggi Penilaian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tutors.map((tutor) => (
            <Card
              key={tutor.id}
              className="hover:shadow-sm transition-all duration-300 group cursor-pointer overflow-hidden border shadow-xs"
            >
              <CardContent>
                <div className="flex gap-6 min-h-[280px]">
                  {/* Profile Image with spacing */}
                  <div className="relative w-36 flex-shrink-0">
                    <div className="w-full h-48 rounded overflow-hidden">
                      <img
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {tutor.verified && (
                      <Badge className="mt-4">
                        <Check className="w-5 h-5" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold transition-colors">
                            {tutor.name}
                          </h3>
                          <p className="font-semibold text-lg">
                            {tutor.subject}
                          </p>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <div className="text-2xl font-bold">
                            ${tutor.price}
                            <span className="text-base">/hr</span>
                          </div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {tutor.availability}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mb-3 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span className="font-semibold">{tutor.rating}</span>
                          <span>({tutor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{tutor.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span className="font-semibold">{tutor.murid}</span>
                          <span>murid</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{tutor.experience}</span>
                        </div>
                      </div>

                      <p className="text-sm mb-4 leading-relaxed">
                        {tutor.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {tutor.subjects.map((subject, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs px-3 py-1"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Buttons - Always visible at bottom */}
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleViewProfile(tutor)}
                      >
                        view profile
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => handleContactTutor(tutor)}
                      >
                        contact tutor
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Lihat lebih banyak pengajar
          </Button>
        </div>
      </div>

      {/* Modals */}
      {selectedTutor && (
        <>
          <TutorProfileModal
            tutor={selectedTutor}
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            onContactTutor={() => {
              setShowProfileModal(false);
              setShowContactModal(true);
            }}
          />
          <ContactTutorModal
            tutor={selectedTutor}
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
          />
        </>
      )}
    </>
  );
}
