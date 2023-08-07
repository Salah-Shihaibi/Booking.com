import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
  return (
    <div>
      <hr className="mt-6 mb-2 w-full border-t border-gray-400"></hr>
      <button
        className="
 cursor-pointer 
 px-3 py-2 
 rounded
 w-full
 mt-4
 border-2
 hover:border-blue-600
 relative
 "
      >
        <FcGoogle size={25} className="absolute left-20" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default GoogleSignIn;
