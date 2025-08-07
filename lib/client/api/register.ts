export interface RegisterData {
  userId: string;
  role: "student" | "teacher";
  subjectInterestData?: string[];
  subjectCanTeachData?: string[];
  teachingDocumentData?: Array<{
    document: string;
    fileType: string;
    fileName: string;
  }>;
}

export interface RegisterResponse {
  message: string;
}

export interface RegisterError {
  error: string;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: RegisterError = await response.json();
    throw new Error(errorData.error || "Registration failed");
  }

  return response.json();
}