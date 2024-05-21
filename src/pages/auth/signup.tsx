

const   SignUp = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="w-3/5 flex flex-col items-center justify-center">
                <h1 className="text-5xl poetsen-one-regular">Sign up!</h1>
                <h1 className="mb-4 text-5xl poetsen-one-regular text-center">and find your partner</h1>
                <form className="flex flex-col justify-start">
                    <label htmlFor="Email">Email</label>
                    <input
                        id="Email"
                        type="text"
                        className=" p-3 bg-light-gray border border-e0 w-96 rounded-lg outline-none focus:ring focus:ring-blue-300 mb-2"
                        placeholder="john@example.com"
                        required
                    />
    
                    <label htmlFor="password">password</label>
                    <input
                        id="password"
                        type="password"
                        className=" p-3 bg-light-gray border border-e0 w-96 rounded-lg outline-none focus:ring focus:ring-blue-300"
                        placeholder="password"
                        required
                    />
                
                    <button className="w-full bg-black font-semibold text-white py-2 px-5 rounded-lg mt-4">
                        Sign up with email
                    </button>
                </form>

                <div className="flex items-center gap-2 my-3">
                    <hr className=" w-24 border-none h-[1px] bg-gray-300" />
                    <p className="text-continue">or continue with</p>
                    <hr className=" w-24 border-none h-[1px] bg-gray-300" />
                </div>
                <button className="bg-light-gray flex justify-center gap-2 w-96 py-3 rounded-lg"><img src="/google.svg" />Google</button>
                <p className="text-center w-96 mt-3">
                    By clicking continue, you agree to our
                    <a className="text-blue-900" href="#"> Terms of Service </a>
                    and
                    <a className="text-blue-900" href="#"> Privacy Policy</a>
                </p>
            </div>
            <div className="w-2/5">
                <img src="/imgs/lovers.jpg" className="w-full h-full object-cover"/>
            </div>
        </div>
    )
}

export default SignUp;