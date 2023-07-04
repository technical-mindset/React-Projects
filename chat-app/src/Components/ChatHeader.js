import React from 'react';
import SignOut from '../Pages/SignOut';

const ChatHeader = (props) => {
    return (
        <div className='bg-dark position-fixed w-100 d-flex justify-content-between' style={{ color: 'white', zIndex: 1 }}>

            {/* Image and Name */}
            <div className='d-flex justify-content-center m-2'>
                <img className='chatImg px-2 my-1' src={props.image} />

                <span className='p-2'>
                    <h2>
                        <b>{props.name}</b>
                    </h2>
                </span>

            </div>

            <div className='m-3'>
                <SignOut />
            </div>
        </div>
    )
}

export default ChatHeader;
