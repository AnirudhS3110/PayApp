import { useState } from "react"
import { useNavigate } from "react-router-dom";
import React from "react";
export function SignIn()
{
    const [phonenumber, setphonenumber] = useState("");
    const [password,setpassword] = useState("");
    const [error, seterror] = useState("")
    const nav = useNavigate();


    async function onClick()
    {
        const result = await fetch('http://localhost:3000/authentication/signin',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({phoneNumber:phonenumber,password:password})
        })
        const json = await result.json();
        if(!json.success)
        {
            seterror(json.message);
        }
        else
        {
            localStorage.setItem("token",json.token);
            nav('/dashboard');
        }

    }
    return(
        <div className="w-[100%] h-auto">
            <div className="mx-[140px] py-[45px] my-auto  "> /*container */

                <div className="flex mx-auto flex-col justify-start py-[20px] px-[20px] w-[40vh] h-auto bg-cyello border-[2px] border-cyello rounded-[15px] ">
                    <h3 className="font-montserrat font-semibold text-[30px] text-black text-center mb-[15px]">Sign In</h3>
                    <h2 className="font-montserrat font-normal text-[20px] text-black text-center mb-[20px]">Sign in to use!</h2>

                    <form onSubmit={async (e) => { 
                                    e.preventDefault(); 
                                    await onClick();}} className="flex flex-col justify-items-start">

                        <label className="font-montserrat font-semibold text-[14px] mb-[7px]">Phone Number</label>
                        <input className="font-lato text-[15px] mb-[10px] border-[2px] border-white rounded-sm" type="phone" value={phonenumber} onChange={(e)=>{setphonenumber(e.target.value)}} placeholder = "Enter your phone number" ></input>

                        <label className="font-montserrat font-semibold text-[14px] mb-[7px]">Password</label>
                        <input className="font-lato text-[15px] mb-[10px] border-[2px] border-white rounded-sm" type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder = "Enter your passowrd" ></input>
                        <button type="submit" className="font-lato text-cyello mx-auto bg-black ml-[10px] border-[2px] border-cyello rounded-[32px] w-[185px] h-[55px] transition-colors duration-200  hover:text-black hover:bg-cyello hover:border-[2px] hover:border-black"> Sign In!</button>

                    </form>
                    
                    {error && <div className="flex justify-item-center w-[100%]"><p className="text-center w-[100%] my-[10px] font-lato mx-auto">{error} </p></div>}

                </div>
            </div>
        </div>
    )
}