import PageHeader from "@/components/PageHeader/PageHeader";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable/data-table";
import CreateButton from "@/components/Buttons/CreateButton";
import { prisma } from "@/lib/prisma";

const ProductsPage = async () => {
  const data = await prisma.product.findMany();

  return (
    <div>
      <PageHeader title='Products'>
        <CreateButton />
      </PageHeader>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ProductsPage;
