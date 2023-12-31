import PageHeader from "@/components/PageHeader/PageHeader";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable/data-table";
import CreateButton from "@/components/Buttons/CreateButton";
import { prisma } from "@/lib/prisma";

const PurchasePage = async () => {
  const data = await prisma.purchaseProduct.findMany({
    include: {
      Product: true,
      PurchasedBy: true,
    },
    orderBy: {
      PurchaseAt: "desc",
    },
  });

  return (
    <div>
      <PageHeader title='Purchase'>
        <CreateButton />
      </PageHeader>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default PurchasePage;
