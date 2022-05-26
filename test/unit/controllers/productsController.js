const sinon = require("sinon");
const { expect } = require("chai");

const ProductsService = require("../../../services/productsService");
const ProductsController = require("../../../controllers/productsController");

describe('Ao chamar o controller de getProducts', () => {
  describe('quando não existem produtos no banco de dados', async () => {
    const response = {};
    const request = { params: {} };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(ProductsService, "getProducts").resolves([[]]);
    });

    after(() => {
      ProductsService.getProducts.restore();
    });

    it('Verifica se é chamado o método "status" passando o código 200', async () => {
      await ProductsController.getProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('Verifica se é chamado o método "json" passando o código 200', async () => {
      await ProductsController.getProducts(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })

    it('Verifica se é chamado o método "status" passando o código 200', async () => {
      const id = 1
      request.params = { id }
      await ProductsController.getProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  });
});

