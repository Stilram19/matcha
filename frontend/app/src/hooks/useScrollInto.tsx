import { Ref, useEffect, useRef } from "react";


const useScrollInto = (dependency: any): Ref<HTMLDivElement> =>  {
    const view = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (view.current)
            view.current.scrollIntoView({behavior: 'smooth'});
    }, [dependency])

    return (view);
}


export default useScrollInto;