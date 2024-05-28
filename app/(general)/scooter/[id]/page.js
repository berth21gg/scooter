"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import HouseFillClient from "@/app/(general)/components/HouseFillClient";
import { Alert } from "react-bootstrap";

async function getProducts(id) {
  const res = await fetch("http://localhost:4000/products?id=" + id, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function ScooterDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProducts(params.id);
      setProduct(data[0]);
    }
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  var colorStock = "#3E820D";
  var bgColorStock = "#EEFBD0";
  var classDisabled = "btn btn-primary";
  if (product.stock == 0) {
    colorStock = "#FFFFFF";
    bgColorStock = "#D50000";
    classDisabled = "btn btn-primary disabled";
  } else if (product.stock > 0 && product.stock < 10) {
    classDisabled = "btn btn-primary";
    colorStock = "#F57F17";
    bgColorStock = "#FDD835";
  }

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(product);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Disparar evento personalizado
    const event = new CustomEvent("cartUpdated", {
      detail: { cartCount: existingCart.length },
    });
    window.dispatchEvent(event);

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Ocultar la alerta después de 3 segundos
  };

  return (
    <div className="container contPrincipal mb-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">
              <HouseFillClient />
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/scooter">Scooter</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.modelo}
          </li>
        </ol>
      </nav>
      <div className="grid">
        <div className="row">
          <div className="col-6">
            <img src={"/img/" + product.img} className="img-fluid" alt="" />
          </div>
          <div className="col-6">
            <p className="fs-6 text-body-secondary">{product.ref}</p>
            <p className="fs-2 fw-medium" style={{ textAlign: "justify" }}>
              {product.txt}
            </p>
            <p
              className="fs-5 fw-bold mt-5"
              style={{
                color: colorStock,
                backgroundColor: bgColorStock,
                width: 200,
              }}
            >
              En Stock: {product.stock}
            </p>
            <p className="fs-2 fw-bold mt-5" style={{ color: "#BE004F" }}>
              {product.precio} MXN <span>IVA incluido</span>
            </p>

            <button
              className={classDisabled}
              onClick={() => addToCart(product)}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
          className="position-fixed bottom-0 end-0 m-3"
        >
          Producto agregado al carrito
        </Alert>
      )}
    </div>
  );
}
