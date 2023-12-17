import PageHeader from "@/components/PageHeader/PageHeader";
import { prisma } from "@/lib/prisma";
import ClientUpdateForm from "@/app/products/[id]/ClientUpdateForm";

const CategoryDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await prisma.product.findFirst({
    where: {
      ProductId: id,
    },
    include: {
      Category: true,
      ProductImages: true,
      ProductVariants: {
        include: {
          Variant: true,
        },
      },
      Supplier: true,
    },
  });

  const suppliers = await prisma.supplier.findMany({
    where: {
      IsActive: 1,
    },
  });
  const categories = await prisma.category.findMany({
    where: {
      IsActive: 1,
    },
  });
  const variants = await prisma.variant.findMany();

  return (
    <>
      <PageHeader title='Update Product' />
      <div className='grid place-content-center'>
        {data && (
          <ClientUpdateForm
            product={data}
            suppliers={suppliers}
            categories={categories}
            variants={variants}
          />
        )}
      </div>
    </>
  );
};

export default CategoryDetailsPage;
