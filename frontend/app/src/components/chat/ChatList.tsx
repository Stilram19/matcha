import { DmListType } from "../../types";
import { ChatListProps } from "../../types";
import { FC, useState } from "react";
import useFetchDms from "../../hooks/useFetchDms";
import MessageBar from "./MessageBar";
import ChatListHeader from "./ChatListHeader";


const   DmsList = ({dms, onClick, searchInput} : {dms: DmListType[], onClick: (id: number) => void, searchInput: string}) => {
    const regEx = new RegExp(searchInput, 'i')

    // ! the data should arrive in the way that it gonne be displayed, no need for filtering
    console.log(dms);
    const data = dms?.filter((dm) =>  regEx.test(`${dm.firstName} ${dm.lastName}`));

    return (
        <div className="w-full h-full">
            {(data) && data.map((dm, index) => {
                return (
                    <div key={index}  onClick={() => onClick(dm.id)}>
                        <MessageBar {...dm}/>
                    </div>
                )
            })}
        </div>
    )
}

const   ChatList: FC<ChatListProps> = ({onClick}) => {
    const   [tab, setTab] = useState<string>('dms');
    const   [searchInput, setSearchInput] = useState<string>('');
    const   {dms, favorites, matches} = useFetchDms();

    console.log("re-rendering")
    const   tabMap: {[key: string]: DmListType[] | undefined} = {
        dms,
        favorites,
        matches,
    }

    const   data = tabMap[tab] || [];

    return (
        <div className="w-full h-full pb-1">
            {/* <SocketManager /> */}
            <ChatListHeader onSearchChange={(searchInput: string) => setSearchInput(searchInput)} currentTab={tab} onTabChange={setTab} />

            <div className="flex flex-col max-h-[calc(100%-100px)] overflow-y-auto scrollbar">
                <DmsList onClick={onClick} dms={data} searchInput={searchInput} />
            </div>
        </div>
    )
}


export default ChatList;