// --------------------------orders---------------------------------

const { ModalFooter } = require("react-bootstrap");

const addOrder = (order) => {
  let url = "http://localhost:3000/neworder";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      year: order.orderDate.split("-")[0],
      data: {
        orderNumber: order.orderNumber,
        customer: order.customer,
        description: order.description,
        status: order.status,
        extraNotes: order.extraNotes,
        category: order.category,
        productList: order.productList,
        orderDate: order.orderDate,
        area: order.area,
        resinType: order.resinType,
        discount: order.discount,
        completed: order.completed,
      },
    }),
  }).then((result) => {
    // do something with the result
    console.log("Completed with result:", result);
  });

  if (order.customer.telephone && order.customer.name) {
    fetch("http://localhost:3000/newclient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: order.customer,
        telephone: order.telephone
      }),
    }).then((result) => {
      // do something with the result
      console.log("Completed with result:", result);
    });
  }
};

const modifyOrder = (order, modifiedOrder) => {
  let url = "http://localhost:3000/modifyorder";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: order._id,
      data: {
        orderNumber: modifiedOrder.orderNumber,
        customer: modifiedOrder.customer,
        description: modifiedOrder.description,
        status: modifiedOrder.status,
        extraNotes: modifiedOrder.extraNotes,
        category: modifiedOrder.category,
        productList: modifiedOrder.productList,
        orderDate: modifiedOrder.orderDate,
        area: modifiedOrder.area,
        resinType: modifiedOrder.resinType,
        discount: modifiedOrder.discount,
        completed: modifiedOrder.completed,
      },
    }),
  }).then((result) => {
    // do something with the result
    console.log("Completed with result:", result);
  });
};

const deleteOrder = (order) => {
  let url = "http://localhost:3000/deleteorder";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: order._id,
    }),
  }).then((result) => {
    // do something with the result
    console.log("Completed with result:", result);
  });
};

//--------------------------client--------------------------

const fetchModifyClient = (client, modifiedClient) => {
  let url = "http://localhost:3000/modifyclient";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: client._id,
      data: {
        name: modifiedClient.name,
        discount: modifiedClient.discount,
      },
    }),
  }).then((result) => {
    // do something with the result
    console.log("Completed with result:", result);
  });
};

const fetchDeleteClient = (client) => {
  let url = "http://localhost:3000/deleteclient";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: client._id,
    }),
  }).then((result) => {
    // do something with the result
    console.log("Completed with result:", result);
  });
};

// --------------------------products--------------------------

const fetchModifyProduct = (product, modifiedProduct) => {
  let url = "http://localhost:3000/modifyproduct";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: product._id,
      data: {
        name: modifiedProduct.name,
        price: modifiedProduct.price,
      },
    }),
  }).then((result) => {
    // do something with the result
    console.log("Completed with result:", result);
  });
};

const fetchDeleteProduct = (product) => {
  let url = "http://localhost:3000/deleteproduct";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: product._id,
    }),
  }).then((result) => {
    // do something with the result
    console.log("Completed with result:", result);
  });
};

const fetchToExcel = (fileData)=>{
  let url = "http://localhost:3000/toexcel";
  //console.log(fileData)
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: fileData,
    }),
  }).then((result) => {
    // do something with the result
    console.log("Completed with result:", result);
  });
}


module.exports = {
  fetchModifyOrder: modifyOrder,
  fetchDeleteOrder: deleteOrder,
  fetchModifyClient: fetchModifyClient,
  fetchDeleteClient: fetchDeleteClient,
  fetchModifyProduct: fetchModifyProduct,
  fetchDeleteProduct: fetchDeleteProduct,
  fetchToExcel: fetchToExcel,
  addOrder: addOrder,
  

};
