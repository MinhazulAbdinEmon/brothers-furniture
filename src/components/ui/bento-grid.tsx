"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
    /** In-page anchor (e.g. "#sofas"). Makes the whole card a clickable link. */
    href?: string;
    /** Real product photo shown at the top of the card — lets visitors who
        can't read recognise the category by sight. */
    image?: string;
    imageAlt?: string;
}

interface BentoGridProps {
    items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                    transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
                    className={cn(
                        "group relative p-6 rounded-2xl overflow-hidden",
                        "border border-border bg-card hover:border-accent/30",
                        "hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)]",
                        "transition-[box-shadow,border-color,transform] duration-500 md:hover:-translate-y-1.5",
                        item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
                        {
                            "shadow-[0_18px_50px_-12px_rgba(0,0,0,0.6)]":
                                item.hasPersistentHover,
                        }
                    )}
                >
                    <div
                        className={`absolute inset-0 ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.06)_1px,transparent_1px)] bg-[length:6px_6px]" />
                    </div>

                    <div className="relative flex flex-col space-y-4">
                        {item.image && (
                            <div className="relative -mx-2 -mt-2 mb-1 aspect-[16/10] overflow-hidden rounded-xl bg-secondary">
                                <img
                                    src={item.image}
                                    alt={item.imageAlt || item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent/20">
                                {item.icon}
                            </div>
                            {item.status && (
                                <span
                                    className={cn(
                                        "text-xs font-medium px-2.5 py-1 rounded-full",
                                        "bg-secondary text-muted-foreground",
                                        "transition-colors duration-300 group-hover:text-foreground"
                                    )}
                                >
                                    {item.status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium text-foreground tracking-tight text-lg">
                                {item.title}
                                {item.meta && (
                                    <span className="ml-2 text-xs text-muted-foreground font-normal">
                                        {item.meta}
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed font-[425]">
                                {item.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 rounded-md bg-secondary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <span
                                className={cn(
                                    "text-xs text-accent transition-opacity",
                                    item.href
                                        ? "opacity-100"
                                        : "opacity-0 group-hover:opacity-100"
                                )}
                            >
                                {item.cta || "Explore →"}
                            </span>
                        </div>
                    </div>

                    {/* Whole-card link (stretched) when the category has a section */}
                    {item.href && (
                        <a
                            href={item.href}
                            aria-label={`${item.title} — view`}
                            className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        />
                    )}

                    <div
                        className={`absolute inset-0 -z-10 rounded-2xl p-px bg-gradient-to-br from-transparent via-accent/10 to-transparent ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-300`}
                    />
                </motion.div>
            ))}
        </div>
    );
}

export { BentoGrid };
