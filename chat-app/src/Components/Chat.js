import React, { useEffect, useState } from 'react';
import { Bubble } from './Bubble';
import ChatHeader from './ChatHeader';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../Store/userSlice';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth'
import { collection, doc, addDoc, getDoc, getFirestore, setDoc, serverTimestamp } from 'firebase/firestore';
import { removeChatId, setID } from '../Store/chatIdSlice';
import { add, getMessage, remove } from '../Store/chatSlice';
import Spinner from './Spinner';


const Chat = (props) => {
    const { id } = useParams();
    const item = useSelector((state) => state.chat);
    const isLoading = useSelector((state) => state.chatId.loading);
    const user = useSelector(userSelector);
    const getID = useSelector((state) => state.chatId.ID);



    const otherUser = useSelector((state) => state.ulist.users
        .filter((u) => u.uid === id));

    const [chat, setChat] = useState('');
    const dispatch = useDispatch();







    // for automatic scroll down when the last message appear
    const updateHeight = () => {
        window.scrollTo(0, document.body.scrollHeight)
    }


    const sendMessage = async (chatID, chatData) => {

        // creating an Id by merging the current user id and other user for
        // checking whether the Id exist for chat if doesn't exist then creating 
        // a space for new chatroom of both users

        const firestore = getFirestore();
        const UID1 = `${chatID + id}`;
        const UID2 = `${id + chatID}`;
        const chatroomRef1 = doc(firestore, 'chatroom', UID1);
        const chatroomRef2 = doc(firestore, 'chatroom', UID2);
        const chatSnapshot1 = await getDoc(chatroomRef1);
        const chatSnapshot2 = await getDoc(chatroomRef2);


        if (chatSnapshot1.exists()) {

            await setDoc(doc(firestore, 'chatroom', UID1), {
                fromName: user.displayName,
                fromUID: user.uid,
                lastMsg: chatData.msg,
                toName: otherUser[0].name,
                toUID: otherUser[0].uid
            });

            const chatListRef = collection(chatroomRef1, 'chatList');
            await setDoc(doc(chatListRef), chatData);
        }
        else if (chatSnapshot2.exists()) {

            await setDoc(doc(firestore, 'chatroom', UID2), {
                fromName: user.displayName,
                fromUID: user.uid,
                lastMsg: chatData.msg,
                toName: otherUser[0].name,
                toUID: otherUser[0].uid
            });
            const chatListRef = collection(chatroomRef2, 'chatList');
            await setDoc(doc(chatListRef), chatData);

        }
        else {
            // setDoc is for creating Document and add a field createdAt for make the document visible for exist
            await setDoc(doc(firestore, 'chatroom', UID1), { createdAt: new Date() });

            const chatListRef = collection(chatroomRef1, 'chatList');
            await addDoc(chatListRef, chatData);


        }
    };

    const sendChats = () => {

        // const c = [...message];
        if (chat !== ' ' && chat !== '') {

            // c.push({ name: user, msg: chat });
            const chatData = { uid: user.uid, name: user.displayName, msg: chat, time: serverTimestamp() }
            sendMessage(getAuth().currentUser.uid, chatData);
            dispatch(add(chatData));

        }
        setChat('');
    }

    useEffect(() => {
        dispatch(setID({ cUserId: getAuth().currentUser.uid, oUserId: id }))

        window.addEventListener('popstate', () => {
            dispatch(remove());
            dispatch(removeChatId());
        });

        // Cleanup the event listener when component unmounts
        return () => {
            window.removeEventListener('popstate', () => {

                dispatch(remove());
                dispatch(removeChatId());


            });
        };
    }, []);


    useEffect(() => {
        dispatch(getMessage(`${getID}`))
            .then((ref) => {
                // setTimeout(()=>{
                // unsubscribe(ref.payload);

                // },1000)
            });

    }, [getID])

    useEffect(() => {

        updateHeight();

    }, [sendChats]);





    return (
        <div >
            <ChatHeader name={otherUser[0].name} image={otherUser[0].url}
            //  setProgress={props.setProgress} 
            />
            (<div>



                <div className='pad'>
                    {
                        isLoading ?
                        (<div className='d-flex justify-content-center align-content-center my-5'>

                        <Spinner width={`w-25`} />

                    </div>):
                            (item.map((e, index) => {


                                return (
                                    <Bubble
                                        key={index}
                                        name={e.name}
                                        me={e.uid === user.uid ? 'me' : 'notme'}
                                        color={e.uid === user.uid ? 'primary' : 'success'}
                                        msg={e.msg} />
                                )

                            }))
                            
                           
                    }
                </div>
                <div className='in p-3 my-1'>

                    <div className="input-group d-flex h">
                        <textarea type="text" className="form-control p-2" placeholder="Type a message ...."
                            value={chat} onChange={e => setChat(e.target.value)} />

                        <button className="btn btn-primary p-3" type="button" onClick={sendChats}>Send</button>
                    </div>
                </div>
            </div>)


        </div>
    )
}

export default Chat;