import Op from "sequelize/dist/lib/operators";

export class EshopService {
  db = require("../../models");

  viewAll() {
    const product = this.db.product;
    return product.findAll({});
  }

  async getOrder() {
    const order = this.db.order;
    return await order.create({
      state: "notPaid",
    });
  }
  async addOrderItem(itemId: any, itemQuantity: any, orderId: any) {
    const orderItem = this.db.orderItem;

    let allItems;

    allItems = await orderItem.findOne({
      where: {
        productId: parseInt(itemId),
        orderId: parseInt(orderId),
      },
    });

    if (allItems) {
      await orderItem.update(
        {
          quantity: parseInt(allItems.quantity) + parseInt(itemQuantity),
        },
        {
          where: {
            productId: parseInt(itemId),
            orderId: parseInt(orderId),
          },
        }
      );
    } else {
      await orderItem.create({
        orderId: orderId,
        productId: itemId,
        quantity: itemQuantity,
      });
    }
  }

  async getAllProducts(orderId: string) {
    const orderItem = this.db.orderItem;
    const allOrders = await orderItem.findAll({
      where: {
        orderId: orderId,
      },
    });
    let allProducts = await this.viewAll();
    for (let i = 0; i < allOrders.length; i++) {
      for (let j = 0; j < allProducts.length; j++) {
        if (allOrders[i].productId == allProducts[j].id) {
          allOrders[i].dataValues.name = allProducts[j].name;
          allOrders[i].dataValues.price = allProducts[j].price;
          allOrders[i].dataValues.picture = allProducts[j].picture;
        }
      }
    }

    return allOrders;
  }

  async addOrder(jsontosend: any) {
    const order = this.db.order;

    const allOrders = await order.findAll({
      where: {
        email: jsontosend.email,
      },
    });

    if (allOrders.length !== 0) {
      return { state: "existuje" };
    } else {
      let orderInstance = await order.findOne({
        where: {
          id: parseInt(jsontosend.orderNumber),
        },
      });
      await orderInstance.update({
        email: jsontosend.email,
        meno: jsontosend.meno,
        ulica: jsontosend.ulica,
        cislo: jsontosend.cislo,
        mesto: jsontosend.mesto,
        psc: jsontosend.psc,
        state: "Paid",
      });
      return { state: "neexistuje" };
    }
  }
  async getAd() {
    const ad = this.db.ad;
    let adInstance = await ad.findOne();
    adInstance.setDataValue("counter", adInstance.counter + 1);
    await adInstance.save();
    return await adInstance;
  }

  async changeAd(link: any, picture: any) {
    const ad = this.db.ad;
    let adInstance = await ad.findOne();
    adInstance.setDataValue("link", link);
    adInstance.setDataValue("picture", picture);
    await adInstance.save();
    return { change: "changed" };
  }

  async getOrders() {
    const order = this.db.order;
    return await order.findAll({
      where: {
        email: {
          [Op.ne]: null,
        },
      },
    });
  }

  async getOrderItems() {
    const orderItem = this.db.orderItem;
    return await orderItem.findAll({});
  }
  async getAdNotChange() {
    const ad = this.db.ad;
    let adInstance = await ad.findOne();
    return await adInstance;
  }

  async changeOrderState(orderId: any, state: any) {
    const order = this.db.order;
    let orderInstance = await order.findOne({
      where: {
        id: parseInt(orderId),
      },
    });
    await orderInstance.update({
      state: state,
    });
    return { change: "changed" };
  }
}
