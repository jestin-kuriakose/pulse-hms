// src/features/auth/components/LoginForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Button, TextInput } from "../../../components/ui";

const ErrorMessage = ({ message }) => (
  <div className="rounded-md bg-red-50 p-4 mb-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <ExclamationCircleIcon
          className="h-5 w-5 text-red-400"
          aria-hidden="true"
        />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">Login Error</h3>
        <div className="mt-2 text-sm text-red-700">
          <p>{message}</p>
        </div>
      </div>
    </div>
  </div>
);

const LoginForm = ({ onSubmit }) => {
  const { status, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full w-full gap-8"
    >
      {error && (
        <ErrorMessage
          message={error?.error || "An error occurred during login."}
        />
      )}
      <div className="w-full">
        <TextInput
          placeholder="Email Address"
          type="email"
          register={register}
          required={{
            required: "Email address is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          }}
          name="email"
          errors={errors}
        />
      </div>

      <div className="w-full">
        <TextInput
          placeholder="Password"
          type="password"
          register={register}
          required={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          name="password"
          errors={errors}
        />
      </div>

      <Button
        type="submit"
        isLoading={status === "loading"}>Login</Button>
    </form>
  );
};

export default LoginForm;
