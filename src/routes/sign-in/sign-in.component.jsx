import {
  SignInWithGooglePopUp,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await SignInWithGooglePopUp();

    createUserDocumentFromAuth(user);
    console.log(user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}> log with google</button>
    </div>
  );
};

export default SignIn;
