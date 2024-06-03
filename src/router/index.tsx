import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import ProfileSetup from "../pages/profile_setup/ProfileSetup";
import GuestLayout from "../layouts/GuestLayout";
import SetupLayout from "../layouts/SetupLayout";
import SignUp from "../pages/auth/signup";
import LandingPage from "../pages/LandingPage";
import Chat from "../pages/chat/Chat";
import PersonalInfo from "../pages/profile_setup/PersonalInfo";
import CompleteInfo from "../pages/profile_setup/CompleteInfo";
import InterestTag from "../pages/profile_setup/InterestTag";
import Home from "../pages/home/Home";
import HomeV2 from "../pages/home/Home1";
import UserProfile from "../pages/profile/UserProfile";
import LoggedInLayout from "../layouts/LoggedInLayout";
import SearchResults from "../pages/searchResults/SearchResults";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout><LandingPage /></GuestLayout>
    },
    {
      path: '/login',
      element: <GuestLayout><Login /></GuestLayout>
    },
    {
      path: '/signup',
      element: <GuestLayout><SignUp/></GuestLayout>
    },
    {
      path: '/complete-info',
      
      element: <SetupLayout><CompleteInfo /></SetupLayout>,
      children: [
        {
          path: '1',
          element: <PersonalInfo />,
        },
        {
          path: '2',
          element: <InterestTag />,
        },
        {
          path: '3',
          element: <ProfileSetup />,
        },
        {
          path: '*',
          element: <div>404 Not Found -_-</div>,
        },
      ],
    },    
    {
      path: '/home',
      element: <LoggedInLayout><Home /></LoggedInLayout>
    },
    {
      path: '/home1',
      element: <LoggedInLayout><HomeV2 /></LoggedInLayout>
    },
    {
      path: '/chat',
      element: <LoggedInLayout><Chat/></LoggedInLayout>
    },
    {
      path: '/user-profile',
      element: <LoggedInLayout><UserProfile/></LoggedInLayout>
    },
    {
      path: '/search-results',
      element: <LoggedInLayout><SearchResults/></LoggedInLayout>
    },
]);

export default router;