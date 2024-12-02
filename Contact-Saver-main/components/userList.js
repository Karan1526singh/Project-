// components/UserList.js
import React from "react";
import {
  Clipboard,
  Copy,
  MoreVertical,
  Pencil,
  Phone,
  MessageCircle,
  Trash,
  Info,
  Locate,
  Map,
  MapPin,
  Tag,
  Hash,
} from "lucide-react";
import { Chip } from "@mui/material";

const UserList = ({
  users,
  toggleShowMoreBox,
  handleCopy,
  copied,
  handleEdit,
  deleteUser,
}) => {
  return (
    <div>
      <ul className="flex flex-col gap-5 ">
        {users
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((user, index) => (
            <div key={user._id} className="shadow-lg border ">
              <li
                className="flex justify-between  items-start py-3 cursor-pointer "
                onClick={() => toggleShowMoreBox(index)}
              >
                <div className="flex gap-3 p-2 cursor-default ">
                  <div>
                    <span className=" bg-green-500 text-xl px-4 py-3 rounded-full text-white font-bold">
                      {user.name.substring(0, 1)}
                    </span>
                  </div>
                  <div className="flex sm:items-center  flex-col sm:flex-row gap-2 sm:gap-20">
                    <span className="capitalize text-2xl font-medium">
                      {user.name.length > 20
                        ? user.name.substring(0, 20) + "..."
                        : user.name}
                    </span>
                    {toggleShowMoreBox && user.showMoreBox ? (
                      <div className="flex sm:items-center gap-3 sm:gap-10 flex-col sm:flex-row">
                        <span className="opacity-80 font-extrabold text-lg">
                          +91 {user.phone}
                        </span>
                        <div className="flex gap-3 flex-wrap">
                          {user.city && (
                            <span>
                              <Chip
                                label={
                                  <span className="flex items-center gap-2 text-lg font-normal opacity-80 pe-1 capitalize">
                                    <MapPin
                                      size={20}
                                      className="text-green-500"
                                    />{" "}
                                    {user.city}
                                  </span>
                                }
                              />
                            </span>
                          )}
                          {user.tag && (
                            <span>
                              <Chip
                                label={
                                  <span className="flex items-center gap-2 text-lg font-normal opacity-80 pe-1 capitalize">
                                    <Hash
                                      size={20}
                                      className="text-green-500"
                                    />{" "}
                                    {user.tag}
                                  </span>
                                }
                              />
                            </span>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                {/* <button
                  className="bg-green-100 hover:bg-green-200 text-black rounded-lg py-1"
                  onClick={() => toggleShowMoreBox(index)}
                >
                  <MoreVertical size={25} />
                </button> */}
              </li>
              {user.showMoreBox && (
                <div className="flex items-center justify-center gap-5 py-3">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white rounded-full p-2"
                    onClick={() => {
                      handleCopy(`${user.name} - ${user.phone}`);
                    }}
                  >
                    {copied ? <Clipboard size={20} /> : <Copy size={20} />}
                  </button>
                  <a href={`tel:+91${user.phone}`} target="_blank">
                    <button className="bg-green-500 hover:bg-green-700 text-white rounded-full p-2">
                      <Phone size={20} />
                    </button>
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=+91${user.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-green-600 hover:bg-green-800 text-white rounded-full p-2">
                      <MessageCircle size={20} />
                    </button>
                  </a>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white rounded-full p-2"
                    onClick={() => handleEdit(user)}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white rounded-full p-2"
                    onClick={() => deleteUser(user._id)}
                  >
                    <Trash size={20} />
                  </button>
                </div>
              )}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default UserList;
