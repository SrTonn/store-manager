const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../db");
const SalesModel = require("../../../models/salesModel");

describe("Atualiza uma venda no BD", () => {
  const id = 1;
  const productId = 1;
  const quantity = 15;

  before(() => {
    sinon.stub(connection, "execute").resolves([[]]);
  });

  after(() => {
    connection.execute.restore();
  });

  it("Verifica se retorna um array", async () => {
    const response = await SalesModel.updateSale(id, productId, quantity);

    expect(response).to.be.a("array");
  });
});

describe("Remove uma venda no BD", () => {
  const ID_EXAMPLE = 1;

  before(() => {
    sinon.stub(connection, "execute").resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it("Verifica se retorna \"undefined\"", async () => {
    const response = await SalesModel.removeSale(ID_EXAMPLE);

    expect(response).to.be.undefined;
  });
});

describe("insere uma nova venda no BD", () => {
  const ID_EXAMPLE = 1;
  const productId = 1;
  const quantity = 15;

  before(() => {
    const execute = [{ insertId: 1 }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe("quando é inserido com sucesso", async () => {
    it("Verifica se retorna um numero", async () => {
      const response = await SalesModel.addSale();

      expect(response).to.be.an("number");
    });

    it("Verifica se o objeto retornado possui as chaves \"id\" e \"quantity\" ", async () => {
      const response = await SalesModel.addSalesProducts(ID_EXAMPLE, productId, quantity);

      expect(response).to.have.all.keys("productId", "quantity");
    });
  });
});

describe("quando consulta por todos itens", () => {
  before(() => {
    const resultExecute = [
      {
        saleId: 1,
        productId: 1,
        quantity: 5,
        date: "2022-06-01T01:33:55.000Z"
      },
      {
        saleId: 1,
        productId: 2,
        quantity: 10,
        date: "2022-06-01T01:33:55.000Z"
      },
      {
        saleId: 2,
        productId: 3,
        quantity: 15,
        date: "2022-06-01T01:33:55.000Z"
      }
    ];

    sinon.stub(connection, "execute").resolves(resultExecute);
  })

  after(() => {
    connection.execute.restore();
  })

  it("Verifica se retorna um array", async () => {
    const response = await SalesModel.getAll();

    expect(response).to.be.an("array");
  });

  it("Verifica se o array não está vazio", async () => {
    const response = await SalesModel.getAll();

    expect(response).to.not.be.empty;
  });

  it("Verifica se o contém 3 items", async () => {
    const response = await SalesModel.getAll();

    expect(response.length).to.be.equal(3)
  });

  it("Verifica se o array possui itens do tipo objeto", async () => {
    const [item] = await SalesModel.getAll();

    expect(item).to.be.an("object");
  });

  it("Verifica se tais itens possuem as propriedades: \"productId\", \"quantity\" e \"date\"",
  async () => {
    const [item] = await SalesModel.getAll();

    expect(item).to.include.all.keys(
      "productId",
      "quantity",
      "date",
    );
  });

});

describe("quando consulta por uma venda", () => {
  before(() => {
    const resultExecute = [
      {
        productId: 1,
        quantity: 5,
        date: "2022-06-01T01:33:55.000Z"
      },
      {
        productId: 2,
        quantity: 10,
        date: "2022-06-01T01:33:55.000Z"
      }
    ];

    sinon.stub(connection, "execute").resolves(resultExecute);
  })

  after(() => {
    connection.execute.restore();
  })

  it("Verifica se retorna um array", async () => {
    const response = await SalesModel.getById(1);

    expect(response).to.be.an("array");
  });

  it("Verifica se o array não está vazio", async () => {
    const response = await SalesModel.getById(1);

    expect(response).to.not.be.empty;
  });

  it("Verifica se o contém 2 items", async () => {
    const response = await SalesModel.getById(1);

    expect(response.length).to.be.equal(2);
  });

  it("Verifica se o array possui itens do tipo objeto", async () => {
    const [item] = await SalesModel.getById(1);

    expect(item).to.be.an("object");
  });
});
