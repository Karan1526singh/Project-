"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "./heading";
import UserList from "./userList";
import UserForm from "./UserForm";
import SearchButton from "./searchButton";

const MainPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State to hold filtered users
  const [formVisible, setFormVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    phone: "",
    city: "",
    tag:"",
    _id: "",
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filtered users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`/api/users/${currentUser._id}`, currentUser);
      } else {
        await axios.post("/api/users", currentUser);
      }
      setFormVisible(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const resetForm = () => {
    setCurrentUser({
      name: "",
      phone: "",
      city: "",
      tag:"",
      _id: "",
    });
    setEditMode(false);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to delete this user permanently?")) {
      try {
        await axios.delete(`/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setEditMode(true);
    setFormVisible(true);
  };

  const handleCopy = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1000); // Reset copied state after 1 second
        })
        .catch((error) => {
          console.error("Failed to copy text:", error);
        });
    } else {
      // Fallback for browsers/devices that do not support navigator.clipboard
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset copied state after 1 second
      } catch (error) {
        console.error("Failed to copy text:", error);
      }
    }
  };

  const toggleShowMoreBox = (index) => {
    const updatedUsers = filteredUsers.map((user, idx) => ({
      ...user,
      showMoreBox: idx === index ? !user.showMoreBox : false,
    }));
    setFilteredUsers(updatedUsers);
  };

  // Function to handle search input changes
  const handleSearch = (query) => {
    if (query) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); // Reset to full list if search query is cleared
    }
  };

  return (
    <div>
      {users.length === 0 ? (
        <div className="flex flex-col gap-5 items-center justify-center w-full h-screen">
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
          <h1 className="text-4xl text-green-500 font-bold">Loading</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-5 my-5 px-5 sm:px-60">
          <Heading />
          <SearchButton
            onSearch={handleSearch}
            users={users}
            formVisible={formVisible}
            setFormVisible={setFormVisible}
            setEditMode={setEditMode}
            setCurrentUser={setCurrentUser}
          />
          {!users ? (
            <div className="text-center my-52">Loading...</div>
          ) : (
            <UserList
              users={filteredUsers} // Pass filtered users here
              toggleShowMoreBox={toggleShowMoreBox}
              handleCopy={handleCopy}
              copied={copied}
              handleEdit={handleEdit}
              deleteUser={deleteUser}
            />
          )}

          {formVisible && (
            <UserForm
              handleSubmit={handleSubmit}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              editMode={editMode}
              setEditMode={setEditMode}
              formVisible={formVisible}
              setFormVisible={setFormVisible}
            />
          )}

        </div>
      )}
    </div>
  );
};

export default MainPage;
