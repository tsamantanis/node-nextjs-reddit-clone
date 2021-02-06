import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useCookies } from "react-cookie"
import styles from '../styles/Auth.module.css'
function SignUp() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [cookie, setCookie] = useCookies(["user"])
    async function handleSubmit(event) {
        event.preventDefault()
        if (!username || username.length === 0 || !password || password.length === 0) {
            setError('Please fill out all fields')
            return
        }
        try {
            const res = await axios.post(process.env.NEXT_APP_URI + '/users/sign-up', {
                username: username,
                password: password,
            })
            setCookie("user", JSON.stringify(res.data.authToken), {
                path: "/",
                maxAge: 900000, // Expires after 1hr
                sameSite: true,
            })
            router.push("/")
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className={styles.container}>
            <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                <form onSubmit={ handleSubmit } method="post">
                    <legend>
                        <h2>Sign Up</h2>
                    </legend>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                setError('')
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setError('')
                            }}
                        />
                    </div>
                    { error && error.length > 0 &&
                        <div className="form-group text-center">
                            <small className="text-danger">
                                {error}
                            </small>
                        </div>
                    }
                    <div className='text-center mt-2'>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
