import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';

const Comment = ({ comment, onReplySubmit }) => {
    const [reply, setReply] = useState('');
    const [showReplies, setShowReplies] = useState(false);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const { user } = useAuth();
    
    const toggleReplies = () => setShowReplies(!showReplies);
    const toggleReplyInput = () => setShowReplyInput(!showReplyInput);

    return (
        <div className='bg-[#2f2f2f] p-4 mb-4 rounded-lg'>
            <div className='flex items-center mb-2'>
                <strong className='text-white'>{comment.userId}</strong>
                <span className='text-gray-400 text-sm ml-2'>
                    {new Date(comment.createdAt).toLocaleString()}
                </span>
            </div>
            <p className='text-white mb-2'>{comment.content}</p>
            <div className='flex items-center mb-2'>
                <button
                    className='text-blue-400 mr-4'
                    onClick={toggleReplies}
                >
                    {showReplies ? 'Ẩn phản hồi' : `Xem ${comment.replies.length} phản hồi`}
                </button>
                {user && (
                    <button
                        className='text-blue-400'
                        onClick={toggleReplyInput}
                    >
                        {showReplyInput ? 'Hủy phản hồi' : 'Phản hồi'}
                    </button>
                )}
            </div>
            {showReplyInput && (
                <div className='flex gap-4 mb-4'>
                    <input
                        type="text"
                        className='flex-1 p-2 rounded-lg bg-[#3f3f3f] text-white'
                        placeholder='Viết phản hồi...'
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                    />
                    <button
                        className='bg-blue-500 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            onReplySubmit(reply, comment._id);
                            setReply('');
                            setShowReplyInput(false);
                        }}
                    >
                        Gửi
                    </button>
                </div>
            )}
            {showReplies && comment.replies.length > 0 && (
    <div className='ml-6'>
        {comment.replies.map((reply, idx) => (
            <div key={reply._id} className='mb-2'>
                <div className='flex items-center mb-1'>
                    <strong className='text-white'>{reply.userId}</strong>
                    <span className='text-gray-400 text-sm ml-2'>
                        {new Date(reply.createdAt).toLocaleString()}
                    </span>
                </div>
                <p className='text-white'>{reply.content}</p>
            </div>
        ))}
    </div>
)}

        </div>
    );
};


export default Comment;