import React, { useEffect } from 'react';
import Logo from './Logo';
import ChatHeader from './ChatHeader';
import { setLoading } from '../Store/loadingSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { existOrAdd } from '../Store/userSlice';
import { serverTimestamp } from 'firebase/firestore';
import Spinner from './Spinner';






const List = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const list = useSelector((state) => state.ulist.users);
    const isLoad = useSelector((state) => state.ulist.loading);

    const user = useSelector((state) => state.user.user);


    useEffect(() => {
        dispatch(existOrAdd({
            collectionName: 'users', documentId: user.uid, documentData: {
                name: user.displayName,
                uid: user.uid,
                email: user.email,
                url: user.photoURL,
                createdAt: serverTimestamp(),
            }
        }));
    }, []);



    return (
        <div>
            <ChatHeader name={props.name} image={props.image}
            // setProgress={props.setProgress}
            />
            <div className={`container d-flex justify-content-center p-5 
        ${(window.screen.availWidth) >= 580 ? 'w-25' : 'w-100'}`}>

                {/* Chat Box */}
                <div>
                    <div className='my-5'>

                        <h6 className='text-secondary'><i>Please reload the page if list does not appear ..!</i></h6>

                        <h1 className='h1 d-flex justify-content-center align-items-center my-3'>
                            <b className='text-light'> List Of Contacts </b>
                        </h1>
                    </div>
                    {
                        isLoad ?
                            <div  className={`d-flex justify-content-center align-content-center my-1`}>
                                <Spinner/>
                            </div>


                            :
                            <div className={`d-flex flex-column align-content-between my-1`}>

                                {
                                    list.map((e, index) => {
                                        return (
                                            <div type="button" key={index} className='alert alert-primary d-flex justify-content-between hover'
                                                style={{ height: '10vh' }}
                                                onClick={() => {

                                                    dispatch(setLoading(50));

                                                    dispatch(setLoading(100));

                                                    // the use of Link tag is for get each bubble taken its own uid
                                                    <Link to={`/chatroom/${e.uid}`} />

                                                    navigate(`/chatroom/${e.uid}`)

                                                }}>


                                                <div title={`${e.name}`} className='d-flex' >
                                                    <img className='circle my-1' src={e.url} />
                                                    <span className='d-flex flex-column padding px-2 py-1'>

                                                        <b>{e.name}</b>
                                                        <p className='text-secondary d-msg'>
                                                            {
                                                                e.email
                                                                // e.msg.length > 23 ? e.msg.slice(0, (e.msg.length > 25 ? 24 : e.msg.length)).concat("..") :
                                                                //     e.msg.slice(0, (e.msg.length > 25 ? 24 : e.msg.length))

                                                            }
                                                        </p>
                                                    </span>
                                                </div>
                                                <div>
                                                    <Logo />
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                    }

                </div>
            </div>
        </div>
    )
}

export default List