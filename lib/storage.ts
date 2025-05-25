import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"

export const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
})

export const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME as string

export async function getSignedUrl(filename: string, contentType: string): Promise<{ url: string; key: string }> {
  const key = `videos/${Date.now()}-${filename}`

  const post = await createPresignedPost(s3Client, {
    Bucket: BUCKET_NAME,
    Key: key,
    Fields: {
      'Content-Type': contentType,
    },
    Conditions: [
      ['content-length-range', 0, 500 * 1024 * 1024], // Max 500MB
      ['starts-with', '$Content-Type', contentType],
    ],
    Expires: 3600, // 1 hour
  })

  return {
    url: post.url,
    key,
  }
}

export async function deleteFromStorage(fileUrl: string): Promise<void> {
  const url = new URL(fileUrl)
  const key = url.pathname.slice(1) // Remove leading slash

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })
  )
}
