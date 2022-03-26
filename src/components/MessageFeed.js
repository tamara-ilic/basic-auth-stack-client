import { useEffect, useState } from 'react'

export default function MyFeed({ user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      if (user) {
        console.log('user is available, getting messages...')
        fetch('http://localhost:8080/messages', {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage['user-jwt'])}`
            },
        })
        .then((res) => res.json())
        .then((messages) => setMessages(messages.data))
        .catch((err)=> console.log(err))
      }
  }, [user]);
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          <p>
           to:  {message.to} <br />
           message: {message.message}</p>
        </div>
      ))}
    </div>
  )
}