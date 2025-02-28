import React, { useEffect, useState  } from "react"
import useSwr from "swr"
import { Link, useNavigate } from "react-router-dom";


const fetcher = async(url)=>{
    const token = localStorage.getItem("token");
    const res = await fetch(url,{
        "method":"GET",
        "headers":{"Content-Type":"application/json",
            "authorization":token
        }    
    });
    const json = await res.json();
    return json;
}


function useMount()
{
    
    
        
        const {data:balanceData,error:balanceError} = useSwr('http://localhost:3000/accounts/balance',fetcher);
        const username = balanceData?.username || "";
        const balance = balanceData?.balance || 0;
            
        const {data:usersData,error:userError} = useSwr('http://localhost:3000/accounts/users',fetcher);
        const users = usersData?.users || [];
        
        const {data:notificationData,error:notificationError} = useSwr('http://localhost:3000/accounts/notify',fetcher);
        const notifcount = notificationData?.count || 0;
        
    
   
     return {username,balance,users,notifcount}

}

export function Dashboard()
{
    const {username,balance,users,notifcount,} = useMount()
    const [search, setSearch] = useState("");
    const [filteredusers, setFilteredUsers] = useState([]);
    
    
    const nav = useNavigate()
    const token = localStorage.getItem("token");
    

    function defaultFind()
    {
        return (
            <div className="w-[100%] flex flex-col justify-center items-center opacity-60 mt-[85px]">
                <div >
                    <img className="w-[150px] h-auto" src='../images/searchicon.svg'></img>
                </div>
                <div>
                    <p className="font-montserrat text-white text-center text-[24px]">Search for user to pay</p>
                </div>
            </div>
        )
        
    }

    useEffect(()=>{
        if(search=='')
        {
            setFilteredUsers([]);        
        }
            

    },[search])
    


    function Searchresults()
        {
            const filter = search;
            const filteredUsers = users.filter((user)=>{
                return user.userName.includes(filter)
            });

            console.log(filteredUsers)
            setFilteredUsers(filteredUsers)
        }
    
    
    

    return(
        <div className="h-[100%] w-[100%] my-auto">

            <div className='flex flex-row justify-around  ml-[320px] mr-[600px] w-[100vw] '>

                    <div className='w-[100px] h-auto pt-[20px] pb-[15px]'>
                        <Link to="/"><img src='../images/PayApp.png'/></Link>
                    </div>

                    <div className='flex flex-row justify-start'>

                    <div className='mr-[5px] pt-[20px]'>
                        <div  className="font-montserrat pb-[15px] text-[20px]  text-cyello border-b-[2px] border-b-black transition-colors duration-200 hover:text-white"> Welcome <text className="text-white hover:text-cyello">{username}</text></div>
                    </div>

                    <div className='mr-[5px] pt-[20px]'>

                        <div  className="font-montserrat pb-[15px] text-[20px] mx-[15px] text-cyello border-b-[2px] border-b-black transition-colors duration-200 hover:border-b-[2px] border-cyello">
                            
                                <button className="pt-[0px] flex flex-row justify-start rounded-[3px] transition-colors duration-200 hover:bg-cyello hover:bg-opacity-15" onClick={()=>{nav('/notifications')}} >
                                    <img src='../images/newNotif.svg'></img>
                                    <text>{(notifcount)? notifcount:''}</text>
                                </button> 
                            </div>
                        </div>

                        <div className='mr-[5px]  pt-[20px]   ' >
                            <button className="transition-colors duration-200 hover:bg-cyello hover:bg-opacity-15" onClick={()=>{nav('/transactionhistory')}}>
                            <img src='../images/transactionHistory.svg'></img>
                            </button>
                        </div>

                        <div className='mr-[500px] ml-[10px] pt-[20px]'>
                            <button onClick={()=>{localStorage.removeItem("token"); nav('/')}}>
                            <img src='../images/logout.svg'></img>
                            </button>
                        </div>

                    </div>

            </div>

            
            <div className="ml-[320px] mr-[140px] my-auto flex flex-col">

                <div className="mt-[10px] mb-[30px]">
                    <h3 className="text-cyello font-lato font-semibold text-[20px]">Your current balance: <text className="text-white">{balance}</text></h3>
                </div>

                <div className="w-[100%]">
                    <h3 className="text-cyello font-lato font-semibold text-[20px] mb-[20px]">Search users:</h3>

                    <div className="w-[95%] mb-[20px] flex flex-row justify-start">
                        <input className="w-[100%] px-[10px] rounded-sm" type = "text" placeholder="search by username..." value={search} onChange={e=>setSearch(e.target.value)}></input>
                        <button type="submit" onClick={Searchresults} className="flex items-center ml-2 p-1 bg-black text-white border-[2px] transition-all duration-200 rounded-[5px] border-black  hover:border-cyello  hover:border-opacity-70">
                            <img src='../images/searchicon.svg'></img>
                        </button>
                    </div>

                    {(search.length == 0 ) ? defaultFind():<div/>}


                    {search.length!=0 && <div className="w-[100%] my-[10px]">
                        {filteredusers.map((user,index)=>{
                            const receiver = user.userName;
                            console.log(receiver);
                            return(
                                <div className="w-[100%] flex flex-row justify-between border-[2px]  rounded-[30px] px-3 my-3 transition-colors duration-200   hover:bg-cyello hover:bg-opacity-25 " key={index}>
                                    <div className="text-cyello font-lato text-[16px] my-auto  ">
                                            {user.userName}
                                    </div>
                                    <div>
                                    <button  onClick={()=>nav('/pay', {state:{receiver,username}})} className="my-2 font-lato text-[14px] text-cyello mx-auto bg-black ml-[10px] border-[2px] border-opacity-50  border-cyello rounded-[32px] w-[100px] h-[28px] transition-all duration-200  hover:text-black hover:bg-cyello hover:border-[2px] hover:border-black"> Send Money</button>

                                    </div>

                                </div>
                            )})}
                    </div>}
                    
                </div>





            </div>

        </div>
    )
}