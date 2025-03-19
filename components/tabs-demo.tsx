"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Tabs } from "./ui/tabs";

export function TabsDemo() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const tabs = [
        {
            title: "Services",
            value: "services",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Services tab</p>
                    <DummyContent />
                </div>
            ),
            href: "#services"
        },
        {
            title: "Pricing",
            value: "pricing",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Pricing tab</p>
                    <DummyContent />
                </div>
            ),
            href: "#pricing"
        },
        {
            title: "Users",
            value: "users",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Users tab</p>
                    <DummyContent />
                </div>
            ),
            href: "#users"
        },
        {
            title: "Contact",
            value: "contact",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>Contact tab</p>
                    <DummyContent />
                </div>
            ),
            href: "#contact"
        }
    ];

    if (!isClient) {
        return null; 
    }

    return (
        <div className="md:flex hidden [perspective:1000px] relative flex-col max-w-5xl w-full items-start justify-start">
            <Tabs
                tabs={tabs}
                contentClassName="hidden"
                containerClassName="gap-4"
            />
        </div>
    );
}

const DummyContent = () => {
    return (
        <Image
            src="/linear.webp"
            alt="dummy image"
            width="1000"
            height="1000"
            className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
        />
    );
};
