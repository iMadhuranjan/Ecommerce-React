import { CommonForm } from "@/common/Form";
import { RegisterFormControls } from "@/config/FormIndex";
import { toast } from "@/hooks/use-toast";
import { registerUser } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const initialData = { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialData);

  const dispath=useDispatch();
  const navigate=useNavigate();
  // console.log(formData);
  function onsubmit(event) {
    event.preventDefault();
    dispath(registerUser(formData)).then((data)=>{
       console.log(data);
       if(data?.payload?.success) {
        toast({
          title: data?.payload?.message
        })
        navigate('/auth/login');
       }else{
        toast({
          title: data?.payload?.message,
          variant:"destructive"
        })
       }
    })
  }
  return (
    <div className="mx-auto w-full space-y-6 h-full">
      <h3 className="text-3xl font-bold tracking-tight text-foreground">
        Create New Account
      </h3>
      <p className=" mt-2">
        Already Have Account?{" "}
        <Link
          to="/auth/login"
          className="hover:underline font-medium  ml-2 text-primary"
        >
          Login
        </Link>
      </p>
      <CommonForm
        formControls={RegisterFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onsubmit}
      ></CommonForm>
    </div>
  );
};

export default Register;
