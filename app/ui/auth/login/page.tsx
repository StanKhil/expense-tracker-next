'use client';

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useState } from "react";
import { login } from "../../../lib/auth"; 
import { useRouter } from "next/navigation";

export default function Page(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try{
            if (!userName || !password) {
                alert("Please enter both username and password.");
                return;
            }
            const response = await login(userName, password);
            if (response) router.push("/");
        } catch (error) {
            alert("An error occurred during login. Please try again.");
        }
        
    };
    
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center w-full sm:items-center">
                <h1 className="text-2xl font-bold text-center">Login Page</h1>

                <form className="flex flex-col gap-4 w-full max-w-xs">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        className="p-2 border rounded"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="p-2 border rounded"
                    />
                    <button 
                        type="button" 
                        onClick={handleLogin} 
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>  
                </form>

                <Link href="/ui/auth/register" className="text-blue-500 hover:underline text-center">
                    Don't have an account? Register here
                </Link>
            </main>

        </div>
    );
}