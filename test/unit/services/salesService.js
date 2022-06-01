const sinon = require("sinon");
const {expect} = require("chai")

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
