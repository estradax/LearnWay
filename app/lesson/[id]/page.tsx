"use client"

import { useState, useEffect, useRef, use } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Video, VideoOff, Mic, MicOff, PhoneOff, Send, FileText, Download, Upload, Clock, BookOpen, Maximize, Minimize, Volume2, VolumeX, Share, Monitor, Hand, Star, CheckCircle, DollarSign, AlertCircle } from 'lucide-react'
import Link from "next/link"

interface Message {
    id: number
    sender: string
    content: string
    timestamp: string
    type: "text" | "file"
    fileName?: string
}

export default function JoinLessonPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [isVideoOn, setIsVideoOn] = useState(true)
    const [isAudioOn, setIsAudioOn] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isSpeakerOn, setIsSpeakerOn] = useState(true)
    const [isScreenSharing, setIsScreenSharing] = useState(false)
    const [isHandRaised, setIsHandRaised] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const [lessonStarted, setLessonStarted] = useState(false)
    const [lessonEnded, setLessonEnded] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected">("connecting")
    const [lessonDuration, setLessonDuration] = useState(0)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Add these new states after the existing state declarations
    const [showCompletionForm, setShowCompletionForm] = useState(false)
    const [lessonSummary, setLessonSummary] = useState({
        topicsTaught: "",
        lessonDescription: "",
        studentProgress: "",
        homework: "",
        nextLessonPlan: ""
    })
    const [appRating, setAppRating] = useState(0)
    const [appFeedback, setAppFeedback] = useState("")
    const [paymentProcessing, setPaymentProcessing] = useState(false)
    const [paymentCompleted, setPaymentCompleted] = useState(false)

    // Mock lesson data
    const lesson = {
        id: id,
        title: "Calculus Fundamentals",
        tutor: {
            name: "Sarah Johnson",
            image: "/professional-teacher-woman.png",
            subject: "Mathematics",
            rating: 4.9,
        },
        student: {
            name: "Alex Chen",
            image: "/placeholder.svg",
        },
        scheduledTime: "2024-01-15 10:00 AM",
        duration: 60,
        subject: "Mathematics - Calculus",
        description: "Introduction to derivatives and basic calculus concepts",
        userType: "tutor", // Add this to determine if current user is tutor or student
        materials: [
            { name: "Calculus Worksheet.pdf", size: "2.3 MB", type: "pdf" },
            { name: "Practice Problems.docx", size: "1.8 MB", type: "doc" },
            { name: "Reference Notes.pdf", size: "3.1 MB", type: "pdf" },
        ],
    }

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "Sarah Johnson",
            content: "Hi Alex! Welcome to our calculus lesson. Are you ready to get started?",
            timestamp: "10:00 AM",
            type: "text",
        },
        {
            id: 2,
            sender: "Alex Chen",
            content: "Yes, I'm ready! Thank you for the materials you sent earlier.",
            timestamp: "10:01 AM",
            type: "text",
        },
        {
            id: 3,
            sender: "Sarah Johnson",
            content: "Perfect! Let's start with the basics of derivatives. Can you see my screen clearly?",
            timestamp: "10:02 AM",
            type: "text",
        },
    ])

    // Simulate connection process
    useEffect(() => {
        const timer = setTimeout(() => {
            setConnectionStatus("connected")
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    // Lesson timer
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (lessonStarted && !lessonEnded) {
            interval = setInterval(() => {
                setLessonDuration((prev) => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [lessonStarted, lessonEnded])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const handleSendMessage = () => {
        if (!newMessage.trim()) return

        const message: Message = {
            id: Date.now(),
            sender: "Alex Chen", // Current user
            content: newMessage.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            type: "text",
        }

        setMessages((prev) => [...prev, message])
        setNewMessage("")
    }

    const handleStartLesson = () => {
        setLessonStarted(true)
        // setIsCallActive(true) // This line is removed
    }

    // Update the handleEndLesson function
    const handleEndLesson = () => {
        setLessonEnded(true)
        // setIsCallActive(false) // This line is removed
        setLessonStarted(false)
        // For teachers, show completion form instead of direct completion
        if (lesson.userType === "tutor") {
            setShowCompletionForm(true)
        }
    }

    // Add new handler functions
    const handleLessonSummaryChange = (field: string, value: string) => {
        setLessonSummary(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleCompleteLesson = async () => {
        setPaymentProcessing(true)

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000))

        setPaymentProcessing(false)
        setPaymentCompleted(true)
        setShowCompletionForm(false)
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    if (connectionStatus === "connecting") {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold mb-2">Connecting to lesson...</h2>
                    <p className="text-gray-400">Please wait while we set up your video call</p>
                </div>
            </div>
        )
    }

    // Replace the existing lessonEnded return statement with this updated version
    if (lessonEnded && !showCompletionForm) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
                {/* Header */}
                <header className="border-b bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">TutorHome</span>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Lesson Completed!</h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Great job! You&apos;ve completed your {lesson.subject} lesson with {lesson.tutor.name}.
                        </p>

                        <Card className="mb-8">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-2 gap-6 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-blue-600">{formatTime(lessonDuration)}</div>
                                        <div className="text-sm text-gray-600">Lesson Duration</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">{lesson.subject}</div>
                                        <div className="text-sm text-gray-600">Subject Covered</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">How was your lesson?</h3>
                            <div className="flex justify-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} className="p-1">
                                        <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 hover:scale-110 transition-transform" />
                                    </button>
                                ))}
                            </div>

                            <Textarea
                                placeholder="Leave a review for your tutor (optional)..."
                                className="mt-4"
                                rows={3}
                            />

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    Submit Review
                                </Button>
                                <Button variant="outline">
                                    Book Another Lesson
                                </Button>
                                <Link href="/dashboard">
                                    <Button variant="outline">
                                        Back to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Add the teacher completion form modal after the existing lessonEnded check
    if (showCompletionForm) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="border-b bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">TutorHome</span>
                        </Link>
                        <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                Lesson Completed
                            </Badge>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Lesson Summary</h1>
                            <p className="text-gray-600">Fill out the lesson details and complete the payment process</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Lesson Summary Form */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <FileText className="w-5 h-5 mr-2" />
                                            Lesson Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Topics Taught *</label>
                                            <Textarea
                                                placeholder="List the main topics covered in this lesson..."
                                                value={lessonSummary.topicsTaught}
                                                onChange={(e) => handleLessonSummaryChange('topicsTaught', e.target.value)}
                                                rows={3}
                                                className="resize-none"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Lesson Description *</label>
                                            <Textarea
                                                placeholder="Provide a detailed description of what was accomplished..."
                                                value={lessonSummary.lessonDescription}
                                                onChange={(e) => handleLessonSummaryChange('lessonDescription', e.target.value)}
                                                rows={4}
                                                className="resize-none"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Student Progress</label>
                                            <Textarea
                                                placeholder="How did the student perform? Any improvements or challenges?"
                                                value={lessonSummary.studentProgress}
                                                onChange={(e) => handleLessonSummaryChange('studentProgress', e.target.value)}
                                                rows={3}
                                                className="resize-none"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Homework/Practice</label>
                                            <Textarea
                                                placeholder="Any homework or practice exercises assigned..."
                                                value={lessonSummary.homework}
                                                onChange={(e) => handleLessonSummaryChange('homework', e.target.value)}
                                                rows={2}
                                                className="resize-none"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Next Lesson Plan</label>
                                            <Textarea
                                                placeholder="What will be covered in the next lesson..."
                                                value={lessonSummary.nextLessonPlan}
                                                onChange={(e) => handleLessonSummaryChange('nextLessonPlan', e.target.value)}
                                                rows={2}
                                                className="resize-none"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* App Rating */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <Star className="w-5 h-5 mr-2" />
                                            Rate TutorHome App
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-600 mb-4">How was your experience using our platform?</p>
                                            <div className="flex justify-center space-x-2 mb-4">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        onClick={() => setAppRating(star)}
                                                        className="p-1 transition-transform hover:scale-110"
                                                    >
                                                        <Star
                                                            className={`w-8 h-8 ${star <= appRating
                                                                    ? 'text-yellow-400 fill-yellow-400'
                                                                    : 'text-gray-300'
                                                                }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                            <Textarea
                                                placeholder="Share your feedback about the platform (optional)..."
                                                value={appFeedback}
                                                onChange={(e) => setAppFeedback(e.target.value)}
                                                rows={3}
                                                className="resize-none"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Receipt and Payment */}
                            <div className="space-y-6">
                                {/* Lesson Receipt */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <DollarSign className="w-5 h-5 mr-2" />
                                            Lesson Receipt
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {/* Student Info */}
                                            <div className="flex items-center space-x-3 pb-4 border-b">
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={lesson.student.image || "/placeholder.svg"} alt={lesson.student.name} />
                                                    <AvatarFallback>
                                                        {lesson.student.name.split(" ").map(n => n[0]).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{lesson.student.name}</h3>
                                                    <p className="text-sm text-gray-600">Student</p>
                                                </div>
                                            </div>

                                            {/* Lesson Details */}
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Subject:</span>
                                                    <span className="font-medium">{lesson.subject}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Date:</span>
                                                    <span className="font-medium">{lesson.scheduledTime}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Duration:</span>
                                                    <span className="font-medium">{formatTime(lessonDuration)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Scheduled Duration:</span>
                                                    <span className="font-medium">{lesson.duration} minutes</span>
                                                </div>
                                            </div>

                                            <div className="border-t pt-4">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Hourly Rate:</span>
                                                        <span className="font-medium">$25.00</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Actual Duration:</span>
                                                        <span className="font-medium">{Math.ceil(lessonDuration / 60)} minutes</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Platform Fee (10%):</span>
                                                        <span className="font-medium text-red-600">-$2.50</span>
                                                    </div>
                                                    <div className="border-t pt-2 flex justify-between text-lg font-bold">
                                                        <span>Total Earnings:</span>
                                                        <span className="text-green-600">$22.50</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Payment Status */}
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                                <div className="flex items-center">
                                                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                                                    <span className="text-sm text-yellow-800">
                                                        Payment will be processed after lesson completion
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Payment Processing */}
                                {paymentProcessing && (
                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
                                            <p className="text-gray-600">Please wait while we process your earnings...</p>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Payment Completed */}
                                {paymentCompleted && (
                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle className="w-8 h-8 text-green-600" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Completed!</h3>
                                            <p className="text-gray-600 mb-4">$22.50 has been added to your account</p>
                                            <Badge className="bg-green-100 text-green-800">
                                                Funds Available in 1-2 Business Days
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Button
                                        onClick={handleCompleteLesson}
                                        disabled={!lessonSummary.topicsTaught || !lessonSummary.lessonDescription || paymentProcessing}
                                        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
                                        size="lg"
                                    >
                                        {paymentProcessing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                                Complete Lesson & Process Payment
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        onClick={() => setShowCompletionForm(false)}
                                        className="w-full"
                                        disabled={paymentProcessing}
                                    >
                                        Cancel
                                    </Button>
                                </div>

                                {/* Required Fields Notice */}
                                <div className="text-xs text-gray-500 text-center">
                                    * Topics Taught and Lesson Description are required fields
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">TutorHome</span>
                        </Link>

                        <div className="text-white">
                            <h1 className="text-lg font-semibold">{lesson.title}</h1>
                            <p className="text-sm text-gray-400">with {lesson.tutor.name}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {connectionStatus === "connected" ? "Connected" : "Connecting..."}
                        </Badge>

                        {lessonStarted && (
                            <div className="text-white text-sm">
                                <Clock className="w-4 h-4 inline mr-1" />
                                {formatTime(lessonDuration)}
                            </div>
                        )}

                        <Link href="/dashboard">
                            <Button variant="outline" size="sm">
                                Exit
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex">
                {/* Main Video Area */}
                <div className="flex-1 flex flex-col">
                    {/* Video Grid */}
                    <div className="flex-1 p-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                            {/* Tutor Video */}
                            <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {isVideoOn ? (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                            <Avatar className="w-32 h-32">
                                                <AvatarImage src={lesson.tutor.image || "/placeholder.svg"} alt={lesson.tutor.name} />
                                                <AvatarFallback className="text-2xl">
                                                    {lesson.tutor.name.split(" ").map(n => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    ) : (
                                        <div className="text-white text-center">
                                            <VideoOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p className="text-lg">Camera is off</p>
                                        </div>
                                    )}
                                </div>

                                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                                    {lesson.tutor.name} (Tutor)
                                </div>

                                {isScreenSharing && (
                                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs">
                                        Screen Sharing
                                    </div>
                                )}
                            </div>

                            {/* Student Video (You) */}
                            <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {isVideoOn ? (
                                        <div className="w-full h-full bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center">
                                            <Avatar className="w-32 h-32">
                                                <AvatarImage src={lesson.student.image || "/placeholder.svg"} alt={lesson.student.name} />
                                                <AvatarFallback className="text-2xl">
                                                    {lesson.student.name.split(" ").map(n => n[0]).join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    ) : (
                                        <div className="text-white text-center">
                                            <VideoOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                            <p className="text-lg">Camera is off</p>
                                        </div>
                                    )}
                                </div>

                                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                                    {lesson.student.name} (You)
                                </div>

                                {isHandRaised && (
                                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded text-xs flex items-center">
                                        <Hand className="w-3 h-3 mr-1" />
                                        Hand Raised
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-gray-800 px-6 py-4">
                        <div className="flex items-center justify-center space-x-4">
                            <Button
                                variant={isAudioOn ? "default" : "destructive"}
                                size="lg"
                                className="rounded-full w-12 h-12 p-0"
                                onClick={() => setIsAudioOn(!isAudioOn)}
                            >
                                {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                            </Button>

                            <Button
                                variant={isVideoOn ? "default" : "destructive"}
                                size="lg"
                                className="rounded-full w-12 h-12 p-0"
                                onClick={() => setIsVideoOn(!isVideoOn)}
                            >
                                {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full w-12 h-12 p-0"
                                onClick={() => setIsScreenSharing(!isScreenSharing)}
                            >
                                {isScreenSharing ? <Monitor className="w-5 h-5" /> : <Share className="w-5 h-5" />}
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full w-12 h-12 p-0"
                                onClick={() => setIsHandRaised(!isHandRaised)}
                            >
                                <Hand className={`w-5 h-5 ${isHandRaised ? 'text-yellow-500' : ''}`} />
                            </Button>

                            {!lessonStarted ? (
                                <Button
                                    size="lg"
                                    className="bg-green-600 hover:bg-green-700 px-8"
                                    onClick={handleStartLesson}
                                >
                                    Start Lesson
                                </Button>
                            ) : (
                                <Button
                                    variant="destructive"
                                    size="lg"
                                    className="px-8"
                                    onClick={handleEndLesson}
                                >
                                    <PhoneOff className="w-5 h-5 mr-2" />
                                    End Lesson
                                </Button>
                            )}

                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full w-12 h-12 p-0"
                                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                            >
                                {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full w-12 h-12 p-0"
                                onClick={() => setIsFullscreen(!isFullscreen)}
                            >
                                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                    <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                        <TabsList className="grid w-full grid-cols-2 m-4">
                            <TabsTrigger value="chat">Chat</TabsTrigger>
                            <TabsTrigger value="materials">Materials</TabsTrigger>
                        </TabsList>

                        <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                            {/* Chat Messages */}
                            <ScrollArea className="flex-1 px-4">
                                <div className="space-y-4 py-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === lesson.student.name ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-lg px-3 py-2 ${message.sender === lesson.student.name
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-900'
                                                    }`}
                                            >
                                                <div className="text-xs opacity-75 mb-1">{message.sender}</div>
                                                <div className="text-sm">{message.content}</div>
                                                <div className="text-xs opacity-75 mt-1">{message.timestamp}</div>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            {/* Chat Input */}
                            <div className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <Input
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        className="flex-1"
                                    />
                                    <Button onClick={handleSendMessage} size="sm">
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="materials" className="flex-1 m-0">
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-4">Lesson Materials</h3>

                                <div className="space-y-3 mb-6">
                                    {lesson.materials.map((material, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                                <div>
                                                    <div className="font-medium text-sm">{material.name}</div>
                                                    <div className="text-xs text-gray-500">{material.size}</div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4">
                                    <h4 className="font-medium text-gray-900 mb-3">Upload Files</h4>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Drag and drop files here or click to browse
                                        </p>
                                        <Button variant="outline" size="sm">
                                            Choose Files
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
