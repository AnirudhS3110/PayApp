import { useEffect, useState } from "react";
import React from "react";


export function Notifications()
{
    const [notification,setNotification] = useState([]);
    const token = localStorage.getItem("token");
    const[loading,setLoading] = useState(false)

    useEffect(()=>{
        async function getNotification()
        {
            setLoading(true);
            const result = await fetch('http://localhost:3000/accounts/notification',{
                "method":"GET",
                "headers":{"Content-Type":"application/json",
                    "authorization":token
                    }
        })

        const json = await result.json();
        const notificationList = json.notificationList;
        setNotification(notificationList);
        setLoading(false);  
        }
        getNotification();

    },[])

    useEffect(()=>{console.log(notification)},[notification])

    function GetNotifications()
    {
        return(
            <div className='flex flex-col justify-start'>

            {
                notification.map((notif,index)=>{
                        return(
                            <div key={index} className="flex flex-row w-[100%] px-[50px] py-[15px] mb-[15px] justify-between text-black bg-cyello bg-opacity-80 transition-all duration-200 rounded-[13px] mx-[10px] font-montserrat font-medium hover:bg-opacity-100">
                                <span>{notif.senderUsername.userName} paid you {notif.amount}</span>
                                <div className="font-montserrat">
                                    Date: {notif.date}
                                </div>
                            </div>
                        )
                    })
            }
            </div>
            )
    }

    return(
            <div className=" h-[100%] w-[100%]">
                <div className="px-[140px] h-[100%] w-[100%]">
                    
                    <div className="mb-[20px]">
                        <h3 className="text-cyello font-montserrat font-semibold text-[30px] rounded-md ml-[10px]">Notifications:</h3>
                        {notification.length==0 && <text className="text-cyello rounded-md ml-[10px] mx-auto text-[30px] font-montserrat font-medium">You have no notification</text>}
                    </div>
                        <GetNotifications/>
                    
                </div>
            </div>
        )

}