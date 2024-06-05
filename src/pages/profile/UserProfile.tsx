import { Link } from "react-router-dom";
import dummyProfileInfos from "../../components/utils/dummyProfileInfos";
import Gender from "../../components/utils/Gender";
import SexualPreferences from "../../components/utils/SexualPreferences";
import './style.css'
import FameRatingDisplay from "../../components/profile/FameRatingDisplay";
import EditProfileButton from "../../components/profile/EditProfileButton";
import interests from "../../utils/interests";

function UserProfile() {
    const profileInfos = dummyProfileInfos[2];

    return (
        <div>
            <div className="flex gap-6 mb-6 ml-3 mt-3 mr-3 sm:ml-6 sm:mr-6 sm:mt-6 md:mt-8 md:ml-8 md:mr-8 lg:ml-10 lg:mr-10 xl:ml-32 xl:mr-32 2xl:ml-44 2xl:mr-44 bg-white">
                <div className="shadow rounded-20px w-half-screen">
                    <div className="flex items-center mb-8 mt-6 pl-4 pr-4 lg:pl-9 lg:pr-9 rounded-7px round-7px">
                        <div className="relative">
                        <Link to="#">
                            <div className="mr-4 sm:mr-8 w-24 h-24 sm:w-40 sm:h-40 lg:h-40 lg:w-40 bg-cover bg-no-repeat bg-center rounded-full bg-gray-300"
                                style={{backgroundImage: `url(${profileInfos.profilePicture})`}}>
                            </div>
                            <div className="camera-icon cursor-pointer bg-gray-300 flex w-9 h-9 rounded-full justify-center items-center">
                                <i className="icon" style={{backgroundImage: 'url("https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/hfjAwSdyy_q.png?_nc_eui2=AeFRzzF6RFSaKa5NqNeSjbYLP2sBdEzmTIY_awF0TOZMhjmZSTMcROisGoFSFM4XWopkFp4TGp_K_0C3b-4xJ00M")', backgroundPosition: '0px -21px', width: '20px', height: '20px', backgroundRepeat: 'no-repeat', display: 'inline-block'}}></i>
                            </div>
                        </Link>
                        </div>
                        <div className="flex flex-col sm:gap-2">
                            <div className="flex">
                                <h3 className="text-fullname mr-8 font-bold">{profileInfos.firstName} {profileInfos.lastName}</h3>
                            </div>
                            <div className="flex">
                                <p className="text-username" >@{profileInfos.userName}</p>
                            </div>
                            <div className="flex">
                                <p style={{marginRight: 4, marginBottom: 4}} className="text-age playfair-display">{profileInfos.age}</p>
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
                    <div className="flex gap-5 items-center pl-4 pr-4 lg:pl-9 lg:pr-9 mb-4 lg:mb-9">
                        <EditProfileButton />
                        <FameRatingDisplay starsCount={profileInfos.fameRating}/>
                    </div>
                </div>
                <div className="shadow rounded-20px w-half-screen pr-5 pl-5">
                    <h2 style={{fontSize: 30, fontWeight: 'semi-bold'}} className="risque-regular pt-6 pl-10 pb-6">Biography</h2>
                    <p style={{fontSize: 20}} className="text-center">{profileInfos.biography}</p>
                </div>
            </div>
            <div className="flex gap-6 mb-6 ml-3 mt-3 mr-3 sm:ml-6 sm:mr-6 sm:mt-6 md:mt-8 md:ml-8 md:mr-8 lg:ml-10 lg:mr-10 xl:ml-32 xl:mr-32 2xl:ml-44 2xl:mr-44 bg-white">
                <div className="shadow rounded-20px w-half-screen pr-5 pl-5">
                    <div className="flex justify-between">
                        <h2 style={{fontSize: 30, fontWeight: 'semi-bold'}} className="risque-regular pt-6 pl-6 pb-6">Photos</h2>
                        <div>
                            <img src="/icons/upload-photo.svg" alt="uplaod photo svg" className="pt-6"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2">
                        {
                            profileInfos && profileInfos.userPhotos && profileInfos.userPhotos.length > 0 ?
                            profileInfos.userPhotos.map((pictureURL) => (
                                <div className="user-photo w-24 h-24 sm:w-40 sm:h-40 lg:h-40 lg:w-40 bg-cover bg-no-repeat bg-center"
                                    style={{backgroundImage: `url(${pictureURL})`}}>
                                </div>
                            )) : null
                        }
                    </div>
                </div>
                <div className="shadow rounded-20px w-half-screen pr-5 pl-5">
                    <h2 style={{fontSize: 30, fontWeight: 'semi-bold'}} className="risque-regular pt-6 pl-10 pb-6">Interests</h2>
                    <div className="grid grid-cols-3 grid-rows-7 gap-2 pb-5">
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
    )
}

export default UserProfile;
