"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Star,
  MapPin,
  Clock,
  Users,
  BookOpen,
  Award,
  MessageCircle,
  Check,
} from "lucide-react";
import ContactTutorModal from "@/components/contact-tutor-modal";
import ChatSystem from "@/components/chat-system";


interface TutorProfileModalProps {
  tutor: any;
  isOpen: boolean;
  onClose: () => void;
  onContactTutor?: () => void;
  triggerButton?: React.ReactNode;
}

export default function TutorProfileModal({
  tutor,
  isOpen,
  onClose,
  onContactTutor,
  triggerButton,
}: TutorProfileModalProps) {
  const [showContactModal, setShowContactModal] = useState(false);

  if (!tutor) return null;



  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent className="w-full max-w-[98vw] sm:min-w-[600px] md:min-w-[900px] max-h-[90vh] overflow-y-auto p-2 sm:p-6">
          <DialogHeader>
            <DialogTitle className="sr-only">Tutor Profile</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 p-2 sm:p-6">
            {/* Main Profile */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Header Card */}
              <Card className="border shadow-xs">
                <CardContent>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative flex-shrink-0 flex justify-center sm:block">
                      <img
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded object-cover mx-auto sm:mx-0"
                      />
                      {tutor.verified && (
                        <Badge className="mt-2 sm:mt-4">
                          <Check className="w-5 h-5" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h1 className="text-base xs:text-lg sm:text-3xl font-bold mb-1 sm:mb-2 break-words break-all leading-tight truncate max-w-full">{tutor.name}</h1>
                      <p className="text-xs xs:text-sm sm:text-xl font-medium mb-1 sm:mb-3 truncate max-w-full">
                        {tutor.subject} Tutor
                      </p>

                      <div className="flex flex-wrap justify-center sm:justify-start items-center gap-1 xs:gap-2 sm:gap-4 mb-1 sm:mb-4 text-[11px] xs:text-xs sm:text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span className="font-medium">{tutor.rating}</span>
                          <span>({tutor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1 max-w-[110px] xs:max-w-[140px] sm:max-w-none truncate">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{tutor.location}</span>
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

                      <div className="flex flex-wrap gap-1 xs:gap-2 justify-center sm:justify-start">
                        {tutor.subjects.map((subject: any, index: any) => (
                          <Badge key={index} variant="secondary" className="text-[10px] xs:text-xs sm:text-sm px-2 py-1 truncate max-w-[90px] xs:max-w-[120px] sm:max-w-none">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About */}
              <Card className="border shadow-xs">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Card className="border shadow-xs">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Education</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc list-inside">
                      {tutor.education.map((edu: any, index: any) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border shadow-xs">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="w-5 h-5" />
                      <span>Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 list-disc list-inside">
                      {tutor.achievements.map((achievement: any, index: any) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Reviews */}
              <Card className="border shadow-xs">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Student Reviews</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tutor.reviews_data.map((review: any, index: any) => (
                      <div
                        key={index}
                        className="border-b pb-4 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_: any, i: any) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "" : ""
                                    }`}
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
            <div className="space-y-4 sm:space-y-6">
              {/* Price & Contact */}
              <Card className="border shadow-xs">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                    <span>Book a Lesson</span>
                    <div className="text-right">
                      <div className="text-lg sm:text-2xl font-bold">
                        ${tutor.price}
                        <span className="text-xs sm:text-sm">/hour</span>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 sm:space-y-4">
                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      onClick={() => {
                        if (onContactTutor) {
                          onContactTutor();
                        } else {
                          setShowContactModal(true);
                          onClose();
                        }
                      }}
                    >
                      contact tutor
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
              <Card className="border shadow-xs">
                <CardHeader>
                  <CardTitle className="text-lg">Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tutor.languages.map((language: any, index: any) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="border shadow-xs">
                <CardContent className="p-4">
                  <div className="text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-medium">Quick Response</div>
                    <div className="text-sm">
                      Usually responds within 2 hours
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Contact Modal */}
      <ContactTutorModal
        tutor={tutor}
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </>
  );
}
