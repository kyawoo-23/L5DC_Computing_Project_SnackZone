import PageHeader from "@/components/PageHeader/PageHeader";
import { prisma } from "@/lib/prisma";
import ClientUpdateForm from "./ClientUpdateForm";

const CategoryDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await prisma.deliveryService.findFirst({
    where: {
      DeliveryServiceId: id,
    },
  });

  return (
    <>
      <PageHeader title='Update DeliveryService' />
      <div className='grid place-content-center'>
        {data && <ClientUpdateForm {...data} />}
      </div>
    </>
  );
};

export default CategoryDetailsPage;
