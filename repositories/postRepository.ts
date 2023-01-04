import { prisma } from "./prisma"

export async function createPost (authorId: string, content: string) {
  return await prisma.post.create({
    data: {
      authorId,
      content
    }
  })
}