import { useState } from "react";

type TagProps = {
    tag: string;
}

const   Tag = ({tag} : TagProps) => {
    const [isSelected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected((prev) => !prev);
    }

    return (
        <button
            onClick={handleClick}
            className={`p-0.5 px-2.5 border border-e0 rounded-full font-semibold ${isSelected ? 'bg-green-light' : 'bg-white'}`}>
            #{tag}
        </button>
    )

}


export default Tag;