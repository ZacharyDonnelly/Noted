'use client';

import Button from '@/components/base/button';
import Checkbox from '@/components/base/checkbox';
import Input from '@/components/base/input';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import './signup.scss';

const Signup: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

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
        <form className="signup_form">
          <div className="signup_form_row">
            <Input className="signup_input" id="email_address" label_text="Email" />
          </div>
          <div className="signup_form_row">
            <Input className="signup_input" id="password" label_text="Password" />
          </div>
          <div className="signup_form_row">
            <Input className="signup_input" id="confirm_password" label_text="Confirm Password" />
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
          <Button className="signup_button">
            <Link href="/dashboard">Create account</Link>
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
