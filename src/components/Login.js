import { useNavigate } from 'react-router-dom'

export default function Login({ setUser }) {
    let navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        const object = {}
        data.forEach(function(value, key) {
            object[key] = value
        })

        console.log(JSON.stringify(object))
       
        fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setUser(data.data)
                localStorage.setItem('user-jwt', JSON.stringify(data.jwt))
                navigate('/my-feed')
            } else {
                alert(data.message)
            }
        })
    }

    return (
        <form onSubmit={handleLogin} className='login-form'>
            
            <label for='email'>What's your email?</label>
            <input name='email' type='email' placeholder='me@blah.com' required></input>
            
            <label for='password'>What's your password?</label>
            <input name='password' type='password' placeholder='******' required></input>
            
            <button type='submit' className='button-submit'>Login</button>

        </form>
    )
}