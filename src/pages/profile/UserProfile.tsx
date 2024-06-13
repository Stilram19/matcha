import { Link } from "react-router-dom";
import dummyProfileInfos from "../../components/utils/dummyProfileInfos";
import Gender from "../../components/utils/Gender";
import SexualPreferences from "../../components/utils/SexualPreferences";
import './style.css'
import FameRatingDisplay from "../../components/utils/FameRatingDisplay";
import EditProfileButton from "../../components/profile/EditProfileButton";
import interests from "../../utils/interests";
import EditProfileOverlay from "../../components/profile/EditProfileOverlay";
import { useState } from "react";

function UserProfile() {
    const profileInfos = dummyProfileInfos[2];
    let [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

    function handleEditButtonClick() {
        setIsProfileEditOpen(true);
    }

    function handleEditOverlayClose() {
        setIsProfileEditOpen(false);
    }

    return (
        <div className="flex justify-center mt-5 mr-4 ml-4">
            <div className="mb-6 w-full" style={{maxWidth: 1068}}>
                {isProfileEditOpen ? <EditProfileOverlay profileInfos={profileInfos} handleEditOverlayClose={handleEditOverlayClose}/> : null}
                <div className="w-full flex flex-col lg:flex-row gap-6 mb-6 bg-white">
                    <div className="shadow  rounded-20px w-boxx">
                        <div className="flex gap-11 lg:gap-0 flex-col lg:flex-row items-center mb-8 mt-6 pl-4 pr-4 lg:pl-9 lg:pr-9 rounded-7px round-7px">
                            <div className="relative">
                                <Link to="#">
                                    <div className="mr-4 sm:mr-8 w-60 h-60 sm:w-80 sm:h-80 lg:w-40 lg:h-40 bg-cover bg-no-repeat bg-center rounded-full bg-gray-300"
                                        style={{backgroundImage: `url(${profileInfos.profilePicture})`}}>
                                    </div>
                                        <div className="camera-icon cursor-pointer bg-gray-300 flex w-9 h-9 sm:w-12 sm:h-12 lg:w-9 lg:h-9 rounded-full justify-center items-center">
                                            <i className="icon sm:scale-125 lg:scale-100" style={{backgroundImage: 'url("/icons/facebook-camera-icon.png")', backgroundPosition: '0px -21px', width: '20px', height: '20px', backgroundRepeat: 'no-repeat', display: 'inline-block'}}></i>
                                        </div>
                                </Link>
                            </div>
                            <div className="flex flex-col items-center sm:gap-2">
                                <div className="flex justify-center">
                                    <h3 className="text-center text-34px mr-8 font-bold">{profileInfos.firstName} {profileInfos.lastName}</h3>
                                </div>
                                <div className="flex">
                                    <p className="text-24px" >@{profileInfos.userName}</p>
                                </div>
                                <div className="flex">
                                    <p style={{marginRight: 4, marginBottom: 4}} className="text-25px playfair-display">{profileInfos.age}</p>
                                    <img src="/icons/birthday-cake.svg" alt="birthday cake icon" className="mr-4 w-6 sm:w-8" />
                                    <div className="flex w-5 sm:w-7">
                                        <Gender gender={profileInfos.gender} iconsFolder='/icons/gender'/>
                                    </div>
                                    <div className="flex w-6 sm:w-8">
                                        <SexualPreferences sexualPreference={profileInfos.sexualPreferences} iconsFolder='/icons/sexual-preferences' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center lg:justify-normal gap-5 items-center pl-4 pr-4 lg:pl-9 lg:pr-9 mb-4 lg:mb-9">
                            <EditProfileButton handleEditButtonClick={handleEditButtonClick}/>
                            <FameRatingDisplay starsCount={profileInfos.fameRating}/>
                        </div>
                    </div>
                    <div className="shadow rounded-20px pb-6 pr-3 pl-3 w-boxx">
                        <h2 style={{fontSize: 30, fontWeight: 'semi-bold'}} className="risque-regular pl-2 sm:pt-6 pl-10 pb-6">Biography</h2>
                        <p style={{fontSize: 20}} className="text-center">{profileInfos.biography}</p>
                    </div>
                </div>
                <div className="flex flex-col w-full lg:flex-row gap-6 bg-white">
                    <div className="shadow rounded-20px w-boxx pb-5">
                        <div className="flex justify-between">
                            <h2 style={{fontSize: 30, fontWeight: 'semi-bold'}} className="risque-regular pt-6 pl-2 sm:pl-6 pb-6">Photos</h2>
                            <div>
                                <img src="/icons/upload-photo.svg" alt="uplaod photo svg" className="pt-6 pr-2 sm:pr-6"/>
                            </div>
                        </div>
                        <div className="gallery gallery-padding bt-2 pb-6">
                            {
                                profileInfos && profileInfos.userPhotos && profileInfos.userPhotos.length > 0 ?
                                profileInfos.userPhotos.map((pictureURL) => (
                                    <div className="user-photo gallery-item bg-cover bg-no-repeat bg-center"
                                        style={{backgroundImage: `url(${pictureURL})`}}>
                                    </div>
                                )) : null
                            }
                        </div>
                    </div>
                    <div className="shadow rounded-20px w-boxx">
                        <h2 style={{fontSize: 30, fontWeight: 'semi-bold'}} className="risque-regular pt-6 pl-2 sm:pl-10 pb-6">Interests</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-5 pl-2 lg:pl-7 pr-1 lg:grid-cols-3 grid-rows-7 gap-y-5 gap-x-2 pb-5">
                            {
                                interests.map(
                                    (interst) => (
                                        <div className="flex justify-center tag cursor-pointer max-w-32 fit-box">
                                            <h3>#{interst}</h3>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
