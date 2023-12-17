"use client";

import { Switch } from "@/components/ui/switch";
import FormInputLabel from "@/components/Form/FormInputLabel";
import { addProductImage, updateProduct } from "@/app/actions/product-actions";
import toast from "react-hot-toast";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { redirect } from "next/navigation";
import { Prisma, Supplier, Category, Variant } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";
import SelectBox from "@/components/SelectBox/SelectBox";
import { validatePositiveNumber } from "@/app/actions/shared";
import ClientDialogBox from "./ClientDialogBox";
import UpdateSubmitButtonGroup from "@/components/Buttons/UpdateSubmitButtonGroup";
import SubmitButtonGroup from "@/components/Buttons/SubmitButtonGroup";

interface ClientUpdateFormProps {
  suppliers: Supplier[];
  categories: Category[];
  variants: Variant[];
  product: Prisma.ProductGetPayload<{
    include: {
      ProductVariants: {
        include: {
          Variant: true;
        };
      };
      ProductImages: true;
      Supplier: true;
    };
  }>;
}

const ClientUpdateForm = ({
  product: {
    IsActive,
    IsFeatured,
    IsPromotion,
    ProductDescription,
    ProductImages,
    ProductName,
    ProductPackingQuantity,
    ProductId,
    ProductPrice,
    ProductPrimaryImage,
    ProductWeight,
    PromotionPrice,
    SupplierId,
    CategoryId,
    WholesalePrice,
    ProductVariants,
  },
  categories,
  suppliers,
  variants,
}: ClientUpdateFormProps) => {
  const [primaryImagePreview, setPrimaryImagePreview] = useState<
    string | undefined
  >(undefined);
  const [newImagePreview, setNewImagePreview] = useState<string | undefined>(
    undefined
  );
  const newProductImgRef = useRef<HTMLFormElement>(null);

  const handlePrimaryFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrimaryImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewProductImage = async (formData: FormData) => {
    const res = await addProductImage(formData);
    if (res.isSuccess) {
      toast.success(res.message);
      newProductImgRef.current?.reset();
      setNewImagePreview(undefined);
    } else {
      toast.error(res.message);
    }
  };

  const handleUpdateProduct = async (formData: FormData) => {
    if (formData.get("IsPromotion")) {
      let invalid = !validatePositiveNumber(
        (formData.get("PromotionPrice") as string) ||
          PromotionPrice!.toString(),
        "Promotion price is required to turn on promotion status"
      );
      if (invalid) {
        return;
      }
    }

    if (formData.get("IsActive")) {
      let invalid =
        !validatePositiveNumber(
          (formData.get("Price") as string) || ProductPrice!.toString(),
          "Price cannot be zero or negative to turn on status"
        ) ||
        !validatePositiveNumber(
          (formData.get("Weight") as string) || ProductWeight.toString(),
          "Weight cannot be zero or negative to turn on status"
        ) ||
        !validatePositiveNumber(
          (formData.get("Quantity") as string) ||
            ProductPackingQuantity.toString(),
          "Packaging quantity cannot be zero or negative to turn on status"
        );
      if (invalid) {
        return;
      }
    }

    const firstImage = formData.getAll("PrimaryImage")[0];
    let productImage = null;

    if (firstImage instanceof File && firstImage.size > 0) {
      productImage = firstImage;
    }

    const updateData = {
      ProductId: ProductId,
      ProductName: formData.get("Name") || ProductName,
      ProductDescription: formData.get("Description") || ProductDescription,
      ProductWeight: formData.get("Weight") || ProductWeight,
      ProductPrice: formData.get("Price") || ProductPrice,
      WholesalePrice: formData.get("WholesalePrice") || WholesalePrice,
      ProductPackingQuantity:
        formData.get("Quantity") || ProductPackingQuantity,
      SupplierId: formData.get("SupplierId") || SupplierId,
      CategoryId: formData.get("CategoryId") || CategoryId,
      ProductVariants: formData.getAll("Variants") || ProductVariants,
      IsPromotion: formData.get("IsPromotion") ? 1 : 0,
      PromotionPrice: formData.get("PromotionPrice") || PromotionPrice,
      IsFeatured: formData.get("IsFeatured") ? 1 : 0,
      IsActive: formData.get("IsActive") ? 1 : 0,
      OriginalImage: ProductPrimaryImage,
    };

    const updatedFormData = new FormData();
    Object.entries(updateData).forEach(([key, value]) => {
      updatedFormData.append(key, value?.toString() || "");
    });

    if (productImage) {
      updatedFormData.append("ProductImage", productImage);
    } else {
      updatedFormData.append("ProductImage", "");
    }

    const res = await updateProduct(updatedFormData);

    if (res.isSuccess) {
      toast.success(res.message);
      redirect("/products");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className='flex flex-col gap-5'>
      <form
        action={handleUpdateProduct}
        className='border-2 border-white p-8 rounded-lg grid grid-cols-2 gap-8 min-w-[1000px] max-w-[1000px] mx-auto'
      >
        <div className='col-span-2'>
          <Image
            src={ProductPrimaryImage}
            alt={ProductName}
            width={280}
            height={280}
            priority
            className='bg-zinc-300 mt-3 rounded w-44 h-48 object-cover'
          />
        </div>

        <FormInputLabel label='Name' required={false}>
          <Input
            type='text'
            placeholder={ProductName}
            id='Name'
            name='Name'
            className='form-input'
          />
        </FormInputLabel>

        <FormInputLabel label='Weight' required={false}>
          <Input
            type='number'
            placeholder={ProductWeight.toString()}
            id='Weight'
            name='Weight'
            className='form-input'
          />
        </FormInputLabel>

        <div className='col-span-2'>
          <FormInputLabel label='Description' required={false}>
            <Textarea
              placeholder={ProductDescription}
              id='Description'
              name='Description'
              className='form-input resize-none'
              rows={4}
            />
          </FormInputLabel>
        </div>

        <div className='col-span-2'>
          <FormInputLabel label='Image' required={false}>
            <Input
              type='file'
              id='PrimaryImage'
              name='PrimaryImage'
              className='form-input'
              accept='image/*'
              onChange={handlePrimaryFileChange}
            />
            {primaryImagePreview && (
              <Image
                src={primaryImagePreview}
                alt='Preview'
                width={180}
                height={240}
                className='object-cover rounded bg-zinc-300 mt-1'
              />
            )}
          </FormInputLabel>
        </div>

        <FormInputLabel label='Price' required={false}>
          <Input
            type='number'
            placeholder={ProductPrice?.toString() || "undefined"}
            id='Price'
            name='Price'
            min={1}
            className='form-input'
          />
        </FormInputLabel>

        <FormInputLabel label='Wholesale Price' required={false}>
          <Input
            type='number'
            placeholder={WholesalePrice?.toString() || "undefined"}
            id='WholesalePrice'
            name='WholesalePrice'
            min={1}
            className='form-input'
          />
        </FormInputLabel>

        <FormInputLabel label='Quantity per carton' required={false}>
          <Input
            type='number'
            placeholder={ProductPackingQuantity?.toString() || "undefined"}
            id='Quantity'
            name='Quantity'
            className='form-input'
            min={1}
          />
        </FormInputLabel>

        <FormInputLabel label='Suppliers' required={false}>
          <SelectBox
            name='SupplierId'
            placeholder='Select supplier'
            options={suppliers.map((supplier) => ({
              label: supplier.SupplierName,
              value: supplier.SupplierId,
              selected: SupplierId === supplier.SupplierId ? true : false,
            }))}
          />
        </FormInputLabel>

        <FormInputLabel label='Categories' required={false}>
          <SelectBox
            name='CategoryId'
            placeholder='Select category'
            options={categories.map((category) => ({
              label: category.CategoryName,
              value: category.CategoryId,
              selected: CategoryId === category.CategoryId ? true : false,
            }))}
          />
        </FormInputLabel>

        <FormInputLabel label='Variants' required={false}>
          <Select
            required
            isMulti
            name='Variants'
            isSearchable
            options={variants.map((variant) => ({
              label: variant.VariantName,
              value: variant.VariantId,
            }))}
            defaultValue={ProductVariants.map((variant) => ({
              label: variant.Variant.VariantName,
              value: variant.VariantId,
            }))}
          />
        </FormInputLabel>

        <div className='flex items-center gap-4 mt-5'>
          <label htmlFor='IsPromotion' className='text-white text-sm'>
            Promotion status
          </label>
          <div className='bg-zinc-600 rounded-full p-1 pb-0'>
            <Switch
              defaultChecked={IsPromotion ? true : false}
              name='IsPromotion'
            />
          </div>
        </div>

        <FormInputLabel label='Promotion Price' required={false}>
          <Input
            type='number'
            placeholder={PromotionPrice?.toString() || "undefined"}
            id='PromotionPrice'
            name='PromotionPrice'
            className='form-input'
          />
        </FormInputLabel>

        <div className='flex items-center gap-4 mt-5'>
          <label htmlFor='IsFeatured' className='text-white text-sm'>
            Featured status
          </label>
          <div className='bg-zinc-600 rounded-full p-1 pb-0'>
            <Switch
              defaultChecked={IsFeatured ? true : false}
              name='IsFeatured'
            />
          </div>
        </div>

        <div className='flex items-center gap-4 mt-5'>
          <label htmlFor='IsActive' className='text-white text-sm'>
            Status
          </label>
          <div className='bg-zinc-600 rounded-full p-1 pb-0'>
            <Switch defaultChecked={IsActive ? true : false} name='IsActive' />
          </div>
        </div>

        <div className='col-span-2'>
          <UpdateSubmitButtonGroup />
        </div>
      </form>
      <div className='border-2 border-white p-8 rounded-lg gap-8 min-w-[1000px] max-w-[1000px] mx-auto'>
        <form
          className='flex items-end justify-end gap-3 mb-8'
          action={handleNewProductImage}
          ref={newProductImgRef}
          onReset={() => {
            setNewImagePreview(undefined);
          }}
        >
          <input type='hidden' name='ProductId' value={ProductId} />
          <FormInputLabel label='New Image'>
            <Input
              type='file'
              id='NewImage'
              name='NewImage'
              className='form-input'
              accept='image/*'
              onChange={handleFileChange}
              required
            />
            {newImagePreview && (
              <Image
                src={newImagePreview}
                alt='Preview'
                width={180}
                height={240}
                className='object-cover rounded w-44 h-48 bg-zinc-300 mt-1'
              />
            )}
          </FormInputLabel>
          <SubmitButtonGroup />
        </form>

        <h3 className='text-white font-medium text-xl mb-3'>
          {ProductName} image list
        </h3>

        <div className='grid grid-cols-4 gap-5 py-3'>
          {ProductImages.map((image) => (
            <div key={image.ProductImagesId}>
              <Image
                src={image.ProductImage}
                alt={ProductName}
                width={280}
                height={280}
                className='bg-zinc-300 mt-3 rounded rounded-b-none w-full h-52 object-cover'
              />
              <ClientDialogBox
                imgUrl={image.ProductImage}
                id={image.ProductImagesId}
                productId={image.ProductId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientUpdateForm;
