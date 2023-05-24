import getCurrentUser from "@/app/actions/getCurrentUser"
import DesktopSideBar from "./DesktopSideBar"
import MobileFooter from "./MobileFooter"

async function Sidebar({ children }) {
    const currentUser = await getCurrentUser();

    return (
        <div className="h-full">
            <DesktopSideBar currentUser={currentUser}/>
            <MobileFooter currentUser={currentUser}/>
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar