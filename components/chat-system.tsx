"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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
}

export default function ChatSystem({ currentUserId, currentUserType, triggerButton }: ChatSystemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState<ChatConversation | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock conversations data
  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: 1,
      participantId: 2,
      participantName: "Sarah Johnson",
      participantType: "tutor",
      participantImage: "/professional-teacher-woman.png",
      subject: "Mathematics",
      lastMessage: "Great! I'll prepare some practice problems for our next session.",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: 1,
          senderId: 1,
          senderName: "You",
          senderType: "student",
          content:
            "Hi Sarah! I'm really struggling with quadratic equations. Could you help me understand the concept better?",
          timestamp: "10:30 AM",
          status: "read",
          type: "text",
        },
        {
          id: 2,
          senderId: 2,
          senderName: "Sarah Johnson",
          senderType: "tutor",
          content: "Of course! Quadratic equations can be tricky at first. Let me break it down for you step by step.",
          timestamp: "10:32 AM",
          status: "read",
          type: "text",
        },
        {
          id: 3,
          senderId: 2,
          senderName: "Sarah Johnson",
          senderType: "tutor",
          content:
            "A quadratic equation is any equation that can be written in the form ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0.",
          timestamp: "10:33 AM",
          status: "read",
          type: "text",
        },
        {
          id: 4,
          senderId: 1,
          senderName: "You",
          senderType: "student",
          content: "That makes sense! Could you show me how to solve x² - 5x + 6 = 0?",
          timestamp: "10:35 AM",
          status: "read",
          type: "text",
        },
        {
          id: 5,
          senderId: 2,
          senderName: "Sarah Johnson",
          senderType: "tutor",
          content: "We can solve this by factoring. We need to find two numbers that multiply to 6 and add to -5.",
          timestamp: "10:36 AM",
          status: "read",
          type: "text",
        },
        {
          id: 6,
          senderId: 2,
          senderName: "Sarah Johnson",
          senderType: "tutor",
          content: "Great! I'll prepare some practice problems for our next session.",
          timestamp: "10:45 AM",
          status: "delivered",
          type: "text",
        },
      ],
    },
    {
      id: 2,
      participantId: 3,
      participantName: "David Chen",
      participantType: "tutor",
      participantImage: "/professional-teacher-man.png",
      subject: "English Literature",
      lastMessage: "I've uploaded the essay guidelines for you to review.",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 1,
          senderId: 1,
          senderName: "You",
          senderType: "student",
          content: "Hi David! I need help with my essay on Shakespeare's Hamlet.",
          timestamp: "Yesterday 3:20 PM",
          status: "read",
          type: "text",
        },
        {
          id: 2,
          senderId: 3,
          senderName: "David Chen",
          senderType: "tutor",
          content: "I'd be happy to help! What specific aspect of Hamlet are you focusing on for your essay?",
          timestamp: "Yesterday 3:25 PM",
          status: "read",
          type: "text",
        },
        {
          id: 3,
          senderId: 3,
          senderName: "David Chen",
          senderType: "tutor",
          content: "I've uploaded the essay guidelines for you to review.",
          timestamp: "9:15 AM",
          status: "read",
          type: "file",
          fileName: "Essay_Guidelines_Hamlet.pdf",
          fileUrl: "#",
        },
      ],
    },
    {
      id: 3,
      participantId: 4,
      participantName: "Alex Chen",
      participantType: "student",
      participantImage: "/placeholder.svg",
      subject: "Mathematics",
      lastMessage: "Thank you for the clear explanation!",
      lastMessageTime: "3 hours ago",
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: 1,
          senderId: 4,
          senderName: "Alex Chen",
          senderType: "student",
          content: "Hi! I'm having trouble with the algebra homework you assigned.",
          timestamp: "7:30 AM",
          status: "read",
          type: "text",
        },
        {
          id: 2,
          senderId: 1,
          senderName: "You",
          senderType: "tutor",
          content: "No problem! Which specific problems are giving you trouble?",
          timestamp: "7:45 AM",
          status: "read",
          type: "text",
        },
        {
          id: 3,
          senderId: 4,
          senderName: "Alex Chen",
          senderType: "student",
          content: "Thank you for the clear explanation!",
          timestamp: "8:20 AM",
          status: "delivered",
          type: "text",
        },
      ],
    },
  ])

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

  const handleSendMessage = () => {
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

    // Simulate message status updates
    setTimeout(() => {
      const deliveredMessage = { ...message, status: "delivered" as const }
      const updatedChatDelivered = {
        ...updatedChat,
        messages: updatedChat.messages.map((msg) => (msg.id === message.id ? deliveredMessage : msg)),
      }
      setSelectedChat(updatedChatDelivered)
      setConversations((prev) => prev.map((conv) => (conv.id === selectedChat.id ? updatedChatDelivered : conv)))
    }, 1000)
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton || defaultTriggerButton}</DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
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
                    onClick={() => setSelectedChat(conversation)}
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
                          {message.type === "file" ? (
                            <div className="flex items-center space-x-2">
                              <Paperclip className="w-4 h-4" />
                              <span className="text-sm font-medium">{message.fileName}</span>
                            </div>
                          ) : (
                            <p className="text-sm">{message.content}</p>
                          )}

                          <div
                            className={`flex items-center justify-end space-x-1 mt-1`}
                          >
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
