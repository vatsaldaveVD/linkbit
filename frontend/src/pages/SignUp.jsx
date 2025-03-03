import SignUpRightLayout from "../components/layouts/SignUpRightLayout";
import SignUpLeftLayout from "../components/layouts/SignUpLeftLayout";
import { signUp } from "../../services/api";

const SignUp = () => {
  const handleSignUp = async ({ name, email, password }) => {
    try {
      const data = await signUp({ name, email, password });
      console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="contain">
      <SignUpLeftLayout onSignUp={handleSignUp} />
      <SignUpRightLayout />
    </div>
  );
};

export default SignUp;
