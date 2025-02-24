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
    <div className="card-body w-full mx-auto">
     <h1 className="text-5xl font-medium mx-auto">Home page!</h1>
    </div>
  );
};

export default Home;
