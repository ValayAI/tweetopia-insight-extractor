
import * as React from "react";
import { cn } from "@/lib/utils";

interface Card {
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
}

interface DisplayCardsProps {
  cards: Card[];
  className?: string;
}

const DisplayCards = ({ cards, className }: DisplayCardsProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-10 md:aspect-[2/1]",
        className
      )}
    >
      <div className="relative grid grid-cols-1 items-start gap-6 [grid-area:stack]">
        {cards.map((card, i) => (
          <div
            key={i}
            className={cn(
              "group relative overflow-hidden rounded-xl border bg-background p-6 shadow transition-transform duration-700 md:h-[180px] md:p-8",
              card.className
            )}
          >
            <div className="flex h-full flex-col justify-between gap-2">
              <div className="space-y-2">
                <div className={cn("flex gap-2", card.iconClassName)}>
                  {card.icon}
                </div>
                <h3
                  className={cn(
                    "font-semibold leading-none tracking-tight",
                    card.titleClassName
                  )}
                >
                  {card.title}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">{card.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCards;
