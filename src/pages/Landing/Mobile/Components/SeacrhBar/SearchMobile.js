import React from 'react';
import './SearchBar.scss'
import {useDispatch} from "react-redux";
import {setSearch} from "../../../features/searchItems";

const Search = () => {
    const dispatch = useDispatch()
    return (
        <div className='search-mobile'>
            <input type="text" onChange={(e) => dispatch(setSearch(e.target.value))} placeholder="" className='searchInput-mobile'/>
            <div className='searchIcon-mobile'></div>
        </div>
    );
};

export default Search;