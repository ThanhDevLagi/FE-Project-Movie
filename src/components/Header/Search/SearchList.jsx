import React from 'react';
import './SearchList.css'; // Import the CSS file
import SearchItems from './SearchItems';

const SearchList = ({ items }) => {
    return (
        <div className='custom-scrollbar max-h-96 overflow-y-auto bg-gray-900 rounded-lg p-4'>
            {items.map(item => (
                <SearchItems key={item.id} data={item} />
            ))}
        </div>
    );
};

export default SearchList;
