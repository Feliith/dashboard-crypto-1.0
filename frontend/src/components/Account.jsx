import React, { useState } from "react"
import { useUser } from "../context/userContext"
import { Link } from "react-router-dom"

import profile from "../assets/profile.png"

const Account = () => {
    const {user, logout} = useUser()
    const [showMenu, setShowMenu] = useState(false)

    const handleLogout = () => {
        logout()
        setShowMenu(false)
    }

    return (
        <div>
            {!user ? (
                <button className="w-full h-10vh py-[0.8vh] px-[3vh] my-[1vh] text-[2.3vh] rounded-lg hover:bg-[#050505] ease-in-out duration-200 cursor-pointer">
                    <Link to="/login">Log-in</Link>
                </button>
            ) : (
                <div
                    className="relative" 
                    onClick={() => setShowMenu(!showMenu)}>
                    <img src={profile} alt="" className="w-[6vh] h-[6vh]" />
                    {showMenu && (
                        <div className="w-[14vh] bg-[#050505] flex flex-col absolute right-[-3vh] top-[8vh]">
                            <button className="p-[1vh] hover:bg-[#000000]">
                                <Link to="/wallet">Wallet</Link>
                            </button>
                            <button className="p-[1vh] hover:bg-[#000000]" onClick={handleLogout}>
                                <Link to="/">Log-out</Link>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Account