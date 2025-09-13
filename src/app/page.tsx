"use client";

import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

export default function Home() {
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(SplitText);

    useGSAP(() => {
        const split = SplitText.create(".text", { type: "chars", charsClass: "char++" });

        // Hide char1 initially
        gsap.set(".char1", { opacity: 0 });
        gsap.set(".char3", { y: 150});

        // Get char1 and char4 elements
        const char1 = document.querySelector(".char1");
        const char4 = document.querySelector(".char4");

        if (char1 && char4) {
            // Get positions
            const char1Rect = char1.getBoundingClientRect();
            const char4Rect = char4.getBoundingClientRect();

            // Calculate the distance from char1 to char4
            const xDistance = char1Rect.left - char4Rect.left;
            const yDistance = char1Rect.top - char4Rect.top;

            // Create timeline for sequential animations
            const tl = gsap.timeline();

            // Animate char4 from char1's position
            tl.fromTo(
                ".char4",
                {
                    x: xDistance,
                    y: yDistance,
                },
                {
                    x: 0,
                    y: 0,
                    duration: 2,
                    delay: 1, // Stay at char1's position for 1 second
                    rotate: 720,
                    ease: "power2",
                }
            )
                .to(".char3", {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "bounce.out",
                })
                // After char4 animation, slide char1 into position
                .to(".char1", {
                    x: 0,
                    opacity: 1,
                    duration: 2,
                    ease: "elastic.Out",
                },"+=1"); // Start slightly before char4 finishes
        }
    });

    return (
        <div className="font-sans grid grid-rows-[1.5fr_2fr] items-center justify-items-center min-h-screen">
            <div className="h-full w-full bg-[#d6611d] flex items-end justify-center overflow-hidden">
                <p className="text font-mate text-[140px] leading-35 text-[#0c0c0c]">OM!O</p>
            </div>
            <div className="h-full w-full bg-[#0c0c0c]"></div>
        </div>
    );
}
