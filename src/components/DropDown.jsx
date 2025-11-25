import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";


const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData,setUserData] = useState(null)
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

const logout = () => {
  // Remove user session
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");

  // Redirect to home page
  navigate("/");
};


  useEffect(()=>{
    const stored = localStorage.getItem("currentUser")
    if(stored){
        try{
            setUserData(JSON.parse(stored) )
        }catch(e){
            console.error("Failed to Parse",e)
        }
    }
  },[])

 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);


  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleDropdown();
    }
  };

//   const {email} = userData
  return (
    <header className="px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-end items-center">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            onKeyPress={handleKeyPress}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-full"
            aria-label="Open user menu"
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <img
              src={"https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg"}
              alt="User profile"
              className="h-12 w-12 rounded-full  "
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";
              }}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50 transform transition-all duration-200 ease-in-out">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <img
                    src={"https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg"}
                    alt="User profile"
                    className="h-10 w-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8";
                    }}
                  />
                   <div className="flex flex-col">
    <span className="font-semibold text-gray-900 text-lg">{userData?.name}</span>
    <span className="text-sm text-gray-500">{userData?.email}</span>
  </div>
                </div>
              </div>

              <nav className="mt-2">
                

               

                <div className="border-t border-gray-100 mt-2 pt-2">
                  
                  <button
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 ease-in-out"
                  onClick={logout}>
                    <Icon icon="mdi:logout" className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileDropdown;