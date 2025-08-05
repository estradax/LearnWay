"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Star, MapPin, Clock, BookOpen, Award, Users, MessageCircle, CalendarIcon, DollarSign } from "lucide-react"
import { format } from "date-fns"

interface TutorProfileProps {
  tutor?: {
    id: number
    name: string
    subject: string
    subjects: string[]
    rating: number
    reviews: number
    price: number
    location: string
    image: string
    verified: boolean
    experience: string
    description: string
    availability: string
    bio: string
    education: string[]
    achievements: string[]
    languages: string[]
    teachingStyle: string
    reviews_data: Array<{
      name: string
      rating: number
      comment: string
      date: string
    }>
  }
}

export default function TutorProfile({ tutor }: TutorProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [customPrice, setCustomPrice] = useState(tutor?.price || 25)
  const [showPriceQuote, setShowPriceQuote] = useState(false)

  // Default tutor data if none provided
  const defaultTutor = {
    id: 1,
    name: "Sarah Johnson",
    subject: "Mathematics",
    subjects: ["Algebra", "Calculus", "Statistics", "Geometry"],
    rating: 4.9,
    reviews: 127,
    price: 25,
    location: "Jakarta",
    image: "/professional-teacher-woman.png",
    verified: true,
    experience: "5+ years",
    description: "Experienced math tutor specializing in high school and college level mathematics.",
    availability: "Available today",
    bio: "I'm a passionate mathematics educator with over 5 years of experience helping students achieve their academic goals. I believe in making math accessible and enjoyable for everyone, regardless of their starting level.",
    education: ["M.S. Mathematics - University of Indonesia", "B.S. Applied Mathematics - ITB"],
    achievements: ["Top 1% Math Tutor on Platform", "500+ Students Taught", "95% Success Rate"],
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
        comment: "Excellent tutor! Made statistics much easier to understand. Highly recommended!",
        date: "1 month ago",
      },
      {
        name: "David Kim",
        rating: 4,
        comment: "Great teaching style and very knowledgeable. Helped me prepare for my university entrance exam.",
        date: "2 months ago",
      },
    ],
  }

  const tutorData = tutor || defaultTutor

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "07:00 PM", "08:00 PM"]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative flex-shrink-0">
                    <img
                      src={tutorData.image || "/placeholder.svg"}
                      alt={tutorData.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                    />
                    {tutorData.verified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{tutorData.name}</h1>
                    <p className="text-xl text-blue-600 font-medium mb-3">{tutorData.subject} Tutor</p>

                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{tutorData.rating}</span>
                        <span>({tutorData.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{tutorData.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{tutorData.experience}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>500+ students taught</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {tutorData.subjects.map((subject, index) => (
                        <Badge key={index} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>About Me</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">{tutorData.bio}</p>
                <p className="text-gray-700 leading-relaxed">{tutorData.teachingStyle}</p>
              </CardContent>
            </Card>

            {/* Education & Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Education</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tutorData.education.map((edu, index) => (
                      <li key={index} className="text-gray-700">
                        {edu}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tutorData.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-700 flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Student Reviews</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tutorData.reviews_data.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{review.name}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            {/* Price & Booking */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book a Lesson</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      ${customPrice}
                      <span className="text-sm text-gray-500">/hour</span>
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-xs"
                      onClick={() => setShowPriceQuote(!showPriceQuote)}
                    >
                      Request custom price
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Custom Price Quote */}
                {showPriceQuote && (
                  <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                    <Label htmlFor="custom-price" className="text-sm font-medium">
                      Suggest your price per hour
                    </Label>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <Input
                        id="custom-price"
                        type="number"
                        value={customPrice}
                        onChange={(e) => setCustomPrice(Number(e.target.value))}
                        className="flex-1"
                        min="10"
                        max="100"
                      />
                    </div>
                    <Textarea
                      placeholder="Optional: Explain your budget or requirements..."
                      className="text-sm"
                      rows={3}
                    />
                    <Button size="sm" className="w-full">
                      Send Price Request
                    </Button>
                  </div>
                )}

                {/* Date Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Select Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Lesson Duration</Label>
                  <Select defaultValue="60">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                    Message (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell the tutor about your learning goals, current level, or any specific requirements..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Lesson - ${customPrice}</Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Send Message
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  You won't be charged until the tutor accepts your request
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tutorData.languages.map((language, index) => (
                    <Badge key={index} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Quick Response</div>
                  <div className="text-sm text-gray-600">Usually responds within 2 hours</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
