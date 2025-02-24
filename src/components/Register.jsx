import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";
import { isStrongPassword } from "validator";
import { toast } from "react-toastify";

const Register = () => {
  const { loginWithGoogle, user, register } = useContext(AuthContext);
  const [warning, setWarning] = useState(false);

  // Function for password validation:
  const isPasswordValid = (pass) => {
    return isStrongPassword(pass, {
      minLength: 6,
      minNumbers: 0,
      minSymbols: 0,
      minLowercase: 1,
      minUppercase: 1,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (isPasswordValid(password)) {
      register(name, email, password)
      e.target.reset();
    } else {
      toast("Invalid passowrd!");
      setWarning(true);
    };
  };

  // Navigating logged in users to home page.
  const navigate = useNavigate();
  useEffect(() => {
    user && navigate("/");
  }, [navigate, user]);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl lg:gap-12">
        <div className="text-center lg:text-left px-4 md:px-8 lg:px-12">
          <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold">
            Welcome to CHILL-GAMER!
          </h1>
          <p className="py-6 text-lg opacity-80 font-medium max-w-160">
            Join our gaming community today and start sharing your thoughts on
            your favorite games! Create an account to:
          </p>
          <ul className="pl-12 md:pl-16 list-disc text-left mx-auto">
            <li>Write and share your own game reviews</li>
            <li>Discover new and trending games</li>
            <li>Connect with other passionate gamers</li>
            <li>Rate and discuss your favorite titles</li>
          </ul>
          <p className="text=lg font-medium py-6 opacity-80">
            Sign up now and be part of the ultimate gaming hub! 🎮🔥
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister} className="fieldset">
              <label className="fieldset-label">Name</label>
              <input
                name="name"
                required
                type="text"
                className="input"
                placeholder="Name"
              />
              <label className="fieldset-label">Email</label>
              <input
                name="email"
                required
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="fieldset-label">Password</label>
              <input
                name="password"
                required
                type="password"
                className="input"
                placeholder="Password"
              />
              {warning && <p className="text-warning">Password must be at least 6 characters long and include at least one uppercase letter and one lowercase letter.</p>}
              <button className="btn btn-neutral mt-4">Register</button>
            </form>
            <p>
              Already have an account? Login{" "}
              <Link className="hover:link" to="/login">
                here
              </Link>
              .
            </p>
            <p className="text-center -mb-4">Or</p>
            <button className="btn btn-primary mt-4" onClick={loginWithGoogle}>
              Continue With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
