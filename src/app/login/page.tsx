'use client';

import Checkbox from '@/components/base/checkbox/checkbox';
import Input from '@/components/base/input/input';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import './login.scss';

const Login: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const checkboxHandler = (): void => {
    setIsChecked(!isChecked);
  };
  return (
    <section className="login">
      <div className="login_wrapper">
        <header className="login_header">
          <h1>Login to Noted</h1>
          <div className="login_logo">
            <Link href="/">
              <Image src="/logo.svg" width={100} height={85} alt="Notebook" />
            </Link>
          </div>
        </header>
        <form className="login_form">
          <div className="login_form_row">
            <Input className="login_input" id="email_address" label_text="Email" />
          </div>
          <div className="login_form_row">
            <Input className="login_input" id="password" label_text="Password" />
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
          <button type="button" className="login_button">
            Log in
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
