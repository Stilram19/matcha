import { Dispatch, SetStateAction, useEffect } from "react";
import { DmListType, EventsEnum, IncomingMessagePayload } from "../types";
import useFetch from "./useFetch";
import { changeParticipantPresence, prepareSocketEventRegistration } from "../utils/socket";
import { useSocketEventRegister } from "./useSocketEventResgiter";
import eventObserver from "../utils/eventObserver";
import { useActiveDm } from "../context/activeDmProvider";
// import { sendLoggedInGetRequest } from "../utils/httpRequests";


// this interface should consistent with data that send by the io server
// type    StatePair = [DmListType[] | undefined, React.Dispatch<React.SetStateAction<DmListType[] | undefined>>];
type    ReactSetter<T> = Dispatch<SetStateAction<T>>


function formatMessage(messageType: 'text' | 'audio', message: string, isSender: boolean) {
    let displayedMessage = message; 
    if (messageType === 'audio')
        displayedMessage = 'audio message 🎙';
    
    return `${isSender ? 'You: ' : ''}${displayedMessage}`;
}



function createDmsUpdateFunc(activeDmId: number, data: IncomingMessagePayload) {
    return (prevDms: DmListType[] | undefined): DmListType[] | undefined => {
        if (!prevDms) return;

        const formattedLastMessage = formatMessage(data.messageType, data.messageContent, data.isSender);
        // console.log(data);
        
        if (data.isSender) {
            const index = prevDms.findIndex((dm) => dm.id === data.to);
            if (index !== -1) {
                const updatedDm = { ...prevDms[index], lastMessage: formattedLastMessage };
                return [updatedDm, ...prevDms.slice(0, index), ...prevDms.slice(index + 1)];
            }

            const newDm: DmListType = {
                id: data.to,
                firstName: data.firstName,
                lastName: data.lastName,
                lastMessage: formattedLastMessage,
                profilePicture: data.profilePicture,
                isFavorite: data.isFavorite,
                status: data.status,
                unreadCount: 0,
            };
            return [newDm, ...prevDms];
        }

        const index = prevDms.findIndex((dm) => dm.id === data.from);
        if (index !== -1) {
            const unreadCount = prevDms[index].unreadCount + (activeDmId === data.from ? 0 : 1);
            const updatedDm = {
                ...prevDms[index],
                lastMessage: formattedLastMessage,
                unreadCount,
            };
            return [updatedDm, ...prevDms.slice(0, index), ...prevDms.slice(index + 1)];
        }

        const newMessage: DmListType = {
            id: data.from,
            firstName: data.firstName,
            lastName: data.lastName,
            lastMessage: formattedLastMessage,
            profilePicture: data.profilePicture,
            isFavorite: data.isFavorite,
            status: data.status,
            unreadCount: 1,
        };
        return [newMessage, ...prevDms];
    };
}




function registerSocketEvents(activeDmId: number, setDms: ReactSetter<DmListType[] | undefined>, setContacts: ReactSetter<DmListType[] | undefined>) {
    const userPresenceHandler = (onlineUsers: number[]) => {
        console.log('online-users:', onlineUsers);

        // Modify dms presence, changing the status (online, offline)
        const mutateDms = (dms: DmListType[] | undefined) => dms && changeParticipantPresence(dms, onlineUsers);

        setDms(mutateDms);
        setContacts(mutateDms);
    }

    const   messageEventHandler = (data: IncomingMessagePayload) => {
        // ? checking if the sended message, was already in the list, if so need to re-order the dms list
        // ? if not i need just to insert it in the first of the array, & the unseen counter should incerement 
        const   updateDms = createDmsUpdateFunc(activeDmId, data);
    
        setDms(updateDms);
    }

    // * create the callback that accepts a socket.io object, it will be called by
    // * the useSocketEventRegister and it's gonna register the event and there handlers
    const   regiterarFunction = prepareSocketEventRegistration([
                                [EventsEnum.GLOBAL_PRESENCE, userPresenceHandler],
                                [EventsEnum.CHAT_RECEIVE, messageEventHandler]
                            ]);
    useSocketEventRegister(regiterarFunction, [activeDmId]);
}




