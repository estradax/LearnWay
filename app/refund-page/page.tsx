"use client"

import { useState } from "react"
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    Calendar,
    DollarSign,
    CreditCard,
    Menu,
    X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function RefundPage() {
    const [selectedOrder, setSelectedOrder] = useState("")
    const [refundReason, setRefundReason] = useState("")
    const [description, setDescription] = useState("")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const recentOrders = [
        {
            id: "ORD-2024-001",
            tutor: "Sarah Johnson",
            subject: "Mathematics",
            date: "1/15/2024",
            amount: "$25.00",
            status: "completed",
        },
        {
            id: "ORD-2024-002",
            tutor: "Michael Chen",
            subject: "Physics",
            date: "1/12/2024",
            amount: "$30.00",
            status: "completed",
        },
        {
            id: "ORD-2024-003",
            tutor: "Emma Wilson",
            subject: "Chemistry",
            date: "1/10/2024",
            amount: "$28.00",
            status: "completed",
        },
    ]

    const refundRequests = [
        {
            id: "REF-001",
            orderId: "ORD-2024-005",
            amount: "$25.00",
            status: "approved",
            date: "1/8/2024",
            reason: "Tutor cancelled session",
        },
        {
            id: "REF-002",
            orderId: "ORD-2024-007",
            amount: "$30.00",
            status: "pending",
            date: "1/5/2024",
            reason: "Technical issues during lesson",
        },
        {
            id: "REF-003",
            orderId: "ORD-2024-009",
            amount: "$22.00",
            status: "rejected",
            date: "1/3/2024",
            reason: "Lesson completed successfully",
        },
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "approved":
                return <CheckCircle className="w-4 h-4 text-green-600" />
            case "pending":
                return <Clock className="w-4 h-4 text-orange-500" />
            case "rejected":
                return <XCircle className="w-4 h-4 text-red-500" />
            default:
                return <AlertCircle className="w-4 h-4 text-gray-500" />
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800 border-green-200"
            case "pending":
                return "bg-orange-100 text-orange-800 border-orange-200"
            case "rejected":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#F5F5DC" }}>
            {/* Header */}
            <header className="border-b border-orange-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 p-1 sm:p-2">
                                <ArrowLeft className="w-4 h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Back to Dashboard</span>
                            </Button>
                            <div className="hidden sm:block h-6 w-px bg-gray-300" />
                            <h1 className="text-xl sm:text-2xl font-bold text-orange-600">LearnWay</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                                find tutors
                            </a>
                            <a href="#" className="text-orange-600 font-medium">
                                refunds
                            </a>
                            <div className="flex items-center gap-4 ml-6">
                                <span className="text-gray-600">nanda</span>
                                <Button variant="ghost" size="sm" className="text-gray-600">
                                    Sign out
                                </Button>
                            </div>
                        </nav>

                        {/* Mobile Menu Button */}
                        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 border-t border-orange-200 pt-4">
                            <nav className="flex flex-col space-y-3">
                                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors py-2">
                                    find tutors
                                </a>
                                <a href="#" className="text-orange-600 font-medium py-2">
                                    refunds
                                </a>
                                <div className="flex items-center justify-between pt-2 border-t border-orange-200">
                                    <span className="text-gray-600">nanda</span>
                                    <Button variant="ghost" size="sm" className="text-gray-600">
                                        Sign out
                                    </Button>
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8">
                {/* Welcome Section */}
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Refund Center</h2>
                    <p className="text-sm sm:text-base text-gray-600">
                        Request refunds for your lessons and track existing refund requests
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Cards - Mobile Only */}
                        <div className="grid grid-cols-3 gap-3 lg:hidden">
                            <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-3 text-center">
                                    <div className="text-lg sm:text-xl font-bold text-green-600 mb-1">2</div>
                                    <div className="text-xs text-gray-600">approved</div>
                                </CardContent>
                            </Card>
                            <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-3 text-center">
                                    <div className="text-lg sm:text-xl font-bold text-orange-600 mb-1">1</div>
                                    <div className="text-xs text-gray-600">pending</div>
                                </CardContent>
                            </Card>
                            <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-3 text-center">
                                    <div className="text-lg sm:text-xl font-bold text-blue-600 mb-1">$55</div>
                                    <div className="text-xs text-gray-600">refunded</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Refund Request Form */}
                        <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-gray-800 flex items-center gap-2 text-lg sm:text-xl">
                                    <DollarSign className="w-5 h-5 text-orange-600" />
                                    Request Refund
                                </CardTitle>
                                <CardDescription className="text-gray-600 text-sm">
                                    Submit a refund request for a completed lesson
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 sm:space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="order" className="text-gray-700 font-medium text-sm">
                                        Select Order
                                    </Label>
                                    <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                                        <SelectTrigger className="border-orange-200 focus:border-orange-400 h-11">
                                            <SelectValue placeholder="Choose an order to refund" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {recentOrders.map((order) => (
                                                <SelectItem key={order.id} value={order.id}>
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                                                        <span className="text-sm">
                                                            {order.id} - {order.subject}
                                                        </span>
                                                        <span className="text-green-600 font-medium text-sm">{order.amount}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reason" className="text-gray-700 font-medium text-sm">
                                        Reason for Refund
                                    </Label>
                                    <Select value={refundReason} onValueChange={setRefundReason}>
                                        <SelectTrigger className="border-orange-200 focus:border-orange-400 h-11">
                                            <SelectValue placeholder="Select a reason" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tutor-cancelled">Tutor cancelled the session</SelectItem>
                                            <SelectItem value="technical-issues">Technical issues during lesson</SelectItem>
                                            <SelectItem value="poor-quality">Poor lesson quality</SelectItem>
                                            <SelectItem value="no-show">Tutor didn't show up</SelectItem>
                                            <SelectItem value="other">Other reason</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-gray-700 font-medium text-sm">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Please provide additional details about your refund request..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="border-orange-200 focus:border-orange-400 min-h-[80px] sm:min-h-[100px] text-sm"
                                    />
                                </div>

                                <Button
                                    className="w-full bg-green-600 hover:bg-green-700 text-white h-11"
                                    disabled={!selectedOrder || !refundReason}
                                >
                                    Submit Refund Request
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Refund Policy */}
                        <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-gray-800 flex items-center gap-2 text-lg">
                                    <AlertCircle className="w-5 h-5 text-orange-600" />
                                    Refund Policy
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-gray-600">
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Eligible for Full Refund:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
                                        <li>Tutor cancels within 2 hours of scheduled lesson</li>
                                        <li>Technical issues prevent lesson completion</li>
                                        <li>Tutor fails to show up for scheduled session</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Processing Time:</h4>
                                    <p className="text-xs sm:text-sm">
                                        Refund requests are typically processed within 3-5 business days. Approved refunds will be credited
                                        back to your original payment method.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Desktop Only */}
                    <div className="hidden lg:block space-y-6">
                        {/* Stats Cards */}
                        <div className="grid gap-4">
                            <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-green-600 mb-1">2</div>
                                    <div className="text-sm text-gray-600">approved refunds</div>
                                </CardContent>
                            </Card>
                            <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-orange-600 mb-1">1</div>
                                    <div className="text-sm text-gray-600">pending requests</div>
                                </CardContent>
                            </Card>
                            <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600 mb-1">$55</div>
                                    <div className="text-sm text-gray-600">total refunded</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Orders */}
                        <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-gray-800 text-lg">Recent Orders</CardTitle>
                                <CardDescription className="text-gray-600">Your completed lessons</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="p-3 rounded-lg border border-orange-100 bg-orange-50/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-gray-800 text-sm">{order.subject}</span>
                                            <span className="text-green-600 font-medium text-sm">{order.amount}</span>
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            <div>{order.tutor}</div>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Calendar className="w-3 h-3" />
                                                {order.date}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Refund History */}
                <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm mt-6 sm:mt-8">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-gray-800 flex items-center gap-2 text-lg sm:text-xl">
                            <CreditCard className="w-5 h-5 text-orange-600" />
                            Refund History
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-sm">
                            Track the status of your refund requests
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {refundRequests.map((request) => (
                                <div key={request.id} className="p-3 sm:p-4 rounded-lg border border-orange-100 bg-orange-50/30">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <span className="font-medium text-gray-800 text-sm">{request.orderId}</span>
                                            <Badge className={`${getStatusColor(request.status)} text-xs`}>
                                                <div className="flex items-center gap-1">
                                                    {getStatusIcon(request.status)}
                                                    {request.status}
                                                </div>
                                            </Badge>
                                        </div>
                                        <span className="font-medium text-green-600 text-sm">{request.amount}</span>
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-600">
                                        <div className="mb-1">Reason: {request.reason}</div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            Requested on {request.date}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Orders - Mobile Only */}
                <Card className="border-orange-200 shadow-sm bg-white/80 backdrop-blur-sm mt-6 lg:hidden">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-gray-800 text-lg">Recent Orders</CardTitle>
                        <CardDescription className="text-gray-600 text-sm">Your completed lessons</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="p-3 rounded-lg border border-orange-100 bg-orange-50/50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-800 text-sm">{order.subject}</span>
                                    <span className="text-green-600 font-medium text-sm">{order.amount}</span>
                                </div>
                                <div className="text-xs text-gray-600">
                                    <div>{order.tutor}</div>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Calendar className="w-3 h-3" />
                                        {order.date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
