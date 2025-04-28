import Account from "./Account"

function Header({ currentPage }) {
    return (
        <div className="w-full h-[12vh] pl-[33vh] pr-[5vh] bg-black flex items-center justify-between text-white absolute z-10">
            <h1 className="text-yellow-300 text-[3.2vh]">{currentPage}</h1>
            <Account />
        </div>
    )
}

export default Header