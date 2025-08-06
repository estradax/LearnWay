"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  BookOpen,
  User,
  GraduationCap,
  Upload,
  X,
  FileText,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: User Type, 2: Basic Info, 3: Additional Info
  const [userType, setUserType] = useState<"student" | "teacher" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    // Student specific
    interests: [] as string[],
    learningGoals: "",
    // Teacher specific
    subjects: [] as string[],
    description: "",
    education: "",
    experience: "",
    hourlyRate: "",
    teachingExperience: "",
    certifications: "",
  });

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
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (
    field: "interests" | "subjects",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration submitted:", {
      userType,
      formData,
      uploadedFiles: uploadedFiles.map((f) => f.name),
    });
    // Here you would typically send the data to your backend
    // Redirect to dashboard or verification page
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
      return <ImageIcon className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join LearnWay
          </h1>
          <p className="text-gray-600">
            Create your account and start your learning journey
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-18 h-1 mx-2 ${
                      currentStep > step ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              step {currentStep} of 3
            </span>
          </div>
        </div>

        <Card className="shadow-xs border bg-card">
          <CardContent className="p-8">
            {/* Step 1: User Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Choose your role
                  </h2>
                  <p className="text-gray-600">
                    How would you like to use LearnWay?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-sm shadow-xs ${
                      userType === "student"
                        ? "ring-2 ring-primary bg-primary/10"
                        : "hover:bg-white-50"
                    }`}
                    onClick={() => setUserType("student")}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        I'm a student
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Looking for tutors to help me learn new skills and
                        improve my knowledge
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-sm shadow-xs ${
                      userType === "teacher"
                        ? "ring-2 ring-primary bg-primary/10"
                        : "hover:bg-white-50"
                    }`}
                    onClick={() => setUserType("teacher")}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        I'm a teacher
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Ready to share my expertise and help students achieve
                        their learning goals
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-between">
                  <Link href="/login">
                    <Button variant="outline" className="bg-transparent">
                      back to login
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!userType}
                  >
                    continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Basic Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Basic Information
                  </h2>
                  <p className="text-gray-600">Tell us about yourself</p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="firstName"
                        className="text-sm font-medium text-gray-700"
                      >
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="John"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="lastName"
                        className="text-sm font-medium text-gray-700"
                      >
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Doe"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your.email@learnway.com"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700"
                      >
                        Password *
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          placeholder="Create a strong password"
                          className="pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700"
                      >
                        Confirm Password *
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          placeholder="Confirm your password"
                          className="pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+62 812 3456 7890"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="location"
                        className="text-sm font-medium text-gray-700"
                      >
                        Location *
                      </Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        placeholder="Jakarta, Indonesia"
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                </form>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="bg-transparent"
                  >
                    back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)}>continue</Button>
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {userType === "student"
                      ? "Learning Preferences"
                      : "Teaching Profile"}
                  </h2>
                  <p className="text-gray-600">
                    {userType === "student"
                      ? "Help us personalize your learning experience"
                      : "Tell us about your teaching expertise"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student-specific fields */}
                  {userType === "student" && (
                    <>
                      <div>
                        <Label className="text-base font-medium mb-3 block">
                          What subjects are you interested in? *
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-3 border rounded-lg bg-card">
                          {subjects.map((subject) => (
                            <div
                              key={subject}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`interest-${subject}`}
                                checked={formData.interests.includes(subject)}
                                onCheckedChange={() =>
                                  handleArrayToggle("interests", subject)
                                }
                              />
                              <Label
                                htmlFor={`interest-${subject}`}
                                className="text-sm"
                              >
                                {subject}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Select subjects you're interested in learning (minimum
                          1 required)
                        </p>
                      </div>

                      <div>
                        <Label
                          htmlFor="learningGoals"
                          className="text-sm font-medium text-gray-700"
                        >
                          Learning Goals
                        </Label>
                        <Textarea
                          id="learningGoals"
                          value={formData.learningGoals}
                          onChange={(e) =>
                            handleInputChange("learningGoals", e.target.value)
                          }
                          placeholder="Tell us about your learning goals and what you hope to achieve..."
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                    </>
                  )}

                  {/* Teacher-specific fields */}
                  {userType === "teacher" && (
                    <>
                      <div>
                        <Label className="text-base font-medium mb-3 block">
                          What subjects can you teach? *
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-3 border rounded-lg bg-card">
                          {subjects.map((subject) => (
                            <div
                              key={subject}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`subject-${subject}`}
                                checked={formData.subjects.includes(subject)}
                                onCheckedChange={() =>
                                  handleArrayToggle("subjects", subject)
                                }
                              />
                              <Label
                                htmlFor={`subject-${subject}`}
                                className="text-sm"
                              >
                                {subject}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Select all subjects you can teach (minimum 1 required)
                        </p>
                      </div>

                      <div>
                        <Label
                          htmlFor="description"
                          className="text-sm font-medium text-gray-700"
                        >
                          Teaching Description *
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="Describe your teaching style, approach, and what makes you a great tutor..."
                          rows={4}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="education"
                          className="text-sm font-medium text-gray-700"
                        >
                          Education Background *
                        </Label>
                        <Textarea
                          id="education"
                          value={formData.education}
                          onChange={(e) =>
                            handleInputChange("education", e.target.value)
                          }
                          placeholder="List your educational qualifications, degrees, certifications..."
                          rows={3}
                          className="mt-1"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="teachingExperience"
                            className="text-sm font-medium text-gray-700"
                          >
                            Teaching Experience *
                          </Label>
                          <Select
                            value={formData.teachingExperience}
                            onValueChange={(value) =>
                              handleInputChange("teachingExperience", value)
                            }
                          >
                            <SelectTrigger className="mt-1 w-full">
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-1">
                                Less than 1 year
                              </SelectItem>
                              <SelectItem value="1-2">1-2 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-10">5-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label
                            htmlFor="hourlyRate"
                            className="text-sm font-medium text-gray-700"
                          >
                            Hourly Rate (IDR) *
                          </Label>
                          <Input
                            id="hourlyRate"
                            type="number"
                            value={formData.hourlyRate}
                            onChange={(e) =>
                              handleInputChange("hourlyRate", e.target.value)
                            }
                            placeholder="25"
                            min="10"
                            max="200"
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="experience"
                          className="text-sm font-medium text-gray-700"
                        >
                          Additional Experience
                        </Label>
                        <Textarea
                          id="experience"
                          value={formData.experience}
                          onChange={(e) =>
                            handleInputChange("experience", e.target.value)
                          }
                          placeholder="Any additional relevant experience, achievements, or qualifications..."
                          rows={3}
                          className="mt-1"
                        />
                      </div>

                      {/* File Upload Section */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">
                          Certifications & Diplomas
                        </Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors flex flex-col items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Upload your certificates, diplomas, or other
                            credentials
                          </p>
                          <p className="text-xs text-gray-500 mb-4">
                            Supported formats: PDF, JPG, PNG (max 5MB each)
                          </p>
                          <input
                            type="file"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                          />
                          <Label htmlFor="file-upload">
                            <Button
                              type="button"
                              variant="outline"
                              className="bg-transparent"
                            >
                              choose files
                            </Button>
                          </Label>
                        </div>

                        {/* Uploaded Files Display */}
                        {uploadedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Uploaded Files:
                            </Label>
                            {uploadedFiles.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                              >
                                <div className="flex items-center space-x-2">
                                  {getFileIcon(file.name)}
                                  <span className="text-sm text-gray-700">
                                    {file.name}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </Badge>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:text-primary/90"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:text-primary/90"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="bg-transparent"
                    >
                      back
                    </Button>
                    <Button
                      type="submit"
                      className={`text-white ${
                        userType === "student"
                          ? "bg-primary hover:bg-primary/90"
                          : "bg-primary hover:bg-primary/90"
                      }`}
                    >
                      create {userType} account
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/90 font-medium"
            >
              sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
