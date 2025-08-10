"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, DollarSign, Clock, Users, Star, TrendingUp, CheckCircle, ArrowRight, Globe, Award, Target, Zap } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function BecomeTutorPage() {
    const [email, setEmail] = useState("")

    const benefits = [
        {
            icon: DollarSign,
            title: "Earn Great Money",
            description: "Set your own rates and earn $15-$100+ per hour based on your expertise",
            color: "bg-green-100 text-green-600",
        },
        {
            icon: Clock,
            title: "Flexible Schedule",
            description: "Work when you want, where you want. Perfect for busy professionals",
            color: "bg-blue-100 text-blue-600",
        },
        {
            icon: Users,
            title: "Impact Lives",
            description: "Help students achieve their goals and make a real difference in their education",
            color: "bg-purple-100 text-purple-600",
        },
        {
            icon: Globe,
            title: "Teach Anywhere",
            description: "Offer online or in-person lessons to students around the world",
            color: "bg-orange-100 text-orange-600",
        },
        {
            icon: TrendingUp,
            title: "Grow Your Business",
            description: "Build your reputation and expand your student base with our platform",
            color: "bg-pink-100 text-pink-600",
        },
        {
            icon: Award,
            title: "Professional Support",
            description: "Get marketing tools, payment processing, and dedicated support",
            color: "bg-indigo-100 text-indigo-600",
        },
    ]

    const steps = [
        {
            step: "1",
            title: "Create Your Profile",
            description: "Sign up and build your professional tutor profile with your expertise and experience",
            icon: Users,
        },
        {
            step: "2",
            title: "Set Your Rates",
            description: "Choose your hourly rates and availability that works best for your schedule",
            icon: DollarSign,
        },
        {
            step: "3",
            title: "Get Verified",
            description: "Upload your credentials and get verified to build trust with potential students",
            icon: CheckCircle,
        },
        {
            step: "4",
            title: "Start Teaching",
            description: "Receive booking requests from students and begin your tutoring journey",
            icon: BookOpen,
        },
    ]

    const testimonials = [
        {
            name: "Sarah Johnson",
            subject: "Mathematics",
            image: "/professional-teacher-woman.png",
            rating: 4.9,
            students: 127,
            earnings: "$3,200",
            quote: "TutorHome has allowed me to reach students I never could before. The platform is easy to use and the support team is fantastic!",
        },
        {
            name: "David Chen",
            subject: "English Literature",
            image: "/professional-teacher-man.png",
            rating: 4.8,
            students: 89,
            earnings: "$2,800",
            quote: "I love the flexibility TutorHome offers. I can teach around my full-time job and still make great extra income.",
        },
        {
            name: "Maria Santos",
            subject: "Piano",
            image: "/piano-teacher-woman.png",
            rating: 5.0,
            students: 45,
            earnings: "$1,950",
            quote: "The quality of students on TutorHome is excellent. They're motivated and serious about learning, which makes teaching a joy.",
        },
    ]

    const faqs = [
        {
            question: "How much can I earn as a tutor?",
            answer: "Tutors on TutorHome earn between $15-$100+ per hour depending on their subject, experience, and qualifications. Top tutors can earn $3,000+ per month.",
        },
        {
            question: "What qualifications do I need?",
            answer: "We welcome tutors with various backgrounds - from certified teachers to subject matter experts. A degree in your subject area or relevant experience is preferred.",
        },
        {
            question: "How do I get paid?",
            answer: "We handle all payments securely. You'll receive your earnings weekly via direct deposit or PayPal, minus a small platform fee.",
        },
        {
            question: "Can I teach online and in-person?",
            answer: "Yes! You can offer both online and in-person lessons. Many tutors find online teaching more convenient and profitable.",
        },
        {
            question: "How do I attract students?",
            answer: "We provide marketing tools, help optimize your profile, and promote top tutors. Great reviews and competitive pricing help attract more students.",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-blue-50">
            {/* Header */}
            <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">TutorHome</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/tutors" className="text-gray-600 hover:text-orange-500 transition-colors">
                            find tutors
                        </Link>
                        <Link href="/become-tutor" className="text-orange-500 font-medium">
                            become a tutor
                        </Link>
                        <Link href="/how-it-works" className="text-gray-600 hover:text-orange-500 transition-colors">
                            how it works
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-3">
                        <Link href="/login">
                            <Button variant="ghost">sign in</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-orange-500 hover:bg-orange-600">sign up</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Become a <span className="text-orange-500">Tutor</span>
                        <br />
                        <span className="text-3xl md:text-4xl text-gray-600">Share Your Knowledge, Earn Great Money</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Join thousands of tutors who are making a difference in students&apos; lives while building a flexible, rewarding career on TutorHome.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Link href="/register">
                            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                                Start Teaching Today
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
                            Learn More
                        </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">$50+</div>
                            <div className="text-gray-600">Average Hourly Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">15,000+</div>
                            <div className="text-gray-600">Active Tutors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-orange-500 mb-2">98%</div>
                            <div className="text-gray-600">Tutor Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="container mx-auto px-4 py-20 bg-white">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Teach on TutorHome?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join a platform designed to help you succeed as an educator
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-8 text-center">
                                <div className={`w-16 h-16 rounded-full ${benefit.color} flex items-center justify-center mx-auto mb-6`}>
                                    <benefit.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">How to Get Started</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Start teaching in just 4 simple steps
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-start mb-12 last:mb-0">
                            <div className="flex-shrink-0 mr-8">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {step.step}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center mb-4">
                                    <step.icon className="w-6 h-6 text-orange-500 mr-3" />
                                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                                </div>
                                <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tutor Success Stories */}
            <section className="container mx-auto px-4 py-20 bg-gray-50">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See how other tutors are thriving on TutorHome
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((tutor, index) => (
                        <Card key={index} className="border-0 shadow-xl">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-6">
                                    <Image
                                        src={tutor.image || "/placeholder.svg"}
                                        alt={tutor.name}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h3 className="font-bold text-gray-900">{tutor.name}</h3>
                                        <p className="text-orange-500 font-medium">{tutor.subject}</p>
                                        <div className="flex items-center mt-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600 ml-1">{tutor.rating} • {tutor.students} students</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center p-3 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">{tutor.earnings}</div>
                                        <div className="text-sm text-gray-600">Monthly Earnings</div>
                                    </div>
                                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">{tutor.students}</div>
                                        <div className="text-sm text-gray-600">Students Taught</div>
                                    </div>
                                </div>

                                <p className="text-gray-700 italic leading-relaxed">&ldquo;{tutor.quote}&rdquo;</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Requirements */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Tutor Requirements</h2>
                        <p className="text-xl text-gray-600">
                            We welcome passionate educators from all backgrounds
                        </p>
                    </div>

                    <Tabs defaultValue="academic" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="academic">Academic Subjects</TabsTrigger>
                            <TabsTrigger value="creative">Creative Skills</TabsTrigger>
                            <TabsTrigger value="professional">Professional Skills</TabsTrigger>
                        </TabsList>

                        <TabsContent value="academic" className="mt-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
                                        Academic Subject Requirements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Education</h4>
                                            <p className="text-gray-600">Bachelor&apos;s degree in relevant subject or equivalent experience</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Experience</h4>
                                            <p className="text-gray-600">1+ years of teaching or tutoring experience preferred</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Communication</h4>
                                            <p className="text-gray-600">Excellent communication skills and patience with students</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="creative" className="mt-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Target className="w-6 h-6 mr-3 text-purple-600" />
                                        Creative Skills Requirements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Expertise</h4>
                                            <p className="text-gray-600">Demonstrated proficiency in your creative field</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Portfolio</h4>
                                            <p className="text-gray-600">Portfolio or examples of your work and teaching ability</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Teaching Approach</h4>
                                            <p className="text-gray-600">Ability to break down complex creative concepts for beginners</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="professional" className="mt-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Zap className="w-6 h-6 mr-3 text-orange-600" />
                                        Professional Skills Requirements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Industry Experience</h4>
                                            <p className="text-gray-600">3+ years of professional experience in your field</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Certifications</h4>
                                            <p className="text-gray-600">Relevant professional certifications or credentials</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                        <div>
                                            <h4 className="font-semibold">Practical Knowledge</h4>
                                            <p className="text-gray-600">Ability to teach practical, real-world applications</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 py-20 bg-gray-50">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get answers to common questions about becoming a tutor
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <Card key={index} className="border-0 shadow-lg">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Start Teaching?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join TutorHome today and start making a difference in students&apos; lives while earning great money.
                    </p>

                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Started in Minutes</h3>
                        <p className="text-gray-600 mb-6">Enter your email to begin your tutor application</p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1"
                            />
                            <Link href="/register">
                                <Button className="bg-orange-500 hover:bg-orange-600 px-8">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-gray-600">
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            Free to join
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            No setup fees
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            Start earning immediately
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div>
                            <div className="text-3xl font-bold text-orange-500 mb-6">TutorHome</div>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Empowering educators to share their knowledge and build successful tutoring careers.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">For Tutors</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="#" className="hover:text-orange-500 transition-colors">Become a Tutor</Link></li>
                                <li><Link href="#" className="hover:text-orange-500 transition-colors">Tutor Resources</Link></li>
                                <li><Link href="#" className="hover:text-orange-500 transition-colors">Success Stories</Link></li>
                                <li><Link href="#" className="hover:text-orange-500 transition-colors">Tutor Guidelines</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Support</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="#" className="hover:text-orange-500 transition-colors">Help Center</Link></li>
                                <li><Link href="#" className="hover:text-orange-500 transition-colors">Contact Us</Link></li>
                                <li><Link href="#" className="hover:text-orange-500 transition-colors">Safety & Trust</Link></li>
                                <li><Link href="#" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">Connect</h4>
                            <div className="flex space-x-4">
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                                    <span className="text-sm">f</span>
                                </div>
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                                    <span className="text-sm">t</span>
                                </div>
                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                                    <span className="text-sm">in</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 TutorHome. All rights reserved. Made with ❤️ for educators everywhere.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