const   handleFevoritesChange = (dmId: number, setDms: ReactSetter<DmListType[] | undefined>) => {
    console.log(`${dmId} fav changing..`);
    setDms((prev) => {
        if (!prev) return (prev);
        const index = prev.findIndex((dm) => dm.id === dmId);
        if (index === -1) return (prev);

        prev[index].isFavorite = !prev[index].isFavorite;
        return ([...prev]);
    });
}



export interface   FetchedData {
    data: DmListType[] | undefined;
    setData: ReactSetter<DmListType[] | undefined>,
}


const   useFetchAllAndSubscribe: () => {dms: FetchedData, contacts: FetchedData, favorites: {data: DmListType[]}} = () => {
    const   { activeDmId } = useActiveDm();
    const   [dms, setDms] = useFetch<DmListType[]>(import.meta.env.VITE_LOCAL_CHAT_DMS);
    const   [contacts, setContacts] = useFetch<DmListType[]>(import.meta.env.VITE_LOCAL_CHAT_CONTACTS);


    registerSocketEvents(activeDmId, setDms, setContacts);
    useEffect(() => {
        const   handleFavChange = (dmId: number) => handleFevoritesChange(dmId, setDms);

        eventObserver.subscribe(EventsEnum.APP_FAVORITE_CHANGE, handleFavChange);

        return () => {
            eventObserver.unsubscribe(EventsEnum.APP_FAVORITE_CHANGE, handleFavChange);
        }
    }, []);


    return {
        dms: {
            data: dms,
            setData: setDms,
        },
        contacts: {
            data: contacts,
            setData: setContacts,
        },
        favorites: {
            data: dms?.filter(dm => dm.isFavorite) || []
        }
    }
}


export default useFetchAllAndSubscribe;


/*
fetching data
    *provide a way to paginate the data
    *socket events handler
    *search input change for each tab means re-fetching data, reset pagination

*/


/*


function usePaginatedData<T>(url: string) {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useFetch<T[]>(`${url}?${searchInput.length > 0 ? `search=${searchInput}` : ''}`);

    const pageSize = 20;

    // resiting pagination states when search input changes
    useEffect(() => {
        setPage(1);
        setHasMore(true);
    }, [searchInput])

    console.log(`paginated data ${url}`)
    const fetchMoreData = async () => {
        if (!hasMore) return;

        try {
            const fetchedData: T[] = await sendLoggedInGetRequest(`${url}?${searchInput.length > 0 ? `search=${searchInput}` : ''}&page=${page + 1}&pageSize=${pageSize}`);
            if (!fetchedData.length) {
                setHasMore(false);
                return;
            }
            setPage(prevPage => prevPage + 1);
            console.log(`updating ${url}`)
            setData(prevData => (prevData ? [...prevData, ...fetchedData] : fetchedData));
        } catch (e) {
            console.log(e);
        }
    };

    return {
        data,
        setData,
        fetchMoreData,
        setSearchInput
    };
};

const useDirectMessages = () => {
    const { data: dms, setData, fetchMoreData, setSearchInput } = usePaginatedData<DmListType>(import.meta.env.VITE_LOCAL_CHAT_DMS);

    return { 
        dms,
        fetchMoreData,
        setDms: setData,
        setSearchInput
    };
};

const useContactList = () => {
    const { data: contacts, setData: setContacts, fetchMoreData, setSearchInput} = usePaginatedData<DmListType>(import.meta.env.VITE_LOCAL_CHAT_CONTACTS);

    return {
        contacts,
        fetchMoreData,
        setContacts,
        setSearchInput,
    };
};
*/