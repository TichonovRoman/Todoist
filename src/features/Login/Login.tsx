import React, {useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {fetchTodolistsTC} from "../TodolistsList/todolists-reducer";
import {setAppStatusAC} from "../../app/app-reducer";
import {useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {AppRootStateType} from "../../app/store";
import {Navigate, useNavigate} from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => {

        return state.auth.isLoggedIn
    })

       useEffect(() => {
        dispatch(setAppStatusAC({status: "succeeded"}))
    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'The password must be more than 3 characters';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            },
    })

   if (isLoggedIn) {

       navigate("/")
   }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            {...formik.getFieldProps('email')}
                            label="Email"
                            margin="normal"
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: "red"}}>{formik.errors.email}</div>}

                        <TextField
                            {...formik.getFieldProps('password')}
                            type="password"
                            label="Password"
                            margin="normal"
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: "red"}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                checked={formik.values.rememberMe}
                                {...formik.getFieldProps('rememberMe')}
                            />
                            }/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>


                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}