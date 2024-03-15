"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useCallback } from "react";

const HomePageRecipeCarousel = () => {
  const imgs = [
    {
      title: "Shiomi Skippers Burger",
      image: "/images/IMG_3328.jpg",
    },
    { title: "Guac N Chips", image: "/images/IMG_3496.jpg" },
    { title: "Poppyseed Roll", image: "/images/IMG_3440.jpg" },
  ];

  const [slideDir, setSlideDir] = React.useState<"left" | "right">("left");
  const [prevInd, setPrevInd] = React.useState(0);
  const [activeInd, setActiveInd] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const next = useCallback(() => {
    setPrevInd(activeInd);
    setSlideDir("left");
    setActiveInd((activeInd + 1) % imgs.length);
    setIsAnimating(true);
  }, [activeInd]);
  const prev = useCallback(() => {
    setPrevInd(activeInd);
    setSlideDir("right");
    setActiveInd(activeInd === 0 ? imgs.length - 1 : activeInd - 1);
    setIsAnimating(true);
  }, [activeInd]);
  const onAnimationEnd = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return (
    <div className="group flex relative w-full aspect-square md:aspect-video mx-auto justify-center overflow-hidden">
      <button
        className="absolute z-30 w-10 aspect-square bg-transparentBlack text-white rounded-full p-2 left-2 self-center hover:bg-orange transition"
        onClick={prev}
      >
        <ChevronLeft className="" />
      </button>
      <button
        className="absolute z-30 w-10 aspect-square bg-transparentBlack text-white rounded-full p-2 right-2 self-center hover:bg-orange transition"
        onClick={next}
      >
        <ChevronRight className="" />
      </button>
      {imgs.map(({ image, title }, ind) => {
        const inAnimation =
          (ind === activeInd || ind === prevInd) && isAnimating;
        const hidden = !inAnimation && ind !== activeInd ? "hidden" : "";
        const z = ind === activeInd ? "z-20" : "z-10";
        let animation;

        if (slideDir === "left") {
          if (ind === activeInd) {
            animation = "animate-carouselSlideInToLeft";
          } else {
            animation = "animate-carouselSlideOutToLeft";
          }
        } else {
          if (ind === activeInd) {
            animation = "animate-carouselSlideInToRight";
          } else {
            animation = "animate-carouselSlideOutToRight";
          }
        }

        return (
          <div
            className={`absolute flex ${inAnimation && animation} ${hidden} w-full h-full ${z}`}
            onAnimationEnd={onAnimationEnd}
            key={title}
          >
            <Link
              href="/recipes/demo-for-daisy"
              className={`inline-block self-end mx-auto z-30 rounded-lg text-xl md:text-3xl p-5 bg-black text-center text-white uppercase mb-5 hover:bg-orange transition font-bold`}
            >
              <h1> {title}</h1>
            </Link>

            <Image
              src={image}
              fill
              alt="Head Chef Daisy"
              className={`rounded-lg object-cover shadow-3xl`}
            />
          </div>
        );
      })}
    </div>
  );
};

const ChevronRight = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="currentColor"
    className={`w-full h-full ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

const ChevronLeft = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="currentColor"
    className={`w-full h-full ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);

export { HomePageRecipeCarousel };
