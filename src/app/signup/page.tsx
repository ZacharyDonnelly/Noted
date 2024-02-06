import Input from '@/components/base/input/input';
import Link from 'next/link';
import './signup.scss';

const Signup: React.FC = () => (
  <section className="signup">
    <div className="signup_wrapper">
      <header className="signup_header">
        <h1>Signup</h1>
        <h2>
          Already have an account?
          <button className="login_link_button" type="button">
            <Link href="/login">Log in</Link>
          </button>
        </h2>
      </header>
      <form className="signup_form">
        <div className="signup_form_row">
          <Input id="full_name" label_text="Full Name" />
          <Input id="email_address" label_text="Email Address" />
        </div>
        <div className="signup_form_row">
          <Input id="password" label_text="Password" />
          <Input className="confirm_input" id="confirm_password" label_text="Confirm Password" />
        </div>
        <button type="button" className="signup_button">
          Create Account
        </button>
      </form>
    </div>
  </section>
);

export default Signup;
