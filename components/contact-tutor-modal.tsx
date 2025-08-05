"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { CalendarIcon, DollarSign, X, MessageCircle, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"
import ChatSystem from "@/components/chat-system"

interface ContactTutorModalProps {
  tutor: any
  isOpen: boolean
  onClose: () => void
}

export default function ContactTutorModal({ tutor, isOpen, onClose }: ContactTutorModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [proposedPrice, setProposedPrice] = useState([tutor?.price || 25])
  const [showPriceNegotiation, setShowPriceNegotiation] = useState(false)
  const [contactStep, setContactStep] = useState(1) // 1: Contact Form, 2: Price Negotiation, 3: Confirmation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: tutor?.subject || "",
    duration: "60",
    timeSlot: "",
    message: "",
    priceReason: "",
  })

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "07:00 PM", "08:00 PM"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitContact = () => {
    if (showPriceNegotiation) {
      setContactStep(2)
    } else {
      setContactStep(3)
    }
  }

  const handleSubmitPriceNegotiation = () => {
    setContactStep(3)
  }

  const handleFinalSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Final submission:", {
      tutor: tutor.id,
      formData,
      proposedPrice: proposedPrice[0],
      selectedDate,
      showPriceNegotiation,
    })
    onClose()
    // Show success message or redirect
  }

  if (!tutor) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Contact Tutor</DialogTitle>
          <Button variant="ghost" size="sm" className="absolute right-4 top-4 rounded-full" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="p-6">
          {/* Tutor Info Header */}
          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <img
              src={tutor.image || "/placeholder.svg"}
              alt={tutor.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{tutor.name}</h3>
              <p className="text-blue-600 font-medium">{tutor.subject}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${tutor.price}/hr</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{tutor.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Step 1: Contact Form */}
          {contactStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact {tutor.name}</h2>
                <p className="text-gray-600">Fill out the form below to get in touch with your tutor</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+62 xxx xxxx xxxx"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {tutor.subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Lesson Duration</Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="timeSlot">Preferred Time</Label>
                  <Select value={formData.timeSlot} onValueChange={(value) => handleInputChange("timeSlot", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell the tutor about your learning goals, current level, or any specific requirements..."
                  rows={4}
                />
              </div>

              {/* Price Negotiation Option */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                    <span>Price Negotiation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="checkbox"
                      id="priceNegotiation"
                      checked={showPriceNegotiation}
                      onChange={(e) => setShowPriceNegotiation(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="priceNegotiation" className="text-sm font-medium">
                      I'd like to negotiate the price (Current: ${tutor.price}/hr)
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">
                    Many tutors are open to discussing pricing based on your budget and lesson frequency.
                  </p>
                </CardContent>
              </Card>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button onClick={handleSubmitContact} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {showPriceNegotiation ? "Continue to Price Discussion" : "Send Message"}
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Price Negotiation */}
          {contactStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Price Negotiation</h2>
                <p className="text-gray-600">Suggest a price that works for your budget</p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-sm text-gray-600 mb-2">Current Price</div>
                    <div className="text-3xl font-bold text-gray-400 line-through">${tutor.price}/hr</div>
                    <div className="text-sm text-gray-600 mt-4 mb-2">Your Proposed Price</div>
                    <div className="text-4xl font-bold text-blue-600">${proposedPrice[0]}/hr</div>
                  </div>

                  <div className="space-y-4">
                    <Label>Adjust your proposed price</Label>
                    <Slider
                      value={proposedPrice}
                      onValueChange={setProposedPrice}
                      max={tutor.price}
                      min={Math.max(10, Math.floor(tutor.price * 0.5))}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${Math.max(10, Math.floor(tutor.price * 0.5))}</span>
                      <span>${tutor.price}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="priceReason">Why this price? (Optional)</Label>
                    <Textarea
                      id="priceReason"
                      value={formData.priceReason}
                      onChange={(e) => handleInputChange("priceReason", e.target.value)}
                      placeholder="Explain your budget constraints, lesson frequency, or other factors..."
                      rows={3}
                    />
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Tip:</strong> Tutors are more likely to accept lower rates for regular, long-term students
                      or multiple lessons per week.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setContactStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleSubmitPriceNegotiation} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Submit Price Proposal
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {contactStep === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h2>
                <p className="text-gray-600">Your request has been sent to {tutor.name}</p>
              </div>

              <Card className="text-left">
                <CardHeader>
                  <CardTitle className="text-lg">Request Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tutor:</span>
                    <span className="font-medium">{tutor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-medium">{formData.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{formData.duration} minutes</span>
                  </div>
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preferred Date:</span>
                      <span className="font-medium">{format(selectedDate, "PPP")}</span>
                    </div>
                  )}
                  {formData.timeSlot && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preferred Time:</span>
                      <span className="font-medium">{formData.timeSlot}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">
                      {showPriceNegotiation ? (
                        <>
                          <span className="line-through text-gray-400">${tutor.price}</span> ${proposedPrice[0]}/hr
                          <Badge variant="secondary" className="ml-2">
                            Negotiated
                          </Badge>
                        </>
                      ) : (
                        `$${tutor.price}/hr`
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-800 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">What happens next?</span>
                </div>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li>• {tutor.name} will review your request</li>
                  <li>• You'll receive a response within 24 hours</li>
                  {showPriceNegotiation && <li>• The tutor will consider your price proposal</li>}
                  <li>• Once accepted, you can schedule your first lesson</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <ChatSystem
                  currentUserId={1}
                  currentUserType="student"
                  triggerButton={
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      message tutor
                    </Button>
                  }
                />
                <Button onClick={handleFinalSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
