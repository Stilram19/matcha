import { DmListType } from "../../types";
import { ChatListProps } from "../../types";
import { FC, useState } from "react";
import useFetchAllDms from "../../hooks/useFetchAllDms";
import MessageBar from "./MessageBar";
import ChatListHeader from "./ChatListHeader";


// i should add a unique and consistent key which is the dmId (since no two Dms bar will have the same id)
// to make the rendering more efficient, because sometimes i'm inserting new Dms in the front
// it will be naive to mutate every dm in the DOM redundantly (lastly i understand why the index of the array should not be used as a key)
const   DmsList = ({dms, onClick, searchInput} : {dms: DmListType[], onClick: (id: number) => void, searchInput: string}) => {

    // ! the data should arrive in the way that it gonne be displayed, no need for filtering
    console.log(dms);
    const data = dms?.filter((dm) =>  `${dm.firstName} ${dm.lastName}`.toLowerCase().includes(searchInput));

    return (
        <div className="w-full h-full">
            {(data) && data.map((dm) => {
                return (
                    <div key={dm.id}  onClick={() => onClick(dm.id)}>
                        <MessageBar {...dm}/>
                    </div>
                )
            })}
        </div>
    )
}


function    markAsReadById(dms: DmListType[] | undefined, dmId: number): DmListType[] | undefined {
    if (!dms)
        return (dms);

    const   index = dms.findIndex((dm) => dm.id === dmId);
    if (index === -1 || dms[index].unreadCount === 0) return (dms);
    dms[index].unreadCount = 0;
    return [...dms];
}

const   ChatList: FC<ChatListProps> = ({onClick}) => {
    const   [tab, setTab] = useState<string>('dms');
    const   [searchInput, setSearchInput] = useState<string>('');
    const   allData = useFetchAllDms();
    const   [dms, setDms] = allData.dms;
    const   [contacts] = allData.contacts;

    // this maps the a tab to its data, to be listed
    const   tabMap: Record<string, DmListType[] | undefined> = {
        dms,
        favorites: dms?.filter((dm) => dm.isFavorite),
        contacts,
    }

    const conversationOnClick = (dmId: number) => {
        setDms((prev) => markAsReadById(prev, dmId))
        onClick(dmId);
    }


    return (
        <div className="w-full h-full pb-1">
            {/* <SocketManager /> */}
            <ChatListHeader
                currentTab={tab}
                onTabChange={setTab}
                onSearchChange={(searchInput: string) => setSearchInput(searchInput)}
            />

            <div className="flex flex-col max-h-[calc(100%-100px)] overflow-y-auto scrollbar">
                <DmsList
                    dms={tabMap[tab] || []} // *listed data 
                    searchInput={searchInput}
                    onClick={conversationOnClick}
                />
            </div>
        </div>
    )
}


export default ChatList;