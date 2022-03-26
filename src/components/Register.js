import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register({ setUser }) {
    let navigate = useNavigate()

    const passwordConfirmationRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        const object = {}
        data.forEach(function(value, key) {
            object[key] = value
        })
        // for (var pair of data.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`)
        // }
        if(data.get('password') === passwordConfirmationRef.current.value) {
        fetch('http://localhost:8080/users', {
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
        } else {
            alert('Passwords do not match')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='registration-form'>

            <label for='name'>What's your name?</label>
            <input name='name' type='text' placeholder='Talula' required></input>
            
            <label for='email'>What's your email?</label>
            <input name='email' type='email' placeholder='me@blah.com' required></input>
            
            <label for='password'>Create a password</label>
            <input name='password' type='password' placeholder='******' required></input>
            
            <label for='password'>Confirm your password</label>
            <input ref={passwordConfirmationRef} type='password' placeholder='******' required></input>
            
            <button type='submit' className='button-submit'>Sign up</button>

        </form>
    )
}