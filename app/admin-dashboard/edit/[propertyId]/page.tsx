import { Breadcrumbs } from "@/components/ui/breadcrumb";
import { getPropertyById } from "@/data/properties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditPropertyForm from "./edit-property-form";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  const property = await getPropertyById(propertyId);
  return (
    <div>
      <Breadcrumbs
        items={[
          {
            href: "/admin-dashboard",
            label: "Dashboard",
          },
          {
            label: "Edit Property",
          },
        ]}
      />
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Edit Property</CardTitle>
        </CardHeader>
        <CardContent>
          <EditPropertyForm
            id={propertyId}
            address1={property.address1}
            address2={property.address2}
            city={property.city}
            postcode={property.postcode}
            price={property.price}
            description={property.description}
            bedrooms={property.bedrooms}
            square_meters={property.square_meters}
            status={property.status}
          />
        </CardContent>
      </Card>
    </div>
  );
}
