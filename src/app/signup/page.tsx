'use client';

import Button from '@/components/base/button';
import Checkbox from '@/components/base/checkbox';
import { useFormRegister } from '@/utils/hooks/useFormRegister';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import './signup.scss';

const Signup: React.FC = () => {
  const { register, handleSubmit } = useFormRegister();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const signInHandler = (name: string, email: string, password: string, confirmPassword: string) => {
    signIn('credentials', {
      email,
      name,
      password,
      confirmPassword,
      callbackUrl: 'http://localhost:3000/dashboard'
    });
  };

  const submitHandler = handleSubmit(async ({ name, email, password, confirmPassword }) => {
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
    } else {
      console.error('failed');
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
            {/* <Input
              className="signup_input"
              id="email_address"
              label_text="Email"
            /> */}
            <input type="text" {...register('name', { required: true })} />
          </div>
          <div className="signup_form_row">
            {/* <Input
              className="signup_input"
              id="email_address"
              label_text="Email"
            /> */}
            <input type="text" {...register('email', { required: true })} />
          </div>
          <div className="signup_form_row">
            {/* <Input
              className="signup_input"
              id="password"
              label_text="Password"
              {...register('password', { required: true })}
            /> */}
            <input type="password" {...register('password', { required: true })} />
          </div>
          <div className="signup_form_row">
            {/* <Input
              className="signup_input"
              id="confirm_password"
              label_text="Confirm Password"
            /> */}
            <input type="password" {...register('confirmPassword', { required: true })} />
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
