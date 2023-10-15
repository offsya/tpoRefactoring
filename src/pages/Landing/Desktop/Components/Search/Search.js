import React from 'react';
import '../../../Mobile/Components/SeacrhBar/SearchBar.scss'
import {useDispatch, useSelector} from "react-redux";
import {setSearch} from "../../../features/searchItems";

const Search = () => {
    const dispatch = useDispatch()
    const search = useSelector((state) => state.search.search)

    return (
        <div className='search'>
            <input value={search} type="text" onChange={(e) => {
                dispatch(setSearch(e.target.value))
            }} placeholder="Search" className='searchInput'/>
            <div className='searchIcon'></div>
            <div className='searchIcon-2' onClick={() => dispatch(setSearch(''))}></div>
        </div>
    );
};

export default Search;