'use client';

import { Button, Checkbox, Input } from '@/components/base';
import { signIn, useSession } from 'next-auth/react';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FC } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import './login.scss';

const Login: FC = () => {
  const { status } = useSession();
  const { handleSubmit, register } = useForm<FieldValues, string, FieldValues>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const isAuthenticated: boolean = status === 'authenticated';
  const router: AppRouterInstance = useRouter();

  useEffect((): void => {
    if (isAuthenticated) {
      router.back();
    }
  }, [isAuthenticated, status, router]);

  const submitHandler = handleSubmit(({ email, password }): void => {
    void (async () => {
      try {
        await signIn('domain-login', {
          email,
          password,
          callbackUrl: 'http://localhost:3000/dashboard'
        });
      } catch (error) {
        console.error(`Error logging in: ${error}`);
      }
    })();
  });

  const oAuthHandler = (provider: string): void => {
    void (async () => {
      try {
        await signIn(provider);
      } catch (error) {
        console.error(`Error logging in with ${provider}: ${error}`);
      }
    })();
  };

  const checkboxHandler = (): void => setIsChecked(!isChecked);

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
        <form className="login_form" onSubmit={submitHandler}>
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
          <Button className="login_button" onClick={submitHandler}>
            Log in
          </Button>
        </form>
        <div className="login_oauth_buttons">
          <p className="continue_with">Or continue with</p>
          <div className="oauth_button_group">
            <Button className="google_oauth_button" btnText="Google" onClick={() => oAuthHandler('google')} mask>
              <Image src="/icons/google.svg" width={20} height={20} alt="Sign in with Google" />
            </Button>
            <Button className="github_oauth_button" btnText="Github" onClick={() => oAuthHandler('google')} mask>
              <Image src="/icons/github.svg" width={20} height={20} alt="Sign in with Github" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
