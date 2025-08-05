"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MapPin, Clock, Users, BookOpen, Award, MessageCircle, X } from "lucide-react"
import ContactTutorModal from "@/components/contact-tutor-modal"
import ChatSystem from "@/components/chat-system"

interface TutorProfileModalProps {
  tutor: any
  triggerButton?: React.ReactNode
}

export default function TutorProfileModal({ tutor, triggerButton }: TutorProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  if (!tutor) return null

  const defaultTriggerButton = (
    <Button className="w-full rounded-2xl font-semibold py-3">
      View Profile
    </Button>
  )

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{triggerButton || defaultTriggerButton}</DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Tutor Profile</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Main Profile */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                    <div className="relative flex-shrink-0">
                      <img
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                      />
                      {tutor.verified && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center">
                          <span className="text-sm">✓</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-3xl font-bold mb-2">{tutor.name}</h1>
                      <p className="text-xl font-medium mb-3">{tutor.subject} Tutor</p>

                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span className="font-medium">{tutor.rating}</span>
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
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>500+ students taught</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {tutor.subjects.map((subject, index) => (
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
                  <p className="leading-relaxed mb-4">{tutor.bio}</p>
                  <p className="leading-relaxed">{tutor.teachingStyle}</p>
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
                      {tutor.education.map((edu, index) => (
                        <li key={index}>
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
                      {tutor.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-2 h-2 rounded-full"></span>
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
                    {tutor.reviews_data.map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "" : ""}`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm">{review.date}</span>
                        </div>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price & Contact */}
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Book a Lesson</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        ${tutor.price}
                        <span className="text-sm">/hour</span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false)
                        setShowContactModal(true)
                      }}
                    >
                      Contact Tutor
                    </Button>
                    <ChatSystem
                      currentUserId={1}
                      currentUserType="student"
                      triggerButton={
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          send message
                        </Button>
                      }
                    />
                  </div>

                  <div className="text-xs text-center">
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
                    {tutor.languages.map((language, index) => (
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
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-medium">Quick Response</div>
                    <div className="text-sm">Usually responds within 2 hours</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <ContactTutorModal tutor={tutor} isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </>
  )
}
