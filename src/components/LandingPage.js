import { NavLink } from "react-router-dom"

export default function LandingPage() {
    return (
        <>
          <h1>I am a landing page</h1>
          <NavLink to='/register'>Register</NavLink>
          <br />
          <NavLink to='/login'>Log in</NavLink>
        </>
      )
}