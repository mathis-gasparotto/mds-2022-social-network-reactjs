import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient

async function deleteAllPosts() {
  await prisma.post.deleteMany()
}

// deleteAllPosts()

// const users = [
//   {
//     username: 'john',
//     name: 'John Doe'
//   },
//   {
//     username: 'maggio',
//     name: 'Mathis'
//   },
// ]

// users.forEach((userObject) => {
//   prisma.user.upsert({
//     where: {
//       username: userObject.username
//     }, 
//     create: {
//       username: userObject.username,
//       name: userObject.name
//     },
//     update: {
//       username: userObject.username,
//       name: userObject.name
//     }
//   }).then(() => {
//     console.log('Seeded ' + userObject.username + ' user')
//   }, (error) => {
//     console.log(error)
//   })
// })