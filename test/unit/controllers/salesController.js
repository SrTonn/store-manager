const sinon = require("sinon");
const { expect } = require("chai");

const SalesService = require("../../../services/salesService");
const SalesController = require("../../../controllers/salesController");

describe('Ao chamar o controller de getSales', () => {
  describe('quando não existem promoções no banco de dados', async () => {
    const response = {};
    const request = { params: {} };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SalesService, "getSales").resolves([[]]);
    });

    after(() => {
      SalesService.getSales.restore();
    });

    it('Verifica se é chamado o método "status" passando o código 200', async () => {
      await SalesController.getSales(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    })

    it('Verifica se é chamado o método "json" passando o código 200', async () => {
      await SalesController.getSales(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    })

    it('Verifica se é chamado o método "status" passando o código 200', async () => {
      const id = 1
      request.params = { id }
      await SalesController.getSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    })
  });
});

