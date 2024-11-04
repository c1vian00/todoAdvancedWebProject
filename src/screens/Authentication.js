import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { useUser } from '../context/useUser'

export const AuthenticationMode = Object.freeze({
    Login: 'Login',
    Register: 'Register'
})

export default function Authentication({authenticationMode}) {
    const { user, setUser, signUp, signIn } = useUser()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (authenticationMode === AuthenticationMode.Register) {
                await signUp()
                navigate('/signin')
            } else {
                await signIn()
                navigate('/')
            }
        } catch(error) {
            const message = error.response.data ? error.response.data.error : error
            alert(message)
        }
    }

    return (
        <div>
            <h2>{authenticationMode === AuthenticationMode.Login ? 'Sign in' : 'Sign up'}</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <div><input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} /></div>
                </div>

                <div>
                    <label>Password</label>
                    <div><input type='password' value={user.password} onChange={e => setUser({...user, password: e.target.value})} /></div>
                </div>

                <div>
                    <button className='signinupbutton'>{authenticationMode === AuthenticationMode.Login ? 'Login' : 'Submit'}</button>
                </div>

                <div className='signinup'>
                    <Link to={authenticationMode === AuthenticationMode.Login ? '/signup' : '/signin'}>
                        {authenticationMode === AuthenticationMode.Login ? 'No account? Sign up' : 'Already signed up? Sign in'}
                    </Link>
                </div>
            </form>
        </div>
    )
}