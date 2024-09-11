import { TextField, Button, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './RegLogin.css'
import LoginIcon from '@mui/icons-material/Login';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export default function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({})
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)


    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
        setError(false)
    }

    const Login = (e) => {
        e.preventDefault()
        console.log('LoginValue', login)
        let regiter = JSON.parse(localStorage.getItem('Register'))
        console.log('registerValue', regiter)

        let value = regiter?.filter((e) => {
            return e.email == login.email && e.password === login.password
        })
        console.log('FilterValue', value)

        let LoginToken = value[0]?.id


        if (value?.length > 0) {
            console.log('Login successfull')

            localStorage.setItem('Token', JSON.stringify(LoginToken))

            setLoader(true)
            setTimeout(() => {
                setLoader(false)
                setSuccess(true)
            }, [2000])

            setTimeout(() => {
                navigate('/index')
            }, 2500)

        }
        else {
            console.error('email or password incorrect')
            console.log('error')
            setLoader(true)

            setTimeout(() => {
                setError(true)
                setLoader(false)
            }, [2000])
        }
    }
    return (
        <>
            <center>
                <div className="main">
                    <div>
                        <img style={{ width: '600px' }} src={'https://image.freepik.com/free-vector/login-concept-illustration_114360-739.jpg'} alt="" />
                    </div>
                    <div className="register-container">
                        <form onSubmit={Login}  >
                            <h1 >Login</h1>
                            <div className='input'>
                                <TextField required placeholder='Enter Your Email' name='email' onChange={handleChange} />
                            </div>

                            <div className='input'>
                                <TextField required placeholder='Enter Your password' name='password' onChange={handleChange} />
                            </div>

                            <Tooltip title='Register'>
                                <Button type='submit' color='success' >

                                    <LoginIcon style={{ fontSize: '50px' }} />


                                </Button>
                            </Tooltip>
                            <br />
                            <br />

                            {loader && (
                                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                    <CircularProgress />
                                </Box>
                            )}

                            {
                                success && (
                                    <p style={{ color: 'green' }}><code>Login succussfull</code></p>
                                )
                            }
                            {
                                error && (
                                    <p style={{ color: 'red' }}><code>incorrect email or password</code></p>
                                )
                            }

                            <p className='loginregkey'>Don't have an account ?  <Link to='/' style={{ textDecoration: 'none' }}>Signup</Link></p>

                        </form>
                    </div>
                </div>


            </center>
        </>
    )
}
