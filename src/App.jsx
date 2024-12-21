import { Footer, Header, Container } from "./components";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import spinner from "/spinner.svg";
import appwriteService from "./appwrite/config";
import { addPost } from "./store/postSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const userStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (userStatus === true) {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          dispatch(addPost(posts));
        }
      });
    }
  }, []);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen box-border bg-gradient-to-t from-indigo-950 via-slate-800 to-black text-white ">
      <Header />
      <Container>
        <main className="min-h-64 p-4">
          <Outlet />
        </main>
      </Container>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen box-border bg-gradient-to-t from-indigo-950 via-slate-800 to-black text-white ">
      <img src={spinner} alt="" className="w-24 mx-auto my-auto h-screen" />
    </div>
  );
}

export default App;
