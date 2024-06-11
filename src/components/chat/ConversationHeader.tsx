import { LuHeart } from "react-icons/lu";

type ConversationHeaderProps = {
    firstName: string;
    lastName: string;
    profilePicture: string;
    status: 'online' | 'offline';
    isFavorite: boolean;
}


const ConversationHeader = ({firstName, lastName, profilePicture, status, isFavorite}: ConversationHeaderProps) => {

    return (
        <div className="border-b h-[80px] w-full flex justify-between items-center py-2 px-5">
            <div className="pl-2 flex gap-3">
                <img src={profilePicture} className="h-16 w-16 object-cover rounded-full"/>
                <div className="flex flex-col">
                    <h1 className="text-xl">{firstName} {lastName}</h1>
                    <p className={`${status === 'online' ? 'text-green-700' : 'text-black'}`}>{status}</p>
                </div>
            </div>

            <LuHeart
                title={`${!isFavorite ? 'add to favorites' : 'remove from favorites'}`}
                size={25}
                className={`${isFavorite ? 'fill-black hover:fill-none' : 'hover:fill-black'} cursor-pointer`}
            />
        </div>
    )

}


export default ConversationHeader;