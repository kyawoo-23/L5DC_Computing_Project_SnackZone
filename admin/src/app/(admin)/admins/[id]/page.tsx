import PageHeader from "@/components/PageHeader/PageHeader";
import { prisma } from "@/lib/prisma";
import ClientUpdateForm from "./ClientUpdateForm";

const AdminDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await prisma.admin.findFirst({
    where: {
      AdminId: id,
    },
    include: {
      AdminRole: true,
    },
  });
  const roles = await prisma.adminRole.findMany();

  return (
    <>
      <PageHeader title='Update Admin' />
      <div className='grid place-content-center'>
        {data && <ClientUpdateForm admin={data} roles={roles} />}
      </div>
    </>
  );
};

export default AdminDetailsPage;
