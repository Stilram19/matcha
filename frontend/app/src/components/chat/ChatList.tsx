import { DmListType } from "../../types";
import { ChatListProps } from "../../types";
import { FC, useState } from "react";
import useFetchAllDms from "../../hooks/useFetchAllDms";
import MessageBar from "./MessageBar";
import ChatListHeader from "./ChatListHeader";


const   DmsList = ({dms, onClick, searchInput} : {dms: DmListType[], onClick: (id: number) => void, searchInput: string}) => {
    const regEx = new RegExp(searchInput, 'i')

    // ! the data should arrive in the way that it gonne be displayed, no need for filtering
    console.log(dms);
    const data = dms?.filter((dm) =>  regEx.test(`${dm.firstName} ${dm.lastName}`));

    return (
        <div className="w-full h-full">
            {(data) && data.map((dm) => {
                return (
                    // i should add a unique and consistent key which is the dmId (since no two Dms bar will have the same id)
                    // to make the rendering more efficient, because sometimes i'm inserting new Dms in the front
                    // it will be naive to mutate every dm in the DOM redundantly (lastly i understand why the index of the array should not be used as a key)
                    <div key={dm.id}  onClick={() => onClick(dm.id)}>
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
    const   {dms, favorites, matches} = useFetchAllDms();

    console.log("re-rendering")
    const   tabMap: {[key: string]: DmListType[] | undefined} = {
        dms,
        favorites,
        matches,
    }

    const   data = tabMap[tab] || [];

    // const conversationOnClick = (dmId: number) => {
        
    // } 

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