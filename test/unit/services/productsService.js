const sinon = require("sinon");
const chai = require('chai')
const { expect } = chai

chai.use(require('chai-as-promised'))
const ProductsModel = require("../../../models/productsModel");
const ProductsService = require("../../../services/productsService");

describe('Busca todos os produtos no BD', () => {
  describe('quando não existe nenhum produtos criado', async () => {

    before(() => {
      sinon.stub(ProductsModel, 'getAll').resolves([[]]);
    });

    after(() => {
      ProductsModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await ProductsService.getProducts();

      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const response = await ProductsService.getProducts();

      expect(response[0]).to.be.empty;
    });
  });

  describe('quando existe produto(s) criado(s) busca por todos', async () => {
    const mock = [
      {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      },
      {
        id: 2,
        name: "Traje de encolhimento",
        quantity: 20
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
        quantity: 30
      }
    ];

    before(() => {
      sinon.stub(ProductsModel, 'getAll').resolves([mock]);
    });

    after(() => {
      ProductsModel.getAll.restore();
    });

    it('Verifica se retorna um array de arrays', async () => {
      const response = await ProductsService.getProducts();

      expect(response[0].length).to.be.equal(3);
    });

    it('Verifica se o item final é um objeto', async () => {
      const response = await ProductsService.getProducts();

      expect(response[0][0]).to.be.an('object');
    });
  });

  describe('quando existe produto(s) criado(s) busca por ID', async () => {
    const ID_EXAMPLE = 1
    const mock = [
      {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      }];

    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves([mock]);
    });

    after(() => {
      ProductsModel.getById.restore();
    });

    it('Verifica se retorna um array com um item', async () => {
      const response = await ProductsService.getProducts(ID_EXAMPLE);

      expect(response.length).to.be.equal(1);
    });

    it('Verifica se o item final é igual ao objeto esperado', async () => {
      const response = await ProductsService.getProducts(ID_EXAMPLE);

      expect(response).to.deep.equal(mock);
    });

  });

  describe('Quando existe produto(s) criado(s) busca por ID inválido', async () => {
    const INVALID_ID = 9999

    before(() => {
      sinon.stub(ProductsModel, 'getById').resolves([[]]);
    });

    after(() => {
      ProductsModel.getById.restore();
    });

    it('Verifica se ao passar um ID inválido retorna um erro', async () => {
      await expect(ProductsService.getProducts(INVALID_ID))
        .to.be.rejectedWith({ status: 404, message: 'Product not found'});
    });

  });
});

describe("Insere um novo produto no BD", () => {
  describe("quando é inserido sem sucesso", async () => {
    const payloadProduct =
      {
        name: "Martelo de Thor",
        quantity: 15
      };

    const mock = [
      {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      },
      {
        id: 2,
        name: "Traje de encolhimento",
        quantity: 20
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
        quantity: 30
      }
    ];

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(ProductsModel, "getAll").resolves([mock]);
      sinon.stub(ProductsModel, "create").resolves({ id: ID_EXAMPLE });
    });

    after(() => {
      ProductsModel.getAll.restore();
      ProductsModel.create.restore();
    });

    it('Verifica se retorna a mensagem "Product already exists"', async () => {
      await expect(ProductsService.create(payloadProduct))
        .to.be.rejectedWith({ status: 409, message: 'Product already exists'});
    });
  });

  describe("quando é inserido com sucesso", async () => {
    const payloadProduct = {
      name: "Funko Pop! Overwatch - Wrecking Ball 6",
      quantity: 15
    };

    const mock = [
      {
        id: 1,
        name: "Martelo de Thor",
        quantity: 10
      },
      {
        id: 2,
        name: "Traje de encolhimento",
        quantity: 20
      },
      {
        id: 3,
        name: "Escudo do Capitão América",
        quantity: 30
      }
    ];

    before(() => {
      const ID_EXAMPLE = 1;

      sinon.stub(ProductsModel, "getAll").resolves([mock]);
      sinon.stub(ProductsModel, "create").resolves({ id: ID_EXAMPLE });
    });

    after(() => {
      ProductsModel.getAll.restore();
      ProductsModel.create.restore();
    });

    it("retorna um objeto", async () => {
      const response = await ProductsService.create(payloadProduct);

      expect(response).to.be.a("object");
    });

    it('Verifica se o retornado objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductsService.create(payloadProduct);

      expect(response).to.have.a.property("id");
    });
  });
});

describe("quando é atualizado com sucesso", async () => {
  const payloadProduct = {
    id: 1,
    name: "Funko Pop! Overwatch - Wrecking Ball 6",
    quantity: 15
  };

  const mock = [{
    id: 1,
    name: "Martelo de Thor",
    quantity: 10
  }];

  before(() => {
    const ID_EXAMPLE = 1;

    sinon.stub(ProductsModel, "getById").resolves([mock]);
    sinon.stub(ProductsModel, "update").resolves(ID_EXAMPLE);
  });

  after(() => {
    ProductsModel.getById.restore();
    ProductsModel.update.restore();
  });

  it("Verifica se retorna um numero", async () => {
    const response = await ProductsService.update(payloadProduct);

    expect(response).to.be.a("number");
  });
});

describe("quando é removido com sucesso", async () => {
  const ID_EXAMPLE = 1;
  const mock = [{
    id: 1,
    name: "Martelo de Thor",
    quantity: 10
  }];

  before(() => {
    sinon.stub(ProductsModel, "getById").resolves([mock]);
    sinon.stub(ProductsModel, "remove").resolves();
  });

  after(() => {
    ProductsModel.getById.restore();
    ProductsModel.remove.restore();
  });

  it("Verifica se retorna 'undefined", async () => {
    const response = await ProductsService.remove(ID_EXAMPLE);

    expect(response).to.be.undefined;
  });
});
