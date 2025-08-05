"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, MapPin, Clock, BookOpen, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

export default function TutorsPage() {
  const [priceRange, setPriceRange] = useState([10, 100])
  const [showFilters, setShowFilters] = useState(false)

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
      image: "/professional-teacher-woman.png",
      verified: true,
      experience: "5+ years",
      description: "Experienced math tutor specializing in high school and college level mathematics.",
      availability: "Available today",
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
      image: "/professional-teacher-man.png",
      verified: true,
      experience: "3+ years",
      description: "Native English speaker with expertise in literature and creative writing.",
      availability: "Available tomorrow",
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
      image: "/piano-teacher-woman.png",
      verified: true,
      experience: "7+ years",
      description: "Professional pianist offering lessons for all skill levels and ages.",
      availability: "Available this week",
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
      image: "/physics-teacher-man.png",
      verified: true,
      experience: "6+ years",
      description: "PhD in Physics with extensive teaching experience in universities.",
      availability: "Available today",
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
      image: "/chinese-teacher-woman.png",
      verified: true,
      experience: "4+ years",
      description: "Native Mandarin speaker with certification in teaching Chinese as a foreign language.",
      availability: "Available tomorrow",
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
      image: "/placeholder-cr19i.png",
      verified: true,
      experience: "8+ years",
      description: "Professional guitarist and music producer with studio experience.",
      availability: "Available this week",
    },
  ]

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
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TutorHome</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/tutors" className="text-blue-600 font-medium">
              Find Tutors
            </Link>
            <Link href="/become-tutor" className="text-gray-600 hover:text-blue-600 transition-colors">
              Become a Tutor
            </Link>
            <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
              How it Works
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input placeholder="Search by subject, tutor name, or keyword..." className="pl-10 h-12 text-lg" />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48 h-12">
                  <SelectValue placeholder="All Subjects" />
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
                className="h-12 px-4 bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </Button>
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">Search</Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Price Range (per hour)</h4>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={100}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    {["1-2 years", "3-5 years", "5+ years", "10+ years"].map((exp) => (
                      <div key={exp} className="flex items-center space-x-2">
                        <Checkbox id={exp} />
                        <label htmlFor={exp} className="text-sm">
                          {exp}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Availability</h4>
                  <div className="space-y-2">
                    {["Available today", "Available tomorrow", "Available this week", "Flexible schedule"].map(
                      (avail) => (
                        <div key={avail} className="flex items-center space-x-2">
                          <Checkbox id={avail} />
                          <label htmlFor={avail} className="text-sm">
                            {avail}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Available Tutors</h1>
            <p className="text-gray-600">{tutors.length} tutors found</p>
          </div>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="experience">Most Experienced</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tutors.map((tutor) => (
            <Card
              key={tutor.id}
              className="hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden border-0 bg-white rounded-2xl"
            >
              <CardContent className="p-6">
                <div className="flex gap-6 min-h-[280px]">
                  {/* Profile Image with spacing */}
                  <div className="relative w-36 flex-shrink-0">
                    <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {tutor.verified && (
                      <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {tutor.name}
                          </h3>
                          <p className="text-blue-600 font-semibold text-lg">{tutor.subject}</p>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <div className="text-2xl font-bold text-gray-900">
                            ${tutor.price}
                            <span className="text-base text-gray-500">/hr</span>
                          </div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {tutor.availability}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mb-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{tutor.rating}</span>
                          <span>({tutor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{tutor.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{tutor.experience}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{tutor.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {tutor.subjects.map((subject, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-3 py-1">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Buttons - Always visible at bottom */}
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1 bg-transparent border-gray-300 hover:bg-gray-50">
                        View Profile
                      </Button>
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Contact Tutor</Button>
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
            Load More Tutors
          </Button>
        </div>
      </div>
    </div>
  )
}
