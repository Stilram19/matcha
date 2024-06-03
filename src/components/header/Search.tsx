import { useState, ChangeEvent, useRef, useEffect } from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import dummySearchResults from '../utils/dummySearchResults';
import Gender from '../utils/Gender';
import SexualPreferences from '../utils/SexualPreferences';

type SearchProps = {
    isSmallSearchOpen: boolean;
    handleSearchOpen: () => void;
    handleSearchClose: () => void;
};

// type SearchResult = {
//     id: string;
//     firstName: string;
//     lastName: string;
//     userName: string;
//     age: number;
//     gender: string;
//     sexualPreferences: string;
//     profilePicture: string; // URL
// }

function Search({isSmallSearchOpen, handleSearchOpen, handleSearchClose}: SearchProps) {
    let [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
    let [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current && isSmallSearchOpen) {
          inputRef.current.focus();
        }
    }, [isSmallSearchOpen]);

    function handleFocus() {
        setIsSearchOnFocus(true);
        handleSearchOpen();
    }

    function handleBlur() {
        setQuery('');
        setIsSearchOnFocus(false);
        handleSearchClose();
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setQuery(value);
        // setQuery('');
        console.log(value);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'Enter') {
            // navigate to the search results page
        }
    }

    return (
        <div>
            <div className={`hidden md:inline-flex flex mt-3 w-52 h-12 search-bar-bg round-7px mb-3 ${isSearchOnFocus ? 'w-screen' : ''}`} style={isSmallSearchOpen ? {display: 'inline-flex'} : {}}>
                <img src="/icons/search-icon.svg" alt='search-icon' className="w-5 h-5 m-3"/>
                <input onKeyDown={handleKeyDown} onChange={handleInputChange} value={query} onFocus={handleFocus} onBlur={handleBlur} className="bg-transparent mb-1 w-131px" type="text" placeholder="Search..." ref={inputRef} style={isSearchOnFocus ? {width: '100vw'} : {}}></input>
                <img src="/icons/cross-icon.svg" alt='cross-icon' className="w-22px" style={isSearchOnFocus ? {marginRight: 12} : {}}/>
            </div>
            {
                isSearchOnFocus && dummySearchResults && dummySearchResults.length > 0 ?
                dummySearchResults.map(
                    (result) => (
                        <Link to="#">
                            <div className="flex items-center search-result-bg round-7px">
                                <img src="/icons/search-icon.svg" alt='search-icon' className="w-5 h-5 m-3"/>
                                <p style={{width: 90, marginRight: 8}}>{result.userName}</p>
                                <p style={{marginRight: 4}}>{result.age}</p>
                                <img style={{marginRight: 24}} src="/icons/birthday-cake.svg" alt="birthday cake icon" />
                                <Gender gender={result.gender} iconsFolder='/icons/gender'/>
                                <SexualPreferences sexualPreference={result.sexualPreferences} iconsFolder='/icons/sexual-preferences' />
                            </div>
                        </Link>
                    )
                )
                : null
            }
        </div>
    )
}

export default Search;