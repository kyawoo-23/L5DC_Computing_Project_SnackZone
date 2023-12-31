import PageHeader from "@/components/PageHeader/PageHeader";
import { prisma } from "@/lib/prisma";
import ClientUpdateForm from "./ClientUpdateForm";

const CategoryDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await prisma.supplier.findFirst({
    where: {
      SupplierId: id,
    },
  });
  console.log(data);
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
