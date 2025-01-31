// import necessary libraries

import Layout from '@/components/layout';
import classes from '@/styles/Auth.module.css';
import { useRouter } from 'next/router';
import { Button, TextField, Stack } from '@mui/material';
import gradient from '../assets/gradient.jpg';
import Image from 'next/image';
import signInUser from '@/firebase/signInUser';
import createUser from '@/firebase/createUser';
import { useState } from 'react';
import { Get } from '@/api';
import { AuthErrorCodes } from 'firebase/auth';

export default function Auth() {
  // initialise constants
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // define sign-in and sign-out behaviour
  const signIn = () => {
    if (!email || !password) {
      window.alert('Both email and password required');
      return;
    }

    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      window.alert('Email address not of correct format');
      return;
    }

    signInUser(email, password).then(async () => {
      // save session to cookies and go to dashboard page
      localStorage.session = JSON.stringify((await Get('newsession')).response);
      router.push('/dashboard')
    }).catch(err => window.alert(err.message));
  }

  const signUp = () => {
    if (!email || !password) {
      window.alert('Both email and password required');
      return;
    }

    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      window.alert('Email address not of correct format');
      return;
    }

    createUser(email, password).then(async () => {
      // save session to cookies and go to onboarding page
      localStorage.session = JSON.stringify((await Get('newsession')).response);
      router.push('/onboarding')
    }).catch(err => {
      if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
        window.alert('User with email already exists!')
      }
    });
  }

  // return the JSX element, contained within the Layout container
  return (
    <Layout title="Continue to Chorer">
      <div className={classes.content}>
        <Image src={gradient} alt="A gradient background image" className={classes.background} />
        <div className={classes.inner}>
          <Stack direction="column" spacing={8}>
            <h1>Continue to Chorer</h1>
            <div>
              <TextField placeholder="Email" variant="outlined" type="email" onChange={e => setEmail(e.target.value)} />
              <TextField placeholder="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
            </div>
            <Stack direction="row" spacing={4}>
              <Button variant="outlined" color="primary" onClick={signIn}>Sign In</Button>
              <Button variant="outlined" color="secondary" onClick={signUp}>Sign Up</Button>
            </Stack>
          </Stack>
        </div>
      </div>
    </Layout>
  )
}
