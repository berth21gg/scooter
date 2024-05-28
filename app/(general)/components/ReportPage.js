"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReportPage = () => {
  const [salesData, setSalesData] = useState({
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });
  const [clientData, setClientData] = useState({
    totalClients: 0,
    totalOrders: 0,
    totalProducts: 0,
  });
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const clientResponse = await fetch(
          "http://localhost:8000/api/clientData"
        );
        const clientData = await clientResponse.json();

        setClientData(clientData);

        const salesResponse = await fetch(
          "http://localhost:8000/api/salesData"
        );
        const salesData = await salesResponse.json();
        console.log(salesData);
        setSalesData(salesData);

        const productResponse = await fetch("http://localhost:4000/products");
        const productData = await productResponse.json();
        setProductData(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const barData = {
    labels: ["Week", "Month", "Year"],
    datasets: [
      {
        label: "Total Sales",
        data: [salesData.weekly, salesData.monthly, salesData.yearly],
        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
      },
    ],
  };

  const pieData = {
    labels: ["Clients", "Orders", "Products"],
    datasets: [
      {
        labels: ["Client ", "Orders", "Products"],
        data: [
          clientData.totalClients,
          clientData.totalOrders,
          clientData.totalProducts,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  return (
    <Container>
      <h1 className="my-4">Reportes</h1>

      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total de Ventas</Card.Title>
              <Card.Text>Semanales: ${salesData.weekly}</Card.Text>
              <Card.Text>Mensuales: ${salesData.monthly}</Card.Text>
              <Card.Text>Anuales: ${salesData.yearly}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Clientes Registrados</Card.Title>
              <Card.Text>
                Total de Clientes: {clientData.totalClients}
              </Card.Text>
              <Card.Text>Total de Órdenes: {clientData.totalOrders}</Card.Text>
              <Card.Text>
                Total de Productos Comprados: {clientData.totalProducts}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Productos</Card.Title>
              <Card.Text>Total de Productos: {productData.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Gráfico de Barras de Ventas</Card.Title>
              <Bar data={barData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Gráfico de Pastel de Clientes</Card.Title>
              <Pie data={pieData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportPage;
