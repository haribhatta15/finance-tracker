import React from "react";
import Register from "../register/Register";

const Login = () => {
  const [formDT, setFrmDt] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
  };

  const inputFields = [
    {
      label: "First Name",
      name: "fName",
      placeholder: "David",
      required: true,
    },

    {
      label: "Last Name",
      name: "lName",
      placeholder: "Smith",
      required: true,
    },

    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "david123@email.com",
      required: true,
    },

    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "*******",
      required: true,
    },

    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "*******",
      required: true,
    },
  ];
  return (
    <div>
      <Form onSubmit={handleOnSubmit} className="border p-5 rounded shadow-lg">
        <h3 className="text-center"> Welcome Back </h3>
        <hr />

        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid"></div>

        <Button variant="primary" type="submit" disabled={error}>
          {isLoading ? <Spinner animation="border" /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
