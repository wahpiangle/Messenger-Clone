'use client'
import Input from "@/app/components/inputs/input";
import { useState } from "react"
import { useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

const AuthForm = () => {
    const [variant, setVariant] = useState('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    const toggleVaraint = () => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }

    //useForm is hook to handle form
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true);
        if (variant === 'REGISTER') {
            //call register api
        }

        if (variant === 'LOGIN') {
            //next auth signin
        }
    }

    const socialAction = (action) => {
        setIsLoading(true);
        if (action === 'google') {
            //next auth signin with google
        }

        if (action === 'facebook') {
            //next auth signin with facebook
        }
    }


    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">

                {/* handleSubmit is written this way to allow useForm to catch it, and handleSubmit will pass data to onSubmit */}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input label="Name" id="name" register={register} errors={errors} disabled={isLoading} />
                    )}
                    <Input label="Email" id="email" type="email" register={register} errors={errors} disabled={isLoading}/>
                    <Input label="Password" id="password" type="password" register={register} errors={errors} disabled={isLoading}/>
                    <div>
                        <Button disabled={isLoading} fullWidth type="submit">
                            {variant === 'REGISTER' ? 'Register' : 'Login'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? "New to Messenger?" : "Already have an account?"}
                    </div>
                    <div onClick={toggleVaraint} className="underline cursor-pointer">
                        {variant === 'LOGIN' ? "Create an account" : "Login"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm