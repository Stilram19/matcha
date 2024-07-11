import { DmListType } from "../../types";

// Dm bar
const   MessageBar = (props: DmListType) => {

    return (
        <div className="w-full p-1 h-20 flex items-center gap-2  hover:bg-gray-200 cursor-pointer">
            <img
            src={props.profilePicture}
            alt="Profile"
            className={`p-0.5 min-w-[68px] max-w-[68px] min-h-[68px] max-h-[68px] rounded-full object-cover ${props.status === 'online' ? 'bg-green-500' : 'bg-gray-500' }`} />
            <div className="flex flex-col overflow-hidden">
                <h1 className="text-xl truncate">
                    {`${props.firstName} ${props.lastName}`}
                </h1>
                <p className="text-gray-500 truncate">
                    {props.lastMessage}
                </p>
            </div>
        </div>
    )
}


export default MessageBar;