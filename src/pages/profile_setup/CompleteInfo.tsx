import { Outlet } from "react-router-dom";

const CompleteInfo = () => {

    return (
        <div className="flex justify-around pt-[80px]">
            <div className="flex flex-col gap w-1/2">
                <Outlet />
            </div>
        </div>
    )
}


export default CompleteInfo;