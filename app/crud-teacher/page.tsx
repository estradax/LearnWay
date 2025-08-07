"use client"

import { useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TeacherForm } from "@/components/teachers-form"
import { TeacherDetails } from "@/components/teachers-details"

interface Teacher {
    id: string
    name: string
    email: string
    subject: string
    description: string
    language: string[]
    awards: string[]
    certifications: string[]
    education: string
    hourlyRate: number
    rating: number
    totalReviews: number
    yearsExperience: number
    availability: string
    location: string
    verified: boolean
}

const mockTeachers: Teacher[] = [
    {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        subject: "Mathematics",
        description: "Experienced math tutor specializing in high school and college level mathematics.",
        language: ["English", "Spanish"],
        awards: ["Excellence in Teaching Award 2023", "Math Department Recognition"],
        certifications: ["Certified Math Teacher", "Advanced Calculus Certification"],
        education: "Master's in Mathematics, Stanford University",
        hourlyRate: 25,
        rating: 4.9,
        totalReviews: 127,
        yearsExperience: 5,
        availability: "Available today",
        location: "Jakarta",
        verified: true,
    },
    {
        id: "2",
        name: "David Chen",
        email: "david.chen@email.com",
        subject: "English Literature",
        description: "Native English speaker with expertise in literature and creative writing.",
        language: ["English", "Mandarin"],
        awards: ["Literary Excellence Award", "Creative Writing Recognition"],
        certifications: ["TESOL Certified", "Creative Writing Certificate"],
        education: "PhD in English Literature, Harvard University",
        hourlyRate: 30,
        rating: 4.8,
        totalReviews: 89,
        yearsExperience: 3,
        availability: "Available tomorrow",
        location: "Surabaya",
        verified: true,
    },
    {
        id: "3",
        name: "Maria Santos",
        email: "maria.santos@email.com",
        subject: "Piano",
        description: "Professional pianist offering lessons for all skill levels and ages.",
        language: ["English", "Portuguese", "Spanish"],
        awards: ["Regional Piano Competition Winner", "Music Excellence Award"],
        certifications: ["Royal Academy of Music Certificate", "Piano Performance Diploma"],
        education: "Bachelor of Music, Berklee College of Music",
        hourlyRate: 35,
        rating: 5.0,
        totalReviews: 45,
        yearsExperience: 7,
        availability: "Available this week",
        location: "Bandung",
        verified: true,
    },
]

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers)
    const [searchTerm, setSearchTerm] = useState("")
    const [subjectFilter, setSubjectFilter] = useState("all")
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)

    const filteredTeachers = teachers.filter((teacher) => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesSubject = subjectFilter === "all" || teacher.subject === subjectFilter
        return matchesSearch && matchesSubject
    })

    const subjects = Array.from(new Set(teachers.map(t => t.subject)))

    const handleAddTeacher = (teacherData: Omit<Teacher, "id">) => {
        const newTeacher: Teacher = {
            ...teacherData,
            id: Date.now().toString(),
        }
        setTeachers([...teachers, newTeacher])
        setIsFormOpen(false)
    }

    const handleEditTeacher = (teacherData: Omit<Teacher, "id">) => {
        if (editingTeacher) {
            setTeachers(teachers.map(t =>
                t.id === editingTeacher.id
                    ? { ...teacherData, id: editingTeacher.id }
                    : t
            ))
            setEditingTeacher(null)
            setIsFormOpen(false)
        }
    }

    const handleDeleteTeacher = (id: string) => {
        setTeachers(teachers.filter(t => t.id !== id))
    }

    const openEditForm = (teacher: Teacher) => {
        setEditingTeacher(teacher)
        setIsFormOpen(true)
    }

    const openDetails = (teacher: Teacher) => {
        setSelectedTeacher(teacher)
        setIsDetailsOpen(true)
    }

    return (
        <div className="min-h-screen bg-cream-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-charcoal-900 mb-2">Teacher Management</h1>
                    <p className="text-charcoal-600">Manage teacher profiles and expertise</p>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 h-4 w-4" />
                        <Input
                            placeholder="Search teachers or subjects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-white border-cream-300 focus:border-brown-500"
                        />
                    </div>
                    <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                        <SelectTrigger className="w-full sm:w-48 bg-white border-cream-300">
                            <Filter className="h-4 w-4 mr-2" />
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
                            <Button
                                className="bg-brown-600 hover:bg-brown-700 text-white"
                                onClick={() => setEditingTeacher(null)}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Teacher
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-charcoal-900">
                                    {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingTeacher
                                        ? "Update teacher information and expertise"
                                        : "Fill in the teacher's information and areas of expertise"
                                    }
                                </DialogDescription>
                            </DialogHeader>
                            <TeacherForm
                                teacher={editingTeacher}
                                onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
                                onCancel={() => {
                                    setIsFormOpen(false)
                                    setEditingTeacher(null)
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Teachers Table */}
                <Card className="bg-white border-cream-300 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-charcoal-900">
                            Teachers ({filteredTeachers.length})
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
                                                <div className="font-medium text-charcoal-900">{teacher.name}</div>
                                                <div className="text-sm text-charcoal-600">{teacher.email}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-cream-200 text-charcoal-800">
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
                                                <span className="text-charcoal-900 font-medium">{teacher.rating}</span>
                                                <span className="text-charcoal-600 text-sm">({teacher.totalReviews})</span>
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
                            <DialogTitle className="text-charcoal-900">Teacher Details</DialogTitle>
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
        </div>
    )
}
