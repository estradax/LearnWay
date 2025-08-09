export interface CreateLessonInput {
  fullName: string;
  email: string;
  primarySubject: string;
  location: string;
  description: string;
  education: string;
  yearsExperience: number;
  hourlyRate: number | string;
  availability: string;
  languages?: string[];
  awards?: string[];
  certifications?: string[];
}

export interface CreateLessonResponse {
  message: string;
  id: number;
}

export interface CreateLessonError {
  error: string;
}

export async function createLesson(
  data: CreateLessonInput
): Promise<CreateLessonResponse> {
  const response = await fetch("/api/lesson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: CreateLessonError = await response.json().catch(() => ({
      error: "Lesson creation failed",
    }));
    throw new Error(errorData.error || "Lesson creation failed");
  }

  return response.json();
}

export interface Lesson {
  id: number;
  creatorId: string;
  fullName: string;
  email: string;
  primarySubject: string;
  location: string;
  description: string;
  education: string;
  yearsExperience: number;
  hourlyRate: string; // numeric serialized as string
  availability: string;
  createdAt: string;
  updatedAt: string;
  languages: string[];
  awards: string[];
  certifications: string[];
}

export async function getLessons(): Promise<Lesson[]> {
  const response = await fetch("/api/lesson", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData: CreateLessonError = await response
      .json()
      .catch(() => ({ error: "Failed to fetch lessons" }));
    throw new Error(errorData.error || "Failed to fetch lessons");
  }

  return response.json();
}

// New: types and API for featured lessons
export interface Creator {
  id: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
  location: string | null;
  image: string | null;
}

export interface FeaturedLesson extends Lesson {
  creator: Creator | null;
}

export async function getFeaturedLessons(): Promise<FeaturedLesson[]> {
  const response = await fetch("/api/get-featured-lesson", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData: CreateLessonError = await response
      .json()
      .catch(() => ({ error: "Failed to fetch featured lessons" }));
    throw new Error(errorData.error || "Failed to fetch featured lessons");
  }

  return response.json();
}

export interface DeleteLessonResponse {
  message: string;
}

export async function deleteLesson(
  id: number | string
): Promise<DeleteLessonResponse> {
  const response = await fetch(
    `/api/lesson?id=${encodeURIComponent(String(id))}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData: CreateLessonError = await response
      .json()
      .catch(() => ({ error: "Failed to delete lesson" }));
    throw new Error(errorData.error || "Failed to delete lesson");
  }

  return response.json();
}
