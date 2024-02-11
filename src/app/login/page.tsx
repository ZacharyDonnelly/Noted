'use client';

import { Button, Checkbox, Input } from '@/components/base';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './login.scss';

const Login: React.FC = () => {
  const { handleSubmit, register } = useForm();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const submitHandler = handleSubmit(async ({ email, password }) => {
    try {
      signIn('domain-login', {
        email,
        password,
        callbackUrl: 'http://localhost:3000/dashboard'
      });
    } catch (error) {
      console.error(`Error logging in: ${error}`);
      throw new Error(`Error logging in: ${error}`);
    }
  });

  const checkboxHandler = (): void => {
    setIsChecked(!isChecked);
  };

  return (
    <section className="login">
      <div className="login_wrapper">
        <header className="login_header">
          <h1>Login</h1>
          <div className="login_logo">
            <Link href="/">
              <Image src="/logos/logo.svg" width={100} height={85} alt="Notebook" />
            </Link>
          </div>
        </header>
        <form className="login_form" onSubmit={() => submitHandler()}>
          <div className="login_form_row">
            <Input
              type="email"
              className="login_input"
              id="email"
              label_text="Email Address"
              register={register}
              validationSchema={{
                required: 'Email address is required',
                minLength: {
                  value: 3,
                  message: 'Please enter a valid email address'
                }
              }}
            />
          </div>
          <div className="login_form_row">
            <Input
              type="password"
              className="login_input"
              id="password"
              label_text="Password"
              register={register}
              validationSchema={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Please enter a valid password'
                }
              }}
            />
          </div>
          <div className="checkbox_row">
            <Checkbox
              id="remember_me"
              name="remember_me"
              labelText="Remember me"
              changeHandler={checkboxHandler}
              checked={isChecked}
            />
          </div>
          <Button className="login_button" onClick={() => submitHandler()}>
            Log in
          </Button>
        </form>
        <div className="login_oauth_buttons">
          <p className="continue_with">Or continue with</p>
          <div className="oauth_button_group">
            <Button className="google_oauth_button" btnText="Google" onClick={() => signIn('google')} mask>
              <Image src="/icons/google.svg" width={20} height={20} alt="Sign in with Google" />
            </Button>
            <Button className="github_oauth_button" btnText="Github" onClick={() => signIn('github')} mask>
              <Image src="/icons/github.svg" width={20} height={20} alt="Sign in with Github" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
