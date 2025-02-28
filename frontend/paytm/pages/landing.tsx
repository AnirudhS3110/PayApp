import { useNavigate } from "react-router-dom"
import React from "react"


export function LandingPage()
{
    const nav = useNavigate();
    function signUp()
    {
        nav('/signup')
    }
    function signIn()
    {
        nav('/signin')
    }

    return(
        <section className="h-auto w-[100%]  ">
            <div className="flex flex-col px-[40px] items-center md:inline-flex lg:flex-row lg:my-[60px]   lg:px-[140px] lg:justify-center     w-[100%] ">

                <div className=" flex flex-col justify-start py-[45px] w-auto max-w-[447px]  items-center md:flex-row md:flex-wrap lg:h-auto">
                    <h3 className=" text-[40px] text-center hover:text-[45px] hover:h-auto font-montserrat text-cyello h-auto font-semibold md:text-[50px]  md:text-start md:leading-[48px] lg:leading-[68px] transition-all duration-200 mb-[20px] hover:text-opacity-100 md:hover:text-[55px] md:hover:h-auto lg:text-[60px] lg:hover:text-[64px] ">Simplify your Payments!</h3>
                    <p className="font-lato min-w-[250px] w-[250px]  text-center hover:text-opacity-100 hover:text-[20px] text-white text-[18px] leading-[34px] mb-[30px] md:max-w-[450px] md:min-[447px] md:w-[447px] md:text-start transition-all duration-200 h-auto text-opacity-70 md:hover:text-opacity-100 md:hover:text-[20px] hover:h-auto lg:max-w-[450px]">Experience a new way to manage your money effortlessly! </p>
                    <button onClick={signUp} className="block mb-3 font-lato text-black bg-cyello mr-[15px] border-[2px] border-cyello rounded-[32px] w-[185px] h-[55px] transition-colors duration-200  hover:border-cyello hover:text-cyello hover:bg-black md:flex-initial md:mb-0  "> Sign Up!</button>
                    <button onClick={signIn} className="block font-lato text-cyello bg-black md:ml-[15px] border-[2px] border-cyello rounded-[32px] w-[185px] h-[55px] transition-colors duration-200 hover:border-cyello hover:text-black hover:bg-cyello "> Sign In!</button>
                </div>

                <div className="flex max-w-[450px] items-center md:max-w-[475px] h-auto lg:items-end lg:max-w-[560px]">
                    <img src="../images/HeroSectionImage.png"></img>
                </div>x``


            </div>
        </section>
    )
}