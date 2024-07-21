import { useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { fetchWithErrorHandling } from '../helpers/fetchWithErrorHandling'
import { ErrorPage } from './ErrorPage'

type FeedData = {
  id: string
  author: string
  createdAt: Date
  content: string
  image?: string
}[]

export async function feedLoader() {
  const response = await fetch('/api/v1/post')
  if (response.status === 401) {
    throw new Response('Unauthorized', { status: 401 })
  }
  return (await response.json()) as FeedData
}

export function Post() {
  const data = useLoaderData() as FeedData
  const [feed, setFeed] = useState(data)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sortedBy, setSortedBy] = useState<'date' | 'name'>('date')

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sendPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    try {
      await fetchWithErrorHandling('/api/v1/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: form.content.value,
        }),
      })
      // formData.get('image') && await fetch('/api/v1/post_image/' + post.id, {
      //   method: 'POST',
      //   body: formData.get('image'),
      // })
      setFeed(await feedLoader())
    } catch (e: any) {
      setError(e.message)
    }
    form.reset()
    scrollToTop()
  }

  const sortedData = feed?.sort((a, b) => {
    if (sortedBy === 'name') {
      return a.content.localeCompare(b.content)
    }

    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return dateB.getTime() - dateA.getTime()
  })

  if (loading || !feed) {
    return <div>Loading...</div>
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <>
      <h1>Post</h1>

      <p>
        <button type="button" onClick={() => setSortedBy('date')}>
          Sort by date
        </button>
        <button type="button" onClick={() => setSortedBy('name')}>
          Sort by name
        </button>
      </p>

      <div className="post-list-container">
        <h2>Posts</h2>
        <ul id="post-list">
          {sortedData?.map((post) => (
            <li className="single-post" key={post.id}>
              <div className="single-post-author">{post.author}</div>
              <div className="single-post-date">
                {new Date(post.createdAt).toLocaleString('fr-FR', {
                  day: 'numeric',
                  year: 'numeric',
                  month: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </div>
              <div className="single-post-content">
                {post.content.replace('\n', '<br>')}
              </div>
              {post.image && (
                <div className="single-post-image-container">
                  <img
                    src={'/api/img/post_image/' + post.image}
                    alt={post.image}
                    className="single-post-image"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* <Form id="post-form" method="post" encType="multipart/form-data"> */}
        <Form id="post-form" onSubmit={sendPost}>
          <div className="row">
            <label htmlFor="content">Content: </label>
            <textarea
              name="content"
              id="content"
              cols={100}
              rows={15}
              placeholder="Your publication"
            />
          </div>
          {/* <div className="row">
            <label htmlFor="image">Image (max 8 MB): </label>
            <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg" />
          </div> */}
          <button type="submit">Post</button>
        </Form>
      </div>
    </>
  )
}
