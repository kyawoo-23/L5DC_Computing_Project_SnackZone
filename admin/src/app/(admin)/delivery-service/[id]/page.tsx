import PageHeader from "@/components/PageHeader/PageHeader";
import { prisma } from "@/lib/prisma";
import ClientUpdateForm from "@/app/delivery-service/[id]/ClientUpdateForm";

const CategoryDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await prisma.deliveryService.findFirst({
    where: {
      DeliveryServiceId: id,
    },
  });

  return (
    <>
      <PageHeader title='Update Supplier' />
      <div className='grid place-content-center'>
        {data && <ClientUpdateForm {...data} />}
      </div>
    </>
  );
};

export default CategoryDetailsPage;
