"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
} from "lucide-react";
import { useSession, signOut } from "@/lib/client/auth";
import { useRouter } from "next/navigation";
import {
  getMyContactRequests,
  ContactRequestItem,
  getIncomingContactRequestsAsTutor,
  TutorIncomingContactRequestItem,
} from "@/lib/client/api/contact-request";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  // Requests state (place hooks before early returns)
  const [requests, setRequests] = React.useState<ContactRequestItem[] | null>(
    null
  );
  const [requestsLoading, setRequestsLoading] = React.useState(false);
  const [requestsError, setRequestsError] = React.useState<string | null>(null);

  // Incoming requests (addressed to me as tutor)
  const [incomingRequests, setIncomingRequests] = React.useState<
    TutorIncomingContactRequestItem[] | null
  >(null);
  const [incomingLoading, setIncomingLoading] = React.useState(false);
  const [incomingError, setIncomingError] = React.useState<string | null>(null);

  // Redirect unauthenticated users
  React.useEffect(() => {
    if (!session && !sessionLoading) {
      router.push("/login");
    }
  }, [session, sessionLoading, router]);

  // Load contact requests when session available
  React.useEffect(() => {
    let ignore = false;
    async function load() {
      setRequestsLoading(true);
      setRequestsError(null);
      try {
        const data = await getMyContactRequests();
        if (!ignore) setRequests(data);
      } catch (e) {
        if (!ignore)
          setRequestsError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!ignore) setRequestsLoading(false);
      }
    }
    if (session?.user?.id) {
      load();
    }
    return () => {
      ignore = true;
    };
  }, [session?.user?.id]);

  // Load incoming contact requests when session available (requests to me as tutor)
  React.useEffect(() => {
    let ignore = false;
    async function load() {
      setIncomingLoading(true);
      setIncomingError(null);
      try {
        const data = await getIncomingContactRequestsAsTutor();
        if (!ignore) setIncomingRequests(data);
      } catch (e) {
        if (!ignore)
          setIncomingError(
            e instanceof Error ? e.message : "Failed to load incoming requests"
          );
      } finally {
        if (!ignore) setIncomingLoading(false);
      }
    }
    if (session?.user?.id) {
      load();
    }
    return () => {
      ignore = true;
    };
  }, [session?.user?.id]);

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.firstName || "User"}!
          </h1>
          <p className="text-gray-600">Learn and teach with ease</p>
        </div>
        <Link href="/crud-teacher">
          <Button>go to lessons</Button>
        </Link>
      </div>

      {/* Student Dashboard */}
      <Tabs defaultValue="teachers" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="teachers">teachers</TabsTrigger>
          <TabsTrigger value="students">students</TabsTrigger>
        </TabsList>

        <TabsContent value="teachers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {requests
                    ? requests.filter((r) => r.status === "approved").length
                    : 0}
                </div>
                <div className="text-sm text-gray-600">approved lessons</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {requests
                    ? requests.filter((r) => r.status === "pending").length
                    : 0}
                </div>
                <div className="text-sm text-gray-600">pending requests</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {requests ? requests.length : 0}
                </div>
                <div className="text-sm text-gray-600">total bookings</div>
              </CardContent>
            </Card>
          </div>

          {requestsLoading && (
            <div className="text-center text-sm text-gray-600">
              Loading requests...
            </div>
          )}
          {requestsError && (
            <div className="text-center text-sm text-red-600">
              {requestsError}
            </div>
          )}

          <div className="space-y-4">
            {(requests || []).map((req) => (
              <Card key={req.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={req.tutor?.image || "/placeholder.svg"}
                          alt={
                            req.tutor?.name || req.tutor?.firstName || "Tutor"
                          }
                        />
                        <AvatarFallback>
                          {(
                            req.tutor?.name ||
                            `${req.tutor?.firstName || ""}${
                              req.tutor?.lastName || ""
                            }` ||
                            "TU"
                          )
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {req.tutor?.name ||
                              `${req.tutor?.firstName || ""} ${
                                req.tutor?.lastName || ""
                              }`}
                          </h3>
                          <Badge
                            className={`${getStatusColor(req.status)} border`}
                          >
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(req.status)}
                              <span className="capitalize">{req.status}</span>
                            </div>
                          </Badge>
                        </div>

                        <p className="text-blue-600 font-medium mb-2">
                          {req.subject}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          {req.preferredDate && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(
                                  req.preferredDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {req.timeSlot && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {req.timeSlot} ({req.durationMinutes} min)
                              </span>
                            </div>
                          )}
                          {req.proposedPrice && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>${req.proposedPrice}/hr</span>
                            </div>
                          )}
                        </div>

                        {req.message && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">your message:</span>{" "}
                              {req.message}
                            </p>
                          </div>
                        )}

                        {req.wantsNegotiation && (
                          <Badge variant="secondary">Negotiated</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-48">
                      {req.status === "approved" && (
                        <>
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            join lesson
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            message tutor
                          </Button>
                        </>
                      )}
                      {req.status === "pending" && (
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          disabled
                        >
                          waiting for approval
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {incomingRequests
                    ? incomingRequests.filter((r) => r.status === "approved")
                        .length
                    : 0}
                </div>
                <div className="text-sm text-gray-600">approved lessons</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {incomingRequests
                    ? incomingRequests.filter((r) => r.status === "pending")
                        .length
                    : 0}
                </div>
                <div className="text-sm text-gray-600">pending requests</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {incomingRequests ? incomingRequests.length : 0}
                </div>
                <div className="text-sm text-gray-600">total requests</div>
              </CardContent>
            </Card>
          </div>

          {incomingLoading && (
            <div className="text-center text-sm text-gray-600">
              Loading incoming requests...
            </div>
          )}
          {incomingError && (
            <div className="text-center text-sm text-red-600">
              {incomingError}
            </div>
          )}

          <div className="space-y-4">
            {(incomingRequests || []).map((req) => (
              <Card key={req.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={req.student?.image || "/placeholder.svg"}
                          alt={
                            req.student?.name ||
                            req.student?.firstName ||
                            "Student"
                          }
                        />
                        <AvatarFallback>
                          {(
                            req.student?.name ||
                            `${req.student?.firstName || ""}${
                              req.student?.lastName || ""
                            }` ||
                            "ST"
                          )
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {req.student?.name ||
                              `${req.student?.firstName || ""} ${
                                req.student?.lastName || ""
                              }`}
                          </h3>
                          <Badge
                            className={`${getStatusColor(req.status)} border`}
                          >
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(req.status)}
                              <span className="capitalize">{req.status}</span>
                            </div>
                          </Badge>
                        </div>

                        <p className="text-blue-600 font-medium mb-2">
                          {req.subject}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          {req.preferredDate && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(
                                  req.preferredDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          {req.timeSlot && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {req.timeSlot} ({req.durationMinutes} min)
                              </span>
                            </div>
                          )}
                          {req.proposedPrice && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>${req.proposedPrice}/hr</span>
                            </div>
                          )}
                        </div>

                        {req.message && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">message:</span>{" "}
                              {req.message}
                            </p>
                          </div>
                        )}

                        {req.wantsNegotiation && (
                          <Badge variant="secondary">Negotiated</Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-48">
                      {req.status === "approved" && (
                        <>
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            join lesson
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            message student
                          </Button>
                        </>
                      )}
                      {req.status === "pending" && (
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          disabled
                        >
                          awaiting your approval
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
