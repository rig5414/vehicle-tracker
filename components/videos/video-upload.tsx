"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  location: z.string().optional(),
  videoFile: z.any().refine((file) => file?.length === 1, {
    message: "Video file is required.",
  }),
})

export function VideoUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setSelectedFile(files[0])
      form.setValue("videoFile", files)
    }
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
    form.setValue("videoFile", undefined)
    const fileInput = document.getElementById("video-upload") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)
        setUploadProgress(0)
        setSelectedFile(null)
        form.reset()

        toast({
          title: "Upload Complete",
          description: "Your video has been uploaded and is now being processed.",
        })
      }
    }, 300)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title for your video" {...field} />
              </FormControl>
              <FormDescription>A descriptive title for the video footage</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter a description (optional)" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Additional details about the video footage</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Main St & 5th Ave" {...field} />
              </FormControl>
              <FormDescription>Where the video was recorded (optional)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoFile"
          render={() => (
            <FormItem>
              <FormLabel>Video File</FormLabel>
              <FormControl>
                <div className="grid w-full gap-2">
                  {!selectedFile ? (
                    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-12">
                      <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                      <div className="text-center">
                        <p className="text-sm font-medium mb-1">Drag and drop your video file here</p>
                        <p className="text-xs text-muted-foreground mb-4">MP4, AVI, MOV, or MKV up to 500MB</p>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => document.getElementById("video-upload")?.click()}
                        >
                          Select File
                        </Button>
                        <Input
                          id="video-upload"
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between rounded-md border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-secondary rounded-md p-2">
                          <video className="h-10 w-10" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={clearSelectedFile}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>Upload a video file for license plate detection</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload Video"}
        </Button>
      </form>
    </Form>
  )
}
