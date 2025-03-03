import SignInLeftLayout from "../components/layouts/SignInLeftLayout";
import SignInRightLayout from "../components/layouts/SignInRightLayout";
import { signIn } from "../../services/api";
import { useAuth } from "../AuthContext";

const SignIn = () => {
  const { login } = useAuth();

  const handleSignIn = async ({ email, password }) => {
    try {
      const data = await signIn({ email, password });
      console.log(data.message);
      login(data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="contain">
      <SignInLeftLayout onSignIn={handleSignIn} />
      <SignInRightLayout />
    </div>
  );
};

export default SignIn;
