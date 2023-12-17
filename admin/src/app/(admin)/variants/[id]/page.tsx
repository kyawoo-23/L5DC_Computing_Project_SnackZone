import PageHeader from "@/components/PageHeader/PageHeader";
import { prisma } from "@/lib/prisma";
import ClientUpdateForm from "@/app/variants/[id]/ClientUpdateForm";

const CategoryDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await prisma.variant.findFirst({
    where: {
      VariantId: id,
    },
  });
  console.log(data);
  return (
    <>
      <PageHeader title='Update Variant' />
      <div className='grid place-content-center'>
        {data && <ClientUpdateForm {...data} />}
      </div>
    </>
  );
};

export default CategoryDetailsPage;
