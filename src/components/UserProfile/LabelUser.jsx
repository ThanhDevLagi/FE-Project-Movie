import React from 'react';

const LabelUser = ({label, user}) => {
    return (
        <div className="flex flex-col gap-1 min-w-[10rem] max-w-[22rem]">
            <span className="text-base">{label}</span>
            <span className="text-base font-medium">{user}</span>
      </div>
    );
};

export default LabelUser;