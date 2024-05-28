const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect('mongodb+srv://berth:19031032@cluster0.0kbj8ok.mongodb.net/authapp?retryWrites=true&w=majority&appName=Cluster0', {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const Compras = mongoose.model(
  "compras",
  new mongoose.Schema({
    fecha: Date,
    total: Number,
    productos: Object,
  })
);
const Cliente = mongoose.model("users", new mongoose.Schema({}));

// Rutas de API
app.get("/api/clientData", async (req, res) => {
  try {
    const totalClients = await Cliente.countDocuments();
    const totalOrders = await Compras.countDocuments();
    const totalProducts = await getTotalProducts();

    res.json({
      totalClients,
      totalOrders,
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching client data:", error);
    res.status(500).json({ error: "Error fetching client data" });
  }
});

app.get("/api/salesData", async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const yearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

    console.log("sevenDaysAgo:", sevenDaysAgo);
    console.log("thirtyDaysAgo:", thirtyDaysAgo);
    console.log("yearAgo:", yearAgo);

    const weeklySales = (
      await Compras.find({ fecha: { $gte: sevenDaysAgo } })
    ).reduce((acc, compra) => {
      console.log("Weekly Sale:", compra);
      return acc + compra.total;
    }, 0);

    const monthlySales = (
      await Compras.find({ fecha: { $gte: thirtyDaysAgo } })
    ).reduce((acc, compra) => {
      console.log("Monthly Sale:", compra);
      return acc + compra.total;
    }, 0);

    const yearlySales = (
      await Compras.find({ fecha: { $gte: yearAgo } })
    ).reduce((acc, compra) => {
      console.log("Yearly Sale:", compra);
      return acc + compra.total;
    }, 0);

    res.json({
      weekly: weeklySales,
      monthly: monthlySales,
      yearly: yearlySales,
    });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Error fetching sales data" });
  }
});

// Función para obtener el total de productos desde la base de datos
async function getTotalProducts() {
  try {
    const totalProducts = await Compras.aggregate([
      {
        $project: {
          productsArray: { $objectToArray: "$productos" },
        },
      },
      {
        $unwind: "$productsArray",
      },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
        },
      },
    ]);

    return totalProducts.length > 0 ? totalProducts[0].totalProducts : 0;
  } catch (error) {
    console.error("Error fetching total products:", error);
    return 0;
  }
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
