import { DmListType } from "../../types";

// Dm bar
const   MessageBar = (props: DmListType) => {

    return (
        <div className="w-full p-1 h-20 flex items-center gap-2  hover:bg-gray-200 cursor-pointer">
            <div className="relative">
                {(props.unreadCount != 0 || props.status === 'online') &&
                    <span
                        className={`${props.status === 'online' ? "bg-green-500" : "bg-red-600"} absolute right-0 flex items-center justify-center w-[16px] h-[16px] font-semibold text-white rounded-full text-xs`}
                    >
                            {props.unreadCount !== 0 ? props.unreadCount : ""}
                    </span>
                }
                <img
                src={props.profilePicture}
                alt="Profile"
                className={`min-w-[60px] max-w-[60px] min-h-[60px] max-h-[60px] rounded-full object-cover ${props.status === 'online' ? 'bg-green-500' : 'bg-gray-500' }`} />
            </div>
            <div className="flex flex-col overflow-hidden">
                <h1 className="text-lg truncate">
                    {`${props.firstName} ${props.lastName}`}
                </h1>
                <p className="text-gray-500 truncate text-sm">
                    {props.lastMessage}
                </p>
            </div>
        </div>
    )
}


export default MessageBar;