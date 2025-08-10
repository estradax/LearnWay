"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, GraduationCap, X, Eye, EyeOff } from "lucide-react"

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register" | "register-type">("login")
  const [userType, setUserType] = useState<"student" | "tutor" | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    // Student specific
    interests: [] as string[],
    learningGoals: "",
    // Tutor specific
    subjects: [] as string[],
    description: "",
    education: "",
    experience: "",
    hourlyRate: "",
    teachingExperience: "",
  })

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Literature",
    "History",
    "Geography",
    "Economics",
    "Computer Science",
    "Programming",
    "Piano",
    "Guitar",
    "Violin",
    "Art",
    "Photography",
    "Languages",
    "French",
    "Spanish",
    "Mandarin",
    "Japanese",
    "Korean",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field: "interests" | "subjects", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", { authMode, userType, formData })
    setIsOpen(false)
    // Reset form or redirect user
  }

  const resetForm = () => {
    setAuthMode("login")
    setUserType(null)
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      location: "",
      interests: [],
      learningGoals: "",
      subjects: [],
      description: "",
      education: "",
      experience: "",
      hourlyRate: "",
      teachingExperience: "",
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <div className="flex items-center space-x-3">
          <Button variant="ghost">
            Sign In
          </Button>
          <Button className="rounded-full px-6">Sign Up</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Authentication</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="p-6">
          {/* Login Form */}
          {authMode === "login" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p>Sign in to your TutorHome account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label htmlFor="remember" className="text-sm">
                      Remember me
                    </label>
                  </div>
                  <Button variant="link" className="text-sm p-0">
                    Forgot password?
                  </Button>
                </div>

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>

              <div className="text-center">
                <p>
                  Don&apos;t have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => setAuthMode("register-type")}
                  >
                    Sign up here
                  </Button>
                </p>
              </div>
            </div>
          )}

          {/* Registration Type Selection */}
          {authMode === "register-type" && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Join TutorHome</h2>
                <p>Choose how you&apos;d like to get started</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    userType === "student" ? "ring-2" : ""
                  }`}
                  onClick={() => setUserType("student")}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">I&apos;m a Student</h3>
                    <p className="text-sm">
                      Looking for tutors to help me learn new skills and improve my knowledge
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    userType === "tutor" ? "ring-2" : ""
                  }`}
                  onClick={() => setUserType("tutor")}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">I&apos;m a Tutor</h3>
                    <p className="text-sm">
                      Ready to share my expertise and help students achieve their learning goals
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setAuthMode("login")} className="flex-1">
                  Back to Login
                </Button>
                <Button
                  onClick={() => setAuthMode("register")}
                  disabled={!userType}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Registration Form */}
          {authMode === "register" && userType && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">
                  Create Your {userType === "student" ? "Student" : "Tutor"} Account
                </h2>
                <p>Fill in your details to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">first name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">last name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">email address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Create a strong password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">confirm password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">phone number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+62 xxx xxxx xxxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Jakarta, Indonesia"
                      required
                    />
                  </div>
                </div>

                {/* Student-specific fields */}
                {userType === "student" && (
                  <>
                    <div>
                      <Label className="text-base font-medium mb-3 block">What subjects are you interested in? *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                        {subjects.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                              id={`interest-${subject}`}
                              checked={formData.interests.includes(subject)}
                              onCheckedChange={() => handleArrayToggle("interests", subject)}
                            />
                            <label htmlFor={`interest-${subject}`} className="text-sm">
                              {subject}
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs mt-2">
                        Select subjects you&apos;re interested in learning (minimum 1 required)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="learningGoals">learning goals</Label>
                      <Textarea
                        id="learningGoals"
                        value={formData.learningGoals}
                        onChange={(e) => handleInputChange("learningGoals", e.target.value)}
                        placeholder="Tell us about your learning goals and what you hope to achieve..."
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {/* Tutor-specific fields */}
                {userType === "tutor" && (
                  <>
                    <div>
                      <Label className="text-base font-medium mb-3 block">What subjects can you teach? *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                        {subjects.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subject-${subject}`}
                              checked={formData.subjects.includes(subject)}
                              onCheckedChange={() => handleArrayToggle("subjects", subject)}
                            />
                            <label htmlFor={`subject-${subject}`} className="text-sm">
                              {subject}
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs mt-2">
                        Select all subjects you can teach (minimum 1 required)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="description">teaching description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe your teaching style, approach, and what makes you a great tutor..."
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="education">education background *</Label>
                      <Textarea
                        id="education"
                        value={formData.education}
                        onChange={(e) => handleInputChange("education", e.target.value)}
                        placeholder="List your educational qualifications, degrees, certifications..."
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="teachingExperience">teaching experience *</Label>
                        <Select
                          value={formData.teachingExperience}
                          onValueChange={(value) => handleInputChange("teachingExperience", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-1">Less than 1 year</SelectItem>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="hourlyRate">hourly rate (usd) *</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          value={formData.hourlyRate}
                          onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                          placeholder="25"
                          min="10"
                          max="200"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="experience">additional experience</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        placeholder="Any additional relevant experience, achievements, or qualifications..."
                        rows={3}
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Button variant="link" className="p-0 h-auto">
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="p-0 h-auto">
                      Privacy Policy
                    </Button>
                  </label>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setAuthMode("register-type")} className="flex-1">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    Create {userType === "student" ? "Student" : "Tutor"} Account
                  </Button>
                </div>
              </form>

              <div className="text-center">
                <p>
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => setAuthMode("login")}
                  >
                    Sign in here
                  </Button>
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
