const FormHeader = ({ title }: { title: string }) => {
  return (
    <h3 className='text-white text-xl font-medium mb-4'>
      Fill in the form to <span className='font-bold'>{title}</span>
    </h3>
  );
};

export default FormHeader;
