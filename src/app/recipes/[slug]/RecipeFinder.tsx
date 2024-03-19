"use client";

import { useState } from "react";

const categories = [
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
  {
    category: "instant pot",
    subcategories: ["easy", "fast", "10 ingredients or less", "comfort"],
  },
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
  {
    category: "baking",
    subcategories: ["bread", "bun", "muffins", "pastries"],
  },
];

const RecipeFinder = ({ navOpen }: { navOpen: boolean }) => {
  return (
    <div
      className={`${!navOpen ? "max-lg:hidden" : ""} absolute lg:static w-[240px] border-r border-orange pr-2 shrink-0 z-10 bg-tan`}
    >
      <input
        type="text"
        placeholder="Search Recipes"
        className="mb-5 bg-silver p-3 w-full rounded-full"
      ></input>
      All Recipes (1,325)
      <ul className="pl-5">
        {categories.map(({ category, subcategories }) => (
          <li key={category}>
            {category}

            <ul className="pl-5 list-disc">
              {subcategories.map((subcategory) => (
                <li key={subcategory}>{subcategory}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { RecipeFinder };
