import { prisma } from "./prisma"

export function findUserByUsername(username: string) {
  if(!username) {
    return null
  }
  return prisma.user.findUnique({ 
    where: { 
      username
    } 
  })
}

export function findUserById(id: string) {
  if(!id) {
    return null
  }
  return prisma.user.findUnique({ 
    where: { 
      id
    } 
  })
}

export async function createUser (username: string, name: string) {
  if (await findUserByUsername(username)) {
    return null
  }
  return prisma.user.create({
    data: {
      username,
      name
    }
  })
}

export function updateUser (id: string, username: string, name: string) {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      username,
      name
    }
  })
}

export function deleteUser (id: string) {
  return prisma.user.delete({
    where: {
      id
    }
  })
}

export function generateExpiresDateLoginCookie () : Date {
  const expiresDate = new Date()
  return new Date(expiresDate.setDate(expiresDate.getDate() + 30))
}