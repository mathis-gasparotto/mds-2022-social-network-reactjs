import { useLoaderData } from 'react-router'
import { ChatMessage } from '../components/Chat/ChatMessage'
import { ChatWrapper } from '../components/Chat/ChatWrapper'

export function Post() {
  const data = useLoaderData() as Array<{
    id: number,
    author: string,
    createdAt: Date,
    content: string,
    image?: string
  }>
  console.log(data)
  return (
    <>
      <h1>Post</h1>
      <ChatWrapper style={{
        position: 'fixed',
        bottom: 0,
        right: '1rem',
        height: 400,
        width: 300,
        border: '1px solid #ccc',
        borderRadius: 4,
        overflowY: 'auto',
      }}>
        <ChatMessage 
          author='Moa'  
          message='Wsh'
          isOwnMessage
          timestamp={Date.now()}
        />
        <ChatMessage 
          author='Pas moa'  
          message='Ca va le sang'
          timestamp={Date.now()}
        />
        <ChatMessage 
          author='Moa'  
          message='Vi'
          isOwnMessage
          timestamp={Date.now()}
        />
        <ChatMessage 
          author='Pas moa'  
          message='Oui'
          timestamp={Date.now()}
        />
      </ChatWrapper>

      <p id="connected">Connected as: </p>
    
      <div id="server-status"></div>
      
      <div className="post-list-container">
        <h2>Posts</h2>
        <ul id="post-list">
          {data.map((post) => (
            <li className="single-post" key={post.id}>
              <div className="single-post-author">{post.author}</div>
              <div className="single-post-date">{post.createdAt.toLocaleString('fr-FR', {
                day: 'numeric',
                year: 'numeric',
                month: 'numeric', 
                hour: 'numeric',
                minute: 'numeric',
              })}</div>
              <div className="single-post-content">
                {post.content.replace('\n', '<br>')}
              </div>
              {post.image &&
                <div className="single-post-image-container">
                  <img src={'/img/post_image/' + post.image} alt={post.image} className="single-post-image" />
                </div>
              }
            </li>
          ))}
        </ul>
        <form id="post-form" method="POST" action="/post" encType="multipart/form-data">
          <div className="row">
            <label htmlFor="content">Content: </label>
            <textarea name="content" id="content" cols={100} rows={15} placeholder="Your publication"></textarea>
          </div>
          <div className="row">
            <label htmlFor="image">Image (max 8 MB): </label>
            <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg" />
          </div>
          <button type="submit">Post</button>
        </form>
      </div>
    </>
  )
}