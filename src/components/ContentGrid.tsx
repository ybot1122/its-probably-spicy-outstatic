import type { OstDocument } from "outstatic";
import Link from "next/link";
import Image from "next/image";

type Item = {
  tags?: { value: string; label: string }[];
} & OstDocument;

type Props = {
  collection: "posts" | "recipes";
  title?: string;
  items: Item[];
  priority?: boolean;
};

const ContentGrid = ({
  title = "More",
  items,
  collection,
  priority = false,
}: Props) => {
  return (
    <section id={collection}>
      <h2 className="mb-8 text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 lg:gap-x-8 gap-y-5 sm:gap-y-6 lg:gap-y-8 mb-8">
        {items.map((item, id) => (
          <p key={id}>
            {id} - {item.slug}
          </p>
        ))}
      </div>
    </section>
  );
};

export default ContentGrid;
