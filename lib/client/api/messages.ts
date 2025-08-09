export interface MessageItem {
  id: number;
  contactRequestId: number;
  senderId: string;
  content: string;
  type: string;
  createdAt: string;
}

export async function getMessages(contactRequestId: number): Promise<MessageItem[]> {
  const res = await fetch(`/api/messages?contactRequestId=${encodeURIComponent(String(contactRequestId))}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({ error: "Failed to fetch messages" }));
    throw new Error(e.error || "Failed to fetch messages");
  }
  return res.json();
}

export async function sendMessage(contactRequestId: number, content: string, type: string = "text"): Promise<{ message: string; id: number }> {
  const res = await fetch(`/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ contactRequestId, content, type }),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({ error: "Failed to send message" }));
    throw new Error(e.error || "Failed to send message");
  }
  return res.json();
}

export async function payContactRequest(id: number): Promise<{ message: string }> {
  const res = await fetch(`/api/contact-request/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ action: "pay" }),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({ error: "Payment failed" }));
    throw new Error(e.error || "Payment failed");
  }
  return res.json();
}

export async function completeContactRequest(id: number): Promise<{ message: string }> {
  const res = await fetch(`/api/contact-request/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ action: "complete" }),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({ error: "Complete failed" }));
    throw new Error(e.error || "Complete failed");
  }
  return res.json();
}

export async function submitCompletionSummary(id: number, summary: string): Promise<{ message: string }> {
  const res = await fetch(`/api/contact-request/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ action: "summary", summary }),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({ error: "Submit summary failed" }));
    throw new Error(e.error || "Submit summary failed");
  }
  return res.json();
}

export const studentMarkFinished = completeContactRequest;
export const tutorMarkFinished = completeContactRequest; 