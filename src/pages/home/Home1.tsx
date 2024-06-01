import { FaHeart } from "react-icons/fa"
import { GrMapLocation } from "react-icons/gr"
import { IoClose } from "react-icons/io5"

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

const MatchedCard = () => {

    return (
        <div className="border w-full h-[400px] rounded-lg">
            <div className="w-full h-[65%]">
                <img src="/imgs/man_placeholder.jpg" className="w-full h-full object-cover object-top"/>
            </div>

            <div className="bg-blue-100 w-full h-[35%] px-1 relative">
                <h1 className="text-xl">John Steve</h1>
                <div className="flex items-center gap-2 mb-1">
                    <GrMapLocation className="stroke-gray-500" size={18}/>
                    <h2 className="text-lg text-gray-500">6 Km, Morroco</h2>
                </div>
                <div className="w-full h-[40%] overflow-hidden">
                    <p className=" ">Lorem ipsum dolor sit amet, consectetur adipiscing elitelt. Phasellus justo nunc, gravida eget felis non, tincidunt maximus nulla.</p>
                </div>
               
               <div className="absolute bottom-1 flex justify-center w-full gap-2">
                    <button className="bg-pink w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-in-out">
                            <IoClose className="fill-white" size={20} />
                    </button> 

                    <button className="bg-pink w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-in-out">
                            <FaHeart className="fill-white" size={15} />
                    </button> 
               </div>
               
                {/* <button className="bg-blue-950 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 ease-in-out">
                        <FaHeart className="fill-white" size={30} />
                </button> */}
            </div>
        </div>
    )

}

const HomeV2 = () => {

    return (
        // pt-[71px]
        <div className="w-screen h-[calc(100vh-80px)] flex">
            <div className="w-[20%] border-r h-full">
                <HomeSideBar />
            </div>
            <div className="w-[80%] h-full p-3 flex justify-center overflow-y-auto scrollbar">
                <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <MatchedCard />
                    <MatchedCard />
                    <MatchedCard />
                    <MatchedCard />
                    <MatchedCard />
                    <MatchedCard />
                    <MatchedCard />
                    <MatchedCard />
                    <MatchedCard />
                    <MatchedCard />
                </div>

            </div>
        </div>
    )

}


export default HomeV2;