import { Link, useLocation } from "react-router-dom";
import dummySearchResults from "../../components/utils/dummySearchResults";
import SexualPreferences from "../../components/utils/SexualPreferences";
import Gender from "../../components/utils/Gender";
import './style.css'

function SearchResults() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    // need to implement a search results logic in a seperate module
    return (
        <div className="shadow rounded-20px flex flex-col ml-3 mt-3 mr-3 sm:ml-6 sm:mr-6 sm:mt-6 md:mt-8 md:ml-8 md:mr-8 lg:ml-10 lg:mr-10 xl:ml-32 xl:mr-32 2xl:ml-44 2xl:mr-44 bg-white">
            <h1 className="text-results-heading risque-regular pl-5 sm:pl-12 pb-12"> Results</h1>
            <div className="pl-0 sm:pl-14">
            {
                dummySearchResults && dummySearchResults.length > 0 ?
                dummySearchResults.map(
                    (result) => (
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
                    )
                )
                : null
            }
            </div>
        </div>
    )
}

export default SearchResults;