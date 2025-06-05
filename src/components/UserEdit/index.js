import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UserEdit() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    fetch(`https://f4gvcl-8080.csb.app/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched user data:", data);
        setUser(data);
        setValue("first_name", data.first_name);
        setValue("last_name", data.last_name);
        setValue("location", data.location);
        setValue("occupation", data.occupation);
        setValue("description", data.description);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `https://f4gvcl-8080.csb.app/api/user/update/${userId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application /json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        alert("Success!");
        navigate(`/users/${user._id}`);
      }
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>
      <h2>Edit User</h2>
      <h3>{user._id}</h3>
      <div>
        <label>First name:</label>
        <br />
        <input type="text" {...register("first_name", { required: true })} />
      </div>
      <div>
        <label>Last name:</label>
        <br />
        <textarea {...register("last_name", { required: true })} />
      </div>
      <div>
        <label>Location:</label>
        <br />
        <textarea {...register("location", { required: true })} />
      </div>
      <div>
        <label>Description:</label>
        <br />
        <textarea {...register("description", { required: true })} />
      </div>
      <div>
        <label>Occupation:</label>
        <br />
        <textarea {...register("occupation", { required: true })} />
      </div>
      <br />
      <button type="submit">Edit</button>
    </form>
  );
}
