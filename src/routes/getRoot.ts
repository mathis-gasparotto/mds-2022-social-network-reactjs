import { Application } from 'express-ws'
import path from 'path'
import {
  getAllPosts,
  getAuthorNameByPostId,
} from '../repositories/postRepository'

export function getRoot(app: Application) {
  app.get('/api/v1/post', async (req, res) => {
    var posts = Array()
    try {
      const postsDB = await getAllPosts()
      if (!postsDB) {
        res.render(path.join(__dirname, '../views/posts.ejs'))
        return
      }
      postsDB.forEach(async (post) => {
        posts.push({
          author: await getAuthorNameByPostId(post.id),
          content: post.content,
          image: post.image,
          createdAt: post.createdAt,
        })
      })
      setTimeout(function () {
        posts.sort(function (a, b) {
          return b.createdAt - a.createdAt
        })
        res.status(200).send(posts)
        // res.status(200).render(path.join(__dirname, '../views/posts.ejs'), { posts })
      }, 500) // add timeout to have time to get author name on DB
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal Server Error')
    }
  })
}
