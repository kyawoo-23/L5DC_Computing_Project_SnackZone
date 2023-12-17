"use client";

import { Switch } from "@/components/ui/switch";
import FormInputLabel from "@/components/Form/FormInputLabel";
import UpdateSubmitButtonGroup from "@/components/Buttons/UpdateSubmitButtonGroup";
import { updateAdmin } from "@/app/actions/admin-actions";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { AdminRole, Prisma } from "@prisma/client";
import SelectBox from "@/components/SelectBox/SelectBox";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface ClientUpdateFormProps {
  admin: Prisma.AdminGetPayload<{
    include: {
      AdminRole: true;
    };
  }>;
  roles: AdminRole[];
}

const ClientUpdateForm = ({
  admin: { AdminId, AdminRoleId, Email, IsActive, Name, Password },
  roles,
}: ClientUpdateFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleUpdateAdmin = async (formData: FormData) => {
    const updateData = {
      Id: AdminId,
      Name: formData.get("Name") || Name,
      Email: formData.get("Email") || Email,
      Password: password || "",
      Role: formData.get("Role") || AdminRoleId,
      IsActive: formData.get("IsActive") ? 1 : 0,
    };

    const updatedFormData = new FormData();
    Object.entries(updateData).forEach(([key, value]) => {
      updatedFormData.append(key, value.toString());
    });

    const res = await updateAdmin(updatedFormData);

    if (res.isSuccess) {
      toast.success(res.message);
      redirect("/admins");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form
      action={handleUpdateAdmin}
      className='border-2 border-white p-8 rounded-lg'
      autoComplete='off'
    >
      <FormInputLabel label='Name' required={false}>
        <Input
          type='text'
          placeholder={Name}
          id='Name'
          name='Name'
          className='form-input'
        />
      </FormInputLabel>

      <FormInputLabel label='Email' required={false}>
        <Input
          type='email'
          placeholder={Email}
          id='Email'
          name='Email'
          className='form-input'
        />
      </FormInputLabel>

      <FormInputLabel label='Password' required={false}>
        <div className='relative'>
          <Input
            type={showPassword ? "text" : "password"}
            id='Password'
            name='Password'
            className='form-input'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='button'
            className='absolute right-3 top-1/2 transform -translate-y-1/2'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOffIcon className='h-5 w-5 text-gray-400' />
            ) : (
              <EyeIcon className='h-5 w-5 text-gray-400' />
            )}
          </button>
        </div>
      </FormInputLabel>

      <FormInputLabel label='Role' required={false}>
        <SelectBox
          name='Role'
          placeholder='Select role'
          options={roles.map((role) => ({
            label: role.AdminRoleName,
            value: role.AdminRoleId,
            selected: AdminRoleId === role.AdminRoleId ? true : false,
          }))}
        />
      </FormInputLabel>

      <div className='flex items-center gap-4 mt-5'>
        <label htmlFor='IsActive' className='text-white text-sm'>
          Status
        </label>
        <div className='bg-zinc-600 rounded-full p-1 pb-0'>
          <Switch defaultChecked={IsActive ? true : false} name='IsActive' />
        </div>
      </div>

      <UpdateSubmitButtonGroup />
    </form>
  );
};

export default ClientUpdateForm;
