'use client'
import Input from "@/app/components/inputs/input";
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

const AuthForm = () => {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState('REGISTER');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        if(session?.status === 'authenticated'){
            router.push('/conversations')
        }
    },[session?.status])

    const toggleVaraint = () => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }

    //useForm is hook to handle form from react-hook-form
    //register is used to register input to useForm
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
            axios.post('/api/register', data) //submits data to api/register
            .then(()=> signIn('credentials', data))
            .then(() => toast.success('Registered successfully!'))
            .catch(() => toast.error('Something went wrong!')) //create a toast for error
            .finally(() => setIsLoading(false));
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data, //sprad data to pass email and password
                redirect: false,
            })
            .then((callback) =>{
                if(callback.error){
                    toast.error('Invalid Credentials');
                }
                if(callback.ok && !callback?.error){
                    toast.success('Logged in successfully!');
                }
            })
            .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action) => {
        setIsLoading(true);
        signIn(action, { redirect: false })
        .then((callback) => {
            if(callback?.error){
                toast.error('Something went wrong!');
            }
            if(callback?.ok && !callback?.error){
                toast.success('Logged in successfully!');
            }
        })
        .finally(() => setIsLoading(false))
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-4">
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