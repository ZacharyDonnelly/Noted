'use client';

import Checkbox from '@/components/base/checkbox/checkbox';
import Input from '@/components/base/input/input';
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
            <h1>Sign up for Noted</h1>
            <div className="signup_logo">
              <Link href="/">
                <Image src="/logo.svg" width={100} height={85} alt="Notebook" />
              </Link>
            </div>
          </div>
          <p>
            Already have an account?
            <button className="login_link_button" type="button">
              <Link href="/login">Log in</Link>
            </button>
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
          <button type="button" className="signup_button">
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
