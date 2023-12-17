interface FormInputProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormInputLabel = ({
  label,
  required = true,
  children,
}: FormInputProps) => {
  return (
    <div className='flex flex-col gap-2 mt-3'>
      <label htmlFor='name' className='text-white text-sm'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      {children}
    </div>
  );
};

export default FormInputLabel;
