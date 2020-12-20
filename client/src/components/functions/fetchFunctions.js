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

const fetchDeleteOrder = (order) => {
  let url = "http://localhost:3000/deleteorder";
  
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: order._id,
      date: order.orderDate.split("-")[0]
    }),
  }).then((result) => {
    // do something with the result
    console.log("Completed with result:", result);
  });
};

//--------------------------client--------------------------

const fetchModifyClient = ( modifiedClient, activateModal, ) => {
  let url = "http://localhost:3000/modifyclient";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: modifiedClient._id,
      data: modifiedClient
    }),
  }).then(res=>res.json()).then((result) => {
    if(result.message=="NUMBER TAKEN"){ activateModal({acceptFunction:false , title: "Number taken", category: "confirm", body: `${modifiedClient.telephone} already in DB`})}
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

const fetchToExcel = (fileData, productArray)=>{
  let url = "http://localhost:3000/toexcel";
  //console.log(fileData)
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: fileData,
      productArray: productArray
    }),
  }).then((result) => {
    // do something with the result
    console.log("Completed with result:", result);
  });
}

const searchCustomer = (telephone, setTableValues, activateModal) => {
  let url = "http://localhost:3000/searchcustomer";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: {
        telephone:telephone
      },
    }),
  }).then(res=>res.json()).then((result) => {
    // do something with the result
    if(result.message!=="NOT FOUND"){setTableValues(prev=>({...prev, customer: result}))}
    else{activateModal({acceptFunction:false , title: "No phones match", category: "confirm", body: `${telephone} not found in DB`})}
  });
};

const addClient = (order, activateModal) =>{

  if (order.customer.telephone && order.customer.name) {
    fetch("http://localhost:3000/newclient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: order.customer,
        override: false
      }),
    }).then(res=>res.json()).then((result) => {
      result.message==="saved" ?
      activateModal({acceptFunction:false , title: "New Client Added", category: "confirm", body: `${order.customer.telephone} added to DB`}) :
      activateModal({acceptFunction:()=>{
        fetch("http://localhost:3000/newclient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: order.customer,
            override: true
          }),
        })
      } , title: "Replace?", category: "confirm", body: `Do you want to replace ${order.customer.telephone}?`})
    });
  }

  else{
    activateModal({acceptFunction:false , title: "Not enough", category: "confirm", body: `Fill in at least telephone and name`})
  }
}

const openFolder= (order)=>{
  
    let url = "http://localhost:3000/openfolder";
  
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: order
      }),
    })
  
}

module.exports = {
  searchCustomer: searchCustomer,
  fetchModifyOrder: modifyOrder,
  fetchDeleteOrder: fetchDeleteOrder,
  fetchModifyClient: fetchModifyClient,
  fetchDeleteClient: fetchDeleteClient,
  fetchModifyProduct: fetchModifyProduct,
  fetchDeleteProduct: fetchDeleteProduct,
  fetchToExcel: fetchToExcel,
  addOrder: addOrder,
  addClient: addClient,
  openFolder: openFolder,  

};
