"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { Icon } from "@iconify/react"

type DialogProjectProps = {
  projectId: string | number
  initialTitle: string
  initialDescription: string
  initialImage: string
  onUpdated?: () => void
}

export default function DialogProject({
  projectId,
  initialTitle,
  initialDescription,
  initialImage,
  onUpdated,
}: DialogProjectProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [imageUrl, setImageUrl] = useState(initialImage)
  const [newFile, setNewFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Upload a new image if selected
  async function uploadImage(file: File) {
    const filePath = `${projectId}-${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from("images") // your bucket name
      .upload(filePath, file, { upsert: true })
    if (error) {
      throw error
    }
    const { data: publicData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath)
    return publicData.publicUrl
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let updatedImageUrl = imageUrl

      // If a new file was chosen, upload it first
      if (newFile) {
        updatedImageUrl = await uploadImage(newFile)
      }

      // Update project data
      const { data, error } = await supabase
        .from("projects")
        .update({ title, description, image: updatedImageUrl })
        .eq("id", projectId)
        .select()

      if (error) {
        setError(error.message)
      } else {
        onUpdated?.()
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm font-bold bg-linear-to-r from-primary-500 to-secondary-300">
          <Icon icon="lucide:pen-line" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update project details including image.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setNewFile(e.target.files[0])
                }
              }}
            />
            {imageUrl && (
              // Preview current image
              <img
                src={imageUrl}
                alt="Project"
                className="w-full rounded-lg object-cover"
              />
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

