"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Search, Users, MessageCircle, Calendar, CreditCard, Star, Shield, CheckCircle, ArrowRight, Play, Clock, Globe, Headphones, Award, Target } from 'lucide-react'
import Link from "next/link"

export default function HowItWorksPage() {
    const studentSteps = [
        {
            step: "1",
            title: "Search & Browse",
            description: "Use our advanced filters to find tutors by subject, location, price, and availability. Read reviews and compare profiles.",
            icon: Search,
            details: [
                "Filter by subject, location, and price range",
                "Read verified reviews from other students",
                "Compare tutor profiles and qualifications",
                "View tutor availability in real-time"
            ]
        },
        {
            step: "2",
            title: "Connect & Book",
            description: "Contact your chosen tutor, discuss your learning goals, and schedule your first lesson at your convenience.",
            icon: MessageCircle,
            details: [
                "Send messages to potential tutors",
                "Discuss your learning objectives",
                "Negotiate pricing if needed",
                "Schedule lessons that fit your calendar"
            ]
        },
        {
            step: "3",
            title: "Learn & Grow",
            description: "Attend your lessons, track your progress, and achieve your educational goals with personalized guidance.",
            icon: BookOpen,
            details: [
                "Join online or in-person lessons",
                "Receive personalized learning materials",
                "Track your progress over time",
                "Get homework help and exam preparation"
            ]
        },
        {
            step: "4",
            title: "Review & Continue",
            description: "Leave reviews for your tutor and continue booking more lessons to keep improving your skills.",
            icon: Star,
            details: [
                "Rate and review your tutor",
                "Book recurring lessons easily",
                "Switch tutors if needed",
                "Build long-term learning relationships"
            ]
        }
    ]

    const tutorSteps = [
        {
            step: "1",
            title: "Create Profile",
            description: "Build your professional tutor profile with your expertise, experience, and teaching approach.",
            icon: Users,
            details: [
                "Upload professional photos",
                "List your qualifications and experience",
                "Set your hourly rates",
                "Describe your teaching style"
            ]
        },
        {
            step: "2",
            title: "Get Verified",
            description: "Upload your credentials and get verified to build trust with potential students.",
            icon: Shield,
            details: [
                "Submit educational certificates",
                "Verify your identity",
                "Pass background checks",
                "Get the verified tutor badge"
            ]
        },
        {
            step: "3",
            title: "Receive Requests",
            description: "Start receiving booking requests from students who match your expertise and availability.",
            icon: Calendar,
            details: [
                "Get notified of new requests",
                "Review student requirements",
                "Accept or decline bookings",
                "Set your availability schedule"
            ]
        },
        {
            step: "4",
            title: "Teach & Earn",
            description: "Conduct lessons, help students achieve their goals, and get paid securely through our platform.",
            icon: CreditCard,
            details: [
                "Teach online or in-person",
                "Use our built-in video tools",
                "Receive payments automatically",
                "Build your reputation with reviews"
            ]
        }
    ]

    const features = [
        {
            icon: Shield,
            title: "Safe & Secure",
            description: "All tutors are verified and payments are processed securely",
            color: "bg-green-100 text-green-600"
        },
        {
            icon: Globe,
            title: "Online & In-Person",
            description: "Choose between online video lessons or face-to-face meetings",
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: Clock,
            title: "Flexible Scheduling",
            description: "Book lessons at times that work for your schedule",
            color: "bg-purple-100 text-purple-600"
        },
        {
            icon: Headphones,
            title: "24/7 Support",
            description: "Get help whenever you need it from our support team",
            color: "bg-orange-100 text-orange-600"
        },
        {
            icon: Award,
            title: "Quality Guaranteed",
            description: "Money-back guarantee if you&apos;re not satisfied with your first lesson",
            color: "bg-pink-100 text-pink-600"
        },
        {
            icon: Target,
            title: "Personalized Learning",
            description: "Get customized lessons tailored to your learning style and goals",
            color: "bg-indigo-100 text-indigo-600"
        }
    ]

    const faqs = [
        {
            question: "How do I find the right tutor?",
            answer: "Use our search filters to narrow down tutors by subject, location, price range, and availability. Read reviews from other students and check tutor profiles to find the perfect match for your learning style."
        },
        {
            question: "What if I'm not satisfied with my tutor?",
            answer: "We offer a satisfaction guarantee. If you&apos;re not happy with your first lesson, we&apos;ll help you find a new tutor or provide a full refund. Your learning success is our top priority."
        },
        {
            question: "How does payment work?",
            answer: "Payments are processed securely through our platform. You can pay by credit card, debit card, or PayPal. Payment is only charged after your lesson is completed."
        },
        {
            question: "Can I have both online and in-person lessons?",
            answer: "Yes! Many tutors offer both options. You can discuss with your tutor what works best for both of you. Online lessons use our built-in video platform for the best experience."
        },
        {
            question: "How do I schedule lessons?",
            answer: "Once you've connected with a tutor, you can view their availability and book lessons directly through our platform. You can schedule one-time lessons or set up recurring sessions."
        },
        {
            question: "What subjects are available?",
            answer: "We offer tutoring in hundreds of subjects including academic subjects (Math, Science, Languages), test prep (SAT, GRE, IELTS), creative skills (Music, Art), and professional skills (Programming, Business)."
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50">
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
                        <Link href="/become-tutor" className="text-gray-600 hover:text-orange-500 transition-colors">
                            become a tutor
                        </Link>
                        <Link href="/how-it-works" className="text-orange-500 font-medium">
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
                        How <span className="text-orange-500">TutorHome</span> Works
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        Connecting students with expert tutors for personalized learning experiences.
                        Here&apos;s everything you need to know about getting started.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link href="/register">
                            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg">
                                Get Started Now
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="px-8 py-4 text-lg bg-transparent">
                            <Play className="w-5 h-5 mr-2" />
                            Watch Demo
                        </Button>
                    </div>

                    {/* Quick Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Find Tutors</h3>
                            <p className="text-gray-600 text-sm">Search and compare qualified tutors</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Connect</h3>
                            <p className="text-gray-600 text-sm">Message and book your ideal tutor</p>
                        </div>
                        <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Learn</h3>
                            <p className="text-gray-600 text-sm">Start your personalized learning journey</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Steps */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Step-by-Step Guide</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Whether you&apos;re a student looking to learn or a tutor ready to teach, here&apos;s how to get started
                    </p>
                </div>

                <Tabs defaultValue="students" className="max-w-6xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2 mb-12">
                        <TabsTrigger value="students" className="text-lg py-3">For Students</TabsTrigger>
                        <TabsTrigger value="tutors" className="text-lg py-3">For Tutors</TabsTrigger>
                    </TabsList>

                    <TabsContent value="students">
                        <div className="space-y-12">
                            {studentSteps.map((step, index) => (
                                <div key={index} className="flex flex-col lg:flex-row items-start gap-8">
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                                            {step.step}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center mb-4">
                                            <step.icon className="w-8 h-8 text-blue-500 mr-4" />
                                            <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                                        </div>
                                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {step.details.map((detail, detailIndex) => (
                                                <div key={detailIndex} className="flex items-start space-x-3">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-700">{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="tutors">
                        <div className="space-y-12">
                            {tutorSteps.map((step, index) => (
                                <div key={index} className="flex flex-col lg:flex-row items-start gap-8">
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                                            {step.step}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center mb-4">
                                            <step.icon className="w-8 h-8 text-orange-500 mr-4" />
                                            <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                                        </div>
                                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">{step.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {step.details.map((detail, detailIndex) => (
                                                <div key={detailIndex} className="flex items-start space-x-3">
                                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                    <span className="text-gray-700">{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-20 bg-white">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose TutorHome?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We&apos;ve built the most comprehensive platform for online and in-person tutoring
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <CardContent className="p-8 text-center">
                                <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-6`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        No hidden fees, no subscriptions. Pay only for the lessons you take.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card className="border-2 border-gray-200">
                        <CardHeader className="text-center pb-8">
                            <CardTitle className="text-2xl font-bold text-gray-900">For Students</CardTitle>
                            <div className="text-4xl font-bold text-blue-600 mt-4">Free</div>
                            <p className="text-gray-600 mt-2">to join and browse</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Browse unlimited tutor profiles</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Message tutors for free</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Pay only for lessons taken</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Secure payment processing</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Money-back guarantee</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-orange-500 relative">
                        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500">
                            Most Popular
                        </Badge>
                        <CardHeader className="text-center pb-8">
                            <CardTitle className="text-2xl font-bold text-gray-900">Lesson Pricing</CardTitle>
                            <div className="text-4xl font-bold text-orange-600 mt-4">$15-100+</div>
                            <p className="text-gray-600 mt-2">per hour</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Set by individual tutors</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Negotiate pricing directly</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Package deals available</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>No booking fees for students</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Cancel up to 24h before</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-200">
                        <CardHeader className="text-center pb-8">
                            <CardTitle className="text-2xl font-bold text-gray-900">For Tutors</CardTitle>
                            <div className="text-4xl font-bold text-green-600 mt-4">15%</div>
                            <p className="text-gray-600 mt-2">platform fee</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Keep 85% of your earnings</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Weekly automatic payouts</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Free marketing and promotion</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>Built-in video platform</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span>24/7 support included</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 py-20 bg-gray-50">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get answers to the most common questions about using TutorHome
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {faqs.map((faq, index) => (
                        <Card key={index} className="border-0 shadow-lg">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h3>
                                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-gray-600 mb-12">
                        Join thousands of students and tutors who are already using TutorHome to achieve their goals.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/register">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg">
                                Find a Tutor
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/become-tutor">
                            <Button size="lg" variant="outline" className="px-12 py-4 text-lg bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-50">
                                Become a Tutor
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center text-sm text-gray-600">
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            Free to join
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            Verified tutors
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            Money-back guarantee
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            24/7 support
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
                                Connecting students with qualified tutors for personalized learning experiences that transform lives.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">For Students</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="/tutors" className="hover:text-orange-500 transition-colors">Find Tutors</Link></li>
                                <li><Link href="/how-it-works" className="hover:text-orange-500 transition-colors">How it Works</Link></li>
                                <li><Link href="#" className="hover:text-orange-500 transition-colors">Success Stories</Link></li>
                                <li><Link href="#" className="hover:text-orange-500 transition-colors">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-lg">For Tutors</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="/become-tutor" className="hover:text-orange-500 transition-colors">Become a Tutor</Link></li>
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
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 TutorHome. All rights reserved. Made with ❤️ for learners everywhere.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
