import { Outlet } from "react-router-dom";

const CompleteInfo = () => {

    return (
        <div className="flex justify-around pt-[80px]">
            <div className="flex flex-col gap w-3/4 md:w-1/2">
                <Outlet />
            </div>
        </div>
    )
}


export default CompleteInfo;