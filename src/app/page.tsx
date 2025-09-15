"use client";

import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

export default function Home() {
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(SplitText);

    useGSAP(() => {
        const split = SplitText.create(".text", { type: "chars", charsClass: "char++" });

        // Get char1 and char4 elements
        const char1 = document.querySelector(".char1");
        const char2 = document.querySelector(".char2");
        const char3 = document.querySelector(".char3");
        const char4 = document.querySelector(".char4");

        if (char1 && char2 && char3 && char4) {
            // Get positions
            const char1Rect = char1.getBoundingClientRect();
            const char2Rect = char2.getBoundingClientRect();
            const char3Rect = char3.getBoundingClientRect();
            const char4Rect = char4.getBoundingClientRect();

            const char2xDistance = char3Rect.right - char2Rect.right;
            const char4xDistance = char1Rect.left - char4Rect.left + char2xDistance;
            const cahr4yDistance = char1Rect.top - char4Rect.top;

            gsap.set(".char1", { opacity: 0 });
            gsap.set(".char3", { y: 150 });
            gsap.set(".char2", { x: char2xDistance });

            // Create timeline for sequential animations
            const tl = gsap.timeline();

            // Animate char4 from char1's position
            tl.fromTo(
                ".char4",
                {
                    x: char4xDistance,
                    y: cahr4yDistance,
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
                .to(".char2", {
                    x: 0,
                    ease: "back.in",
                })
                .to(".char3", {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "back.out",
                })
                // After char4 animation, slide char1 into position
                .to(".char1", {
                    x: 0,
                    opacity: 1,
                    duration: 1.75,
                    ease: "elastic.Out",
                }); // Start slightly before char4 finishes
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
