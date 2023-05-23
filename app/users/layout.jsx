import Sidebar from "../components/sidebar/Sidebar"

export default async function UsersLayout({children}){
    return(
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    )
}