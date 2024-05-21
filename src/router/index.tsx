import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import ProfileSetup from "../pages/profile_setup/ProfileSetup";
import GuestLayout from "../layouts/GuestLayout";
import SetupLayout from "../layouts/SetupLayout";
import SignUp from "../pages/auth/signup";
import LandingPage from "../pages/LandingPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout><LandingPage /></GuestLayout>
    }, {
      path: '/login',
      element: <GuestLayout><Login /></GuestLayout>
    }, {
      path: '/signup',
      element: <GuestLayout><SignUp/></GuestLayout>
    },
    {
      path: '/complete_info3',
      element: <SetupLayout>
                < ProfileSetup />
              </SetupLayout>
}]);

export default router;