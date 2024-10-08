import { Link } from "react-router-dom";


const LandingPage = () => {

    return (
        <div className="relative w-screen min-h-[calc(100vh-74px)] h-min">
            <img alt="background" src="/imgs/landing_page_bg.jpg" className="w-full h-full object-cover absolute top-0" />

                <div className="w-full min-h-[calc(100vh-74px)] h-full flex justify-center items-center relative bg-black bg-opacity-40 pt-8">
                    <div className="w-2/3 flex flex-col items-start justify-center">
                        <h1 className="text-8xl lg:text-9xl text-deep-plum">Meet</h1>
                        <h2 className="poetsen-one-regular text-3xl lg:text-6xl text-white">Your Perfect Match with Matcha!</h2>
                        <div className="text-white text-lg lg:text-xl my-5">
                            <p className="font-semibold">
                                Are you ready to meet new people and find that special someone? Matcha is here to help.
                                Our smart matching algorithm and easy-to-use interface make finding love simple and fun.
                            </p>
                            <p className="font-semibold">
                                At Matcha, we tailor matches to your interests and values, ensuring meaningful connections.
                                Whether you're looking for a serious relationship or just expanding your social circle, we've got you covered.
                            </p>
                            <p className="font-semibold">
                                Join Matcha today and start your journey to finding love effortlessly and securely.
                            </p>
                        </div>
                        <Link to="/signup" className="px-7 py-2 font-semibold rounded-lg tracking-wider bg-pink text-white hover:text-pastel-pink">sign up</Link>
                    </div>
                </div>
        </div>
    )

}


export default LandingPage;