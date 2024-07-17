import { ChangeEvent, FC } from "react";
import { IconType } from "react-icons";
import { AiFillMessage } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { stringCapitalize } from "../../utils/stringCapitalize";

interface TabType {
    active: boolean;
    title: string;
    Icon: IconType;
}

interface ChatListHeaderType {
    currentTab: string;
    onTabChange: (tab: string) => void;
    onSearchChange: (textInput: string) => void;
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

const getTabs = (currentTab: string): TabType[] => {
    const tabs: TabType[] = [
        { title: 'dms', Icon: AiFillMessage, active: currentTab === 'dms' },
        { title: 'favorites', Icon: FaHeart, active: currentTab === 'favorites' },
        { title: 'matched', Icon: FaUserFriends, active: currentTab === 'matched' }
    ];

    return (tabs);
};

const   ChatListHeader: FC<ChatListHeaderType> = ({onTabChange, onSearchChange, currentTab}) => {
    const   tabs = getTabs(currentTab);

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


export default ChatListHeader;
