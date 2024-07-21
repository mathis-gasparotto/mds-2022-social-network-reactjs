import { prisma } from './prisma'
import { findUserById } from './userRepository'

export async function createMessage(authorId: string, content: string) {
  return await prisma.chat.create({
    data: {
      authorId,
      content,
    },
  })
}

export function getAllMessages() {
  return prisma.chat.findMany()
}

export async function findMessageById(id: string) {
  if (!id) {
    return null
  }
  return await prisma.chat.findUnique({
    where: {
      id,
    },
  })
}

export async function getAuthorNameByMessageId(id: string) {
  if (!id) {
    return null
  }
  let chat = await findMessageById(id)
  if (!chat) {
    return null
  }
  let author = await findUserById(chat.authorId)
  if (!author) {
    return null
  }
  return author.name
}
