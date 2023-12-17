import PageHeader from "@/components/PageHeader/PageHeader";
import { prisma } from "@/lib/prisma";
import ClientUpdateForm from "@/app/categories/[id]/ClientUpdateForm";

const CategoryDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await prisma.category.findFirst({
    where: {
      CategoryId: id,
    },
  });
  console.log(data);
  return (
    <>
      <PageHeader title='Update Category' />
      <div className='grid place-content-center'>
        {data && <ClientUpdateForm {...data} />}
      </div>
    </>
  );
};

export default CategoryDetailsPage;
