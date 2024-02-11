'use client';

import Button from '@/components/base/button';
import Checkbox from '@/components/base/checkbox';
import Input from '@/components/base/input';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './signup.scss';

const Signup: React.FC = () => {
  const { handleSubmit, register } = useForm();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const signInHandler = (name: string, email: string, password: string, confirmPassword: string) => {
    if (password === confirmPassword) {
      signIn('domain-signup', {
        name,
        email,
        password,
        confirmPassword,
        callbackUrl: 'http://localhost:3000/dashboard'
      });
    } else {
      console.error('Passwords do not match');
      throw new Error('Passwords do not match');
    }
  };

  const submitHandler = handleSubmit(async ({ name, email, password, confirmPassword }) => {
    try {
      const data = await axios.post(
        `http://localhost:3000/api/auth/user?name=${name}&email=${email}&password=${password}&confirmPassword=${confirmPassword}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (data.status === 200) {
        signInHandler(name, email, password, confirmPassword);
      }
    } catch (error) {
      console.error(`Error logging in: ${error}`);
      throw new Error(`Error logging in: ${error}`);
    }
  });

  const checkboxHandler = (): void => {
    setIsChecked(!isChecked);
  };
  return (
    <section className="signup">
      <div className="signup_wrapper">
        <header className="signup_header">
          <div className="signup_logo_box">
            <h1>Create account</h1>
            <div className="signup_logo">
              <Link href="/">
                <Image src="/logos/logo.svg" width={100} height={85} alt="Notebook" />
              </Link>
            </div>
          </div>
          <p>
            Already have an account?
            <Button className="login_link_button">
              <Link href="/login">Log in</Link>
            </Button>
          </p>
        </header>
        <form className="signup_form" onSubmit={() => submitHandler()}>
          <div className="signup_form_row">
            <Input
              type="text"
              className="signup_input"
              id="name"
              label_text="Name"
              register={register}
              validationSchema={{
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Please enter a valid name'
                }
              }}
            />
          </div>
          <div className="signup_form_row">
            <Input
              type="email"
              className="signup_input"
              id="email"
              label_text="Email address"
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
          <div className="signup_form_row">
            <Input
              type="password"
              className="signup_input"
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
          <div className="signup_form_row">
            <Input
              type="password"
              className="signup_input"
              id="confirmPassword"
              label_text="Confirm Password"
              register={register}
              validationSchema={{
                required: 'Confirm password is required',
                minLength: {
                  value: 6,
                  message: 'Please enter a matching password'
                }
              }}
            />
          </div>
          <div className="checkbox_row">
            <Checkbox
              id="signup_toc_checkbox"
              name="signup_toc_checkbox"
              labelText="I agree to the terms and privacy policy"
              changeHandler={checkboxHandler}
              checked={isChecked}
            />
          </div>
          <Button className="signup_button" onClick={() => submitHandler()}>
            Create account
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
