'use client';

import Checkbox from '@/components/base/checkbox/checkbox';
import Input from '@/components/base/input/input';
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
        <header>
          <h1>Sign up for Noted</h1>
          {/* <p>
          Already have an account?
          <button className="login_link_button" type="button">
            <Link href="/login">Log in</Link>
          </button>
        </p> */}
        </header>
        <form className="signup_form">
          <div className="signup_form_row">
            <Input className="signup_input" id="email_address" label_text="Email" noSpacing />
          </div>
          <div className="signup_form_row">
            <Input className="signup_input" id="password" label_text="Password" noSpacing />
          </div>
          <div className="signup_form_row">
            <Input className="signup_input" id="confirm_password" label_text="Confirm Password" noSpacing />
          </div>
          <Checkbox
            id="remember_me"
            name="remember_me"
            labelText="Remember me"
            changeHandler={checkboxHandler}
            checked={isChecked}
          />
          <button type="button" className="signup_button">
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
