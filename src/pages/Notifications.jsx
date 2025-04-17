import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import axios from "axios";
import Message from '../assets/images.jpg'

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  const ctx = useContext(UserContext);
  console.log(ctx);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/notifications/getnotify/${ctx.user.userId}`);
        setNotifications(response.data);
        console.log(notifications)
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <h2 style={{textAlign:'center', fontSize:'25px', textDecoration:'underline', textShadow:'2px 2px 2px', marginTop:'8%', marginBottom:'1.7%'}}>Notifications</h2>

      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {notifications.map((notification, index) => (
              <tr key={notification._id} style={{borderBottom:'1px solid yellow', textAlign:'center'}}>
                <th scope="row" className="px-6 py-4 font-bold whitespace-nowrap dark:text-white" style={{fontSize:'20px' ,color:'#169fcc'}}>
                  {notification.message || `${notification.type} from user ${notification.sender}`}
                  {ctx.setCount(index+1)}
                  
                  
                </th>
                <td className="py-4" >
                  {<img src={notification?.media || Message} style={{width:'45px', height:'45px', borderRadius:'50%', marginLeft:'-220%'}}/>}
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default Notifications;
