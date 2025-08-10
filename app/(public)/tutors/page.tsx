"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Star,
  MapPin,
  Clock,
  BookOpen,
  SlidersHorizontal,
  Check,
} from "lucide-react";
import TutorProfileModal from "@/components/tutor-profile-modal";
import ContactTutorModal from "@/components/contact-tutor-modal";
import { getFeaturedLessons, FeaturedLesson } from "@/lib/client/api/lesson";
import Image from "next/image";
import { useSession } from "@/lib/client/auth";

export default function TutorsPage() {
  const { data: session } = useSession();
  const [priceRange, setPriceRange] = useState([10, 100]);
  const [showFilters, setShowFilters] = useState(false);

  type TutorUI = {
    id: number;
    userId: string;
    name: string;
    creatorName: string;
    subject: string;
    subjects: string[];
    rating: number;
    reviews: number;
    price: number;
    location: string;
    murid: number;
    image: string;
    verified: boolean;
    experience: string;
    description: string;
    availability: string;
  };

  const [tutors, setTutors] = useState<TutorUI[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<TutorUI | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadLessons = async () => {
      try {
        const lessons = await getFeaturedLessons();
        if (!isMounted) return;

        const mappedTutors: TutorUI[] = lessons.map((l: FeaturedLesson) => {
          // Use creator name if available, fallback to lesson fullName, then email
          const creatorName = l.creator?.name || 
            (l.creator?.firstName && l.creator?.lastName 
              ? `${l.creator.firstName} ${l.creator.lastName}`.trim()
              : l.creator?.email || "Unknown Creator");
          
          // Use lesson fullName as the main title, fallback to creator name
          const lessonTitle = l.fullName || creatorName;

          return {
            id: l.id,
            userId: l.creator?.id || "",
            name: lessonTitle,
            creatorName: creatorName,
            subject: l.primarySubject,
            subjects: (l.languages && l.languages.length > 0
              ? l.languages
              : [l.primarySubject]
            ).filter(Boolean) as string[],
            rating: 0,
            reviews: 0,
            price: Number(l.hourlyRate) || 0,
            location: l.location || l.creator?.location || "",
            murid: 0,
            image: l.image || l.creator?.image || "/placeholder.svg",
            verified: Boolean(l.creator),
            experience:
              typeof l.yearsExperience === "number" && l.yearsExperience > 0
                ? `${l.yearsExperience}+ years`
                : "",
            description: l.description,
            availability: l.availability,
          };
        });

        setTutors(mappedTutors);
      } catch (error) {
        console.error("Failed to load lessons", error);
      }
    };

    loadLessons();

    return () => {
      isMounted = false;
    };
  }, []);

  const subjects = [
    "Mathematics",
    "English",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Economics",
    "Piano",
    "Guitar",
    "Violin",
    "Art",
    "Photography",
    "Programming",
    "Languages",
  ];

  const handleViewProfile = (tutor: TutorUI) => {
    setSelectedTutor(tutor);
    setShowProfileModal(true);
  };

  const handleContactTutor = (tutor: TutorUI) => {
    setSelectedTutor(tutor);
    setShowContactModal(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              <Input
                placeholder="Cari berdasarkan subjek, nama tutor, atau kata kunci..."
                className="pl-10 text-lg"
              />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Semua Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject.toLowerCase()}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="px-4"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                filters
              </Button>
              <Button className="px-8">Cari</Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="mb-6 border shadow-xs bg-background">
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">
                      Kisaran Harga (per hour)
                    </h4>
                    <div className="space-y-3">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={100}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Pengalaman</h4>
                    <div className="space-y-2">
                      {["1-2 years", "3-5 years", "5+ years", "10+ years"].map(
                        (exp) => (
                          <div
                            key={exp}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={exp} />
                            <label htmlFor={exp} className="text-sm">
                              {exp}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Ketersediaan</h4>
                    <div className="space-y-2">
                      {[
                        "Tersedia hari ini",
                        "Tersedia besok",
                        "Tersedia minggu ini",
                        "Jadwal fleksibel",
                      ].map((avail) => (
                        <div
                          key={avail}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={avail} />
                          <label htmlFor={avail} className="text-sm">
                            {avail}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Pengajar Tersedia</h1>
            <p>{tutors.length} Pengajar ditemukan</p>
          </div>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
              <SelectItem value="price-low">
                Harga : Murah sampai mahal
              </SelectItem>
              <SelectItem value="price-high">
                Harga : Mahal sampai murah
              </SelectItem>
              <SelectItem value="experience">Tinggi Pengalaman</SelectItem>
              <SelectItem value="reviews">Tinggi Penilaian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tutors.map((tutor) => (
            <Card
              key={tutor.id}
              className="hover:shadow-sm transition-all duration-300 group cursor-pointer overflow-hidden border shadow-xs"
            >
              <CardContent>
                <div className="flex gap-6 min-h-[280px]">
                  {/* Profile Image with spacing */}
                  <div className="relative w-36 flex-shrink-0">
                    <div className="relative w-full h-48 rounded overflow-hidden">
                      <Image
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        fill
                        className="object-cover"
                        sizes="144px"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/placeholder.svg";
                          target.srcset = "";
                        }}
                      />
                    </div>
                    {tutor.verified && (
                      <Badge className="mt-4">
                        <Check className="w-5 h-5" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold transition-colors">
                            {tutor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            Created by: {tutor.creatorName}
                          </p>
                          <p className="font-semibold text-lg">
                            {tutor.subject}
                          </p>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <div className="text-2xl font-bold">
                            ${tutor.price}
                            <span className="text-base">/hr</span>
                          </div>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {tutor.availability}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mb-3 text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span className="font-semibold">{tutor.rating}</span>
                          <span>({tutor.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{tutor.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span className="font-semibold">{tutor.murid}</span>
                          <span>murid</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{tutor.experience}</span>
                        </div>
                      </div>

                      <p className="text-sm mb-4 leading-relaxed">
                        {tutor.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {tutor.subjects.map((subject, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs px-3 py-1"
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Buttons - Always visible at bottom */}
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleViewProfile(tutor)}
                      >
                        view profile
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => handleContactTutor(tutor)}
                        disabled={!tutor.userId || session?.user?.id === tutor.userId}
                        title={
                          !tutor.userId
                            ? "Tutor profile not linked to a user"
                            : session?.user?.id === tutor.userId
                            ? "You cannot contact your own tutor listing"
                            : undefined
                        }
                      >
                        contact tutor
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Lihat lebih banyak pengajar
          </Button>
        </div>
      </div>

      {/* Modals */}
      {selectedTutor && (
        <>
          <TutorProfileModal
            tutor={selectedTutor}
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            onContactTutor={() => {
              setShowProfileModal(false);
              setShowContactModal(true);
            }}
          />
          <ContactTutorModal
            tutor={selectedTutor}
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
          />
        </>
      )}
    </>
  );
}
