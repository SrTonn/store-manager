const sinon = require("sinon");
const {expect} = require("chai")

const ProductsModel = require("../../../models/productsModel");
const SalesModel = require("../../../models/salesModel");
const SalesService = require("../../../services/salesService");

describe("Busca todas as vendas no BD", () => {
  describe("quando não existe nenhuma venda criado",  () => {

    before(() => {
      sinon.stub(SalesModel, "getAll").resolves([[]]);
    });

    after(() => {
      SalesModel.getAll.restore();
    });

    it("Verifica se retorna um array", async () => {
      const [response] = await SalesService.getSales();

      expect(response).to.be.an("array")
    });

    it("Verifica se retorna um array vazio", async () => {
      const [response] = await SalesService.getSales();

      expect(response).to.be.empty
    });
  });

  describe('quando existe venda(s) criada(s) busca por todos', async () => {
    const mock = [
      {
        saleId: 1,
        productId: 1,
        quantity: 5,
        date: "2022-05-31T18:58:46.000Z"
      },
      {
        saleId: 1,
        productId: 2,
        quantity: 10,
        date: "2022-05-31T18:58:46.000Z"
      },
      {
        saleId: 2,
        productId: 3,
        quantity: 15,
        date: "2022-05-31T18:58:46.000Z"
      }
    ];

    before(() => {
      sinon.stub(SalesModel, 'getAll').resolves([mock]);
    });

    after(() => {
      SalesModel.getAll.restore();
    });

    it('Verifica se retorna um array com 3 objetos', async () => {

      const [response] = await SalesService.getSales();

      expect(response.length).to.be.equal(3);
    });

    it('Verifica se o item final é um objeto', async () => {
      const [response] = await SalesService.getSales();

      expect(response[0]).to.be.an('object');
    });
  });
});

describe ('Busca uma venda por ID no BD', () => {
  describe('quando existe produto(s) criado(s)', async () => {
    const ID_EXAMPLE = 1
    const mock = [
      {
        productId: 1,
        quantity: 5,
        date: "2022-05-31T18:58:46.000Z"
      },
      {
        productId: 2,
        quantity: 10,
        date: "2022-05-31T18:58:46.000Z"
      }
    ];

    before(() => {
      sinon.stub(SalesModel, 'getById').resolves([mock]);
    });

    after(() => {
      SalesModel.getById.restore();
    });

    it('Verifica se retorna um array com dois items', async () => {
      const [response] = await SalesService.getSales(ID_EXAMPLE);

      expect(response.length).to.be.equal(2);
    });

    it('Verifica se o item final é igual ao objeto esperado', async () => {
      const [response] = await SalesService.getSales(ID_EXAMPLE);

      expect(response).to.deep.equal(mock);
    });

  });
});

describe("Insere uma nova venda no BD", () => {
  describe("quando é inserido sem sucesso", async () => {
    const payloadSales = [{
      productId: 1,
      quantity: 99
    }];

    const mock = [{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    }];

    before(() => {
      const ID_EXAMPLE = 1;
      const insertedSalesProducts = 1;

      sinon.stub(ProductsModel, "getById").resolves([mock]);
      sinon.stub(SalesModel, "addSale").resolves({
        id: ID_EXAMPLE,
        itemsSold: insertedSalesProducts,
      });
    });

    after(() => {
      ProductsModel.getById.restore();
      SalesModel.addSale.restore();
    });

    it("Verifica se retorna a mensagem \"Such amount is not permitted to sell\"", async () => {
      try {
        await SalesService.create(payloadSales);
      } catch (error) {
        expect(error).to.deep.equal({ status: 422, message: "Such amount is not permitted to sell" });
      }
    });
  });

  describe("quando é inserido com sucesso", async () => {
    const payloadSales = [{
      productId: 1,
      quantity: 9
    }];

    const mock = [{
      id: 1,
      name: "Martelo de Thor",
      quantity: 10
    }];

    before(() => {
      const ID_EXAMPLE = 1;
      const insertedSalesProducts = 1;

      sinon.stub(ProductsModel, "getById").resolves([mock]);
      sinon.stub(SalesModel, "addSalesProducts").resolves(payloadSales[0]);
      sinon.stub(SalesModel, "addSale").resolves({
        id: ID_EXAMPLE,
        itemsSold: insertedSalesProducts,
      });
    });

    after(() => {
      ProductsModel.getById.restore();
      SalesModel.addSale.restore();
      SalesModel.addSalesProducts.restore();
    });

    it("Verifica se retorna um objeto", async () => {
      const response = await SalesService.create(payloadSales);

      expect(response).to.be.an("object");
    });

    it("Verifica se retorna um objeto com as chaves \"id\" e \"itemsSold\"", async () => {
      const response = await SalesService.create(payloadSales);

      expect(response).to.have.all.keys("id", "itemsSold");
    });
  });
});

describe("quando atualiza uma venda no BD", () => {
  describe("quando existe o produto", async () => {
    const ID_SALE_EXAMPLE = 1
    const payload = {
      productId: 1,
      quantity: 5
    }

    const expectResponse = {
      saleId: ID_SALE_EXAMPLE,
      itemUpdated: [{ ...payload }]
    };

    const mock = [
      {
        productId: 1,
        quantity: 5,
        date: "2022-05-31T18:58:46.000Z"
      },
      {
        productId: 2,
        quantity: 10,
        date: "2022-05-31T18:58:46.000Z"
      }
    ];

    before(() => {
      sinon.stub(SalesModel, "getById").resolves([mock]);
      sinon.stub(SalesModel, "updateSale").resolves();
    });

    after(() => {
      SalesModel.getById.restore();
      SalesModel.updateSale.restore();
    });

    it("Verifica se é um objeto no padrão esperado", async () => {
      const response = await SalesService
        .update(ID_SALE_EXAMPLE, payload.productId, payload.quantity);

      expect(response).to.deep.equal(expectResponse);
    });
  });
});
