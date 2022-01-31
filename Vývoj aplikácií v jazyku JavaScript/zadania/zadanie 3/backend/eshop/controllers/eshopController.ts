import express from "express";
const router = express.Router();
import { EshopService } from "../services/eshopService";
const eshopService = new EshopService();

// vrati mi vsetky produkty z databazy
router.get("/viewAll", async function (req, res) {
  const result = await eshopService.viewAll();
  res.send(result);
});

// vrati mi objednavku
router.get("/getOrder", async function (req, res) {
  const result = await eshopService.getOrder();
  res.json(result);
});

// prida order item do databazy
router.post("/addOrderItem", async function (req, res) {
  const result = await eshopService.addOrderItem(
    req.body.itemId,
    req.body.itemQuantity,
    req.body.orderId
  );
  res.json({ poslane: "poslane" });
});

// ziska vsetky itemy objednavky
router.get("/getAllProducts/:id", async function (req, res) {
  const result = await eshopService.getAllProducts(req.params.id);
  res.json(result);
});

// prida objednavku do databazy
router.post("/addOrder", async function (req, res) {
  const result = await eshopService.addOrder(req.body.jsonToSend);
  res.json(result);
});

// prida objednavku do databazy
router.get("/getAd", async function (req, res) {
  const result = await eshopService.getAd();
  res.json(result);
});

// zmeni mi informacie vo vnutri reklami
router.post("/changeAd", async function (req, res) {
  const result = await eshopService.changeAd(req.body.link, req.body.picture);
  res.json(result);
});

// vrati mi vsetky orders z databazi a vrati mi ich do frontendu
router.get("/getOrders", async function (req, res) {
  const result = await eshopService.getOrders();
  res.json(result);
});

// vrati mi vsetky orderItems
router.get("/getOrderItems", async function (req, res) {
  const result = await eshopService.getOrderItems();
  res.json(result);
});

// vrati mi reklamu bez zmeny
router.get("/getAdNotChange", async function (req, res) {
  const result = await eshopService.getAdNotChange();
  res.json(result);
});

// zmeni state objednavky
router.post("/changeOrderState", async function (req, res) {
  const result = await eshopService.changeOrderState(
    req.body.orderId,
    req.body.state
  );
  res.json(result);
});

export = router;
