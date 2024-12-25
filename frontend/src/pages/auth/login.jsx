import { CommonForm } from "@/common/Form";
import { LoginFormControls } from "@/config/FormIndex";
import { useToast } from "@/hooks/use-toast";
import { loggedInUser } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const initialData = { email: "", password: "" };
  const [formData, setFormData] = useState(initialData);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function onsubmit(event) {
    event.preventDefault();
    dispatch(loggedInUser(formData))
      .then((result) => {
        if (result?.payload?.success) {
          toast({
            title: result?.payload?.message,
          });
        } else {
          toast({
            title: result?.payload?.message,
            variant:"destructive"
          });
        }
      })
      .catch((err) => {
        // console.log(err.message);
      });
  }
  return (
    <div className="mx-auto w-full space-y-6 h-full">
      <h3 className="text-3xl font-bold tracking-tight text-foreground">
        Login to Your Account
      </h3>
      <p className=" mt-2">
        Don't have an Accout ?{" "}
        <Link
          to="/auth/register"
          className="hover:underline font-medium  ml-2 text-primary"
        >
          Register
        </Link>
      </p>
      <CommonForm
        formControls={LoginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onsubmit}
      ></CommonForm>
    </div>
  );
};

export default Login;
