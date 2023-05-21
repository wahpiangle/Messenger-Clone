import './globals.css';

export const metadata = {
    title: "Messenger Clone",
    description: "Developed by TQM"
}

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html >
    )
}

export default RootLayout