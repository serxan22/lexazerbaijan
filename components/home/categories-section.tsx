"use client";

import { motion } from "framer-motion";

import { CategoryCard } from "@/components/articles/category-card";

type Locale = "en" | "az" | "ru";

type CategoriesSectionProps = {
  categories: any[];
  dictionary: any;
  locale: Locale;
};

export function CategoriesSection({
  categories,
  dictionary,
  locale,
}: CategoriesSectionProps) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 36, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-30px" }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: (index % 4) * 0.08,
          }}
        >
          <CategoryCard
            category={category}
            dictionary={dictionary}
            locale={locale}
          />
        </motion.div>
      ))}
    </div>
  );
}
