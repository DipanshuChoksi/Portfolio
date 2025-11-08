"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: string
  author: string
  email: string
  content: string
  date: string
}

interface CommentsSectionProps {
  postSlug: string
}

export function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: name,
        email: email,
        content: content,
        date: new Date().toISOString(),
      }
      setComments([newComment, ...comments])
      setName("")
      setEmail("")
      setContent("")
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 rounded-lg border border-border p-6">
        <div className="grid gap-4 mb-4">
          <Input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Textarea
          placeholder="Your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mb-4"
          rows={4}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="rounded-lg border border-border p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold">{comment.author}</p>
                  <p className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-foreground/90">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  )
}
