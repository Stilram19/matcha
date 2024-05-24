import { LuHeart } from "react-icons/lu";


const RecipiantBar = () => {

    return (
        <div className="border-b h-[80px] w-full flex justify-between items-center py-2 px-5">
            <div className="flex gap-3">
                <img src="/imgs/man_placeholder.jpg" className="h-16 w-16 object-cover rounded-full"/>
                <div className="flex flex-col">
                    <h1 className="text-xl">Hellis steve</h1>
                    <p className=" text-green-700">online</p>
                </div>
            </div>

            <LuHeart title="add to favorites" size={25} className="hover:fill-black cursor-pointer" />
        </div>
    )

}


export default RecipiantBar;