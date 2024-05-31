import { LuHeart } from "react-icons/lu";

type ConversationHeaderProps = {
    full_name: string;
    status: string;
}


const ConversationHeader = ({full_name, status}: ConversationHeaderProps) => {

    return (
        <div className="border-b h-[80px] w-full flex justify-between items-center py-2 px-5">
            <div className="flex gap-3">
                <img src="/imgs/man_placeholder.jpg" className="h-16 w-16 object-cover rounded-full"/>
                <div className="flex flex-col">
                    <h1 className="text-xl">{full_name}</h1>
                    <p className=" text-green-700">{status}</p>
                </div>
            </div>

            <LuHeart title="add to favorites" size={25} className="hover:fill-black cursor-pointer" />
        </div>
    )

}


export default ConversationHeader;