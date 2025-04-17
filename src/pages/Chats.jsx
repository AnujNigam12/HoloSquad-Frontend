import React, { useContext, useEffect, useRef, useState } from 'react'
import UserContext from '../context/UserContext'
import _, { divide } from "lodash"
import { Link, useNavigate } from 'react-router-dom';
import { MdSend, MdVideoCall, MdCall } from 'react-icons/md';
import { FaRegSmile } from 'react-icons/fa'
import { FaPaperclip } from "react-icons/fa";
import axios from 'axios';
import moment from 'moment';
import { io } from "socket.io-client";
import { FaUserFriends } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { TbFriendsOff } from "react-icons/tb";
import { IoMdDocument } from "react-icons/io";
import { IoMdPhotos } from "react-icons/io";
import { FaCameraRetro } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { Button, Modal } from 'antd';

const Chats = () => {
  let ctx = useContext(UserContext);
  console.log(ctx);
  let userId = ctx?.user?.userId

  const navigate = useNavigate();

  let endPoint = 'http://localhost:4000'
  let socketRef = useRef();
  const [messageBySocket, setMessageBySocket] = useState("");

  const [friend, setFriend] = useState("")
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef(null);
  const [isFriendSelected, setIsFriendSelected] = useState(false);

  const followersArr = ctx?.user?.loggedUserDetails?.followers || []
  const followingsArr = ctx?.user?.loggedUserDetails?.followings || []
  const chatsArr = _.unionBy(followersArr, followingsArr, "_id");

  const handleSelectedFriend = async (user) => {
    navigate(`?friendId=${user?._id}`, { replace: true });
    // let res  = await axios.get(url + `/messages/getChats/${user?._id}`, {
    let res = await axios.get(`http://localhost:4000/messages/getChats/${user?._id}`, {
      headers: {
        "Authorization": ctx.user.token
      }
    });
    let data = await res.data.findConversation.messages;
    const updatedData = data.map((message) => ({
      ...message,
      timeAgo: moment(message.createdAt).fromNow(),
    }));
    console.log(data);
    setConversation(updatedData);
    setFriend(user)

    //Sending Notification of Like
    let noti = await axios.post("http://localhost:4000/notifications/send", {
      recipient: user?._id,
      sender: userId,
      type: "Message",
      message: `${ctx.user.loggedUserDetails.name} send you a message`
    });
    let notify = await noti.data;
    console.log(notify);
  }

  const handleMessageChanger = (e) => {
    setMessage(e.target.value);
  }

  const handleSendMessage = async (friend) => {
    let friendId = friend?._id
    socketRef.current.emit("sendMessage", { friendId, userId, text: message })
    let obj = {
      text: message
    }

    let res = await axios.post(`http://localhost:4000/messages/sendMessage/${friendId}`, obj, {
      headers: {
        "Authorization": ctx?.user?.token
      }
    });
    let data = await res.data
    console.log(data);
    if (data.success) {

      handleSelectedFriend(friend);
      setMessage("");
    }
  }

  useEffect(() => {
    if (isFriendSelected) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const friendId = params.get("friendId");
    if (friendId && chatsArr.length > 0) {
      const friend = chatsArr.find((u) => u._id === friendId);
      if (friend) {
        handleSelectedFriend(friend);
        setIsFriendSelected(true)
      } else {
        console.error("Friend not found in chatsArr");
      }
    }
  }, [chatsArr, isFriendSelected]);

  useEffect(() => {
    if (messageContainerRef.current) {
      setTimeout(() => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      }, 0);
    }
  }, [conversation]);

  useEffect(() => {
    socketRef.current = io(endPoint, { transports: ['websocket'] });

    socketRef.current.emit('addUser', userId);
  }, []);

  useEffect(() => {
    socketRef.current.on("getMessage", ({ friendId, userId, text }) => {
      console.log({ friendId, userId, text });
      setMessageBySocket({ friendId, userId, text, timeAgo: moment(new Date()).fromNow() });
    });
  }, []);

  useEffect(() => {
    if (messageBySocket) {
      setConversation([
        ...conversation,
        messageBySocket
      ])
    }
  }, [messageBySocket]);

  // For sending Files/ Media
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //Upload File 
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [details, setDetails] = useState({
    title: "",
    description: "",
    file: "",
  });

  const localCancel = () => {
    setOpen(false);
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setDetails({
      title: "",
      description: "",
      file: ""
    })
  };

  const handleFile = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  }

  return (
    <div className='w-full gap-8 flex h-screen  mt-[-70px] overflow-hidden '>

      {/* Left */}
      <div className="w-[20%] border-y-2 border-black ml-2 mt-[60px] rounded-lg h-[88%] flex flex-col  items-center  border-x-[1px] overflow-y-auto scrollbar-hide">
        {chatsArr.length > 0 ? (
          chatsArr.map((user, index) => (
            <div key={index} onClick={() => handleSelectedFriend(user)} className="cursor-pointer px-3 bg-red-300 h-20 border-b-2 flex flex-row items-center justify-center w-full border-gray-300">
              <div className='relative'>
                <img
                  src={user?.profilePic || 'https://via.placeholder.com/50'}
                  alt={`${user?.name}'s profile`}
                  className="w-12 h-12 cursor-pointer rounded-full border-2 border-red-400"
                />
              </div>

              <div>
                <p className="font-serif text-lg cursor-pointer ml-3" style={{ color: '#08536c' }}>{user?.name || 'Unknown User'}</p>
              </div>

            </div>
          ))
        ) : (
          <div className='h-full flex  flex-col gap-6 items-center justify-center'>
            <p className='font-serif shadow-md rounded-md text-gray-600 bg-red-100 ' style={{ color: '#bebee6' }}>
              No followers or followings to Chat
            </p>
            <TbFriendsOff size={70} fill='green' />
            <p className='font-serif shadow-md rounded-md text-gray-600 bg-green-50 ' style={{ color: '#bebee6' }}>
              Please Follow or Wait for Follow
            </p>
          </div>
        )
        }
      </div>



      {/* Middle */}

      {
        friend ? (
          <div style={{
            background: 'linear-gradient(to right,rgb(106, 138, 166), #1F4959)',
            opacity: 0.8
          }} className='flex bg-cover flex-col h-full relative w-[55%] border rounded-lg py-13'>

            <header className='flex h-[35px] w-[835px] justify-between items-center p-4 bg-blue-100 fixed w-[55%] top-[55px] right-17 z-10'>
              <div className='flex gap-1 items-center'>
                <img src={friend?.profilePic} alt='Avatar' className='w-7 h-7 object-cover rounded-full' />
                <span className='ml-2 font-serif capitalize'>{friend?.name}</span>
              </div>
              <div className='flex gap-5 items-center'>
                <MdCall size={20} className='text-lg mr-2 cursor-pointer' />
                <MdVideoCall size={24} className='text-lg mr-2 cursor-pointer' />
                <FaRegSmile size={20} className='text-lg cursor-pointer' />
              </div>
            </header>

            <div ref={messageContainerRef} className='flex-1 pt-1 overflow-y-auto scrollbar-hide px-4 mt-[90px] pb-9'>
              {conversation.map((ele, index) => {
                return <div key={index} className={`flex ${ele?.userId?._id === ctx.user.userId ? 'justify-end' : ''} `}>
                  <div className={`inline-block p-2 rounded-lg ${ele?.userId?._id === ctx.user.userId ? 'bg-blue-200' : 'bg-green-200'} mb-4 max-w-[45%] break-words`}>
                    <p className='font-serif'>
                      {ele?.text}
                      <p className='text-xs flex justify-end mt-[-5px]'>{ele?.timeAgo}</p>
                    </p>

                    {/* <small className='block text-right text-xs text-gray-500'>{timestamp}</small>  */}
                  </div>

                  <img className='w-6 ml-[2px] border-[1px] border-red-600 h-6 rounded-full' src={ele?.userId?.profilePic ? ele.userId.profilePic : friend.profilePic} alt="" />



                </div>
              })}
            </div>


            <div className='pr-4 pl-1 py-2 h-[40px] rounded-lg flex items-center  fixed w-[55%] right-17 bottom-1 z-10'>
              <button className='text-black mx-2' onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FaPaperclip style={{ fontSize: '21px' }} />
              </button>

              {dropdownOpen && (
                <ul className="absolute left-5  w-40 bg-white text-black border rounded-lg shadow-lg" style={{ bottom: "50px" }}>
                  {/* Document */}
                  <li className="p-2 hover:bg-gray-200">
                    <button onClick={handleClick} className='font-bold p-1 rounded-lg text-lg flex'>
                      <IoMdDocument className='mx-2 mt-1.5' />
                      Document
                    </button>
                  </li>
                  {/* Making modal for Sending Documents */}
                  <Modal
                    className="custom-modal"
                    open={open}
                    onOk={handleFile}
                    onCancel={localCancel}
                    footer={[
                      <Button className='bg-red-500 left' key="back" onClick={handleCancel}>
                        Cancel
                      </Button>,
                      <Button className='bg-green-400' key="submit" type="primary" loading={loading} onClick={handleFile}>
                        Send
                      </Button>

                    ]}
                  >
                    <div>
                      <input type="text" />
                      <input type="file" name="" id="" />

                    </div>
                  </Modal>

                  {/* Photos */}
                  <li className="p-2 hover:bg-gray-200">
                    <button onClick={handleClick} className='font-bold p-1 rounded-lg text-lg flex'>
                      <IoMdPhotos className='mx-2 mt-1.5' />
                      Photo
                    </button>
                  </li>
                  {/* Making modal for Sending Documents */}
                  <Modal
                    className="custom-modal"
                    open={open}
                    onOk={handleFile}
                    onCancel={localCancel}
                    footer={[
                      <Button className='bg-red-500 left' key="back" onClick={handleCancel}>
                        Cancel
                      </Button>,
                      <Button className='bg-green-400' key="submit" type="primary" loading={loading} onClick={handleFile}>
                        Send
                      </Button>

                    ]}
                  >
                    <div>
                      <input type="text" />
                      <input type="file" name="" id="" />

                    </div>
                  </Modal>

                  {/* Camera */}
                  <li className="p-2 hover:bg-gray-200">
                    <button onClick={handleClick} className='font-bold p-1 rounded-lg text-lg flex'>
                      <FaCameraRetro className='mx-2 mt-1.5' />
                      Camera
                    </button>
                  </li>
                  {/* Making modal for Sending Documents */}
                  <Modal
                    className="custom-modal"
                    open={open}
                    onOk={handleFile}
                    onCancel={localCancel}
                    footer={[
                      <Button className='bg-red-500 left' key="back" onClick={handleCancel}>
                        Cancel
                      </Button>,
                      <Button className='bg-green-400' key="submit" type="primary" loading={loading} onClick={handleFile}>
                        Send
                      </Button>

                    ]}
                  >
                    <div>
                      <input type="text" />
                    </div>
                  </Modal>

                  {/* Contacts */}
                  <li className="p-2 hover:bg-gray-200">
                    <button onClick={handleClick} className='font-bold p-1 rounded-lg text-lg flex'>
                      <MdContacts className='mx-2 mt-1.5' />
                      Contact
                    </button>
                  </li>
                  {/* Making modal for Sending Documents */}
                  <Modal
                    className="custom-modal"
                    open={open}
                    onOk={handleFile}
                    onCancel={localCancel}
                    footer={[
                      <Button className='bg-red-500 left' key="back" onClick={handleCancel}>
                        Cancel
                      </Button>,
                      <Button className='bg-green-400' key="submit" type="primary" loading={loading} onClick={handleFile}>
                        Send
                      </Button>

                    ]}
                  >
                    <div>
                      <input type="text" />
                      <input type="number" name="" id="" />
                    </div>
                  </Modal>
                </ul>
              )}

              <input value={message} onChange={handleMessageChanger} name='message' type='text' placeholder='Type your message here...' className='flex-1  p-2 border-[1px] border-gray-300 rounded-lg text-center focus:outline-none' />
              <button onClick={() => handleSendMessage(friend)} className='text-black' style={{ marginLeft: '-5px' }}>
                <MdSend style={{ marginLeft: '-35px', fontSize: '28px' }} />
              </button>
            </div>

          </div>
        ) : (
          <div className="flex w-[55%] flex-col items-center justify-center h-[85%] text-gray-600 bg-gray-200 rounded-lg p-8 mt-[70px] mb-4 shadow-lg">
            {/* Icon or Illustration */}
            <FaUserFriends size={100} className="text-gray-400 mb-4" />

            {/* Message */}
            <h2 className="text-2xl font-semibold mb-2">No Friend Selected</h2>
            <p className="text-center text-gray-500 mb-4">
              Choose a friend from the list to start a conversation.
            </p>

            {/* Optional Call to Action */}
            <div className="text-center">
              <p className="text-gray-600">Don’t see your friends?</p>
              <button
                onClick={() => toast.error('Invite friends functionality coming soon!', { position: "top-center", theme: "colored" })}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Invite Friends
              </button>
            </div>
          </div>
        )
      }


      {/* Right */}

      {
        friend ? (<div className='w-[20%] relative h-full mr-3'>
          <div className='absolute top-20 pt-[50px] flex items-center flex-col gap-3 w-full bg-yellow-50 rounded-lg border-[3px] h-[50%] border-black shadow-lg'>
            <img src={friend?.profilePic} className='w-24 mt-4 h-24 rounded-full border-[1px] border-red-500' alt="" />
            <h2 className='font-serif capitalize text-lg'>{friend?.name}</h2>
            <Link state={friend?._id} to={`/friendProfile?name=${friend?.name}`} className='border-[1px] shadow-lg cursor-pointer hover:bg-green-600 hover:text-white border-black bg-green-400 px-2 py-1 rounded-lg'>
              View Profile
            </Link>
          </div>
        </div>) : (
          <div className="flex w-[20%] flex-col items-center bg-gray-200 text-gray-600 rounded-lg shadow-lg p-6 h-[50%] mr-3 mt-[70px]">
            {/* Profile Picture */}
            <FaUserFriends size={80}
              className="text-gray-400 "
            />

            {/* Name */}
            <h2 className="mt-4 text-xl font-semibold" style={{ color: '#08536c' }}>No Friend Selected</h2>

            {/* Action Buttons */}
            <div className=" mt-4">
              <button onClick={() => toast.error("Please select Friend to start Chat !!", { position: "top-center", theme: "colored" })} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                No Profile
              </button>
            </div>
          </div>
        )
      }


    </div>

  )
}

export default Chats;
