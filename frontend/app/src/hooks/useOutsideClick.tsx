import { useEffect, useRef } from "react"


const useOutsideClick = (callback: () => void) => {
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapper.current && !wrapper.current.contains(e.target as Node))
                callback();
        }

        document.addEventListener('mouseup', handleClickOutside);

        return () => {
          document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [callback])

    return (wrapper);
}


export default useOutsideClick;