import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { setUser } from "../register-login/userSlice";
import { useDispatch } from "react-redux";

const initialState = {
  password: "Aa12345",
  confirmPassword: "Aa12345",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [frmDt, setFrmDt] = useState(initialState);
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      setError("");
      value.length < 6 && setError("Password is too short");

      !/[0-9]/.test(value) && setError("Must include number");
      !/[A-Z]/.test(value) && setError("Must include uppercase");
      !/[a-z]/.test(value) && setError("Must include lowercase");
    }

    setFrmDt({
      ...frmDt,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, password } = frmDt;

    if (confirmPassword !== password) {
      return toast.error("Password do not match!");
    }

    try {
      const respPromise = createUserWithEmailAndPassword(
        auth,
        frmDt.email,
        password
      );
      toast.promise(respPromise, {
        pending: "please wait",
      });

      const { user } = await respPromise;

      console.log(user);
      if (user?.uid) {
        updateProfile(user, {
          displayName: frmDt.fName,
        });

        //store user profile in firestore database
        const obj = {
          fName: frmDt.fName,
          lName: frmDt.fName,
          email: frmDt.email,
        };

        await setDoc(doc(db, "users", user.uid), obj);

        //set data to redux store
        dispatch(setUser(user));

        toast.success(
          "Your account has been created, redirecting to dashboard now"
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      let msg = error.message;
      console.log(msg);
      if (msg.includes("(auth/email-already-in-use)")) {
        msg =
          "There is another user have this email, please rest your password or change the email";
      }
      toast.error(msg);
    }
  };

  // creating reusable input fields
  const inputFields = [
    { label: "First Name", name: "fName", placeholder: "Sam", required: true },

    { label: "Last Name", name: "lName", placeholder: "Smith", required: true },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Smith@emial.com",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "*****",
      required: true,
      value: frmDt.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      placeholder: "*****",
      required: true,
      value: frmDt.confirmPassword,
    },
  ];

  return (
    <div className="form-container">
      <Form onSubmit={handleOnSubmit} className="border p-5 rounded shadow-lg">
        <h3>Join Our Syste</h3>
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
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
