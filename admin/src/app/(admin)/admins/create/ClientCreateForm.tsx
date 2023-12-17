"use client";

import { createAdmin } from "@/app/actions/admin-actions";
import SubmitButtonGroup from "@/components/Buttons/SubmitButtonGroup";
import FormHeader from "@/components/Form/FormHeader";
import FormInputLabel from "@/components/Form/FormInputLabel";
import PageHeader from "@/components/PageHeader/PageHeader";
import SelectBox from "@/components/SelectBox/SelectBox";
import { Input } from "@/components/ui/input";
import { AdminRole } from "@prisma/client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

interface ClientCreatePageProps {
  roles: AdminRole[];
}

export default function ClientCreateForm({ roles }: ClientCreatePageProps) {
  const handleCreateAdmin = async (formData: FormData) => {
    const res = await createAdmin(formData);
    if (res.isSuccess) {
      toast.success(res.message);
      redirect("/admins");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div>
      <PageHeader title='Create Admin' />
      <div className='grid place-content-center'>
        <form
          action={handleCreateAdmin}
          className='border-2 border-white p-8 rounded-lg'
        >
          <FormHeader title='create a new Admin' />

          <FormInputLabel label='Name'>
            <Input
              type='text'
              placeholder='Input admin name'
              id='Name'
              name='Name'
              required
              className='form-input'
            />
          </FormInputLabel>

          <FormInputLabel label='Email'>
            <Input
              type='email'
              placeholder='Input admin email'
              id='Email'
              name='Email'
              required
              className='form-input'
            />
          </FormInputLabel>

          <FormInputLabel label='Role'>
            <SelectBox
              name='Role'
              placeholder='Select role'
              options={roles.map((role) => ({
                label: role.AdminRoleName,
                value: role.AdminRoleId,
              }))}
            />
          </FormInputLabel>

          <SubmitButtonGroup />
        </form>
      </div>
    </div>
  );
}
