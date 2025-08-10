"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Clock, DollarSign, Award, GraduationCap, Languages, CheckCircle, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Teacher {
    id: string
    name: string
    email: string
    subject: string
    description: string
    language: string[]
    awards: string[]
    certifications: string[]
    education: string
    hourlyRate: number
    rating: number
    totalReviews: number
    yearsExperience: number
    availability: string
    location: string
    verified: boolean
    image?: string
}

interface TeacherDetailsProps {
    teacher: Teacher
    onClose: () => void
}

export function TeacherDetails({ teacher }: TeacherDetailsProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-16 w-16 mr-3">
                            <AvatarImage src={teacher.image} alt={teacher.name} />
                            <AvatarFallback className="bg-cream-200 text-charcoal-700">
                                <User className="h-8 w-8" />
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold text-charcoal-900">{teacher.name}</h2>
                            {teacher.verified && (
                                <Badge className="bg-brown-600 text-white">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                </Badge>
                            )}
                        </div>
                    </div>
                    <p className="text-charcoal-600 mb-2">{teacher.email}</p>
                    <div className="flex items-center gap-4 text-sm text-charcoal-600">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {teacher.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {teacher.yearsExperience} years experience
                        </div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${teacher.hourlyRate}/hr
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold text-charcoal-900">{teacher.rating}</span>
                    </div>
                    <p className="text-sm text-charcoal-600">({teacher.totalReviews} reviews)</p>
                    <Badge variant="outline" className="mt-2">
                        {teacher.availability}
                    </Badge>
                </div>
            </div>

            <Separator />

            {/* Subject & Description */}
            <Card className="border-cream-300">
                <CardHeader>
                    <CardTitle className="text-charcoal-900 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Subject & Expertise
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge className="bg-brown-600 text-white mb-4 text-lg px-4 py-2">
                        {teacher.subject}
                    </Badge>
                    <p className="text-charcoal-700 leading-relaxed">{teacher.description}</p>
                </CardContent>
            </Card>

            {/* Languages */}
            <Card className="border-cream-300">
                <CardHeader>
                    <CardTitle className="text-charcoal-900 flex items-center gap-2">
                        <Languages className="h-5 w-5" />
                        Languages
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {teacher.language.map((lang) => (
                            <Badge key={lang} variant="secondary" className="bg-cream-200 text-charcoal-800">
                                {lang}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-cream-300">
                <CardHeader>
                    <CardTitle className="text-charcoal-900 flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-charcoal-700 leading-relaxed">{teacher.education}</p>
                </CardContent>
            </Card>

            {/* Awards & Recognition */}
            {teacher.awards.length > 0 && (
                <Card className="border-cream-300">
                    <CardHeader>
                        <CardTitle className="text-charcoal-900 flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Awards & Recognition
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {teacher.awards.map((award, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Award className="h-4 w-4 text-brown-600" />
                                    <span className="text-charcoal-700">{award}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Certifications */}
            {teacher.certifications.length > 0 && (
                <Card className="border-cream-300">
                    <CardHeader>
                        <CardTitle className="text-charcoal-900 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Certifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {teacher.certifications.map((cert, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-brown-600" />
                                    <span className="text-charcoal-700">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
