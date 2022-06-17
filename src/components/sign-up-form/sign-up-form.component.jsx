import { useState } from "react";
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
    <div>
      <h1>Sign up with your email and password</h1>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <label> Display Name</label>
        <input
          name="displayName"
          type="text"
          value={displayName}
          required
          onChange={handleChange}
        />

        <label> Email</label>
        <input
          name="email"
          type="email"
          value={email}
          required
          onChange={handleChange}
        />

        <label> Password</label>
        <input
          name="password"
          type="password"
          value={password}
          required
          onChange={handleChange}
        />

        <label> Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          required
          onChange={handleChange}
        />

        <button type="submit">sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
