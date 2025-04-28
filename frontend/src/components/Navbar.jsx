import { useNavigate } from "react-router-dom"
import { useUser } from "../context/userContext"

function Navbar({ currentPage }) {
    const navigate = useNavigate()
    const { user, logout } = useUser()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    const handleDashboardNavigate = () => {navigate("/")}
    const handleChartNavigate = () => {navigate("/chart")}
    const handleWalletNavigate = () => {navigate("/wallet")}
    const handleNewsNavigate = () => {navigate("/news")}
    const handleLoginNavigate = () => {navigate("/login")}

    return (
        <div className="w-[30vh] h-full pt-[12vh] bg-black text-white absolute">
            <nav className="w-full h-full text-[2.3vh] p-[4vh] flex flex-col">
                <button 
                    className={`w-full h-10vh py-[0.8vh] pl-[3vh] my-[1vh] text-left rounded-lg hover:bg-[#050505] ease-in-out duration-200 cursor-pointer ${currentPage === "Dashboard" ? "bg-[#050505]" : ""}`}
                    onClick={handleDashboardNavigate}>
                    Dashboard
                </button>
                <button  
                    className={`w-full h-10vh py-[0.8vh] pl-[3vh] my-[1vh] text-left rounded-lg hover:bg-[#050505] ease-in-out duration-200 cursor-pointer  ${currentPage === "Chart" ? "bg-[#050505]" : ""}`}
                    onClick={handleChartNavigate}>
                    Chart
                </button>
                <button 
                    className={`w-full h-10vh py-[0.8vh] pl-[3vh] my-[1vh] text-left rounded-lg hover:bg-[#050505] ease-in-out duration-200 cursor-pointer ${currentPage === "Wallet" ? "bg-[#050505]" : ""}`}
                    onClick={handleWalletNavigate}>
                    Wallet
                </button>
                <button 
                    className={`w-full h-10vh py-[0.8vh] pl-[3vh] my-[1vh] text-left rounded-lg hover:bg-[#050505] ease-in-out duration-200 cursor-pointer ${currentPage === "News" ? "bg-[#050505]" : ""}`}
                    onClick={handleNewsNavigate}>
                    News
                </button>
                {!user ? (
                    <button 
                        className={`w-full h-10vh py-[0.8vh] pl-[3vh] my-[1vh] text-left rounded-lg mt-auto hover:bg-[#050505] ease-in-out duration-200 cursor-pointer ${currentPage === "Login" ? "bg-[#050505]" : ""}`}
                        onClick={handleLoginNavigate}>
                        Log-in
                    </button>
                ) : (
                    <button 
                        className="w-full h-10vh py-[0.8vh] pl-[3vh] my-[1vh] text-left rounded-lg mt-auto hover:bg-[#050505] ease-in-out duration-200 cursor-pointer"
                        onClick={handleLogout}>
                        Log-out
                    </button>
                )}
            </nav>
        </div>
    )
}

export default Navbar