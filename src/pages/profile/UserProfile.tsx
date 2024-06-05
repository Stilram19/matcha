import { Link } from "react-router-dom";

function UserProfile() {
    return (
        <div>
            {/* <div>
                <div className="flex items-center mb-8 pl-5 rounded-7px search-result-bg round-7px">
                    <Link to="#">
                        <div className="mr-4 sm:mr-8 w-24 h-24 sm:w-40 sm:h-40 lg:h-40 lg:w-40 bg-cover bg-no-repeat bg-center rounded-full bg-gray-300"
                            style={{backgroundImage: "url('https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG')"}}>
                        </div>
                    </Link>
                    <div className="flex flex-col sm:gap-2">
                        <div className="flex">
                            <Link to="#"><h3 className="text-fullname mr-8 font-bold">{result.firstName} {result.lastName}</h3></Link>
                        </div>
                        <div className="flex">
                            <p className="text-username" >@{result.userName}</p>
                        </div>
                        <div className="flex">
                            <p style={{marginRight: 4, marginBottom: 4}} className="text-age playfair-display">{result.age}</p>
                            <img src="/icons/birthday-cake.svg" alt="birthday cake icon" className="mr-4 w-6 sm:w-8" />
                            <div className="flex w-5 sm:w-7">
                                <Gender gender={result.gender} iconsFolder='/icons/gender'/>
                            </div>
                            <div className="flex w-6 sm:w-8">
                                <SexualPreferences sexualPreference={result.sexualPreferences} iconsFolder='/icons/sexual-preferences' />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default UserProfile;