import { prisma } from './prisma'
import { User } from '@prisma/client'

export function createEvent(title: string, date: string, createdBy: User) {
  return prisma.event.create({
    data: {
      title,
      date: new Date(date),
      createdById: createdBy.id,
    },
  })
}

export function findAllEvents() {
  return prisma.event.findMany({
    include: {
      createdBy: true,
    },
  })
}
