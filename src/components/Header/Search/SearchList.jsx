import React from 'react';
import SearchItems from './SearchItems';

const SearchList = ({ items }) => (
    <div className='max-h-72 md:max-h-96 overflow-y-auto bg-gray-900 rounded-lg p-2'>
        {items.map(item => (
            <SearchItems key={item.id} data={item} />
        ))}
    </div>
);

export default SearchList;
