// import { createContext, ReactNode, useContext, useReducer } from "react";
// import { ChatListStateType, DmListType } from "../types";
// import useFetch from "../hooks/useFetch";

// type    ChatListContextType = ChatListStateType & {
//         changeTab : (tab: string) => void
//         updateSearchInput : (searchInput: string) => void
//         updateDms : (dms: DmListType[]) => void
//         updateContacts : (contacts: DmListType[]) => void
// }

// const   chatListContext = createContext<ChatListContextType>({} as ChatListContextType);

// enum ChatListActionKind {
//     UPDATE_DMS = 'update:dms',
//     UPDATE_SEARCH_INPUT = 'update:search',
//     UPDATE_CONTACTS = 'update:contacts',
//     CHANGE_TAB = 'change:tab'
// }

// interface   ChatListAction {
//     type: ChatListActionKind;
//     payload: any;
// }

// function chatListReducer(state: ChatListStateType, action: ChatListAction): ChatListStateType {
//     const {type, payload} = action;

//     switch (type) {
//         case ChatListActionKind.CHANGE_TAB:
//             return {
//                 ...state,
//                 currentTab: payload,
//             }
//         case ChatListActionKind.UPDATE_CONTACTS:
//             return {
//                 ...state,
//                 contacts: payload,
//             }
//         case ChatListActionKind.UPDATE_DMS:
//             return {
//                 ...state,
//                 dms: payload,
//             }
//         case ChatListActionKind.UPDATE_SEARCH_INPUT:
//             return {
//                 ...state,
//                 searchInput: payload,
//             }
//         default:
//             return state;
//     }
// }


// const   initialChatListState: ChatListStateType  = {
//     dms: [],
//     contacts: [],
//     searchInput: '',
//     currentTab: 'dms',
// }

// function initializer(): ChatListStateType {
//     const   [dms, setDms] = useFetch<DmListType[]>(import.meta.env.VITE_LOCAL_CHAT_DMS);
//     const   [contacts, setContacts] = useFetch<DmListType[]>(import.meta.env.VITE_LOCAL_CHAT_DMS);

//     console.log('intilizer')
//     return {
//         dms: dms ? dms : [],
//         contacts: contacts ? contacts : [],
//         searchInput: '',
//         currentTab: 'dms',
//     }
// }

// function    ChatListProvider({children} : {children: ReactNode}) {
//     const   [ state, dispatch ] = useReducer(chatListReducer, initialChatListState, initializer);
    
//     const   changeTab = (newTab: string) => dispatch({type: ChatListActionKind.CHANGE_TAB, payload: newTab});
//     const   updateSearchInput = (searchInput: string) => dispatch({type: ChatListActionKind.UPDATE_SEARCH_INPUT, payload: searchInput});
//     const   updateDms = (dms: DmListType[]) => dispatch({type: ChatListActionKind.UPDATE_DMS, payload: dms});
//     const   updateContacts = (contacts: DmListType[]) => dispatch({type: ChatListActionKind.UPDATE_CONTACTS, payload: contacts});

//     console.log(`state: ${state}`);

//     const   providedValue = {
//         ...state,
//         changeTab,
//         updateSearchInput,
//         updateContacts,
//         updateDms,
//     }

//     return (
//         <chatListContext.Provider value={providedValue} >
//             {children}
//         </chatListContext.Provider>
//     )

// }


// export const   useChatList = () => useContext(chatListContext);

// export default ChatListProvider;