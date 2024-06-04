import './style.css'
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dummySearchResults from '../utils/dummySearchResults';
import Gender from '../utils/Gender';
import SexualPreferences from '../utils/SexualPreferences';

type SearchProps = {
    isSmallSearchOpen: boolean;
    handleSearchOpen: () => void;
    handleSearchClose: () => void;
};

function Search({isSmallSearchOpen, handleSearchOpen, handleSearchClose}: SearchProps) {
    let [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
    let [query, setQuery] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchRef.current && isSmallSearchOpen) {
          searchRef.current.focus();
        }
    }, [isSmallSearchOpen]);

    function handleFocus() {
        setIsSearchOnFocus(true);
        handleSearchOpen();
    }

    function handleBlur() {
        console.log('blurr')
        setIsSearchOnFocus(false);
        handleSearchClose();
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    function handleCrossMouseDown(e: React.MouseEvent<HTMLButtonElement | HTMLImageElement>) {
        e.preventDefault(); // to ignore the cross mouse click and keep the input focused
        setQuery('');
    }

    function handleSearchIconMouseDown(e: React.MouseEvent<HTMLButtonElement | HTMLImageElement>) {
        e.preventDefault(); // to ignore the cross mouse click and keep the input focused
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == 'Enter') {
            if (searchRef.current) {
                searchRef.current.blur();
            }

            if (query !== '') {
                navigate(`/search-results?query=${encodeURIComponent(query)}`);
            }
        }

        if (e.key == 'Escape' && searchRef.current) {
            searchRef.current.blur();
        }
    }

    return (
        <div>
            <div className={`hidden md:inline-flex flex mt-3 w-52 h-12 search-bar-bg round-7px mb-3 ${isSearchOnFocus ? 'w-screen' : ''}`} style={isSmallSearchOpen ? {display: 'inline-flex'} : {}}>
                <img onMouseDown={handleSearchIconMouseDown} src="/icons/search-icon.svg" alt='search-icon' className="w-5 h-5 m-3"/>
                <input onFocus={handleFocus} ref={searchRef} onBlur={handleBlur} onKeyDown={handleKeyDown} onChange={handleInputChange} value={query} className="bg-transparent mb-1 w-131px" type="text" placeholder="Search..." style={isSearchOnFocus ? {width: '100vw'} : {}}></input>
                <img src="/icons/cross-icon.svg" alt='cross-icon' className="w-22px" onMouseDown={handleCrossMouseDown} style={isSearchOnFocus ? {marginRight: 12} : {}}/>
            </div>
            <div className="">
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
        </div>
    )
}

export default Search;