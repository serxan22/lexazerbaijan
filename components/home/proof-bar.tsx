"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type ProofItem = {
  title: string;
  description?: string;
};

export function ProofBar({ items }: { items: ProofItem[] }) {
  return (
    <section className="border-b bg-white py-8">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-3 lg:px-8">
        {items.map(({ title, description }, index) => (
          <motion.div
            key={title}
            className="flex items-start gap-3"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
              delay: index * 0.12,
            }}
          >
            <CheckCircle2 className="mt-1 h-5 w-5 flex-none text-blue-800" />
            <div>
              <p className="text-sm font-semibold text-slate-950">{title}</p>
              {description ? (
                <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
