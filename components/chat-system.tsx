"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useSession } from "@/lib/client/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  MessageCircle,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Search,
  X,
  Check,
  CheckCheck,
  Clock,
} from "lucide-react"
import { getMessages, sendMessage as apiSendMessage } from "@/lib/client/api/messages"
import type { MessageItem } from "@/lib/client/api/messages"
import { getMyContactRequests, getIncomingContactRequestsAsTutor } from "@/lib/client/api/contact-request"
import type { ContactRequestItem, TutorIncomingContactRequestItem } from "@/lib/client/api/contact-request"

interface Message {
  id: number
  senderId: number
  senderName: string
  senderType: "student" | "tutor"
  content: string
  timestamp: string
  status: "sent" | "delivered" | "read"
  type: "text" | "image" | "file"
  fileUrl?: string
  fileName?: string
}

interface ChatConversation {
  id: number
  participantId: number
  participantName: string
  participantType: "student" | "tutor"
  participantImage: string
  subject?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  messages: Message[]
}

interface ChatSystemProps {
  currentUserId: number
  currentUserType: "student" | "tutor"
  triggerButton?: React.ReactNode
  contactRequestId?: number
  onOpenChange?: (open: boolean) => void
}

export default function ChatSystem({ currentUserId, currentUserType, triggerButton, contactRequestId, onOpenChange }: ChatSystemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState<ChatConversation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const currentAuthUserId = session?.user?.id ?? null

  // Mock conversations data
  const [conversations, setConversations] = useState<ChatConversation[]>([])

  // Load messages for a provided contactRequestId and open dialog
  useEffect(() => {
    let ignore = false
    async function load() {
      if (!contactRequestId) return
      try {
        const rows = await getMessages(contactRequestId)
        if (ignore) return

        // Fetch the corresponding contact request to derive participant info
        let participantName = "Conversation"
        let participantImage = "/placeholder.svg"
        let subject: string | undefined = undefined

        try {
          if (currentUserType === "student") {
            const list = await getMyContactRequests()
            const item = list.find((r) => r.id === contactRequestId)
            if (item) {
              const tutor = item.tutor
              participantName = [tutor?.firstName, tutor?.lastName].filter(Boolean).join(" ") || tutor?.name || "Tutor"
              participantImage = tutor?.image || "/placeholder.svg"
              subject = item.subject
            }
          } else {
            const list = await getIncomingContactRequestsAsTutor()
            const item = list.find((r) => r.id === contactRequestId)
            if (item) {
              const student = item.student
              participantName = [student?.firstName, student?.lastName].filter(Boolean).join(" ") || student?.name || item.studentName || "Student"
              participantImage = student?.image || "/placeholder.svg"
              subject = item.subject
            }
          }
        } catch {
          // ignore contact-request fetch errors; fallback values remain
        }

        const otherType = currentUserType === "student" ? "tutor" : "student"

        const msgs: Message[] = rows.map((m) => ({
          id: m.id,
          senderId: currentAuthUserId && m.senderId === currentAuthUserId ? currentUserId : -1,
          senderName: currentAuthUserId && m.senderId === currentAuthUserId ? "You" : participantName,
          senderType: currentAuthUserId && m.senderId === currentAuthUserId ? currentUserType : otherType,
          content: m.content,
          timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "read",
          type: m.type === "file" ? "file" : "text",
        }))
        const conv: ChatConversation = {
          id: contactRequestId,
          participantId: 0,
          participantName,
          participantType: currentUserType === "student" ? "tutor" : "student",
          participantImage,
          subject: subject,
          lastMessage: rows[rows.length - 1]?.content || "",
          lastMessageTime: rows[rows.length - 1]?.createdAt ? new Date(rows[rows.length - 1].createdAt).toLocaleString() : "",
          unreadCount: 0,
          isOnline: true,
          messages: msgs,
        }
        setConversations((prev) => {
          const exists = prev.find((c) => c.id === conv.id)
          return exists ? prev.map((c) => (c.id === conv.id ? conv : c)) : [conv, ...prev]
        })
        setSelectedChat(conv)
        setIsOpen(true)
        onOpenChange?.(true)
      } catch {
        // ignore
      }
    }
    load()
    return () => {
      ignore = true
    }
  }, [contactRequestId, currentUserId, currentUserType, onOpenChange, currentAuthUserId])

  // When opening the dialog without a specific contactRequestId, load the user's conversations
  useEffect(() => {
    let ignore = false
    async function loadConversationsForCurrentUser() {
      if (contactRequestId) return
      try {
        let convs: ChatConversation[] = []
        if (currentUserType === "student") {
          const list: ContactRequestItem[] = await getMyContactRequests()
          if (ignore) return
          convs = list.map((item) => {
            const other = item.tutor
            const participantName = [other?.firstName, other?.lastName].filter(Boolean).join(" ") || other?.name || "Tutor"
            const participantImage = other?.image || "/placeholder.svg"
            return {
              id: item.id,
              participantId: 0,
              participantName,
              participantType: "tutor",
              participantImage,
              subject: item.subject,
              lastMessage: "",
              lastMessageTime: item.updatedAt || item.createdAt || "",
              unreadCount: 0,
              isOnline: true,
              messages: [],
            }
          })
        } else {
          const list: TutorIncomingContactRequestItem[] = await getIncomingContactRequestsAsTutor()
          if (ignore) return
          convs = list.map((item) => {
            const other = item.student
            const participantName = [other?.firstName, other?.lastName].filter(Boolean).join(" ") || other?.name || "Student"
            const participantImage = other?.image || "/placeholder.svg"
            return {
              id: item.id,
              participantId: 0,
              participantName,
              participantType: "student",
              participantImage,
              subject: item.subject,
              lastMessage: "",
              lastMessageTime: item.updatedAt || item.createdAt || "",
              unreadCount: 0,
              isOnline: true,
              messages: [],
            }
          })
        }

        setConversations(convs)

        // Auto-select first conversation and load its messages
        if (convs.length > 0 && !selectedChat) {
          const first = convs[0]
          setSelectedChat(first)
          try {
            const rows = await getMessages(first.id)
            const otherType = currentUserType === "student" ? "tutor" : "student"
            const msgs: Message[] = rows.map((m) => ({
              id: m.id,
              senderId: currentAuthUserId && m.senderId === currentAuthUserId ? currentUserId : -1,
              senderName: currentAuthUserId && m.senderId === currentAuthUserId ? "You" : first.participantName,
              senderType: currentAuthUserId && m.senderId === currentAuthUserId ? currentUserType : otherType,
              content: m.content,
              timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              status: "read",
              type: m.type === "file" ? "file" : "text",
            }))
            const updated = {
              ...first,
              messages: msgs,
              lastMessage: rows[rows.length - 1]?.content || "",
              lastMessageTime: rows[rows.length - 1]?.createdAt ? new Date(rows[rows.length - 1].createdAt).toLocaleString() : "",
            }
            setSelectedChat(updated)
            setConversations((prev) => prev.map((c) => (c.id === first.id ? updated : c)))
          } catch {
            // ignore
          }
          setIsOpen(true)
          onOpenChange?.(true)
        }
      } catch {
        // ignore
      }
    }
    loadConversationsForCurrentUser()
    return () => {
      ignore = true
    }
  }, [contactRequestId, currentUserType, onOpenChange, selectedChat, currentAuthUserId, currentUserId])

  function mapRowsToMessages(rows: MessageItem[], participantName: string): Message[] {
    const otherType = currentUserType === "student" ? "tutor" : "student"
    return rows.map((m) => ({
      id: m.id,
      senderId: currentAuthUserId && m.senderId === currentAuthUserId ? currentUserId : -1,
      senderName: currentAuthUserId && m.senderId === currentAuthUserId ? "You" : participantName,
      senderType: currentAuthUserId && m.senderId === currentAuthUserId ? currentUserType : otherType,
      content: m.content,
      timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "read",
      type: m.type === "file" ? "file" : "text",
    }))
  }

  const fetchAndSetMessages = async (conv: ChatConversation) => {
    try {
      const rows = await getMessages(conv.id)
      const msgs = mapRowsToMessages(rows, conv.participantName)
      const updated = {
        ...conv,
        messages: msgs,
        lastMessage: rows[rows.length - 1]?.content || "",
        lastMessageTime: rows[rows.length - 1]?.createdAt ? new Date(rows[rows.length - 1].createdAt).toLocaleString() : "",
      }
      setSelectedChat(updated)
      setConversations((prev) => prev.map((c) => (c.id === conv.id ? updated : c)))
    } catch {
      // ignore
    }
  }

  const handleSelectConversation = async (conversation: ChatConversation) => {
    setSelectedChat(conversation)
    if (conversation.messages.length === 0) {
      await fetchAndSetMessages(conversation)
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conv.subject && conv.subject.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (selectedChat) {
      scrollToBottom()
    }
  }, [selectedChat])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return

    const message: Message = {
      id: Date.now(),
      senderId: currentUserId,
      senderName: "You",
      senderType: currentUserType,
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
      type: "text",
    }

    // Update the selected chat
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, message],
      lastMessage: newMessage.trim(),
      lastMessageTime: "now",
    }

    // Update conversations
    setConversations((prev) => prev.map((conv) => (conv.id === selectedChat.id ? updatedChat : conv)))

    setSelectedChat(updatedChat)
    setNewMessage("")

    // Attempt to send via API using the selected conversation id
    const targetConvId = selectedChat?.id || contactRequestId
    if (targetConvId) {
      try {
        await apiSendMessage(targetConvId, message.content)
        const deliveredMessage = { ...message, status: "delivered" as const }
        const updatedChatDelivered = {
          ...updatedChat,
          messages: updatedChat.messages.map((msg) => (msg.id === message.id ? deliveredMessage : msg)),
        }
        setSelectedChat(updatedChatDelivered)
        setConversations((prev) => prev.map((conv) => (conv.id === selectedChat.id ? updatedChatDelivered : conv)))
      } catch {
        // ignore errors for now
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3" />
      case "delivered":
        return <CheckCheck className="w-3 h-3" />
      case "read":
        return <CheckCheck className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const defaultTriggerButton = (
    <Button>
      <MessageCircle className="w-4 h-4 mr-2" />
      Messages
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={(o) => { setIsOpen(o); onOpenChange?.(o) }}>
      <DialogTrigger asChild>{triggerButton || defaultTriggerButton}</DialogTrigger>
      <DialogContent className="max-h-[90vh] p-0 min-w-5xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Chat System</DialogTitle>
        </DialogHeader>

        <div className="flex h-[80vh]">
          {/* Conversations Sidebar */}
          <div className="w-1/3 border-r flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Messages</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-0"
                />
              </div>
            </div>

            {/* Conversations List */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                      selectedChat?.id === conversation.id
                        ? "border"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={conversation.participantImage || "/placeholder.svg"}
                            alt={conversation.participantName}
                          />
                          <AvatarFallback>
                            {conversation.participantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium truncate">{conversation.participantName}</h3>
                          <span className="text-xs">{conversation.lastMessageTime}</span>
                        </div>

                        {conversation.subject && (
                          <Badge variant="secondary" className="text-xs mb-1">
                            {conversation.subject}
                          </Badge>
                        )}

                        <div className="flex items-center justify-between">
                          <p className="text-sm truncate flex-1">{conversation.lastMessage}</p>
                          {conversation.unreadCount > 0 && (
                            <Badge className="text-xs ml-2">{conversation.unreadCount}</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage
                            src={selectedChat.participantImage || "/placeholder.svg"}
                            alt={selectedChat.participantName}
                          />
                          <AvatarFallback>
                            {selectedChat.participantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {selectedChat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedChat.participantName}</h3>
                        <div className="flex items-center space-x-2 text-sm">
                          {selectedChat.subject && (
                            <Badge variant="outline" className="text-xs">
                              {selectedChat.subject}
                            </Badge>
                          )}
                          <span>{selectedChat.isOnline ? "Online" : "Offline"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] ${
                            message.senderId === currentUserId
                              ? "rounded-l-2xl rounded-tr-2xl"
                              : "rounded-r-2xl rounded-tl-2xl"
                          } p-3`}
                        >
                          <div
                            className={`text-xs font-medium mb-1 ${
                              message.senderId === currentUserId ? "text-right" : "text-left"
                            }`}
                          >
                            {message.senderName}
                          </div>
                          {message.type === "file" ? (
                            <div className="flex items-center space-x-2">
                              <Paperclip className="w-4 h-4" />
                              <span className="text-sm font-medium">{message.fileName}</span>
                            </div>
                          ) : (
                            <p className="text-sm">{message.content}</p>
                          )}

                          <div className={`flex items-center justify-end space-x-1 mt-1`}>
                            <span className="text-xs">{message.timestamp}</span>
                            {message.senderId === currentUserId && getMessageStatusIcon(message.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-end space-x-2">
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="rounded-full p-2"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* No Chat Selected */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p>Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}