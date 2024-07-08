import { AiFillMessage } from "react-icons/ai";
import { FaHeart, FaUserFriends } from "react-icons/fa";
import { MessageBarProps } from "../../types";
import { ChatListProps } from "../../types/ChatListProps";
import { FC, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { IconType } from "react-icons";

type TabsType = 'dms' | 'favorites' | 'matchs';
interface ChatListHeaderType {
    currentTab: TabsType;
    onTabChange: (tab: TabsType) => void;
}

interface TabIconType {
    currentTab: TabsType;
    tab: TabsType;
    onClick: (tab: TabsType) => void;
    Icon: IconType;
}

function getFilteredDms(dms: MessageBarProps[], tab: TabsType) {
    if (tab === 'dms')
        return (dms);
    if (tab === 'favorites')
        return dms.filter((element) => element.isFavorite);
    return (dms);
}

// Dm bar
const   MessageBar = (props: MessageBarProps) => {

    return (
        <div className="w-full p-1 h-20 flex items-center gap-2  hover:bg-gray-200 cursor-pointer">
            <img src={props.profilePicture} alt="Profile" className="min-w-16 max-w-16 min-h-16 max-h-16 rounded-full object-cover" />
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

const TabIcon = ({currentTab, onClick, tab, Icon} : TabIconType) => {
    const active = currentTab === tab;

    return (
        <Icon
            size={22}
            title={tab}
            className={`${active ? 'fill-pink' : ''} cursor-pointer hover:fill-pink`}
            onClick={() => onClick(tab)}
        />
    )
}


const   ChatListHeader: FC<ChatListHeaderType> = ({onTabChange, currentTab}) => {
    

    return (
        <div className="p-2 mb-2">
            <div className="flex justify-between items-center mb-1">
                <h1 className="text-lg font-semibold">{currentTab}</h1>
                <div className="flex gap-2">
                    <TabIcon currentTab={currentTab} tab="dms" onClick={onTabChange} Icon={AiFillMessage} />
                    <TabIcon currentTab={currentTab} tab="favorites" onClick={onTabChange} Icon={FaHeart} />
                    <TabIcon currentTab={currentTab} tab="matchs" onClick={onTabChange} Icon={FaUserFriends} />
                </div>
            </div>

            <div className="relative">
                <div className="absolute top-0 bottom-0 ps-3 flex items-center">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="search Chats"
                    className="w-full outline-none p-2 border border-e0 placeholder:text-lg rounded-lg ps-10" />
            </div>
        </div>
    )
}

// const   ChatList: FC<ChatListProps> = ({onClick}) => {
//     const [tab, setTab] = useState<TabsType>('dms');
//     const tabMap = new Map<TabsType, any>([['dms', ChatListHeader]]);


//     // for favorites section, when it gets clicked, i'll filter the messages by the isFavorite property
//     return (
//         <div className="w-full h-full pb-1">
//             {/*  */}
//                 <ChatListHeader currentTab={tab} onTabChange={onTabChange} />
//             {/* </div> */}


//             <div className="flex flex-col max-h-[calc(100%-100px)] overflow-y-auto scrollbar">

//             </div>

//         </div>
//     )
// }


const   ChatList: FC<ChatListProps> = ({onClick}) => {
    const [tab, setTab] = useState<TabsType>('dms');

    // for favorites section, when it gets clicked, i'll filter the messages by the isFavorite property

    const {data, error} = useFetch({url: "http://localhost:3000/chat/dms"})// ! env var
    if (error) {
        console.log("error: ")
        console.log(error);
    }

    let dms = data as MessageBarProps[];
    const onTabChange = (tab: TabsType) => setTab(tab);
    console.log(tab);

    dms = getFilteredDms(dms, tab);

    return (
        <div className="w-full h-full pb-1">
            {/*  */}
                <ChatListHeader currentTab={tab} onTabChange={onTabChange} />
            {/* </div> */}


            <div className="flex flex-col max-h-[calc(100%-100px)] overflow-y-auto scrollbar">
                {(dms && !error) && dms.map((dm, index) => {
                    return (
                        <div key={index}  onClick={() => onClick(dm.id)}>
                            <MessageBar {...dm}/>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}


export default ChatList;