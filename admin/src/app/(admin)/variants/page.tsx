import PageHeader from "@/components/PageHeader/PageHeader";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable/data-table";
import CreateButton from "@/components/Buttons/CreateButton";
import { prisma } from "@/lib/prisma";

const VariantsPage = async () => {
  const data = await prisma.variant.findMany();

  return (
    <div>
      <PageHeader title='Variants'>
        <CreateButton />
      </PageHeader>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default VariantsPage;
