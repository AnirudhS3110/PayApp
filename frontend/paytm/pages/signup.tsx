
import React , { useState } from "react";
import { Container } from "../components/components";
import { Link, useNavigate } from "react-router-dom";

export function Signup()
{
    const [firstname, setFirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [phonenumber,setphonenumber]=useState("");
    const [password, setpassword] = useState("");
    const [error,seterror] = useState("")
    const nav = useNavigate()

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault();

        const result = await fetch("http://localhost:3000/authentication/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                userName:username,
                firstName:firstname,
                lastName:lastname,
                phoneNumber:phonenumber,
                password:password
            })
        })
        const json = await result.json();

        if(!json.success)
        {
            seterror(json.message);
        }
        else{
            
            nav('/signin')
        }
        setFirstname('');
            setlastname('');
            setusername('');
            setpassword('');
            setphonenumber('');
    }
    

    return(
        <section className="h-screen py-[50px] ">
            <Container >
                <div className="mx-auto">
                    <h2 className="text-black font-bold mb-[18px] font-montserrat text-[20px] text-center">Sign Up</h2>
                    <h4 className="text-gray-700 mb-[25px] text-center"> Enter your information to create an account</h4>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col justify-items-center">
                    <label className="text-[15px] text-black font-semibold mb-[8px] ">First Name</label>
                    <input className="rounded-[5px] text-[12px] py-[8px] h-[25px] border-[2px] border-white border-opacity-30 text-black  " type="text" placeholder="Enter your first name" value={firstname}  onChange={(e)=>setFirstname(e.target.value) } ></input>                        
                    
                    <label className="text-[15px] text-black font-semibold mb-[8px] ">Last Name</label>
                    <input className="rounded-[5px] text-[12px] py-[8px] h-[25px] border-[2px] border-white border-opacity-30 text-black  " type="text" placeholder="Enter your last name" value={lastname} onChange={(e)=>setlastname(e.target.value) } ></input>  

                    <label className="text-[15px] text-black font-semibold mb-[8px] ">Username</label>
                    <input className="rounded-[5px] text-[12px] py-[8px] h-[25px] border-[2px] border-white border-opacity-30 text-black  " type="text" placeholder="Enter your username" value = {username}  onChange={(e)=>setusername(e.target.value) } ></input>

                    <label className="text-[15px] text-black font-semibold mb-[8px] ">Phone Number</label>
                    <input className="rounded-[5px] text-[12px] py-[8px] h-[25px] border-[2px] border-white border-opacity-30 text-black  " type="phone" placeholder="Enter your phone number" value={phonenumber}  onChange={(e)=>setphonenumber(e.target.value) } ></input>

                    <label className="text-[15px] text-black font-semibold mb-[8px] ">Passsword</label>
                    <input className="rounded-[5px] text-[12px] py-[8px] h-[25px] border-[2px] border-white border-opacity-30 text-black  " type="password" placeholder="Enter your password" value={password} onChange={(e)=>setpassword(e.target.value) } ></input>

                    
                        <button type="submit" className="mt-[20px] mb-[10px] border-black mx-auto bg-black text-white  w-[180px] h-[30px] border-[2px] rounded-[10px] transition-colors duration-200 hover:bg-cyello hover:text-black hover:border-black">Sign Up</button>

                    </form>
                    <p className="text-center text-gray-500 pb-[20px] ">
                        Already have an account? <Link to="/signin" className="hover:text-gray-700" >Login</Link>
                    </p>
                    {error && <div>Error: {error} </div>}

                </div>
            </Container>
        </section>
    )
}