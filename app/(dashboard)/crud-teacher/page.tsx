"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TeacherForm } from "@/components/teachers-form";
import { TeacherDetails } from "@/components/teachers-details";
import {
  createLesson,
  getLessons,
  Lesson,
  deleteLesson,
} from "@/lib/client/api/lesson";

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
  image?: string;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    async function loadLessons() {
      try {
        const lessons = await getLessons();
        const mappedTeachers: Teacher[] = lessons.map((lesson: Lesson) => ({
          id: lesson.id.toString(),
          name: lesson.fullName,
          email: lesson.email,
          subject: lesson.primarySubject,
          description: lesson.description,
          language: lesson.languages ?? [],
          awards: lesson.awards ?? [],
          certifications: lesson.certifications ?? [],
          education: lesson.education,
          hourlyRate: Number(lesson.hourlyRate),
          rating: 0,
          totalReviews: 0,
          yearsExperience: lesson.yearsExperience,
          availability: lesson.availability,
          location: lesson.location,
          verified: false,
          image: lesson.image || "",
        }));
        setTeachers(mappedTeachers);
      } catch (error) {
        console.error("Failed to fetch lessons", error);
      }
    }

    loadLessons();
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject =
      subjectFilter === "all" || teacher.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const subjects = Array.from(new Set(teachers.map((t) => t.subject)));

  const handleAddTeacher = async (teacherData: Omit<Teacher, "id">) => {
    try {
      const payload = {
        fullName: teacherData.name,
        email: teacherData.email,
        primarySubject: teacherData.subject,
        location: teacherData.location,
        description: teacherData.description,
        education: teacherData.education,
        yearsExperience: teacherData.yearsExperience,
        hourlyRate: teacherData.hourlyRate,
        availability: teacherData.availability,
        languages: teacherData.language,
        awards: teacherData.awards,
        certifications: teacherData.certifications,
        image: teacherData.image,
      };

      const { id } = await createLesson(payload);

      const newTeacher: Teacher = {
        ...teacherData,
        id: id.toString(),
      };

      setTeachers([...teachers, newTeacher]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to create lesson", error);
      alert(error instanceof Error ? error.message : "Failed to create lesson");
    }
  };

  const handleEditTeacher = (teacherData: Omit<Teacher, "id">) => {
    if (editingTeacher) {
      setTeachers(
        teachers.map((t) =>
          t.id === editingTeacher.id
            ? { ...teacherData, id: editingTeacher.id }
            : t
        )
      );
      setEditingTeacher(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    try {
      await deleteLesson(id);
      setTeachers(teachers.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete lesson", error);
      alert(error instanceof Error ? error.message : "Failed to delete lesson");
    }
  };

  const openEditForm = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsFormOpen(true);
  };

  const openDetails = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDetailsOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-charcoal-900 mb-2">
          Lesson Management
        </h1>
        <p className="text-charcoal-600">Manage lessons and students</p>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 h-4 w-4" />
          <Input
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-cream-300 focus:border-brown-500"
          />
        </div>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-cream-300">
            <Filter className="h-4 w-4" />
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTeacher(null)}>
              <Plus className="h-4 w-4" />
              add lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto min-w-5xl">
            <DialogHeader>
              <DialogTitle>
                {editingTeacher ? "Edit Lesson" : "Add New Lesson"}
              </DialogTitle>
              <DialogDescription>
                {editingTeacher
                  ? "Update lesson information and expertise"
                  : "Fill in the lesson's information and areas of expertise"}
              </DialogDescription>
            </DialogHeader>
            <TeacherForm
              teacher={editingTeacher}
              onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTeacher(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Teachers Table */}
      <Card className="bg-white border-cream-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-charcoal-900">
            Lessons ({filteredTeachers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-charcoal-700">Name</TableHead>
                <TableHead className="text-charcoal-700">Subject</TableHead>
                <TableHead className="text-charcoal-700">Languages</TableHead>
                <TableHead className="text-charcoal-700">Rate</TableHead>
                <TableHead className="text-charcoal-700">Rating</TableHead>
                <TableHead className="text-charcoal-700">Status</TableHead>
                <TableHead className="text-charcoal-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id} className="hover:bg-cream-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-charcoal-900">
                        {teacher.name}
                      </div>
                      <div className="text-sm text-charcoal-600">
                        {teacher.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-cream-200 text-charcoal-800"
                    >
                      {teacher.subject}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.language.slice(0, 2).map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                      {teacher.language.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{teacher.language.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-charcoal-900 font-medium">
                    ${teacher.hourlyRate}/hr
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-charcoal-900 font-medium">
                        {teacher.rating}
                      </span>
                      <span className="text-charcoal-600 text-sm">
                        ({teacher.totalReviews})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {teacher.verified && (
                        <Badge className="bg-brown-600 text-white text-xs">
                          Verified
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {teacher.availability}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDetails(teacher)}
                        className="text-charcoal-600 hover:text-charcoal-900"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditForm(teacher)}
                        className="text-charcoal-600 hover:text-charcoal-900"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Teacher Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-charcoal-900">
              Teacher Details
            </DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <TeacherDetails
              teacher={selectedTeacher}
              onClose={() => setIsDetailsOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
