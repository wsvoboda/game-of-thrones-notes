import React, { useState } from 'react';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  IconButton,
  Box,
  Button,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userDetailsSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [passwordMatchMessage, setPasswordMatchMessage] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(false);
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (isLoggingIn) {
      const sendUser = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: values.email, password: values.password1 }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await sendUser.json()
      if (data.message) {
        setPasswordMessage(true)
      } else {
        dispatch(loginUser(data));
        navigate('/')
      }
    } else {
      if (values.password1 !== values.password2) {
        setPasswordMatchMessage(true);
      } else {
        const sendUser = await fetch('http://localhost:8000/users/register', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await sendUser.json()
        if (data.message) {
          setRegisterMessage(true)
        } else {
          dispatch(loginUser(data))
          navigate('/')
        }
      }
    }
  }

  return (
    <div className='login-container'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        { !isLoggingIn &&
          <>
            <TextField
                label='First Name'
                value={values.firstName}
                onChange={handleChange('firstName')}
                variant='outlined'
                sx={{ m: 0.5, width: '25%' }}
              />
            <TextField
              label='Last Name'
              value={values.lastName}
              onChange={handleChange('lastName')}
              variant='outlined'
              sx={{ m: 0.5, width: '25%' }}
            />
          </>
        }
        <TextField
          label='Email Address'
          value={values.email}
          onChange={handleChange('email')}
          variant='outlined'
          sx={{ m: 0.5, width: '25%' }}
        />
        <FormControl sx={{ m: 0.5, width: '25%' }} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
          <OutlinedInput
            type={values.showPassword ? 'text' : 'password'}
            value={values.password1}
            onChange={handleChange('password1')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'>
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>
        { !isLoggingIn &&
          <FormControl sx={{ m: 0.5, width: '25%' }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-password'>Re-enter Password</InputLabel>
            <OutlinedInput
              type={values.showPassword ? 'text' : 'password'}
              value={values.password2}
              onChange={handleChange('password2')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
        }
        <Button variant="contained" sx={{ backgroundColor: 'rgba(142, 40, 38)' }} onClick={(e) => handleButtonClick(e)}>{ isLoggingIn ? 'Login': 'Register' }</Button>
        <div className='register-link-container'>
          <p>{isLoggingIn ? 'First time here? ' : 'Have an account? ' }</p>
          <p className='register-link' onClick={() => setIsLoggingIn(!isLoggingIn)}>{ isLoggingIn ? 'Create an account' : 'Login' }</p>
        </div>
        { passwordMatchMessage && <Typography>Both entered passwords must match</Typography> }
        { passwordMessage && <Typography>Entered password is incorrect</Typography> }
        { registerMessage && <Typography>An account with that email address already exists</Typography> }
      </Box>
    </div>
  );
};

export default Login;
