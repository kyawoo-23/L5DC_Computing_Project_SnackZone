"use server";

import { prisma } from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ResponseType } from "@/app/actions/response-type";
import { utapi } from "@/lib/uploadthing";

export async function updateProduct(formData: FormData): Promise<ResponseType> {
  const id = formData.get("ProductId") as string;
  const name = formData.get("ProductName") as string;
  const description = formData.get("ProductDescription") as string;
  const weight = formData.get("ProductWeight") as string;
  const price = (formData.get("ProductPrice") as string) || null;
  const wholesalePrice = (formData.get("WholesalePrice") as string) || null;
  const packingQuantity = formData.get("ProductPackingQuantity") as string;
  const supplierId = formData.get("SupplierId") as string;
  const categoryId = formData.get("CategoryId") as string;
  const isPromotion = formData.get("IsPromotion") as string;
  const promotionPrice = (formData.get("PromotionPrice") as string) || null;
  const isFeatured = formData.get("IsFeatured") as string;
  const isActive = formData.get("IsActive") as string;

  const imgFiles = formData.getAll("ProductImage");
  let data: Prisma.ProductUpdateInput = {};

  if (imgFiles[0] !== "") {
    const originalImg = formData.get("OriginalImage") as string;
    const imgKey = originalImg.split("/").pop() as string;
    const imgDeleteRes = await utapi.deleteFiles(imgKey);
    if (!imgDeleteRes) {
      return {
        message: `Failed to delete old image for product, ${name}`,
        isSuccess: false,
      };
    }

    const primaryImgRes = await utapi.uploadFiles(imgFiles);
    if (primaryImgRes[0].error) {
      return {
        message: `Failed to upload image for product, ${name}`,
        isSuccess: false,
      };
    }

    data = {
      ProductName: name,
      ProductDescription: description,
      ProductWeight: parseFloat(weight),
      ProductPrice: price ? parseFloat(price) : null,
      WholesalePrice: wholesalePrice ? parseFloat(wholesalePrice) : null,
      ProductPackingQuantity: parseInt(packingQuantity),
      IsPromotion: parseInt(isPromotion),
      PromotionPrice: promotionPrice ? parseFloat(promotionPrice) : null,
      IsFeatured: parseInt(isFeatured),
      IsActive: parseInt(isActive),
      Supplier: {
        connect: {
          SupplierId: supplierId,
        },
      },
      Category: {
        connect: {
          CategoryId: categoryId,
        },
      },
      ProductPrimaryImage: primaryImgRes[0].data?.url,
    };
  } else {
    data = {
      ProductName: name,
      ProductDescription: description,
      ProductWeight: parseFloat(weight),
      ProductPrice: price ? parseFloat(price) : null,
      WholesalePrice: wholesalePrice ? parseFloat(wholesalePrice) : null,
      ProductPackingQuantity: parseInt(packingQuantity),
      IsPromotion: parseInt(isPromotion),
      PromotionPrice: promotionPrice ? parseFloat(promotionPrice) : null,
      IsFeatured: parseInt(isFeatured),
      IsActive: parseInt(isActive),
      Supplier: {
        connect: {
          SupplierId: supplierId,
        },
      },
      Category: {
        connect: {
          CategoryId: categoryId,
        },
      },
    };
  }

  try {
    console.log("DATA:", data);
    await prisma.product.update({
      where: {
        ProductId: id,
      },
      data,
    });

    const variantsSelected = formData.get("ProductVariants") as string;
    console.log("VARIANTS:", variantsSelected);

    await prisma.productVariant.deleteMany({
      where: {
        ProductId: id,
      },
    });

    for (const variant of variantsSelected.split(",")) {
      await prisma.productVariant.create({
        data: {
          Product: {
            connect: {
              ProductId: id,
            },
          },
          Variant: {
            connect: {
              VariantId: variant as string,
            },
          },
        },
      });
    }

    revalidatePath("/products");
    return {
      message: `Product, ${name} updated successfully`,
      isSuccess: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Failed to update product, ${name}`,
      isSuccess: false,
    };
  }
}

export async function createProduct(formData: FormData): Promise<ResponseType> {
  const name = formData.get("Name") as string;
  const description = formData.get("Description") as string;
  const weight = formData.get("Weight") as string;
  const quantity = formData.get("Quantity") as string;
  const supplier = formData.get("SupplierId") as string;
  const category = formData.get("CategoryId") as string;

  const primaryImgFile = formData.getAll("PrimaryImage");
  const primaryImgRes = await utapi.uploadFiles(primaryImgFile);

  if (primaryImgRes[0].error) {
    return {
      message: `Failed to upload image for product, ${name}`,
      isSuccess: false,
    };
  }

  const data: Prisma.ProductCreateInput = {
    ProductName: name,
    ProductDescription: description,
    ProductPackingQuantity: parseInt(quantity),
    ProductWeight: parseFloat(weight),
    Supplier: {
      connect: {
        SupplierId: supplier,
      },
    },
    Category: {
      connect: {
        CategoryId: category,
      },
    },
    ProductPrimaryImage: primaryImgRes[0].data?.url,
  };

  try {
    const createdProduct = await prisma.product.create({
      data,
    });

    const variantsSelected = formData.getAll("Variants");
    for (const variant of variantsSelected) {
      await prisma.productVariant.create({
        data: {
          Product: {
            connect: {
              ProductId: createdProduct.ProductId,
            },
          },
          Variant: {
            connect: {
              VariantId: variant as string,
            },
          },
        },
      });
    }

    const imgFiles = formData.getAll("ImageList");
    const imgFilesRes = await utapi.uploadFiles(imgFiles);
    for (const imgFile of imgFilesRes) {
      if (imgFile.data && imgFile.data.url) {
        await prisma.productImage.create({
          data: {
            Product: {
              connect: {
                ProductId: createdProduct.ProductId,
              },
            },
            ProductImage: imgFile.data.url,
          },
        });
      }
    }

    revalidatePath("/products");
    return {
      message: `Product, ${name} created successfully`,
      isSuccess: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Failed to create product, ${name}`,
      isSuccess: false,
    };
  }
}

export async function deleteProductImage(
  id: string,
  imgUrl: string,
  productId: string
): Promise<ResponseType> {
  try {
    await utapi.deleteFiles(imgUrl.split("/").pop() as string);
    await prisma.productImage.delete({
      where: {
        ProductImagesId: id,
      },
    });
    revalidatePath(`/products/${productId}`);
    return {
      message: `Image deleted successfully`,
      isSuccess: true,
    };
  } catch (error) {
    return {
      message: `Failed to delete image`,
      isSuccess: false,
    };
  }
}

export async function addProductImage(
  formData: FormData
): Promise<ResponseType> {
  const productId = formData.get("ProductId");
  const imgFile = formData.getAll("NewImage");
  const imgRes = await utapi.uploadFiles(imgFile);

  if (imgRes[0].error) {
    return {
      message: `Failed to add image`,
      isSuccess: false,
    };
  }

  await prisma.productImage.create({
    data: {
      Product: {
        connect: {
          ProductId: productId as string,
        },
      },
      ProductImage: imgRes[0].data?.url,
    },
  });

  revalidatePath(`/products/${productId}`);
  return {
    message: `Image added successfully`,
    isSuccess: true,
  };
}
