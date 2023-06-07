'use client'

import useActiveChannel from "../hooks/useActiveChannel"

const ActiveStatus = () => {
    useActiveChannel();
    //this returns null but this is used in layout for the the rerenders
    return (
        null
    )
}

export default ActiveStatus