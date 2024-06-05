import z from 'zod'

export const shareSchema = z.object({
  youtubeURL: z.string().url({ message: "Invalid URL" }),
})

export type ShareSchema = z.infer<typeof shareSchema>

