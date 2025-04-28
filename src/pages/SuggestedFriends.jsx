import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    const ctx = useContext(UserContext);
    console.log(ctx);

    useEffect(() => {
        axios.get('https://holosquad-backend.onrender.com/users/allUsers')
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    console.log(users)

    return (
        <div>
            <h2 className='mt-8 mb-8 text-center' style={{color:'#169fcc'}}>Suggested Friends 👩🏻‍🤝‍👨🏼</h2>
            {users.map((user) => (
                <div key={user._id}>
                    {
                        ctx?.user?.loggedUserDetails?.followings?.find((followings) => followings.name === user.name) ? (
                            <div><img src="" alt="" />
                                <div></div>
                            </div>
                        )
                            :
                            ctx?.user?.loggedUserDetails?.followers?.find((followers) => followers.name === user.name) ? (
                                <div><img src="" alt="" />
                                    <div></div>
                                </div>
                            )
                                :
                                (ctx.user.loggedUserDetails.email === user.email) ? (
                                    <div><img src="" alt="" />
                                        <div></div>
                                    </div>
                                )
                                    :
                                    (
                                        <Link to={`/friendProfile?name=${user.name}`} className='flex'>
                                            <div><img src={user.profilePic} alt="" className='w-11 h-11 rounded-3xl mr-7 mb-3 mt-3' /></div>
                                            <div className='mt-5' style={{color:'#08536c'}}>{user.name}</div>
                                        </Link>
                                    )
                    }

                </div>

            ))}
        </div>
    );
};

export default UsersList;