import { useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";;
import ChatList from "../../components/chat/ChatList";
import ChatWindow from '../../components/chat/ChatWindow';
import ContactInfo from "../../components/chat/ContactInfo";
import ActiveDmProvider from '../../context/activeDmProvider';
import eventObserver from '../../utils/eventObserver';
import { GlobalEventEnum } from '../../types/globalEventEnum';

const WelcomeSection = () => {
    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <img className='h-1/2' alt='online-dating' src='/imgs/online-dating.svg' />
            <h1 className=' text-2xl font-medium'>Matcha Chat app</h1>
            <p>Start a conversation with your soulmate on Matcha.</p>
        </div>
    )
}

// this function register listening for errors triggering
function useError() {
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const cb = (error: string) => {
            setError(error);
            timeout = setTimeout(() => setError(null), 1500);
        }
        eventObserver.subscribe(GlobalEventEnum.ERROR_OCCURED, cb)
    
        return () => {
            eventObserver.unsubscribe(GlobalEventEnum.ERROR_OCCURED, cb);
            clearTimeout(timeout);
        }
    }, []);

    return error;
}

const Chat = () => {
    const error = useError();
    const [activeDmId, setActiveDmId] = useState(-1);
    const isDmActive = activeDmId !== -1;


    return (
        <ActiveDmProvider value={{activeDmId, setActiveDmId}}>
            {error ? <div className="fixed left-1/2 bg-red-300 text-black rounded-lg px-4 py-2 z-50 shadow-lg">{error}</div> : null}
            <div className="flex justify-around w-screen h-[calc(100vh-80px)]">
                <div className="w-[90%] m-5 border border-e0 rounded-xl shadow-md flex">
                    <div className={`w-full ${isDmActive ? "hidden" : ''} md:inline-block md:w-1/3 lg:w-1/4 h-full md:border-r`}>
                        {/* onClick event attached to every single dm Bar */}
                        {/* ! no need to pass the call back */}
                        <ChatList onClick={(id) => setActiveDmId(id)}/> 
                    </div>
                
                    <div className={`md:inline-block relative ${isDmActive ? 'inline-block w-full' : 'hidden'} md:w-2/3 lg:w-1/2 h-full lg:border-r`}>
                        {isDmActive ? (
                                <>
                                    <span className="md:hidden absolute top-7 cursor-pointer" onClick={() => setActiveDmId(-1)}>
                                        <FaArrowLeft className="hover:fill-slate-400" size={25} />
                                    </span>
                                    <ChatWindow/>
                                </>
                            ) :
                                <WelcomeSection />
                        }
                    </div>

                    <div className="hidden lg:flex w-1/4 h-full">
                        { isDmActive ? <ContactInfo  /> : null }
                    </div>
                </div>
            </div>
        </ActiveDmProvider>
    )
}


export  default Chat;