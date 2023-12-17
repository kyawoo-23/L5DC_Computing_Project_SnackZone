import PageHeader from "@/components/PageHeader/PageHeader";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable/data-table";
import CreateButton from "@/components/Buttons/CreateButton";
import { prisma } from "@/lib/prisma";

const AdminsPage = async () => {
  const data = await prisma.admin.findMany({
    include: {
      AdminRole: true,
    },
  });

  return (
    <div>
      <PageHeader title='Admins'>
        <CreateButton />
      </PageHeader>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminsPage;
