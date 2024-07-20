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
import Explore from "../pages/explore/Explore";
import ExploreV2 from "../pages/explore/Explore1";
import UserProfile from "../pages/profile/UserProfile";
import LoggedInLayout from "../layouts/LoggedInLayout";
import SearchResults from "../pages/searchResults/SearchResults";
import History from "../pages/history/History";
import VerifyEmail from "../pages/auth/emailVerification";
import ResetPassword from "../pages/auth/resetVerification";
import { useEffect } from "react";
import NotificationPage from "../pages/notification/NotificationPage";


const Test = () => {

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/blah", {credentials: 'include'});
      const data = await res.json();

      console.log(data);
  })()
  }, [])

  return <div>
    hello
  </div>
}

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
      path: '/emailVerification',
      element: <GuestLayout><VerifyEmail/></GuestLayout>
    },
    {
      path: '/passwordReset',
      element: <GuestLayout><ResetPassword/></GuestLayout>
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
      path: '/explore',
      element: <LoggedInLayout><Explore /></LoggedInLayout>
    },
    {
      path: '/explore1',
      element: <LoggedInLayout><ExploreV2 /></LoggedInLayout>
    },
    {
      path: '/chat',
      element: <LoggedInLayout><Chat/></LoggedInLayout>
    },
    {
      path: '/profile/:userId',
      element: <LoggedInLayout><UserProfile/></LoggedInLayout>
    },
    {
      path: '/history',
      element: <LoggedInLayout><History/></LoggedInLayout>
    },
    {
      path: '/search-results',
      element: <LoggedInLayout><SearchResults/></LoggedInLayout>
    },
    {
      path: '/notifications',
      element: <LoggedInLayout><NotificationPage /></LoggedInLayout>
    },
    {
      path: '/test',
      element: <Test></Test>
    },
]);

export default router;