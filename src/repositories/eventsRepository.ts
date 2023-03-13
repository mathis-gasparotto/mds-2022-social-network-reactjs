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

export function findEventById(id: string) {
  return prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      createdBy: true,
    },
  })
}

export function updateEventById(id: string, title: string, date: string) {
  return prisma.event.update({
    where: {
      id,
    },
    data: {
      title,
      date: new Date(date),
    },
  })
}

export function deleteEventById(id: string) {
  return prisma.event.delete({
    where: {
      id,
    },
  })
}