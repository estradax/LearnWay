"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, MessageCircle, Send, FileText, Download, Upload, Settings, Users, Clock, BookOpen, Maximize, Minimize, Volume2, VolumeX, Share, Camera, Monitor, Hand, Star, CheckCircle } from 'lucide-react'
import Link from "next/link"

interface Message {
    id: number
    sender: string
    content: string
    timestamp: string
    type: "text" | "file"
    fileName?: string
}

export default function JoinLessonPage({ params }: { params: { id: string } }) {
    const [isVideoOn, setIsVideoOn] = useState(true)
    const [isAudioOn, setIsAudioOn] = useState(true)
    const [isCallActive, setIsCallActive] = useState(false)
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

    // Mock lesson data
    const lesson = {
        id: params.id,
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
        setIsCallActive(true)
    }

    const handleEndLesson = () => {
        setLessonEnded(true)
        setIsCallActive(false)
        setLessonStarted(false)
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

    if (lessonEnded) {
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
                            Great job! You've completed your {lesson.subject} lesson with {lesson.tutor.name}.
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
