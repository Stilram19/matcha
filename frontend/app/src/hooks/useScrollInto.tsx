import { Ref, useEffect, useRef } from "react";


const useScrollInto = (dep: any): Ref<HTMLDivElement> =>  {
    const view = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (view.current)
            view.current.scrollIntoView({behavior: 'smooth'});
    }, [dep])

    return (view);
}


export default useScrollInto;