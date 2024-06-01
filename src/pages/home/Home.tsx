import { FaArrowRight, FaHeart, FaStar } from "react-icons/fa"
import { GrMapLocation } from "react-icons/gr"
import { IoBookmark, IoClose } from "react-icons/io5"
import { TbGenderMale } from "react-icons/tb"

const CheckBox = ({label}) => {
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

const HomeSideBar = () => {
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

const   MatchedUserSummary = () => {
    return (
        <div>
            <h1 className="text-3xl text-white font-semibold">John Steve</h1>

            <div className="flex items-center gap-2 mb-3">
                <GrMapLocation className="stroke-sky-300" size={20}/>
                <h2 className="text-xl text-sky-300 font-semibold">6 Km, Morroco</h2>
            </div>

            <span className="px-2 bg-sky-950 flex items-center gap-1 w-max text-white font-semibold rounded-full">
                <TbGenderMale size={20} />22
            </span>
        </div>
    )
}


const   MatchedProfile = () => {
    const   stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(i);
    }

    return (
            <div className="w-full h-full flex justify-center">
                    <div className="w-[60%] flex flex-col">
                        <div className="w-full relative h-[75%]">
                            <img src="/imgs/man_placeholder.jpg" className="w-full h-full object-cover rounded-2xl shadow-lg shadow-blue-500" />
                            <div className="absolute bottom-4 left-7 w-[50%]">
                                <MatchedUserSummary />
                            </div>

                            <div className="absolute bottom-4 right-5 border  z-10 flex gap-1 p-2 px-3 rounded-full bg-white">
                                {
                                    stars.map((index) => {
                                        return <FaStar key={index} className={`fill-yellow-500 ${index == stars.length - 1 ? 'fill-gray-300' : ''}`} size={25}/>
                                    })
                                }
                            </div>

                            <div className="absolute top-0 right-0 h-full w-16 flex items-center justify-center rounded-e-2xl backdrop-blur-lg bg-black/30 bg-opacity-30">
                                <FaArrowRight className="fill-white cursor-pointer hover:fill-slate-500" size={25} />
                            </div>
                        </div>

                        <h1 className="text-3xl mt-6 mb-3 font-semibold">Bio</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elitelt. Phasellus justo nunc, gravida eget felis non, tincidunt maximus nulla.</p>
                    </div>
            </div>
    )
}



const Home = () => {
    return (
        <div className="flex justify-around w-screen h-[calc(100vh-80px)]">
            <div className="w-1/4 border-r">
                <HomeSideBar />
            </div>
            <div className="w-3/4 relative flex justify-center">
                <div className="pt-10 h-full">
                    <MatchedProfile />
                </div>

                <div className="absolute bottom-1 flex justify-center gap-2">
                    <button className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-in-out">
                        <IoBookmark className="fill-white" size={30} />
                    </button>
                    <button className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-in-out">
                        <IoClose className="fill-white" size={30} />
                    </button>
                    <button className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-in-out">
                        <FaHeart className="fill-white" size={30} />
                    </button>
                </div>

            </div>
            {/* <div className="relative"> */}
            {/* </div> */}
        </div>
    )
}


export default Home;