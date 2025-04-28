import React, { useContext, useEffect, useState } from 'react'
import PostButton from '../components/PostButton'
import axios from 'axios'
import moment from 'moment';
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import UserContext from '../context/UserContext';
import { IoMdSend } from "react-icons/io";
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import SuggestedFriends from './SuggestedFriends';

const Home = () => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState({})
  const [commentInput, setCommentInput] = useState({})
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const ctx = useContext(UserContext);
  console.log(ctx);

  const [allPost, SetAllPost] = useState([]);

  const getAllPosts = async () => {
    // let res = await axios.get(url + "/posts/getAllPost");
    let res = await axios.get("https://holosquad-backend.onrender.com/posts/getAllPost");
    let data = res.data.post;

    const updatedData = data.map((post) => ({
      ...post,
      timeAgo: moment(post.createdAt).fromNow(),
    }));

    SetAllPost(updatedData)

    console.log(data);
  }
  console.log(allPost);

  const handleCommentCancel = () => {
    setCommentOpen(false);
  }

  const handleCommentClick = (ele) => {
    console.log(ele);
    setSelectedPost(ele);
    setCommentOpen(true);
  }

  const handleCommentChanger = (e, ele) => {
    // console.log(e.target.value);
    // setCommentInput(e.target.value);
    let postId = ele._id
    setCommentInput({
      ...commentInput,
      [postId]: e.target.value
    })
  }

  const handleSubmitComment = async (ele) => {
    // console.log(ele);
    let obj = {
      text: commentInput[ele._id]
    }

    // let res = await axios.post(url + `/posts/commentPost/${ele._id}`, obj, {
    let res = await axios.post(`https://holosquad-backend.onrender.com/posts/commentPost/${ele._id}`, obj, {
      headers: {
        Authorization: ctx.user.token
      }
    });

    let data = await res.data;
    console.log(data);

    if (data.success) {
      toast.success(data.msg, { position: "top-center", theme: "colored" });
      getAllPosts();
      setCommentInput({
        ...commentInput,
        [ele._id]: ""
      });
    }
    else {
      toast.error(data.msg, { position: "top-center", theme: "colored" })
    }
  }

  const handleDeleteComment = async (item, ele) => {
    let commentId = item._id;
    let postId = ele._id
    console.log(item._id);
    console.log(ele._id);

    // let res = await axios.delete(url + `/posts/deleteComment/${commentId}/${postId}`);
    let res = await axios.delete(`https://holosquad-backend.onrender.com/posts/deleteComment/${commentId}/${postId}`);
    let data = await res.data;
    console.log(data);

    if (data.success) {
      toast.success(data.msg, { position: 'top-center', theme: "colored" });
      getAllPosts();
      // setCommentOpen(false);
      setSelectedPost({
        ...selectedPost,
        comments: selectedPost.comments.filter((item) => item._id !== commentId)
      })
    }
    else {
      toast.error(data.msg, { position: "top-center", theme: "colored" })
    }
  }

  const handleLikeClick = async (ele) => {
    console.log(ele);
    let postId = ele._id;
    let token = ctx.user.token;

    // let res = await axios.put(url + `/posts/likesPost/${postId}`, {}, {
    let res = await axios.put(`https://holosquad-backend.onrender.com/posts/likesPost/${postId}`, {}, {
      headers: {
        Authorization: token
      }
    });
    let data = await res.data;
    console.log(data);

    if (data.success) {
      toast.success(data.msg, { position: "top-center", theme: "colored" });
      getAllPosts();
    }
    else {
      toast.error(data.msg, { position: "top-center", theme: "colored" });
    }

    //Sending Notification of Like
    let noti = await axios.post("https://holosquad-backend.onrender.com/notifications/send", {
      recipient: ele?.userId?._id,
      sender: ctx.user.userId,
      type: "Like",
      message: `${ctx.user.loggedUserDetails.name} liked your post`,
      media: ele?.file
    }, {
      headers: {
        "Authorization": token
      }
    });
    let notify = await noti.data;
    console.log(notify);
  }


  //Share the posts
  const handleShare = async(ele) => {
    console.log(ele)
  }

  useEffect(() => {
    getAllPosts()
  }, []);

  return (
    <div className='w-full h-screen flex mt-[-80px] pt-16 overflow-hidden'>

      {/* for a home page show posts and modal for upload a new posts */}
      <div className='w-[75%] h-full overflow-y-auto scrollbar-hide'>
        <PostButton getAllPosts={getAllPosts} />
        <div className='w-[35%] mt-[40px] mb-2 align-middle mx-auto'>
          {
            allPost.map((ele, index) => {
              return <div key={index} className="w-[90%] h-[400px] mt-5 mx-[220px] shadow-xl rounded-lg overflow-hidden hover:shadow-4xl transition-shadow flex flex-col duration-300 cursor-pointer" style={{ background: 'linear-gradient(to right,rgb(132, 137, 141),rgb(52, 138, 175))', boxShadow: '15px 15px 15px' }}>
                <div className='flex justify-evenly gap-4'>
                  <img className='w-8 h-8 mt-2 border-2 border-gray-600 rounded-full object-cover' src={ele?.userId?.profilePic} alt="" />
                  <p className="mt-2.5 ml-[-20px] font-extrabold w-full" style={{ color: '#090551' }}>{ele?.userId?.name}</p>
                  <p className="text-sm mt-2 ml-[-180px] text-red-900">{ele?.timeAgo}</p>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-800 to-green-900 bg-clip-text text-transparent" style={{ marginLeft: '15px' }}>
                  {ele?.title}
                </h2>

                {/* Description */}
                <p className="font-light mb-2 bg-gradient-to-r from-blue-800 to-green-900 bg-clip-text text-transparent" style={{ marginLeft: '15px' }}>
                  {ele?.description}
                </p>

                {/* Card Image */}
                {ele?.file ?
                  (
                    ele?.file?.includes("image") ? (
                      <Link state={ele._id} to={`/post?name=${ele.userId.name}`} className='w-full h-[50%] flex justify-center'><img className='rounded-lg object-fill bg-no-repeat w-[60%] h-full' src={ele?.file} alt="" /></Link>
                    ) : ele?.file?.includes("video") ? (
                      <Link state={ele._id} to={`/post?name=${ele?.userId?.name}`} className='w-full h-[50%] flex justify-center rounded-lg '> <video className='object-fill rounded-lg' controls src={ele?.file}></video></Link>
                    ) : ele?.file?.includes("audio") ? (
                      <Link state={ele._id} to={`/post?name=${ele?.userId?.name}`} className='w-full flex justify-center rounded-lg items-end h-[50%] bg-[url("https://media.tenor.com/b3pZMIW1I-UAAAAM/audio-beat.gif")]'><audio className='w-full h-10' controls src={ele?.file}></audio></Link>
                    ) : (
                      <Link state={ele._id} to={`/post?name=${ele?.userId?.name}`} className='w-full  rounded-lg flex justify-center items-end h-[50%] bg-[url("https://png.pngtree.com/element_our/20200610/ourmid/pngtree-not-found-image_2238448.jpg")]'>
                        <p className='text-red-600 font-medium text-3xl h-[60%]'>Unsupported file type 🫤</p>
                      </Link>
                    )
                  ) :
                  (
                    <Link state={ele._id} to={`/post?name=${ele?.userId?.name}`} className='w-full flex justify-center items-end h-[50%] rounded-lg bg-[url("https://png.pngtree.com/element_our/20200610/ourmid/pngtree-not-found-image_2238448.jpg")]'>
                      <p className='text-red-600 text-3xl h-[60%] font-medium'>No File found😒</p>
                    </Link>
                  )
                }

                {/* Card Content */}
                <div className="p-6">
                  {/* list of like comment share */}
                  <div className='flex justify-evenly gap-5 mb-2'>
                    {
                      ele?.likes?.includes(ctx?.user?.userId) ?
                        (<div className='flex'>
                          < FaThumbsUp onClick={() => handleLikeClick(ele)} className='cursor-pointer' style={{ color: 'red' }} />
                          <sup className='mt-1' style={{ color: 'white' }}>{ele?.likes?.length}</sup>
                        </div>
                        ) :
                        (
                          <div className='flex'>
                            < FaRegThumbsUp onClick={() => handleLikeClick(ele)} className='cursor-pointer' style={{ color: 'red' }} />
                            <sup className='mt-1' style={{ color: 'white' }}>{ele?.likes?.length}</sup>
                          </div>
                        )
                    }

                    {
                      ele?.comments?.find((comment) => comment?.user?._id === ctx?.user?.userId) ?
                        (<div className='flex '>
                          < MdMessage onClick={() => handleCommentClick(ele)} className='cursor-pointer' />
                          <sup className='mt-1'>{ele?.comments?.length}</sup>
                        </div>
                        )
                        :
                        (<div className='flex '>
                          < MdOutlineMessage onClick={() => handleCommentClick(ele)} className='cursor-pointer' />
                          <sup className='mt-1'>{ele?.comments?.length}</sup>
                        </div>
                        )
                    }

                    <button className='text-black mx-2' onClick={() => setDropdownOpen(!dropdownOpen)}>
                      < FaShareSquare className='cursor-pointer relative' />
                    </button>

                    {dropdownOpen && (
                      <ul className="absolute text-black border rounded-lg shadow-lg" style={{ left: '58%', bottom: '45%', backgroundColor: ' #abcacf' }}>
                        {/* Friends */}
                        <li className="p-5 flex flex-wrap">
                          {
                            ctx?.user?.loggedUserDetails?.followings?.map((ele, index) => {
                              return <div className='flex cursor-pointer flex-col items-center mx-4' onClick={() => { handleShare() }}>
                                <img className='w-8 h-8 rounded-full border-[1.5px] border-green-500' src={ele.profilePic} alt="" />
                                <p className='font-serif text-[10px] mt-2' style={{ color: '#08536c' }}>{ele.name}</p>
                              </div>
                            })
                          }
                        </li>
                      </ul>
                    )}
                  </div>

                  {/* To write a commment */}
                  <div className='flex gap-2 mb-4'>
                    <img src={ctx.user.loggedUserDetails.profilePic} className='w-6 h-6 rounded-full border-[1px] border-blue-600' alt="" />
                    <input value={commentInput[ele?._id]} name='comment' onChange={(e) => handleCommentChanger(e, ele)} type="text" className='rounded-full border-[1px] border-black outline-none w-full bg-gray-100 text-center' placeholder='Write a comment!' />
                    <IoMdSend onClick={() => handleSubmitComment(ele)} className='cursor-pointer' size={24} />
                  </div>
                </div>
              </div>

            }
            )
          }
        </div>


        {/* Modal for showing all comments */}
        <Modal
          className="custom-modal"
          open={commentOpen}
          onCancel={handleCommentCancel}
          footer={""}
        >


          <div className="min-h-full flex  justify-center mt-5">

            {
              selectedPost?.comments?.length > 0 ?
                (<div className="w-full max-w-lg flex flex-col gap-4 bg-green-100 shadow-md rounded-lg p-6">
                  {
                    selectedPost?.comments?.map((item, index) => {
                      return <div key={index} className='bg-green-50 relative rounded-lg cursor-not-allowed p-1'>
                        <div className='flex gap-1'>
                          <img src={item?.user?.profilePic} className='h-7 w-7 rounded-full border-[1px] border-red-400 ' alt="" />
                          <h4 className='font-bold mt-1 text-sm'>{item?.user?.name}</h4>
                        </div>

                        <div className='font-serif ml-8 line-clamp-3 text-gray-700 text-sm w-full'>
                          <p>{item?.text}</p>
                        </div>

                        {
                          item?.user?._id === ctx.user.userId ?
                            (<AiFillDelete className='absolute right-0 cursor-pointer top-2' color='red' onClick={() => handleDeleteComment(item, selectedPost)} size={15} />)
                            :
                            ("")
                        }


                      </div>
                    })
                  }
                </ div>) :
                (<div className="w-full max-w-lg bg-green-100 shadow-md rounded-lg p-6 font-bold text-sm text-red-400"> No Comments Here....
                </div>)
            }



          </ div>


        </Modal>


      </div>







      {/* this div for showing friends combo of following and folllowers */}
      <div className='w-[25%] h-full overflow-y-auto scrollbar-hide'>
        <div className='w-full flex justify-evenly'>
          <div className='flex flex-col gap-6'>
            <h2 className='font-serif py-5 text-gray-900 px-2 rounded-lg text-lg' style={{ color: '#169fcc' }}>
              Followers🙆
            </h2>
            <div className='flex flex-col items-center gap-6'>
              {
                ctx?.user?.loggedUserDetails?.followers?.map((ele, index) => {
                  return <Link state={ele._id} to={`/friendProfile?name=${ele.name}`} key={index} className='flex cursor-pointer flex-col items-center'>
                    <img className='w-8 h-8 rounded-full border-[1.5px] border-green-500' src={ele.profilePic} alt="" />
                    <p className='font-serif text-[16px] mt-2' style={{ color: '#08536c' }}>{ele.name}</p>
                  </Link>
                })
              }
            </div>
          </div>

          <div className='flex flex-col gap-6'>
            <h2 className='font-serif py-5 px-2 rounded-lg text-lg' style={{ color: '#169fcc' }}>
              Followings🙆‍♀️
            </h2>
            <div className='flex flex-col items-center gap-6'>
              {
                ctx?.user?.loggedUserDetails?.followings?.map((ele, index) => {
                  return <Link to={`/friendProfile?name=${ele.name}`} state={ele._id} key={index} className='flex cursor-pointer flex-col items-center'>
                    <img className='w-8 h-8 rounded-full border-[1.5px] border-green-500' src={ele.profilePic} alt="" />
                    <p className='font-serif text-[16px] mt-2' style={{ color: '#08536c' }}>{ele.name}</p>
                  </Link>
                })
              }
            </div>
          </div>

        </div>

        <div className='flex mx-11 flex-col gap-6'>
          <SuggestedFriends />
        </div>

      </div>



    </div>

  );
}

export default Home;
