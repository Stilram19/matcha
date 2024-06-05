import { Link } from "react-router-dom";


export default function Login() {


    return (
        <div className="flex relative w-screen h-screen">
            <div className="flex justify-center w-full md:w-[60%]">
                <div className="flex flex-col items-center justify-center ">
                    <h1 className="mb-4 text-5xl poetsen-one-regular text-center">Login to your account</h1>
                    <p className="mb-4">Enter your email and password to sign in</p>
                    <form className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-start mb-4">
                            <div className="flex flex-col items-start mb-2">
                                <label htmlFor="username">username</label>
                                <input id="username" type="text" className=" p-3 bg-light-gray border border-e0 w-96 rounded-lg outline-none focus:ring focus:ring-blue-300" placeholder="username" required/>
                            </div>
                            <div className="flex flex-col items-start mb-1">
                                <label htmlFor="password">password</label>
                                <input id="password" type="password" className=" p-3 bg-light-gray border border-e0 w-96 rounded-lg outline-none focus:ring focus:ring-blue-300" placeholder="password" required/>
                            </div>
                            <a href="#" className="text-blue-400">forgot password?</a>
                        </div>
                        <button className="px-7 py-2 border border-e0 rounded-lg tracking-wider bg-pastel-pink-100 text-white font-semibold text-md hover:text-black">
                            Login
                        </button>
                    </form>
                    <div className="flex items-center gap-2 my-3">
                        <hr className=" w-24 border-none h-[1px] bg-gray-300" />
                        <p className="text-continue">or continue with</p>
                        <hr className=" w-24 border-none h-[1px] bg-gray-300" />
                    </div>
                    <button className="bg-light-gray flex justify-center gap-2 w-96 py-3 rounded-lg"><img src="/google.svg" />Google</button>
                </div>
            </div>


            <div className="hidden p-8 md:flex flex-col justify-center items-center w-[40%] bg-pastel-pink">
                 <div className="flex flex-col mb-10">
                    <h1 className="poetsen-one-regular text-6xl text-white">New here?</h1>
                    <p className="poetsen-one-regular text-xl">
                        New here? Sign up now and start your journey to find your life partner. With our easy-to-use platform, you'll connect with like-minded individuals who share your interests and values. Don't wait—your perfect match could be just a click away! Join us today and discover the love of your life.
                    </p>
                </div>

                <Link to="/signup" className="  px-7 py-2 font-semibold rounded-lg tracking-wider bg-pink text-white hover:text-pastel-pink">sign up</Link>
            </div>
        </div>
    )
}