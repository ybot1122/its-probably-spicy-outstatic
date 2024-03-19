"use client";
import { useCallback, useState } from "react";
import { RecipeFinder } from "./RecipeFinder";

const AllRecipesMain = ({ content }: { content: JSX.Element[] }) => {
  const [navOpen, setNavOpen] = useState(false);

  const openNav = useCallback(() => setNavOpen(!navOpen), [navOpen]);

  return (
    <>
      {/* disabled until categories are added <button className="lg:hidden" onClick={openNav}>Open Categories</button> */}
      <div className="flex">
        {/* disabled until categories are added <RecipeFinder navOpen={navOpen} /> */}
        <div className="grow grid grid-cols-3 gap-2 ml-4">{content}</div>
      </div>
    </>
  );
};

export { AllRecipesMain };
