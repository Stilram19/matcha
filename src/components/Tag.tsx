// import { useState } from "react";

type TagProps = {
    tag: string;
    bgColor: string;
    // onClick: (tag: string) => void
}

const   Tag = ({tag, bgColor} : TagProps) => {
    // const [isSelected, setSelected] = useState(false);

    // const handleClick = () => {
    //     setSelected((prev) => !prev);
    //     onClick(tag);
    // }
    // {isSelected ? 'bg-green-light' : 'bg-white'}
    return (
        <button
            className={`p-0.5 px-2.5 border border-e0 rounded-full font-semibold ${bgColor}`}>
            #{tag}
        </button>
    )

}


export default Tag;