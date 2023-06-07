import ActiveStatus from './components/ActiveStatus';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';
import './globals.css';

export const metadata = {
    title: "Messenger Clone",
    description: "Developed by TQM"
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <AuthContext>
                    <ToasterContext />
                    <ActiveStatus/>
                    {children}
                </AuthContext>
            </body>
        </html >
    )
}

export default RootLayout