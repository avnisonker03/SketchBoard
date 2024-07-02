import React from "react";
import background from "../assets/images/background.jpg";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className=""
        >
            <div className="text-center flex flex-col gap-2">
                <h1 className="font-semibold text-gray-700 text-4xl">Unleash your imagination</h1>
                <p className="text-xl text-gray-600">Transform ideas into stunning visuals and start your journey with a few simple clicks</p>
                <h2 className="text-gray-700 text-2xl">What's in store?</h2>
                <ul className="list-disc list-inside">
                    <li className="text-xl">Infinite Canvas: Endless possibilities to draw, design, and innovate.</li>
                    <li className="text-xl">Safe and Secure: Your creativity, protected and cherished.</li>
                </ul>
            </div>
            <div className="text-center mt-4">
                <h1 className="text-2xl font-semibold">Ready to bring your visions to life?</h1>
                <button className="text-2xl border rounded-lg px-8 py-2 mt-2 text-gray-600 bg-yellow-300 hover:text-black hover:bg-yellow-200">
                    <Link to='/signup'>
                    Sign Up for free!
                    </Link>
                    </button>
            </div>
            <div className="flex justify-center">
                <div 
                    className="bg-cover bg-center"
                    style={{ backgroundImage: `url(${background})`,height: '25rem',
                    width: '40rem' }}
                >
                </div>
            </div>
        </div>
    );
}
