export interface CreateContactRequestInput {
  tutorId: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  subject: string;
  durationMinutes: number;
  preferredDate?: string; // ISO string
  timeSlot?: string;
  message?: string;
  wantsNegotiation: boolean;
  proposedPrice?: number | string;
  priceReason?: string;
}

export interface CreateContactRequestResponse {
  message: string;
  id: number;
}

export interface ContactRequestError {
  error: string;
}

export async function createContactRequest(
  data: CreateContactRequestInput
): Promise<CreateContactRequestResponse> {
  const response = await fetch("/api/contact-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: ContactRequestError = await response
      .json()
      .catch(() => ({ error: "Failed to create contact request" }));
    throw new Error(errorData.error || "Failed to create contact request");
  }

  return response.json();
}

export interface ContactRequestItem {
  id: number;
  studentId: string;
  tutorId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string | null;
  subject: string;
  durationMinutes: number;
  preferredDate: string | null; // ISO from server
  timeSlot: string | null;
  message: string | null;
  wantsNegotiation: boolean;
  proposedPrice: string | null; // decimals serialized as string
  priceReason: string | null;
  status: string;
  fixedDate: string | null; // NEW: final fixed date set by tutor
  isPaid: boolean;
  paymentDate: string | null;
  isCompleted: boolean;
  completionSummary: string | null;
  completedAt: string | null;
  studentCompleted: boolean;
  tutorCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  tutor: {
    id: string;
    name: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    role: string;
    location: string | null;
    image: string | null;
  } | null;
}

export async function getMyContactRequests(): Promise<ContactRequestItem[]> {
  const response = await fetch("/api/contact-request", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData: ContactRequestError = await response
      .json()
      .catch(() => ({ error: "Failed to fetch contact requests" }));
    throw new Error(errorData.error || "Failed to fetch contact requests");
  }

  return response.json();
}

export interface TutorIncomingContactRequestItem extends Omit<ContactRequestItem, "tutor"> {
  student: {
    id: string;
    name: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string;
    role: string;
    location: string | null;
    image: string | null;
  } | null;
}

export async function getIncomingContactRequestsAsTutor(): Promise<
  TutorIncomingContactRequestItem[]
> {
  const response = await fetch("/api/contact-request?as=tutor", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData: ContactRequestError = await response
      .json()
      .catch(() => ({ error: "Failed to fetch contact requests" }));
    throw new Error(errorData.error || "Failed to fetch contact requests");
  }

  return response.json();
}

export type ContactRequestDecision = {
  status: "approved" | "rejected";
  fixedDate?: string; // ISO string required if approved
};

export async function decideContactRequest(
  id: number,
  data: ContactRequestDecision
): Promise<{ message: string }> {
  const response = await fetch(`/api/contact-request/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: ContactRequestError = await response
      .json()
      .catch(() => ({ error: "Failed to update contact request" }));
    throw new Error(errorData.error || "Failed to update contact request");
  }

  return response.json();
} 