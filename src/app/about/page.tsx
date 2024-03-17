import Layout from "@/components/Layout";
import Image from "next/image";
import { kalam } from "@/app/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default async function About() {
  return (
    <Layout>
      <section
        className={`max-w-screen-lg mx-auto px-5 ${kalam.className} text-3xl font-light mt-20 mb-20`}
      >
        <div className="relative float-right w-[128px] h-[128px] m-2">
          <Image
            src="/images/daisy.jpeg"
            fill
            alt="Head Chef Daisy"
            className="rounded-full object-cover"
          />
        </div>
        <p>
          I hope you enjoy my delicious recipes. We have so many different{" "}
          <span className="text-orange font-semibold">flavors</span>, hope you
          get to try them all!
        </p>
        <span className={`block mt-10`}>~ Head Chef Daisy</span>
      </section>
    </Layout>
  );
}
