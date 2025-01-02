import React, { useState } from "react";
import not from "../assets/notification.png"
const NotificationBell = ({ notifications }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-gray-700 hover:text-black focus:outline-none"
      >
        <span className="material-icons text-3xl"><img className="w-8 h-8" src={not}/></span>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="text-sm text-gray-800">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className="p-2 border-b last:border-b-0 hover:bg-gray-100"
                >
                  {notification}
                </li>
              ))
            ) : (
              <li className="p-2 text-center">No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
