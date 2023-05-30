'use client'

const MessageInput = ({ id, type, required, register, placeholder, errors }) => {
    return (
        <div className="relative w-full">
            <input id={id} type={type} autoComplete={id} {...register(id, {required})} placeholder={placeholder} className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"/>
        </div>
    )
}

export default MessageInput