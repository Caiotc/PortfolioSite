import { useState } from "react";
import "./sign-up-form.styles.scss";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("!@# CHEGOU NO HANDLER");
    if (password !== confirmPassword) {
      console.log("!@# e igual");
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
      await createUserDocumentFromAuth(response.user, { displayName });
    } catch (error) {
      console.log("!@# errror =>", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  return (
    <div className="sign-up-container">
      <h2>dont have an account? </h2>
      <span>Sign up with your email and password</span>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <FormInput
          label="Display Name"
          name="displayName"
          type="text"
          value={displayName}
          required
          onChange={handleChange}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={email}
          required
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          required
          onChange={handleChange}
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          required
          onChange={handleChange}
        />

        <Button type="submit">sign up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
