import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { Link } from "react-router-dom";
import CustomInput from "../../components/custom-input/CustomInput";
import { auth } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Spinner } from "react-bootstrap";

const Register = () => {
  const [frmDt, setFrmDt] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setError("");
      value.length < 6 && setError("Password is too short");

      // conditions for password
      !/[0-9]/.test(value) && setError("Must include number");
      !/[A-Z]/.test(value) && setError("Must include uppercase");
      !/[a-z]/.test(value) && setError("Must include lowercase");
    }

    setFrmDt({
      ...frmDt,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, password, email } = frmDt;
    if (confirmPassword !== password) {
      return toast.error("Password did not match!");
    }

    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const inputFields = [
    {
      label: "First Name",
      name: "fName",
      placeholder: "David",
      required: true,
    },

    { label: "Last Name", name: "lName", placeholder: "Smith", required: true },

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
    <div className="form-container">
      <Form onSubmit={handleOnSubmit} className="border p-5 rounded shadow-lg">
        <h3 className="text-center"> Register Form </h3>
        <hr />

        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="p3">
          <Form.Text>
            Password should be longer than 6 charcters contain at least one
            number, one uppercase and one lowercase.
            {error && (
              <ul>
                <li className="text-danger fw-bolder">{error}</li>
              </ul>
            )}
          </Form.Text>
        </div>

        <Button variant="primary" type="submit" disabled={error}>
          {isLoading ? <Spinner animation="border" /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default Register;
