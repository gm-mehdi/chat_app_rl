import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetconversations';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {
  const {loading, conversations} = useGetConversations();

  console.log(conversations);
  
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {
        loading ? (
          <div className='text-center text-gray-500'>Loading...</div>
        ) : (
          conversations.map((conversation:any, idx) => (
            <Conversation 
            key={conversation._id} 
            conversation={conversation} 
            emoji={getRandomEmoji()} 
            lastIdx={idx === conversations.length - 1}
            />
          ))
        )
      }
      
    </div>
  )
}

export default Conversations