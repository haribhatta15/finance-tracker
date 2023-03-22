import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { auth } from "../../firebase/firebase-config";
import { setUser } from "../register-login/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formDt, setFormDt] = useState({});
  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    user?.uid && navigate("/dashboard");
  }, [user?.uid, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormDt({
      ...formDt,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formDt;

    try {
      const respPending = signInWithEmailAndPassword(auth, email, password);

      toast.promise(respPending, {
        pending: "please wait",
      });

      const { user } = await respPending;
      if (user?.uid) {
        dispatch(setUser(user));
      }
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/wrong-password)")) {
        msg = "Invalid login credentials";
      }
      toast.error(msg);
    }
  };

  const inputFields = [
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
    },
  ];

  return (
    <div className="mt-5">
      <Form onSubmit={handleOnSubmit} className="border p-5 rounded shadow-lg">
        <h3>Welcome back!</h3>
        <hr />

        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Login;
