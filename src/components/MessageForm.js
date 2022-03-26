export default function MessageForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        const object = {}
        data.forEach(function (value, key) {
          object[key] = value
        })
    
        const jwt = localStorage["user-jwt"]
        fetch("http://localhost:8080/messages", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JSON.parse(jwt)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(object),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
                console.log(data)
            } else {
              alert(data.message)
            }
          })
      }
    return (
    <form onSubmit={handleSubmit} className='message-form'>

        <label for='to'>To</label>
        <input name='to' type='text' placeholder='to' required />
        
        <label for='message'>What's your email?</label>
        <input name='message' type='text' placeholder='message' required />
        
        <button type='submit' className='button-submit'>Send</button>

    </form>
    )
}