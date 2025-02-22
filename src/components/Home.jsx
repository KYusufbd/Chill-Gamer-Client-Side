import { useContext } from "react";
import ApiContext from "../contexts/ApiContext";

const Home = () => {
  const { api } = useContext(ApiContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const user = { name, email, phone };
    fetch(`${api}/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    e.target.reset();
  };

  return (
    <div className="card-body w-64 max-w-full mx-auto">
      <form className="fieldset" onSubmit={handleSubmit}>
        <label className="fieldset-label">Name</label>
        <input name="name" type="text" className="input" placeholder="Name" />
        <label className="fieldset-label">Email</label>
        <input
          name="email"
          type="email"
          className="input"
          placeholder="Email"
        />
        <label className="fieldset-label">Phone Number</label>
        <input
          name="phone"
          type="text"
          className="input"
          placeholder="Phone no."
        />
        <button className="btn btn-primary mt-4">Create User</button>
      </form>
    </div>
  );
};

export default Home;
