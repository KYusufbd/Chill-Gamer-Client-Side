function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const user = { name, email, phone };
    fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    e.target.reset();
  };

  return (
    <div
      data-theme="light"
      className="card bg-base-100 w-full h-screen shrink-0 shadow-2xl flex flex-col justify-center items-center">
      <div className="card-body">
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
          <button className="btn btn-neutral mt-4">Create User</button>
        </form>
      </div>
    </div>
  );
}

export default App;
