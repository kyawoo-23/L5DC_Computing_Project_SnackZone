import PageHeader from "@/components/PageHeader/PageHeader";
import { columns } from "./columns";
import { DataTable } from "@/components/DataTable/data-table";
import CreateButton from "@/components/Buttons/CreateButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const ProductsPage = async () => {
  const purchaseData = await prisma.purchaseProduct.groupBy({
    by: ["ProductId", "ExpiryDate"],
    _sum: {
      ProductStock: true,
    },
    orderBy: {
      ExpiryDate: "asc",
    },
  });

  // Fetch all products
  const allProducts = await prisma.product.findMany({
    include: {
      PurchaseProducts: true, // Include the PurchaseProducts association
    },
  });

  // Create a map to store ProductStockSum based on ProductId from purchase history
  const productStockSumMap = new Map();
  for (const item of purchaseData) {
    productStockSumMap.set(item.ProductId, item._sum?.ProductStock || 0);
  }

  // Create the result by merging all products with ProductStockSum and ExpiryDate
  const result = allProducts.map((product) => {
    const stockSum = productStockSumMap.get(product.ProductId) || 0;

    // Get associated expiry dates for the product
    const expiryDates = product.PurchaseProducts.map(
      (purchase) => purchase.ExpiryDate
    );

    // Filter out expired dates and sort remaining dates
    const validExpiryDates = expiryDates
      .filter((date) => date > new Date())
      .sort();

    // Choose the nearest valid expiry date if stock > 0, otherwise, choose the nearest future date
    const nearestExpiryDate =
      stockSum > 0
        ? validExpiryDates[0]
        : validExpiryDates.find((date) => date > new Date());

    return {
      ProductId: product.ProductId,
      ProductStockSum: stockSum,
      NearestExpiryDate: nearestExpiryDate || null,
      Product: product,
    };
  });

  // Sort the result based on NearestExpiryDatel
  result.sort((a, b) => {
    if (a.ProductStockSum <= 0 && b.ProductStockSum <= 0) {
      return 0;
    } else if (a.ProductStockSum <= 0) {
      return 1;
    } else if (b.ProductStockSum <= 0) {
      return -1;
    }
    return (
      (a.NearestExpiryDate?.getTime() || 0) -
      (b.NearestExpiryDate?.getTime() || 0)
    );
  });

  return (
    <div>
      <PageHeader title='Products'>
        <CreateButton />
      </PageHeader>
      <div>
        <DataTable columns={columns} data={result} />
      </div>
    </div>
  );
};

export default ProductsPage;
