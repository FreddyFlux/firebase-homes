import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPropertyById } from "@/data/properties";
import {
  AreaChartIcon,
  ArrowLeftIcon,
  BedIcon,
  RulerDimensionLineIcon,
  SpaceIcon,
  SquareIcon,
} from "lucide-react";
import Image from "next/image";
import numeral from "numeral";
import ReactMarkdown from "react-markdown";
import BackButton from "./back-button";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  const property = await getPropertyById(propertyId);

  const adressLines = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((adressLine) => !!adressLine);
  return (
    <article className="grid grid-cols-[1fr_450px]">
      <div>
        {!!property.images && (
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={image}>
                  <div className="relative h-[80vh] min-h-80">
                    <Image
                      src={`https://firebasestorage.googleapis.com/v0/b/fire-homes-course-d4d63.firebasestorage.app/o/${encodeURIComponent(
                        image
                      )}?alt=media`}
                      alt={`Property image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {property.images.length > 1 && (
              <>
                <CarouselPrevious className="translate-x-24 size-10" />
                <CarouselNext className="-translate-x-24 size-10" />
              </>
            )}
          </Carousel>
        )}
        <div className="property-description max-w-screen-md mx-auto py-10 px-4">
          <BackButton />
          <ReactMarkdown>{property.description}</ReactMarkdown>
        </div>
      </div>
      <div className="bg-sky-200 h-screen sticky top-0 p-10 grid place-items-center">
        <div className="flex flex-col gap-10 w-full">
          <PropertyStatusBadge
            status={property.status}
            className="m4-auto text-base"
          />
          <h2 className="text-3xl">
            {adressLines.map((adressLine, index) => (
              <div key={index}>
                {adressLine}
                {index < adressLines.length - 1 && (
                  <>
                    , <br />
                  </>
                )}
              </div>
            ))}
          </h2>
          <h2 className="text-3xl font-light">
            {numeral(property.price).format("0,0")} €
          </h2>
          <div className="flex gap-10">
            <div className="flex gap-2">
              <BedIcon /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex gap-2">
              <RulerDimensionLineIcon /> {property.square_meters} m²
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
