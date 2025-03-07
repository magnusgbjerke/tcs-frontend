export async function ProductPage({ productId }: { productId: string }) {
  const response = await fetch(
    `http://localhost:8080/api/products/${productId}`
  );
  const products = await response.json();
  return (
    <>
      <p>product page</p>
      {productId}
    </>
  );
}
