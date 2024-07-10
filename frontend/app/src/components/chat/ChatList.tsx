import { AiFillMessage } from "react-icons/ai";
import { FaHeart, FaUserFriends } from "react-icons/fa";
import { MessageBarProps } from "../../types";
import { ChatListProps } from "../../types/ChatListProps";
import { ChangeEvent, FC, useEffect, useState } from "react";
import useFetch from '../../hooks/useFetch';
import { IconType } from "react-icons";
import { stringCapitalize } from "../../utils/stringCapitalize";
import { useSocket } from "../../context/SocketProvider";

// type TabsType = 'dms' | 'favorites' | 'matchs';
interface TabType {
    active: boolean;
    title: string;
    Icon: IconType;
    Component: FC<any>;
}

interface ChatListHeaderType {
    currentTab: string;
    tabs: TabType[];
    onTabChange: (tab: string) => void;
    onSearchChange: (textInput: string) => void;
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


const   SearchInput = ({onChange}: {onChange: (textInput: string) => void}) => {

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    }

    return (
        <div className="relative">
            <div className="absolute top-0 bottom-0 ps-3 flex items-center">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
                type="text"
                placeholder="search Chats"
                className="w-full outline-none p-2 border border-e0 placeholder:text-lg rounded-lg ps-10"
                onChange={handleOnChange}
            />
        </div>
    )
}


const   ChatListHeader: FC<ChatListHeaderType> = ({onTabChange, onSearchChange, currentTab, tabs}) => {

    return (
        <div className="p-2 mb-2">
            <div className="flex justify-between items-center mb-1">
                <h1 className="text-lg font-semibold">{stringCapitalize(currentTab)}</h1>
                <div className="flex gap-2">
                    {tabs.map((tab) => {
                        const {active, title, Icon} = tab;
                        return (
                            <Icon
                                key={title}
                                size={22}
                                title={title}
                                className={`${active ? 'fill-pink' : ''} cursor-pointer hover:fill-pink`}
                                onClick={() => onTabChange(title)}
                            />
                        )
                    })}
                </div>
            </div>
            <SearchInput onChange={onSearchChange} />
        </div>
    )
}

const   createChatList = (url: string) => {
    return ({onClick, searchInput} : {onClick: (id: number) => void, searchInput: string}) => {
        const {data, error} = useFetch({url: url});
        const regEx = new RegExp(searchInput, 'i')

        const dms = (data as MessageBarProps[])?.filter((dm) =>  regEx.test(`${dm.firstName} ${dm.lastName}`));

        return (
            <div className="w-full h-full">
                {(dms && !error) && dms.map((dm, index) => {
                    return (
                        <div key={index}  onClick={() => onClick(dm.id)}>
                            <MessageBar {...dm}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const ChatDmsList = createChatList("http://localhost:3000/chat/dms");
const ChatMatchesList = createChatList("http://localhost:3000/chat/dms");
const ChatFavoriteList = createChatList("http://localhost:3000/chat/favorites");

const getTabs = (currentTab: string): TabType[] => {
    const tabs: TabType[] = [
        { title: 'dms', Component: ChatDmsList, Icon: AiFillMessage, active: currentTab === 'dms' },
        { title: 'favorites', Component: ChatFavoriteList, Icon: FaHeart, active: currentTab === 'favorites' },
        { title: 'matches', Component: ChatMatchesList, Icon: FaUserFriends, active: currentTab === 'matches' }
    ];

    return (tabs);
};




const   ChatList: FC<ChatListProps> = ({onClick}) => {
    const   [tab, setTab] = useState<string>('dms');
    const   [searchInput, setSearchInput] = useState<string>('');
    const   socket = useSocket();
    const   tabs = getTabs(tab);

    console.log("re-rendering")

    const handleOnChange = (searchInput: string) => {
        setSearchInput(searchInput);
    }

    useEffect(() => {
        console.log('useefctectetc');
        console.log(socket);
        const handler = (data: any) => {
            console.log('helloooooooo');
            console.log(data);
        }    
        socket?.on('global:online-users', handler)

        const handleMessages = (data: any) => {
            console.log(data);
        };
        socket?.on('chat:message', handleMessages);
        
        return () => {
            console.log('unmount ChatList');
            socket?.removeListener('global:online-users', handler)
            socket?.removeListener('chat:message', handleMessages);
        }
    }, [socket])

    return (
        <div className="w-full h-full pb-1">
            {/* <SocketManager /> */}
            <ChatListHeader onSearchChange={handleOnChange} currentTab={tab} tabs={tabs} onTabChange={setTab} />

            <div className="flex flex-col max-h-[calc(100%-100px)] overflow-y-auto scrollbar">
                {
                    tabs.map((tab) => {
                        const {active, Component, title} = tab;
                        return (
                            <div key={title} className={`${active ? "" : "hidden"} w-full h-full`}>
                                <Component onClick={onClick} searchInput={searchInput}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChatList;