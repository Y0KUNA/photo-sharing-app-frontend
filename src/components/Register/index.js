import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const [newUser, setNewUser] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://383889-8080.csb.app/api/user/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        setNewUser("User created successfully!");
      } else {
        setNewUser("User creation failed!");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setNewUser("User creation failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 10 }}>
        <h2>Register</h2>

        {/* Username */}
        <label>Username:</label>
        <br />
        <input type="text" {...register("username", { required: true })} />
        {errors.username && (
          <div style={{ color: "red" }}>Username is required</div>
        )}
        <br />

        {/* Password */}
        <label>Password:</label>
        <br />
        <input type="password" {...register("password", { required: true })} />
        {errors.password && (
          <div style={{ color: "red" }}>Password is required</div>
        )}
        <br />

        {/* Confirm Password */}
        <label>Confirm password:</label>
        <br />
        <input
          type="password"
          {...register("repassword", {
            required: "Confirm password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.repassword && (
          <div style={{ color: "red" }}>{errors.repassword.message}</div>
        )}
        <br />

        {/* First Name */}
        <label>First Name:</label>
        <br />
        <input type="text" {...register("first_name", { required: true })} />
        {errors.first_name && (
          <div style={{ color: "red" }}>First name is required</div>
        )}
        <br />

        {/* Last Name */}
        <label>Last Name:</label>
        <br />
        <input type="text" {...register("last_name", { required: true })} />
        {errors.last_name && (
          <div style={{ color: "red" }}>Last name is required</div>
        )}
        <br />

        {/* Location */}
        <label>Location:</label>
        <br />
        <input type="text" {...register("location")} />
        <br />

        {/* Occupation */}
        <label>Occupation:</label>
        <br />
        <input type="text" {...register("occupation")} />
        <br />

        {/* Description */}
        <label>Description:</label>
        <br />
        <textarea {...register("description")} rows={3} />
        <br />

        {/* Submit */}
        <button type="submit">Create user</button>
        <p className="text-success">{newUser}</p>
      </div>
    </form>
  );
}
