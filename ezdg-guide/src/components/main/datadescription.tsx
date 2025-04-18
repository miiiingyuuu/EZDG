"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "../ui/skeleton";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";
import { GuideMenuItem, isApiGuideItem } from "@/types/guide";
import { formatFieldName } from "@/lib/format";

interface DataDescriptionProps {
  items: GuideMenuItem[];
}

// Skeleton 카드 컴포넌트
function SkeletonCard() {
  return (
    <Card className="bg-white shadow-xl h-[400px] flex flex-col">
      <CardHeader className="flex-none space-y-1 p-0">
        <div className="flex items-center justify-center w-full h-40 overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="p-6">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pt-0">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-4/6" />
      </CardContent>
    </Card>
  );
}

// SkeletonGroup 컴포넌트
function SkeletonGroup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

const DisplayCard = ({ item }: { item: GuideMenuItem }) => {
  const [imageError, setImageError] = useState(false);
  const isApi = isApiGuideItem(item);
  const title = isApi ? item.mainTitle : item.originalFileName;
  const description = isApi ? item.mainDescription : item.originalFileName;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow h-[400px] flex flex-col">
      <CardHeader className="flex-none space-y-1 p-0">
        <div className="flex items-center justify-center w-full h-40 overflow-hidden">
          <Image
            src={imageError ? "/organ/null.png" : `/organ/${item._id}.png`}
            alt={title}
            width={200}
            height={200}
            className="object-cover"
            onError={handleImageError}
            priority={false}
          />
        </div>
        <div className="p-6">
          <CardTitle className="text-xl font-bold min-h-[3.5rem] line-clamp-2">{formatFieldName(title)}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pt-0">
        <p className="text-gray-600 line-clamp-4">{formatFieldName(description)}</p>
        {isApi && item.apiList.length > 0 && <div className="mt-4"></div>}
      </CardContent>
    </Card>
  );
};

// Fisher-Yates 셔플 알고리즘
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function DataDescription({ items }: DataDescriptionProps) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [randomItems, setRandomItems] = useState<GuideMenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 클라이언트에서만 셔플 수행
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const shuffled = shuffleArray(items);
        setRandomItems(shuffled.slice(0, Math.min(12, shuffled.length)));
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        // 데이터 처리가 끝나면 로딩 상태를 false로 설정
        setLoading(false);
      }
    };

    initializeData();
  }, [items]);

  // 로딩 중일 때 Skeleton UI 표시
  if (loading) {
    return (
      <div className="flex flex-col items-start gap-4 sm:gap-6 px-2 sm:px-4 py-8 sm:py-12 lg:py-24">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl">사용 가능한 데이터</h1>
        <div className="w-full">
          <Carousel className="w-full">
            <CarouselContent>
              {[...Array(2)].map((_, index) => (
                <CarouselItem key={index}>
                  <SkeletonGroup />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때
  if (randomItems.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 sm:gap-6 px-2 sm:px-4 py-8 sm:py-12 lg:py-24">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl">사용 가능한 데이터</h1>
        <div className="w-full flex justify-center items-center min-h-[400px]">
          <p className="text-gray-500">사용 가능한 데이터가 없습니다.</p>
        </div>
      </div>
    );
  }

  // 3개씩 그룹화
  const groupItems = (items: GuideMenuItem[]) => {
    const groups = [];
    for (let i = 0; i < items.length; i += 3) {
      groups.push(items.slice(i, i + 3));
    }
    return groups;
  };

  const groupedItems = groupItems(randomItems);

  return (
    <div className="flex flex-col items-start gap-4 sm:gap-6 px-2 sm:px-4 py-8 sm:py-12 lg:py-24">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl">사용 가능한 데이터</h1>
      <div className="w-full">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}>
          <CarouselContent>
            {groupedItems.map((group, groupIndex) => (
              <CarouselItem key={groupIndex}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.map((item) => (
                    <DisplayCard key={item._id} item={item} />
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
