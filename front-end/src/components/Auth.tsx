import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@rayyan21d/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  // trpc is a library for extremely safe type inputs
  const [postInputs, setPostInputs] = useState<SignupInput>({
    username: "",
    email: "",
    password: "",
  });

  async function handleRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        postInputs
      );

      console.log(response);

      if (response.status == 200) {
        const jwt = response.data.token;
        console.log(jwt);
        localStorage.setItem("token", jwt);
        navigate("/blogs");
      } else {
        console.log("Error Signing up/ loging in");
      }
    } catch (e) {
      console.log(e);
      console.log("Error");
    } finally {
      // Redirect to the feed
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="flex justify-center">
        <div className="">
          <div className="font-extrabold text-3xl px-8">Create an account</div>

          <div className="text-gray-400 px-8">
            {type === "signup"
              ? "Already have an account ? "
              : "Don't have an account? "}
            <Link
              className="underline"
              to={type === "signup" ? "/signin" : "/signup"}
            >
              {type === "signup" ? "Log In" : "Sign Up"}
            </Link>
          </div>

          <div className="pt-4">
            {type === "signup" ? (
              <LabelInput
                label="Username"
                placeholder="Enter your username"
                onChange={(e) => {
                  setPostInputs({
                    // Spread operator keeps existing keys the same
                    ...postInputs,
                    username: e.target.value,
                  });
                }}
              />
            ) : null}

            <LabelInput
              label="Email"
              placeholder="@example.com"
              onChange={(e) => {
                setPostInputs({
                  // Spread operator keeps existing keys the same
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />

            <LabelInput
              label="Password"
              placeholder="******"
              type="password"
              onChange={(e) => {
                setPostInputs({
                  // Spread operator keeps existing keys the same
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />

            <button
              type="button"
              onClick={handleRequest}
              className="text-white bg-[#050708]  font-medium rounded-lg text-md px-5 py-2 text-center w-full mt-4 mb-2"
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div>
      <label className="block mb-2 pt-2 text-sm font-bold dark:text-black">
        {label}
      </label>
      <input
        type={type || "text"}
        onChange={onChange}
        className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2 text-black"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
export default Auth;
