import { Application } from "express-ws"
import path from 'path'
import { getAllPosts, getAuthorNameByPostId } from "../../repositories/postRepository"

export function getRoot (app: Application) {
  app.get('/', async (req, res) => {
    var posts = Array()
    try {
      const postsDB = await getAllPosts()
      if(!postsDB) {
        res.render(path.join(__dirname, '../views/index.ejs'))
        return
      }
      postsDB.forEach(async (post) => {
        posts.push({
          author: await getAuthorNameByPostId(post.id),
          content: post.content,
          createdAt: post.createdAt
        })
      })
      setTimeout(function() {
        posts.sort(function (a, b) {
          return b.createdAt - a.createdAt
        })
        res.render(path.join(__dirname, '../views/index.ejs'), {posts})
      }, 100) // add timeout to have time to get author name on DB
    } catch (e) {
      console.error(e)
      res.status(500).send('Internal Server Error')
    }
    
  })
}