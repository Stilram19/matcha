import Login from "./components/auth/login"
import ProfileSetup from "./components/complete_info/ProfileSetup";
import Navbar from "./components/Navbar"
import "./style/index.css"
import { createBrowserRouter } from 'react-router-dom';
import {  RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
      path: '/',
      element: <>Hello</>
  }, {
    path: '/login',
    element: <Login />
  },
  {
    path: '/complete_info3',
    element: < ProfileSetup />
  }]);

function App() {
  return (
    <div className="">
      <Navbar />
      <main className="">
        <RouterProvider router={router}/>
      </main>
    </div>
  )
}

export default App
