import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";


const Body = () =>{
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter( [
    {
        path:"/",
        element: <Login/>
    },
    {
      path:"/browse",
        element: <Browse/>
    }
  ]);

   useEffect(() =>  {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayname} = user;
        dispatch(addUser({ uid: uid, email: email, displayname: displayname}));
      } else {
        dispatch(removeUser());
      }
    });
   },[]);
  return (
     <div>
     <RouterProvider router={appRouter} />
     </div>
  );
};
 export default Body;