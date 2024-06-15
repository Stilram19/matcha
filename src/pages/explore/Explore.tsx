import { FaArrowRight, FaHeart } from "react-icons/fa"
import { GrMapLocation } from "react-icons/gr"
import { ImCross, ImFilter } from "react-icons/im"
import { TbGenderMale } from "react-icons/tb"
import interests from "../../utils/interests"
import dummyProfileInfos from "../../components/utils/dummyProfileInfos"
import FameRatingDisplay from "../../components/utils/FameRatingDisplay"
import { BioAndInterestsProps, MatchedUserSummaryProps } from "./types"
import { useState } from "react"
import FilterOverlay from "../../components/explore/FilterOverlay"

const CheckBox = ({label}: {label: string}) => {
    return (
        <div className="flex items-center gap-2">
            <input
                type="checkbox"
                className="w-5 h-5 focus:ring-2  rounded-lg"
            />
            <label htmlFor="" className=" text-gray-600">{label}</label>
        </div>
    )
}

const ExploreSideBar = () => {
    return (
        <div className="w-full h-full p-4">
            <div className="w-full">
                <h1 className="text-lg font-semibold">Sort by</h1>
                <div className="flex flex-wrap gap-5">
                    <CheckBox label="Age" />
                    <CheckBox label="Fame rating" />
                    <CheckBox label="Location" />
                    <CheckBox label="Common tags" />
                </div>
            
                <h1 className="text-lg font-semibold mt-5">Match with</h1>
            </div>
        </div>
    )
}

const   MatchedUserSummary = ({firstName, lastName, gender}: MatchedUserSummaryProps) => {
    return (
        <div className="flex flex-col sm:gap-1">
            <h1 className="text-2xl lg:text-3xl text-white font-semibold whitespace-nowrap">{firstName} {lastName}</h1>
            <div className="w-28 sm:w-36">
                <FameRatingDisplay starsCount={5} size={30}/>
            </div>
            <div className="flex items-center gap-1 mb-3">
                <GrMapLocation className="stroke-sky-300" size={20}/>
                <h2 className="text-lg lg:text-xl text-sky-300 font-semibold whitespace-nowrap">6 Km, Morroco</h2>
                <span className="px-2 bg-sky-950 flex items-center gap-1 w-max text-white font-semibold rounded-full">
                    <TbGenderMale size={20} />22
                </span>
            </div>
        </div>
    )
}

function BioAndInterests({biography}: BioAndInterestsProps) {
    return (
        <div className="flex-col md:pr-4 shadow md:overflow-y-auto md:scrollbar rounded-20px md:aspect-[2/3]">
            <div className="pb-6 pr-3 pl-3">
                <h2 style={{fontSize: 30, fontWeight: 'semi-bold'}} className="risque-regular pl-2 sm:pt-6 pl-10 pb-6">Biography</h2>
                <p style={{fontSize: 20}} className="text-center">{biography}</p>
            </div>
            <div className="">
                <h2 style={{fontSize: 30, fontWeight: 'semi-bold'}} className="risque-regular pt-6 pl-2 sm:pl-10 pb-6">Interests</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 pl-2 lg:pl-7 pr-1 grid-cols-3 grid-rows-7 gap-y-5 gap-x-2 pb-5">
                    {
                        interests.map(
                            (interest, index) => (
                                <div id={`Interest-${index + 1}`} className="flex justify-center tag cursor-pointer max-w-32 fit-box">
                                    <h3>#{interest}</h3>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const   MatchedProfile = () => {
    const profileInfos = dummyProfileInfos[2];

    return (
        <div className="flex flex-row gap-10 w-full h-full max-h-full md:max-h-screen w-full pb-20 md:w-11/12 lg:w-9/12 2xl:w-8/12">
            <div className="md:w-1/2 md:overflow-y-auto md:scrollbar overflow-x-hidden">
                <div className="relative aspect-[2/3] mb-10 pr-1 md:pr-4 pt-1 md:pt-3">
                    <img src={profileInfos.profilePicture} className="w-full h-full object-cover rounded-2xl shadow-lg shadow-blue-500" />
                    <div className="absolute bottom-4 left-7 w-[50%]">
                        <MatchedUserSummary firstName={profileInfos.firstName} lastName={profileInfos.lastName} gender={profileInfos.gender}/>
                    </div>
                </div>
                <div className="md:hidden md:w-1/2 overflow-x-hidden overflow-y-hidden md:overflow-y-auto md:scrollbar mb-10">
                    <BioAndInterests biography={profileInfos.biography}/>
                </div>
                <h2 style={{fontSize: 30, fontWeight: 'semi-bold'}} className="risque-regular pt-6 pl-2 sm:pl-6 pb-6">Photos</h2>
                {
                    profileInfos && profileInfos.userPhotos && profileInfos.userPhotos.length > 0 ?
                    profileInfos.userPhotos.map((pictureURL) => (
                        <div className="relative aspect-[2/3] overflow-y-auto scrollbar overflow-x-hidden mb-6 pr-4">
                            <img src={pictureURL} className="w-full h-full object-cover rounded-2xl shadow-lg shadow-blue-500" />
                        </div>
                    )) : null
                }
            </div>

            <div className="md:w-1/2 md:overflow-y-auto md:scrollbar overflow-x-hidden hidden md:inline-flex">
                <BioAndInterests biography={profileInfos.biography}/>
            </div>
        </div>
    )
}

const Explore = () => {
    let [isFilterOverlayOpen, setIsFilterOverlayOpen] = useState(false);

    function handleFilterOverlayClose() {
        setIsFilterOverlayOpen(false);
    }

    function handleFilterButtonClick() {
        setIsFilterOverlayOpen(true);
    }

    return (
        <div className="flex justify-center w-screen pl-4 pr-4 md:pl-6 md:pr-6 lg:pl-10 lg:pr-10 xl:pl-32 xl:pr-32 2xl:pl-44 2xl:pr-44">
            <div className={isFilterOverlayOpen == false ? 'hidden' : ''}>
                <FilterOverlay handleFilterOverlayClose={handleFilterOverlayClose}/>
            </div>
            <div className="pt-4 flex justify-center md:pt-6 w-screen">
                <MatchedProfile />
            </div>
            <div className="fixed z-20 pb-4 bottom-1 flex justify-center gap-2 sm:gap-4">
                <button  onClick={handleFilterButtonClick} className="bg-blue-950 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:scale-125 transition-transform duration-300 ease-in-out">
                    <ImFilter className="fill-white" size={30} />
                </button>
                <button className="bg-blue-950 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:scale-125 transition-transform duration-300 ease-in-out">
                    <ImCross className="fill-white" size={24} />
                </button>
                <button className="bg-blue-950 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:scale-125 transition-transform duration-300 ease-in-out">
                    <FaHeart className="fill-white" size={30} />
                </button>
                <button className="bg-blue-950 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center hover:scale-125 transition-transform duration-300 ease-in-out">
                    <FaArrowRight className="fill-white" size={34} />
                </button>
            </div>
        </div>
    )
}


export default Explore;