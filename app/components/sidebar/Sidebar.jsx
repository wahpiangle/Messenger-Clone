import DesktopSideBar from "./DesktopSideBar"
import MobileFooter from "./MobileFooter"

async function Sidebar({ children }) {
    return (
        <div className="h-full">
            <DesktopSideBar/>
            <MobileFooter/>
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar