"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  Star,
  Phone,
  Mail,
  User,
  Settings,
  BookOpen,
  TrendingUp,
  Award,
  Target,
  Edit,
  Camera,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Trash2,
  Download,
  BarChart3,
  CalendarIcon,
  ClockIcon,
} from "lucide-react";
import ChatSystem from "@/components/chat-system";
import { Input } from "@/components/ui/input";
import { useSession, signOut } from "@/lib/client/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  // Determine user type from session data
  const userType = session?.user?.role === "teacher" ? "teacher" : "student";

  React.useEffect(() => {
    if (!session && !sessionLoading) {
      router.push("/login");
    }
  }, [session, sessionLoading, router]);

  // Redirect if not authenticated
  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  // Mock student bookings data
  const studentBookings = [
    {
      id: 1,
      tutor: {
        name: "Sarah Johnson",
        subject: "Mathematics",
        image: "/professional-teacher-woman.png",
        rating: 4.9,
        location: "Jakarta",
      },
      date: "2024-01-15",
      time: "10:00 AM",
      duration: 60,
      price: 25,
      status: "approved",
      message: "Looking forward to learning calculus basics",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      tutor: {
        name: "David Chen",
        subject: "English Literature",
        image: "/professional-teacher-man.png",
        rating: 4.8,
        location: "Surabaya",
      },
      date: "2024-01-18",
      time: "2:00 PM",
      duration: 90,
      price: 30,
      status: "pending",
      message: "Need help with essay writing techniques",
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      tutor: {
        name: "Maria Santos",
        subject: "Piano",
        image: "/piano-teacher-woman.png",
        rating: 5.0,
        location: "Bandung",
      },
      date: "2024-01-20",
      time: "4:00 PM",
      duration: 60,
      price: 35,
      status: "canceled",
      message: "Beginner piano lessons",
      createdAt: "2024-01-08",
      cancelReason: "Tutor unavailable due to illness",
    },
  ];

  // Mock tutor bookings data
  const tutorBookings = [
    {
      id: 1,
      student: {
        name: "Alex Chen",
        email: "alex.chen@email.com",
        phone: "+62 812 3456 7890",
        image: "/placeholder.svg",
      },
      subject: "Algebra",
      date: "2024-01-16",
      time: "3:00 PM",
      duration: 60,
      originalPrice: 25,
      proposedPrice: 20,
      status: "pending",
      message:
        "I'm struggling with quadratic equations and need help preparing for my upcoming exam. I'm a high school student and would prefer a slower pace.",
      priceReason:
        "I'm a student with limited budget, but I can commit to 2 sessions per week",
      createdAt: "2024-01-14",
    },
    {
      id: 2,
      student: {
        name: "Lisa Wang",
        email: "lisa.wang@email.com",
        phone: "+62 813 9876 5432",
        image: "/placeholder.svg",
      },
      subject: "Calculus",
      date: "2024-01-17",
      time: "10:00 AM",
      duration: 90,
      originalPrice: 25,
      proposedPrice: 25,
      status: "approved",
      message:
        "Need intensive calculus tutoring for university entrance exam preparation.",
      createdAt: "2024-01-13",
    },
    {
      id: 3,
      student: {
        name: "Tommy Lee",
        email: "tommy.lee@email.com",
        phone: "+62 814 1234 5678",
        image: "/placeholder.svg",
      },
      subject: "Statistics",
      date: "2024-01-19",
      time: "1:00 PM",
      duration: 120,
      originalPrice: 25,
      proposedPrice: 22,
      status: "rejected",
      message:
        "Working professional looking for weekend statistics tutoring for data analysis skills.",
      priceReason: "Looking for long-term commitment with multiple sessions",
      createdAt: "2024-01-11",
      rejectionReason: "Schedule conflict with existing commitments",
    },
  ];

  // Mock messages data
  const conversations = [
    {
      id: 1,
      participant: {
        name: "Sarah Johnson",
        image: "/professional-teacher-woman.png",
        role: "tutor",
        subject: "Mathematics",
        online: true,
      },
      lastMessage: {
        content:
          "Great progress on derivatives! Let's work on integration next session.",
        timestamp: "2 hours ago",
        sender: "Sarah Johnson",
        unread: false,
      },
      totalMessages: 24,
    },
    {
      id: 2,
      participant: {
        name: "David Chen",
        image: "/professional-teacher-man.png",
        role: "tutor",
        subject: "English Literature",
        online: false,
      },
      lastMessage: {
        content:
          "I've uploaded the essay feedback. Please review before our next lesson.",
        timestamp: "1 day ago",
        sender: "David Chen",
        unread: true,
      },
      totalMessages: 18,
    },
    {
      id: 3,
      participant: {
        name: "Maria Santos",
        image: "/piano-teacher-woman.png",
        role: "tutor",
        subject: "Piano",
        online: true,
      },
      lastMessage: {
        content: "Don't forget to practice the scales we covered today!",
        timestamp: "3 days ago",
        sender: "Maria Santos",
        unread: false,
      },
      totalMessages: 12,
    },
  ];

  // Mock learning progress data
  const learningProgress = {
    totalHours: 45,
    completedLessons: 12,
    averageRating: 4.8,
    currentStreak: 7,
    subjects: [
      {
        name: "Mathematics",
        tutor: "Sarah Johnson",
        progress: 75,
        hoursSpent: 20,
        lessonsCompleted: 8,
        nextLesson: "2024-01-20",
        topics: [
          { name: "Algebra", completed: true, score: 92 },
          { name: "Calculus Basics", completed: true, score: 88 },
          { name: "Derivatives", completed: false, score: null },
          { name: "Integration", completed: false, score: null },
        ],
      },
      {
        name: "English Literature",
        tutor: "David Chen",
        progress: 60,
        hoursSpent: 15,
        lessonsCompleted: 3,
        nextLesson: "2024-01-22",
        topics: [
          { name: "Essay Writing", completed: true, score: 85 },
          { name: "Poetry Analysis", completed: true, score: 90 },
          { name: "Novel Study", completed: false, score: null },
          { name: "Critical Thinking", completed: false, score: null },
        ],
      },
      {
        name: "Piano",
        tutor: "Maria Santos",
        progress: 40,
        hoursSpent: 10,
        lessonsCompleted: 1,
        nextLesson: "2024-01-25",
        topics: [
          { name: "Basic Scales", completed: true, score: 78 },
          { name: "Chord Progressions", completed: false, score: null },
          { name: "Sheet Music Reading", completed: false, score: null },
          { name: "Performance Techniques", completed: false, score: null },
        ],
      },
    ],
    achievements: [
      {
        id: 1,
        title: "First Lesson Complete",
        description: "Completed your first tutoring session",
        icon: "🎯",
        earned: true,
        date: "2024-01-10",
      },
      {
        id: 2,
        title: "Week Warrior",
        description: "Attended lessons for 7 consecutive days",
        icon: "🔥",
        earned: true,
        date: "2024-01-14",
      },
      {
        id: 3,
        title: "Math Master",
        description: "Scored 90+ on 5 math assessments",
        icon: "🧮",
        earned: false,
        date: null,
      },
      {
        id: 4,
        title: "Bookworm",
        description: "Complete 10 literature lessons",
        icon: "📚",
        earned: false,
        date: null,
      },
    ],
  };

  // Mock profile data
  const userProfile = {
    personalInfo: {
      firstName: "Alex",
      lastName: "Chen",
      email: "alex.chen@email.com",
      phone: "+62 812 3456 7890",
      dateOfBirth: "1995-03-15",
      location: "Jakarta, Indonesia",
      timezone: "Asia/Jakarta",
      avatar: "/placeholder.svg",
    },
    preferences: {
      language: "English",
      currency: "USD",
      notifications: {
        email: true,
        sms: false,
        push: true,
        lessonReminders: true,
        messageAlerts: true,
        promotions: false,
      },
      privacy: {
        profileVisibility: "public",
        showOnlineStatus: true,
        allowMessages: true,
      },
    },
    learningGoals: [
      "Master calculus for university entrance exam",
      "Improve English writing skills for academic purposes",
      "Learn piano basics for personal enjoyment",
    ],
    interests: ["Mathematics", "Science", "Music", "Literature", "Technology"],
    paymentMethods: [
      {
        id: 1,
        type: "credit_card",
        last4: "4242",
        brand: "Visa",
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
      },
      {
        id: 2,
        type: "paypal",
        email: "alex.chen@email.com",
        isDefault: false,
      },
    ],
  };

  const handleApproveBooking = (bookingId: number) => {
    console.log("Approving booking:", bookingId);
    // In real app, this would make an API call
  };

  const handleRejectBooking = (bookingId: number) => {
    console.log("Rejecting booking:", bookingId);
    // In real app, this would make an API call
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "canceled":
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "canceled":
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-orange-500">LearnWay</div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/tutors"
              className="text-gray-600 hover:text-orange-500 transition-colors"
            >
              find tutors
            </Link>
            <Link href="/dashboard" className="text-orange-500 font-medium">
              dashboard
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={session.user?.image || "/placeholder.svg"} />
              <AvatarFallback>
                {session.user?.firstName?.[0]}
                {session.user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.firstName || "User"}!
          </h1>
          <p className="text-gray-600">
            {userType === "student"
              ? "Manage your bookings and track your learning progress"
              : "Manage your student bookings and schedule"}
          </p>
        </div>

        {/* Student Dashboard */}
        {userType === "student" && (
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bookings">my bookings</TabsTrigger>
              <TabsTrigger value="messages">messages</TabsTrigger>
              <TabsTrigger value="progress">learning progress</TabsTrigger>
              <TabsTrigger value="profile">profile settings</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {
                        studentBookings.filter((b) => b.status === "approved")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-600">
                      approved lessons
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {
                        studentBookings.filter((b) => b.status === "pending")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-600">
                      pending requests
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {studentBookings.length}
                    </div>
                    <div className="text-sm text-gray-600">total bookings</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {studentBookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage
                              src={booking.tutor.image || "/placeholder.svg"}
                              alt={booking.tutor.name}
                            />
                            <AvatarFallback>
                              {booking.tutor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {booking.tutor.name}
                              </h3>
                              <Badge
                                className={`${getStatusColor(
                                  booking.status
                                )} border`}
                              >
                                <div className="flex items-center space-x-1">
                                  {getStatusIcon(booking.status)}
                                  <span className="capitalize">
                                    {booking.status}
                                  </span>
                                </div>
                              </Badge>
                            </div>

                            <p className="text-blue-600 font-medium mb-2">
                              {booking.tutor.subject}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(booking.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {booking.time} ({booking.duration} min)
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4" />
                                <span>${booking.price}/hr</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{booking.tutor.rating}</span>
                              </div>
                            </div>

                            {booking.message && (
                              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">
                                    your message:
                                  </span>{" "}
                                  {booking.message}
                                </p>
                              </div>
                            )}

                            {booking.status === "canceled" &&
                              booking.cancelReason && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                  <p className="text-sm text-red-700">
                                    <span className="font-medium">
                                      cancellation reason:
                                    </span>{" "}
                                    {booking.cancelReason}
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2 lg:w-48">
                          {booking.status === "approved" && (
                            <>
                              <Link href={`/lesson/${booking.id}`}>
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                  join lesson
                                </Button>
                              </Link>
                              <Button
                                variant="outline"
                                className="w-full bg-transparent"
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                message tutor
                              </Button>
                            </>
                          )}
                          {booking.status === "pending" && (
                            <Button
                              variant="outline"
                              className="w-full bg-transparent"
                              disabled
                            >
                              waiting for approval
                            </Button>
                          )}
                          {booking.status === "canceled" && (
                            <Button
                              variant="outline"
                              className="w-full bg-transparent"
                            >
                              book again
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">messages</h2>
                  <p className="text-gray-600">communicate with your tutors</p>
                </div>
                <ChatSystem
                  currentUserId={1}
                  currentUserType={userType}
                  triggerButton={
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      open chat
                    </Button>
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {conversations.map((conversation) => (
                  <Card
                    key={conversation.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage
                              src={
                                conversation.participant.image ||
                                "/placeholder.svg"
                              }
                              alt={conversation.participant.name}
                            />
                            <AvatarFallback>
                              {conversation.participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.participant.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {conversation.participant.name}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {conversation.lastMessage.timestamp}
                            </span>
                          </div>

                          <p className="text-sm text-blue-600 mb-1">
                            {conversation.participant.subject}
                          </p>

                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate flex-1 mr-2">
                              {conversation.lastMessage.content}
                            </p>
                            {conversation.lastMessage.unread && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant="secondary" className="text-xs">
                            {conversation.totalMessages} messages
                          </Badge>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  learning progress
                </h2>
                <p className="text-gray-600">
                  track your learning journey and achievements
                </p>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {learningProgress.totalHours}
                    </div>
                    <div className="text-sm text-gray-600">total hours</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {learningProgress.completedLessons}
                    </div>
                    <div className="text-sm text-gray-600">
                      lessons completed
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {learningProgress.averageRating}
                    </div>
                    <div className="text-sm text-gray-600">average rating</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {learningProgress.currentStreak}
                    </div>
                    <div className="text-sm text-gray-600">day streak</div>
                  </CardContent>
                </Card>
              </div>

              {/* Subject Progress */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    subject progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {learningProgress.subjects.map((subject, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {subject.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            with {subject.tutor}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {subject.progress}%
                          </div>
                          <div className="text-sm text-gray-500">complete</div>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Hours:</span>
                          <span className="font-medium ml-1">
                            {subject.hoursSpent}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Lessons:</span>
                          <span className="font-medium ml-1">
                            {subject.lessonsCompleted}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Next:</span>
                          <span className="font-medium ml-1">
                            {new Date(subject.nextLesson).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          {subject.topics
                            .slice(0, 2)
                            .map((topic, topicIndex) => (
                              <Badge
                                key={topicIndex}
                                variant={
                                  topic.completed ? "default" : "secondary"
                                }
                                className="text-xs"
                              >
                                {topic.name}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {learningProgress.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border-2 ${
                          achievement.earned
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h3
                              className={`font-semibold ${
                                achievement.earned
                                  ? "text-green-800"
                                  : "text-gray-600"
                              }`}
                            >
                              {achievement.title}
                            </h3>
                            <p
                              className={`text-sm ${
                                achievement.earned
                                  ? "text-green-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {achievement.description}
                            </p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-green-500 mt-1">
                                Earned on{" "}
                                {new Date(
                                  achievement.date
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          {achievement.earned && (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  profile settings
                </h2>
                <p className="text-gray-600">
                  manage your account information and preferences
                </p>
              </div>

              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">personal info</TabsTrigger>
                  <TabsTrigger value="preferences">preferences</TabsTrigger>
                  <TabsTrigger value="security">security</TabsTrigger>
                  <TabsTrigger value="billing">billing</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        personal information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center space-x-6">
                        <Avatar className="w-20 h-20">
                          <AvatarImage
                            src={
                              userProfile.personalInfo.avatar ||
                              "/placeholder.svg"
                            }
                          />
                          <AvatarFallback className="text-xl">
                            {userProfile.personalInfo.firstName[0]}
                            {userProfile.personalInfo.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <Button variant="outline" className="bg-transparent">
                            <Camera className="w-4 h-4 mr-2" />
                            change photo
                          </Button>
                          <p className="text-sm text-gray-500">
                            JPG, PNG or GIF. Max size 2MB.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            first name
                          </label>
                          <Input
                            defaultValue={userProfile.personalInfo.firstName}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            last name
                          </label>
                          <Input
                            defaultValue={userProfile.personalInfo.lastName}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            email address
                          </label>
                          <Input
                            type="email"
                            defaultValue={userProfile.personalInfo.email}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            phone number
                          </label>
                          <Input
                            defaultValue={userProfile.personalInfo.phone}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            date of birth
                          </label>
                          <Input
                            type="date"
                            defaultValue={userProfile.personalInfo.dateOfBirth}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            location
                          </label>
                          <Input
                            defaultValue={userProfile.personalInfo.location}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            learning goals
                          </label>
                          <div className="space-y-2">
                            {userProfile.learningGoals.map((goal, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <Input defaultValue={goal} className="flex-1" />
                                <Button variant="outline" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              className="w-full bg-transparent"
                            >
                              add learning goal
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            interests
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {userProfile.interests.map((interest, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="px-3 py-1"
                              >
                                {interest}
                                <button className="ml-2 text-gray-500 hover:text-gray-700">
                                  ×
                                </button>
                              </Badge>
                            ))}
                            <Button variant="outline" size="sm">
                              add interest
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <Button variant="outline">cancel</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          save changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Settings className="w-5 h-5 mr-2" />
                        preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            language
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="en">English</option>
                            <option value="id">Bahasa Indonesia</option>
                            <option value="zh">中文</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            currency
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-md">
                            <option value="USD">USD ($)</option>
                            <option value="IDR">IDR (Rp)</option>
                            <option value="EUR">EUR (€)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">
                          notification preferences
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(
                            userProfile.preferences.notifications
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between"
                            >
                              <label className="text-sm text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                              </label>
                              <input
                                type="checkbox"
                                defaultChecked={value}
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">
                          privacy settings
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700">
                              profile visibility
                            </label>
                            <select className="p-2 border border-gray-300 rounded-md">
                              <option value="public">Public</option>
                              <option value="private">Private</option>
                              <option value="tutors-only">Tutors Only</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700">
                              show online status
                            </label>
                            <input
                              type="checkbox"
                              defaultChecked={
                                userProfile.preferences.privacy.showOnlineStatus
                              }
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <label className="text-sm text-gray-700">
                              allow messages from tutors
                            </label>
                            <input
                              type="checkbox"
                              defaultChecked={
                                userProfile.preferences.privacy.allowMessages
                              }
                              className="w-4 h-4 text-blue-600 rounded"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3">
                        <Button variant="outline">cancel</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          save preferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        security settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">
                          change password
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              current password
                            </label>
                            <Input type="password" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              new password
                            </label>
                            <Input type="password" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              confirm new password
                            </label>
                            <Input type="password" />
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            update password
                          </Button>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-gray-900">
                            two-factor authentication
                          </h3>
                          <p className="text-sm text-gray-600">
                            Add an extra layer of security to your account by
                            enabling two-factor authentication.
                          </p>
                          <Button variant="outline" className="bg-transparent">
                            enable 2FA
                          </Button>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-gray-900">
                            active sessions
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">
                                  Current Session
                                </p>
                                <p className="text-xs text-gray-600">
                                  Chrome on Windows • Jakarta, Indonesia
                                </p>
                              </div>
                              <Badge variant="secondary">Active</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">
                                  Mobile App
                                </p>
                                <p className="text-xs text-gray-600">
                                  iOS App • Last seen 2 hours ago
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                revoke
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        billing & payments
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">
                          payment methods
                        </h3>
                        <div className="space-y-3">
                          {userProfile.paymentMethods.map((method) => (
                            <div
                              key={method.id}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    {method.type === "credit_card"
                                      ? method.brand
                                      : "PP"}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-sm">
                                    {method.type === "credit_card"
                                      ? `•••• •••• •••• ${method.last4}`
                                      : method.email}
                                  </p>
                                  {method.type === "credit_card" && (
                                    <p className="text-xs text-gray-600">
                                      Expires {method.expiryMonth}/
                                      {method.expiryYear}
                                    </p>
                                  )}
                                </div>
                                {method.isDefault && (
                                  <Badge variant="secondary">Default</Badge>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  edit
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                          >
                            add payment method
                          </Button>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-gray-900">
                            billing history
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">
                                  Mathematics Lesson - Sarah Johnson
                                </p>
                                <p className="text-xs text-gray-600">
                                  January 15, 2024
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-sm">$25.00</p>
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">
                                  English Literature - David Chen
                                </p>
                                <p className="text-xs text-gray-600">
                                  January 12, 2024
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-sm">$30.00</p>
                                <Button variant="ghost" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        )}

        {/* Tutor Dashboard */}
        {userType === "teacher" && (
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bookings">booking requests</TabsTrigger>
              <TabsTrigger value="messages">messages</TabsTrigger>
              <TabsTrigger value="schedule">my schedule</TabsTrigger>
              <TabsTrigger value="profile">profile settings</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {
                        tutorBookings.filter((b) => b.status === "pending")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-600">
                      pending requests
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {
                        tutorBookings.filter((b) => b.status === "approved")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-600">
                      approved lessons
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {
                        tutorBookings.filter((b) => b.status === "rejected")
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-600">
                      rejected requests
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      $
                      {tutorBookings
                        .filter((b) => b.status === "approved")
                        .reduce((sum, b) => sum + b.proposedPrice, 0)}
                    </div>
                    <div className="text-sm text-gray-600">total earnings</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {tutorBookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src={
                                  booking.student.image || "/placeholder.svg"
                                }
                                alt={booking.student.name}
                              />
                              <AvatarFallback>
                                {booking.student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {booking.student.name}
                                </h3>
                                <Badge
                                  className={`${getStatusColor(
                                    booking.status
                                  )} border`}
                                >
                                  <div className="flex items-center space-x-1">
                                    {getStatusIcon(booking.status)}
                                    <span className="capitalize">
                                      {booking.status}
                                    </span>
                                  </div>
                                </Badge>
                              </div>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Mail className="w-4 h-4" />
                                  <span>{booking.student.email}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Phone className="w-4 h-4" />
                                  <span>{booking.student.phone}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-500 mb-1">
                              requested on
                            </div>
                            <div className="text-sm font-medium">
                              {new Date(booking.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              subject
                            </div>
                            <div className="font-medium text-blue-600">
                              {booking.subject}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              date & time
                            </div>
                            <div className="font-medium">
                              {new Date(booking.date).toLocaleDateString()}
                              <br />
                              <span className="text-sm">{booking.time}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              duration
                            </div>
                            <div className="font-medium">
                              {booking.duration} minutes
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-1">
                              price offer
                            </div>
                            <div className="font-medium">
                              {booking.proposedPrice !==
                              booking.originalPrice ? (
                                <>
                                  <span className="line-through text-gray-400">
                                    ${booking.originalPrice}
                                  </span>
                                  <span className="text-green-600 ml-2">
                                    ${booking.proposedPrice}/hr
                                  </span>
                                </>
                              ) : (
                                <span className="text-green-600">
                                  ${booking.proposedPrice}/hr
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {booking.message && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="text-sm font-medium text-blue-900 mb-2">
                              student message:
                            </div>
                            <p className="text-sm text-blue-800">
                              {booking.message}
                            </p>
                          </div>
                        )}

                        {booking.priceReason &&
                          booking.proposedPrice !== booking.originalPrice && (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                              <div className="text-sm font-medium text-orange-900 mb-2">
                                price negotiation reason:
                              </div>
                              <p className="text-sm text-orange-800">
                                {booking.priceReason}
                              </p>
                            </div>
                          )}

                        {booking.status === "rejected" &&
                          booking.rejectionReason && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                              <div className="text-sm font-medium text-red-900 mb-2">
                                rejection reason:
                              </div>
                              <p className="text-sm text-red-800">
                                {booking.rejectionReason}
                              </p>
                            </div>
                          )}

                        {booking.status === "pending" && (
                          <div className="flex space-x-3 pt-4 border-t">
                            <Button
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveBooking(booking.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              approve booking
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                              onClick={() => handleRejectBooking(booking.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              reject booking
                            </Button>
                            <Button
                              variant="outline"
                              className="px-6 bg-transparent"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              message
                            </Button>
                          </div>
                        )}

                        {booking.status === "approved" && (
                          <div className="flex space-x-3 pt-4 border-t">
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                              start lesson
                            </Button>
                            <Button
                              variant="outline"
                              className="px-6 bg-transparent"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              message student
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="messages" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">messages</h2>
                  <p className="text-gray-600">
                    communicate with your {"student"}
                  </p>
                </div>
                <ChatSystem
                  currentUserId={1}
                  currentUserType={"student"}
                  triggerButton={
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      open chat
                    </Button>
                  }
                />
              </div>

              <Card>
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    start messaging
                  </h3>
                  <p className="text-gray-600 mb-4">
                    click "open chat" above to start conversations with your{" "}
                    {"student"}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>my schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    schedule management coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>profile settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    profile management coming soon...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
