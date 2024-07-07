"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import messages from "../../messages.json";

const HomePage = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false })
  );

  return (
    <>
      <main className="p-4 md:p-8 flex-grow flex flex-col justify-around items-center">
        <div>
          <h1 className="pb-4 text-5xl font-bold text-center">
            Dive into the World of Anonymous Conversations
          </h1>
          <p className="text-center">
            Explore AnonNotes - Where your identify remains a secret
          </p>
        </div>
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {message.content}
                      </span>
                    </CardContent>
                    <CardFooter>{message.received}</CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
      <footer className="text-center p-4 md:p-6">© 2024 AnonNotes, All rights reserved.</footer>
    </>
  );
};

export default HomePage;
