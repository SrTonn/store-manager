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

describe("quando é inserido com sucesso", async () => {
  const response = {};
  const request = {};
  const body = [{
    productId: 1,
    quantity: 5
  }];

  before(() => {
    request.body = body

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(body);

    sinon.stub(SalesService, "create").resolves({
      itemsSold: body
    });
  });

  after(() => {
    SalesService.create.restore();
  });

  it("Verifica se é chamado o status com o código 201", async () => {
    await SalesController.createSales(request, response);

    expect(response.status.calledWith(201)).to.be.equal(true);
  });

  it("Verifica se é chamado o json com a resposta do produto enviado", async () => {
    await SalesController.createSales(request, response);

    expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
  });
});

describe("quando é atualizado com sucesso", async () => {
  const response = {};
  const request = { params: { id: 1} };
  const body = [{
    productId: 1,
    quantity: 5
  }];

  before(() => {
    request.body = body;
    body.id = 1;

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(body);

    sinon.stub(SalesService, "update").resolves({
      itemUpdated: body,
    });
  });

  after(() => {
    SalesService.update.restore();
  });

  it("Verifica se é chamado o status com o código 200", async () => {
    await SalesController.updateSales(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it("Verifica se a resposta é o objeto esperado", async () => {
    await SalesController.updateSales(request, response);
    body.id = 1;
    expect(response.json()).to.deep.equal(body);
  });
});

describe("quando é removido com sucesso", async () => {
  const response = {};
  const request = { params: { id: 1} };

  before(() => {
    response.status = sinon.stub().returns(response);
    response.end = sinon.stub().returns();

    sinon.stub(SalesService, "remove").resolves();
  });

  after(() => {
    SalesService.remove.restore();
  });

  it("Verifica se é chamado o status com o código 204", async () => {
    await SalesController.deleteSales(request, response);

    expect(response.status.calledWith(204)).to.be.equal(true);
  });
});
