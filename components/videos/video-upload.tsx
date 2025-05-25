"use client"

import { useState, useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload, X, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_FILE_TYPES = ["video/mp4", "video/quicktime", "video/x-msvideo", "video/x-matroska"];

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  location: z.string().min(2, {
    message: "Location is required for video processing.",
  }),
  videoFile: z
    .any()
    .refine((files) => files?.length === 1, "Video file is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 500MB.`
    )
    .refine(
      (files) => ALLOWED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .mp4, .mov, .avi, and .mkv files are accepted."
    ),
});

type UploadProgressEvent = {
  loaded: number
  total: number
}

export function VideoUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
    },
  })

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    setUploadError(null)
    setUploadProgress(0)

    if (files && files.length > 0) {
      const file = files[0]
      
      if (file.size > MAX_FILE_SIZE) {
        setUploadError("File size exceeds 500MB limit")
        event.target.value = ""
        return
      }
      
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setUploadError("Invalid file type. Only .mp4, .mov, .avi, and .mkv files are accepted")
        event.target.value = ""
        return
      }
      
      setSelectedFile(file)
      form.setValue("videoFile", files)
    }
  }, [form])

  const clearSelectedFile = useCallback(() => {
    setSelectedFile(null)
    form.setValue("videoFile", undefined)
    setUploadProgress(0)
    setUploadError(null)
  }, [form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUploading(true);
    setUploadError(null);
    setTimeout(() => {
      form.reset();
      clearSelectedFile();
      setIsUploading(false);
      setUploadProgress(0);
      toast({
        title: "Success",
        description: "(Mock) Video uploaded successfully and queued for processing",
      });
    }, 1000);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {uploadError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter video title" {...field} />
              </FormControl>
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
                <Input placeholder="Enter filming location" {...field} />
              </FormControl>
              <FormDescription>
                This helps in correlating detected license plates with locations
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional details about the video"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoFile"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Video File</FormLabel>
              <FormControl>
                <div className="grid gap-4">
                  <Input
                    type="file"
                    accept=".mp4,.mov,.avi,.mkv"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    {...field}
                  />
                  {selectedFile && (
                    <div className="flex items-center justify-between gap-4 p-4 rounded-lg border">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={clearSelectedFile}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Maximum file size: 500MB. Supported formats: MP4, MOV, AVI, MKV
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {(isUploading || uploadProgress > 0) && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {uploadProgress === 100 ? "Processing..." : `Uploading: ${uploadProgress}%`}
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-pulse" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Video
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
