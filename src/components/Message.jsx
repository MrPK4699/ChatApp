import React from 'react'
import '../styles/Message.css'
const Message = ({message}) => {
  return (
    <div className={`message ${message.senderId === localStorage.getItem('myContactId') ? 'sent' : 'received'}`}>
      <div className='msg'>
        {message.text}
      </div>
    </div>
  )
}

export default Message