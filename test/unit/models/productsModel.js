const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../db");
const ProductsModel = require("../../../models/productsModel");

describe("Insere um novo produto no BD", () => {
  const payloadProduct = {
    name: "Funko Pop! Overwatch - Wrecking Ball 6",
    quantity: 15
  };

  before(() => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("quando é inserido com sucesso", async () => {
    it("Verifica se retorna um objeto", async () => {
      const response = await ProductsModel.create(payloadProduct);

      expect(response).to.be.a("object");
    });

    it('Verifica se o objeto retornado possui o "id" do novo produto inserido',
    async () => {
      const response = await ProductsModel.create(payloadProduct);
      expect(response).to.have.a.property("id");
    });
  });
});

describe('quando existem filmes criados', () => {
  before(() => {
    const resultExecute = [
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

    sinon.stub(connection, 'execute').resolves(resultExecute);
  })

  after(() => {
    connection.execute.restore();
  })

  it('Verifica se retorna um array', async () => {
    const response = await ProductsModel.getAll();

    expect(response).to.be.an('array');
  });

  it('Verifica se o array não está vazio', async () => {
    const response = await ProductsModel.getAll();

    expect(response).to.not.be.empty;
  });

  it('Verifica se o contém 3 items', async () => {
    const response = await ProductsModel.getAll();

    expect(response.length).to.be.equal(3)
  });

  it('Verifica se o array possui itens do tipo objeto', async () => {
    const [item] = await ProductsModel.getAll();

    expect(item).to.be.an('object');
  });

  it('Verifica se tais itens possuem as propriedades: "id", "name" e "quantity"', async () => {
    const [item] = await ProductsModel.getAll();

    expect(item).to.include.all.keys(
      'id',
      'name',
      'quantity',
    );
  });

  it('Verifica se o array possui itens do tipo objeto', async () => {
    const [item] = await ProductsModel.getById(2);

    expect(item).to.be.an('object');
  });
});

describe("Atualiza um produto no BD", () => {
  const payloadProduct = {
    id: 1,
    name: "Funko Pop! Overwatch - Wrecking Ball 6",
    quantity: 15
  };

  before(() => {
    const execute = [{ affectedRows: 1 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Verifica se retorna um numero", async () => {
    const response = await ProductsModel.update(payloadProduct);

    expect(response).to.be.a("number");
  });
});

describe("Remove um produto no BD", () => {
  const payloadProduct = {
    id: 1,
  };

  before(() => {
    sinon.stub(connection, "execute").resolves([]);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Verifica se retorna 'undefined'", () => {
    const response = ProductsModel.remove(payloadProduct);

    expect(response).to.be.undefined
  });
});
