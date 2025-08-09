"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  description: string;
  language: string[];
  awards: string[];
  certifications: string[];
  education: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  yearsExperience: number;
  availability: string;
  location: string;
  verified: boolean;
}

interface TeacherFormProps {
  teacher?: Teacher | null;
  onSubmit: (teacher: Omit<Teacher, "id">) => void | Promise<void>;
  onCancel: () => void;
}

const subjects = [
  "Mathematics",
  "English Literature",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Computer Science",
  "Piano",
  "Guitar",
  "Art",
  "Spanish",
  "French",
  "German",
  "Economics",
  "Psychology",
];

const availabilityOptions = [
  "Available today",
  "Available tomorrow",
  "Available this week",
  "Available next week",
  "By appointment only",
];

export function TeacherForm({ teacher, onSubmit, onCancel }: TeacherFormProps) {
  const [formData, setFormData] = useState({
    name: teacher?.name || "",
    email: teacher?.email || "",
    subject: teacher?.subject || "",
    description: teacher?.description || "",
    language: teacher?.language || [],
    awards: teacher?.awards || [],
    certifications: teacher?.certifications || [],
    education: teacher?.education || "",
    hourlyRate: teacher?.hourlyRate || 0,
    rating: teacher?.rating || 5.0,
    totalReviews: teacher?.totalReviews || 0,
    yearsExperience: teacher?.yearsExperience || 0,
    availability: teacher?.availability || "",
    location: teacher?.location || "",
    verified: teacher?.verified || false,
  });

  const [newLanguage, setNewLanguage] = useState("");
  const [newAward, setNewAward] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.language.includes(newLanguage.trim())) {
      setFormData({
        ...formData,
        language: [...formData.language, newLanguage.trim()],
      });
      setNewLanguage("");
    }
  };

  const removeLanguage = (lang: string) => {
    setFormData({
      ...formData,
      language: formData.language.filter((l) => l !== lang),
    });
  };

  const addAward = () => {
    if (newAward.trim() && !formData.awards.includes(newAward.trim())) {
      setFormData({
        ...formData,
        awards: [...formData.awards, newAward.trim()],
      });
      setNewAward("");
    }
  };

  const removeAward = (award: string) => {
    setFormData({
      ...formData,
      awards: formData.awards.filter((a) => a !== award),
    });
  };

  const addCertification = () => {
    if (
      newCertification.trim() &&
      !formData.certifications.includes(newCertification.trim())
    ) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, newCertification.trim()],
      });
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((c) => c !== cert),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-white focus:border-brown-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-white focus:border-brown-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Primary Subject</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) =>
                  setFormData({ ...formData, subject: value })
                }
              >
                <SelectTrigger className="bg-white w-full">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="bg-white focus:border-brown-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-white focus:border-brown-500 min-h-[100px]"
              placeholder="Describe your teaching experience and expertise..."
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Languages */}
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Add a language..."
              className="bg-white focus:border-brown-500"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addLanguage())
              }
            />
            <Button type="button" onClick={addLanguage}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.language.map((lang) => (
              <Badge
                key={lang}
                variant="secondary"
                className="text-charcoal-800"
              >
                {lang}
                <button
                  type="button"
                  onClick={() => removeLanguage(lang)}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Awards */}
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle>Awards & Recognition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newAward}
              onChange={(e) => setNewAward(e.target.value)}
              placeholder="Add an award or recognition..."
              className="bg-white focus:border-brown-500"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addAward())
              }
            />
            <Button type="button" onClick={addAward}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.awards.map((award) => (
              <Badge
                key={award}
                variant="secondary"
                className="text-charcoal-800"
              >
                {award}
                <button
                  type="button"
                  onClick={() => removeAward(award)}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              placeholder="Add a certification..."
              className="bg-white focus:border-brown-500"
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addCertification())
              }
            />
            <Button type="button" onClick={addCertification}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.certifications.map((cert) => (
              <Badge
                key={cert}
                variant="secondary"
                className="text-charcoal-800"
              >
                {cert}
                <button
                  type="button"
                  onClick={() => removeCertification(cert)}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education & Experience */}
      <Card className="shadow-xs">
        <CardHeader>
          <CardTitle>Education & Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              value={formData.education}
              onChange={(e) =>
                setFormData({ ...formData, education: e.target.value })
              }
              className="bg-white focus:border-brown-500"
              placeholder="Describe your educational background..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Input
                id="yearsExperience"
                type="number"
                min="0"
                value={formData.yearsExperience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    yearsExperience: parseInt(e.target.value) || 0,
                  })
                }
                className="bg-white focus:border-brown-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (IDR)</Label>
              <Input
                id="hourlyRate"
                type="number"
                min="0"
                step="0.01"
                value={formData.hourlyRate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hourlyRate: parseFloat(e.target.value) || 0,
                  })
                }
                className="bg-white focus:border-brown-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Select
                value={formData.availability}
                onValueChange={(value) =>
                  setFormData({ ...formData, availability: value })
                }
              >
                <SelectTrigger className="bg-white w-full">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          cancel
        </Button>
        <Button type="submit">
          {teacher ? "update lesson" : "add lesson"}
        </Button>
      </div>
    </form>
  );
}
