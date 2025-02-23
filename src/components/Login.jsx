import { useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
  const { loginWithGoogle } = useContext(AuthContext);
  const handleLogin = () => {};
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row max-w-6xl">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6 text-lg opacity-80 font-medium">
            Welcome back, gamer! Log in to explore, review, and share your
            thoughts on your favorite games.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin} className="fieldset">
              <label className="fieldset-label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="fieldset-label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </form>
            <p>
              Don&apos;t have an account? Register{" "}
              <Link className="hover:link" to="/register">
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

export default Login;
