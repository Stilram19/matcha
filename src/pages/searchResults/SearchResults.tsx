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
        <div className="shadow rounded-20px flex flex-col mt-8 ml-8 mr-8 bg-white">
            <div className="pl-14">
            <h1 className="text-50px"> Results</h1>
            {
                dummySearchResults && dummySearchResults.length > 0 ?
                dummySearchResults.map(
                    (result) => (
                        <div className="flex items-center mb-8 pl-5 rounded-7px search-result-bg round-7px">
                            <Link to="#">
                                <div className="mr-8 w-52 h-52 md:w-40 md:h-40 lg:h-40 lg:w-40 bg-cover bg-no-repeat bg-center rounded-full bg-gray-300"
                                    style={{backgroundImage: "url('https://cdn.intra.42.fr/users/c33a9dddabed7298d6a21bfacd7e5f76/obednaou.JPG')"}}>
                                </div>
                            </Link>
                            <div className="flex flex-col gap-2">
                                <div className="flex">
                                    <Link to="#"><h3 className="text-34px mr-8">{result.firstName} {result.lastName}</h3></Link>
                                </div>
                                <div className="flex">
                                    <p className="text-24px mb-2" >@{result.userName}</p>
                                </div>
                                <div className="flex">
                                    <p style={{marginRight: 4, fontSize: 21}}>{result.age}</p>
                                    <img src="/icons/birthday-cake.svg" width={30} alt="birthday cake icon" className="mr-4" />
                                    <Gender gender={result.gender} iconsFolder='/icons/gender'/>
                                    <SexualPreferences sexualPreference={result.sexualPreferences} iconsFolder='/icons/sexual-preferences' />
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

// max-width: 750px;
//   margin-top: 56px;
//   margin-left: 192px;

export default SearchResults;