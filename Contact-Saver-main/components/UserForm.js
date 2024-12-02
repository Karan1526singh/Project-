// components/UserForm.js
import { Plus, X } from "lucide-react";
import React from "react";

const UserForm = ({
  handleSubmit,
  currentUser,
  setCurrentUser,
  editMode,
  setEditMode,
  formVisible,
  setFormVisible,
}) => {
  // General handler for field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Function to handle changes in additional fields

  return (
    <div className="backdrop-blur-3xl  fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <X
        onClick={() => {
          setFormVisible(false);
          setEditMode(false);
        }}
        size={50}
        className="cursor-pointer absolute top-5 right-5 bg-white rounded-full p-2 text-xl"
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          className="shadow-lg text-xl appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          placeholder="Enter User Name"
          value={currentUser.name}
          onChange={handleFieldChange}
          required
        />
        <input
          className="shadow-lg text-xl appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="tel"
          name="phone"
          placeholder="User Phone Number"
          value={currentUser.phone}
          onChange={(e) => {
            const inputPhone = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
            if (/^\d{0,10}$/.test(inputPhone)) {
              // Allow up to 10 digits
              setCurrentUser({ ...currentUser, phone: inputPhone });
            }
          }}
          maxLength={10}
          minLength={10}
          required
        />
        <input
          className="shadow-lg text-xl appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="city"
          placeholder="User City (optional)"
          value={currentUser.city || ""}
          onChange={handleFieldChange}
        />
        <input
          className="shadow-lg text-xl appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="tag"
          placeholder="Relationship (optional)"
          value={currentUser.tag || ""}
          onChange={handleFieldChange}
        />

        <button
          type="submit"
          className={`
            ${
              editMode
                ? "bg-yellow-500 hover:bg-yellow-700 "
                : "bg-green-500 hover:bg-green-700 "
            } text-white text-xl font-bold py-4 px-4 rounded`}
        >
          {editMode ? "Edit User" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
