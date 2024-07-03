"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { slider } from "@/lib/config/slider";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function Slider() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
        }),
      ]}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="h-[40rem]">
        {slider.map((slide, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6 w-fit">
            <Image src={slide.img} alt={slide.name} width={200} height={200} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
