
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export function Pay()
{

    const nav = useNavigate()
    const [input,setinput] = useState("")
    const [error,setError] = useState("")
    const [Sender,setSender] = useState("")
    const [Receiver,setReceiver] = useState("")
    

    const location = useLocation();
    const { receiver = '',username = '' } = location.state || {}
    
    useEffect(()=>{
        setReceiver(receiver);
        setSender(username)
    },[])


    
    



    async function hitPay(e: React.FormEvent):Promise <void>
    {
        e.preventDefault;

        console.log("into hitpay function")
        const amount:number = Number(input)
        const token = localStorage.getItem("token")

        try{
            const res = await fetch('http://localhost:3000/accounts/pay',{
                "method":"POST",
                "headers":{"Content-Type":"application/json",
                    authorization:token
                },
                "body":JSON.stringify({
                        userName:Receiver,
                        amount: amount
                    })
            });
    
            const json = await res.json();
    
            if(!json.success)
            {
                setError(json.message);
            }
            else{
    
                alert("payment successful!")
    
                setTimeout(()=>{nav('/dashboard')},2000)
    
            }
        }
        catch (err) {
            console.error("Error while making payment:", err);
            setError("Something went wrong. Please try again.");
        }


    }

    return(
        <div className="h-[100%] w-[100%] my-auto">

            <div className='flex flex-row justify-between  ml-[320px] mr-[600px] w-[100vw] '>

                <div className='w-[100px] h-auto pt-[20px] pb-[15px]'>
                    <Link to="/"><img src='../images/PayApp.png'/></Link>
                </div>

                <div className='mr-[500px] pt-[20px]'>
                    <div  className="font-montserrat pb-[15px] text-[20px] mr-[15px] text-cyello border-b-[2px] border-b-black transition-colors duration-200 hover:border-b-[2px]"> Welcome <span className="text-white">{Sender}</span></div>
                </div>

                
            </div>

            <div className='mx-[140px] my-[60px] h-[100vh] flex justify-center '>

                <div className='mx-auto  px-[15px] bg-cyello py-3 rounded-3xl w-[250px] h-[210px]  flex flex-col justify-start'>

                    <h3 className='font-montserrat text-black font-semibold text-center mb-3 mt-3'>Pay to <text>{Receiver}</text></h3>

                    <div className='flex flex-col justify-start  '>

                        <label className='font-montserrat text-black font-semibold mb-3 mt-3'>Amount:</label>
                        <input className='font-lato rounded-md p-[3px] mb-3' type='text' placeholder='Enter the amount' value={input} onChange={(e)=>{setinput(e.target.value)}}></input>
                        <button  onClick={hitPay} className="font-lato mx-auto  text-cyello bg-black border-[2px] border-cyello rounded-[32px] w-[100px] h-[40px] transition-colors duration-200  hover:text-black hover:bg-cyello hover:border-[2px] hover:border-black"> Pay</button>

                    </div>

                    {error && <div className='font-lato text-center'>{error}</div>}
                    

                </div>

            </div>

        </div>
    );
}