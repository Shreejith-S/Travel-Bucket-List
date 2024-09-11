import { TextField, Button, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import './RegLogin.css'
import DownhillSkiingIcon from '@mui/icons-material/DownhillSkiing';
import img from './PersonAdmin.png'
import { TrendingUpTwoTone } from '@mui/icons-material';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import regLogo from './RegisterLogo.png'
import travellogo from './travel logo.png'
export default function Register() {
    let navigate = useNavigate()

    let initregister = JSON.parse(localStorage.getItem('Register')) || []
    const [register, setRegister] = useState(initregister)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Eror, setIsError] = useState(false)
    const [loader, setLoader] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleEmail = (e) => {
        setEmail(e.target.value)
        setIsError(false)
    }
    const Register = (e) => {
        e.preventDefault()

        let id;
        if (register.length == 0) {
            id = 101;
        }
        else {
            id = register[register.length - 1].id + 1;
        }

        //check entered email already exists
        console.log('Email', email)
        console.log('Password', password)

        let value = register.filter((e) => {
            return e.email == email
        })

        console.log('Value', value)
        if (value.length > 0) {
            console.log('Email already Exists')
            setIsError(true)
        }
        else {
            const newRegister = {
                id: id,
                email: email,
                password: password,

            }
            setRegister([...register, newRegister])
            localStorage.setItem('Register', JSON.stringify(register))
            setLoader(true)
            setTimeout(() => {
                setLoader(false)
                setSuccess(true)
            }, [2000])
            setTimeout(() => {
                navigate('/login')
            }, 2500)

        }
    }



    useEffect(() => {
        localStorage.setItem('Register', JSON.stringify(register))


    }, [register,])

    return (
        <>
            <h1 style={{ color: 'grey', fontWeight: "normal", }}>
                <span style={{ position: 'relative', left: '50px' }}>
                    Welcome to Travel Bucket List
                </span>
            </h1>
            <center>
                <div className="main">
                    <div>
                        <img style={{ width: '700px' }} src={'https://www.allen.ac.in/apps2223/assets/images/login.jpg'} alt="" />
                    </div>

                    <div className="register-container">

                        <form onSubmit={Register} method='post' action='/'>
                            <h1 >Register</h1>
                            <div className='input'>
                                <TextField required placeholder='Enter Your Email' name='email' onChange={handleEmail} />

                                {/* email exists error */}
                                {Eror && (
                                    <span style={{ color: 'red' }}><code>email already exists</code></span>
                                )}
                            </div>



                            <div className='input'>
                                <TextField required placeholder='Enter Your password' name='password' onChange={(e) => setPassword(e.target.value)} />

                            </div>

                            <Tooltip title='Register'>
                                <Button type='submit' color='success' >

                                    {/* <DownhillSkiingIcon style={{ fontSize: '50px' }} /> */}
                                    <img style={{ width: '80px' }} src={regLogo} alt="" />


                                </Button>
                            </Tooltip>
                            {success && (
                                <p style={{ color: 'green' }}><code>register succussfull</code></p>
                            )}
                            <br />
                            <br />
                            {loader && (
                                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                    <CircularProgress />
                                </Box>
                            )}
                            <p className='loginregkey'>Already have an account ? <Link to='/login' style={{ textDecoration: 'none' }}>Signin</Link></p>

                        </form>
                    </div>
                </div>


            </center >
        </>
    )
}
