import { useState } from 'react'
import { uploadService } from '@/services/upload.service'
import { toast } from 'sonner'

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  async function upload(file: File): Promise<string | null> {
    setIsUploading(true)
    try {
      const result = await uploadService.uploadImage(file)
      setPreview(result.url)
      toast.success('Image uploaded')
      return result.url
    } catch {
      toast.error('Failed to upload image')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  function reset() {
    setPreview(null)
  }

  return { upload, isUploading, preview, reset }
}