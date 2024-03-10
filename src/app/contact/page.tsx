import Layout from "@/components/Layout";
import Image from "next/image";
import { kalam } from "@/app/fonts";

export default async function About() {
  return (
    <Layout>
      <section className={`max-w-screen-sm mx-auto px-5 mt-20 mb-20`}>
        <h1 className="text-3xl block text-center w-full">
          We'd Love to Hear From You!
        </h1>
        <form className="block">
          <input
            type="text"
            placeholder="Your Name"
            className="border block my-10 p-5 w-full"
          ></input>
          <input
            type="text"
            placeholder="Your Email"
            className="border block  my-10 p-5  w-full"
          ></input>
          <input
            type="text"
            placeholder="Your Subject"
            className="border block  my-10 p-5  w-full"
          ></input>
          <textarea
            placeholder="Your Message"
            className="border block  my-10 p-5  w-full"
          />
          <button
            type="submit"
            className="block mx-auto border p-5 hover:bg-orange transition"
          >
            SUBMIT
          </button>
        </form>
      </section>
    </Layout>
  );
}
