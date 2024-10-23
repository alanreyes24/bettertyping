import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./LoginPopup.css";
import axios from "axios";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export function LoginForm({ sendUsernameToHeader, showHide }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      //   let userID = response.data.userID;
      sendUsernameToHeader(response.data.username);
      // await passLoggedIn(userID, confirmedUsername);
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
      console.log(error.response ? error.response.data : error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          username,
          password,
        }
      );
      sendUsernameToHeader(response.data.username);
    } catch (error) {
      setError(error.response ? error.response.data : "An error occurred");
      console.error(
        "Error registering:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <>
      <div className='fixed top-0 left-0 bg-[#090909a0] w-[100vw] h-[100vh] -z-10 ' onClick={() => { showHide() }}></div>
      <Card className='mx-auto max-w-sm login-container border rounded-lg blur-none'>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign In</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <form
          className='login-form'
          onSubmit={showRegister ? handleRegister : handleLogin}>
          <CardContent className='w-64'>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='name'>Username</Label>
                <Input
                  className="bg-secondary"
                  id='name'
                  type='username'
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  className="bg-secondary"
                  id='password'

                  type='password'
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <a href='#' className='mx-auto inline-block text-sm underline'>
                Forgot your password?
              </a> */}
              {error}
              <Button className='login-button' type='submit'>
                {showRegister ? "Register" : "Login"}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              {showRegister ? "Already have an account? " : "Don't have an account? "}

              <a
                className='toggle-link text-primary-foreground'
                onClick={() => setShowRegister(!showRegister)}>
                {showRegister ? " Login " : "Register"}
              </a>
            </div>
          </CardContent>
        </form>
      </Card>
    </>
  );
}

export default LoginForm;
