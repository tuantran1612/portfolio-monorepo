import axiosInstance from './axios.config'

export const uploadService = {
  uploadImage: async (file: File): Promise<{ url: string; publicId: string }> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axiosInstance.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response as any
  },

  deleteImage: async (publicId: string): Promise<void> => {
    await axiosInstance.delete(`/upload/${encodeURIComponent(publicId)}`)
  },
}