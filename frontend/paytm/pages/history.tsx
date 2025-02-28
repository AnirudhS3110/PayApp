import {useEffect, useState} from "react"
import { Link } from "react-router-dom";
import React  from "react"

export function History()
{
    const [loading,setloading] = useState(true);
    const [itransactions, setITransactions] = useState([])
    const [otransactions, setOTransactions] = useState([])

    const token = localStorage.getItem("token");

    useEffect(()=>{

        async function getITransactions()
        {
            setloading(true);
            const result = await fetch('http://localhost:3000/accounts/transactions',{
                "method":"GET",
                "headers":{"Content-Type":"application/json",
                    "authorization":token
                    }
                })
            const json = await result.json();
            const itransactionList =  json.itransactionList;
            const otransactionList = json.otransactionList;
            setITransactions(itransactionList);
            setOTransactions(otransactionList);
            setloading(false)
        }
        getITransactions();

    },[]);

    if(loading)
    {
        return <div className="font-montserrat font-semibold flex items-center text-[32px]">
            <p>Loading...</p>
        </div>
    }

    function ITransactions()
    {
        return(
         <div className="w-[100%] flex flex-col-reverse justify-start">
                {itransactions.map((transaction,index)=>{
                    return(
                        <div key={index} className="flex flex-row justify-between w-[100%] mx-[20px] my-[15px] px-[50px] py-[12px] border-black text-[18px] rounded-md font-montserrat bg-opacity-70 font-semibold transition-all duration-200 text-black bg-cyello hover:bg-opacity-100 hover:border-cyello">
                            <span>
                                {transaction.sender.userName} sent {transaction.amount}
                            </span>
                            <div>
                                Date: {transaction.date}
                            </div>
                        </div>
                    )
                })}
        </div>)
    }

    function OTransactions()
    {
        return(
         <div className="w-[100%] flex flex-col-reverse justify-center">
                {otransactions.map((transaction,index)=>{
                    return(
                        <div key={index} className="flex flex-row justify-between w-[100%] mx-[20px] my-[10px] px-[50px] py-[12px] text-[18px] rounded-md font-montserrat font-semibold text-black bg-cyello bg-opacity-70 transition-opacity-200 hover:bg-opacity-100 hover:drop-shadow-xl ho">
                            <span>
                                {transaction.receiver.userName} sent {transaction.amount}
                            </span>
                            <span>
                                Date: {transaction.date}
                            </span>
                        </div>
                    )
                })}
        </div>)
    }



    return(
        <div className=" h-[100%] w-[100%]">

                <div className='flex flex-row justify-around  ml-[320px] mr-[600px] w-[100vw] '>

                    <div className='w-[100px] h-auto pt-[20px] pb-[15px]'>
                        <Link to="/"><img src='../images/PayApp.png'/></Link>
                    </div>

                    <div className='flex flex-row justify-start'>

                        <div className='mr-[5px] pt-[20px]'>
                            <div  className="font-montserrat pb-[15px] text-[20px]  text-cyello border-b-[2px] border-b-black transition-colors duration-200 hover:text-white"> Welcome <text className="text-white hover:text-cyello"></text></div>
                        </div>

                    

                        <div className='mr-[500px] ml-[10px] pt-[20px]'>
                            <button onClick={()=>{localStorage.removeItem("token"); nav('/')}}>
                            <img src='../images/logout.svg'></img>
                            </button>
                        </div>

                    </div>

                </div>


            



            <div className="px-[140px] h-[100%] w-[100%]">

                {loading && <div className="text-center text-[40px] font-montserrat font-bold">Loading... </div>}

                    <div className="mb-[20px]">
                        <h3 className="text-white font-montserrat font-semibold text-[30px] rounded-md ml-[10px]">Debit Transaction History:</h3>
                        {itransactions.length==0 && <text className="text-cyello rounded-md ml-[10px] mx-auto">No transactions happened yet</text>}
                        <ITransactions/>
                    </div>

                    <div className="mb-[20px]">
                        <h3 className="text-cyello font-montserrat font-semibold text-[30px] rounded-md ml-[10px]">Credit Transaction History:</h3>
                        {otransactions.length==0 && <text className="text-cyello rounded-md ml-[10px] mx-auto">No transactions happened yet</text>}
                        <OTransactions/>
                    </div>

            </div>

        </div>

    )
}