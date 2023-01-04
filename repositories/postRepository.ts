import { prisma } from "./prisma"
import { findUserById } from "./userRepository"

export async function createPost (authorId: string, content: string) {
  return await prisma.post.create({
    data: {
      authorId,
      content
    }
  })
}

export async function getAllPosts () {
  return await prisma.post.findMany()
}

export async function findPostById(id: string) {
  if (!id) {
    return null
  }
  return await prisma.post.findUnique({
    where: {
      id
    }
  })
}

export async function getAuthorNameByPostId (id: string) {
  if (!id) {
    return null
  }
  let post = await findPostById(id)
  if (!post) {
    return null
  }
  let author = await findUserById(post.authorId)
  if(!author) {
    return null
  }
  return author.name
}