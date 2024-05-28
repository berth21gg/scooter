import Link from "next/link";
import ScooterCard from "../components/ScooterCard";

async function getProducts() {
  const res = await fetch("http://localhost:4000/products?_limit=3");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Cart() {
  const products = await getProducts();
  return (
    <>
      <div className="container contPrincipal mb-5 cartPage">
        <div className="cartPage2">
          <h1>Carrito</h1>

          <div className="cartPage3">
            <div className="cartPage4">
              <span className="cartPage5">Agregar más items</span>
              <Link href="/scooter" className="cartPage6">
                Continua comprando
              </Link>
            </div>

            {products.map((product) => (
              <ScooterCard
                key={product.id}
                img={product.img}
                modelo={product.modelo}
                txt={product.txt}
                id={product.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
