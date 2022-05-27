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

describe('quando é inserido com sucesso', async () => {
  const response = {};
  const request = {};
  const body = {
    name: "Funko Pop! Overwatch - Wrecking Ball 6",
    quantity: 15
  };

  before(() => {
    request.body = body
    body.id = 1
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns({});

    sinon.stub(ProductsService, "create").resolves(body);
  });

  after(() => {
    ProductsService.create.restore();
  });

  it('Verifica se é chamado o status com o código 201', async () => {
    await ProductsController.createProducts(request, response);

    expect(response.status.calledWith(201)).to.be.equal(true);
  });

  it('Verifica se é chamado o json com a resposta do produto enviado', async () => {
    await ProductsController.createProducts(request, response);

    expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
  });
});

describe('quando é atualizado com sucesso', async () => {
  const response = {};
  const request = { params: { id: 1} };
  const body = {
    name: "Funko Pop! Overwatch - Wrecking Ball 6",
    quantity: 15
  };

  before(() => {
    request.body = body
    body.id = 1
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(body);

    sinon.stub(ProductsService, "update").resolves(body);
  });

  after(() => {
    ProductsService.update.restore();
  });

  it('Verifica se é chamado o status com o código 200', async () => {
    await ProductsController.updateProducts(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('Verifica se a resposta é o objeto esperado', async () => {
    await ProductsController.updateProducts(request, response);
    body.id = 1;
    expect(response.json()).to.deep.equal(body);
  });
});

