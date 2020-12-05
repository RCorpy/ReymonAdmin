  
import {createStore} from 'redux';

const initialState = [{
    _id: "qqewqyuweoq",
    orderNumber: "01118601NN",
    customer:{
      telephone:"456798",
      name: "Demo Customer",
      postalCode: "46005",
      address: "C/something",
      city: "Valencia",
      province: "Valencia",
      country: "Spain",
      contact: "Mr. Demo",
      CIF: "03921841L",
      email: "asdasd@fasd.com",
    },
    description: "",
    status: "proforma",
    extraNotes: "",
    category: "Naves",
    productList:{
      imprimacion: { name: "a", color: "a", amount: "1", price: 1, kit: "a", juntas: true },
      disolvente: { name: "b", color: "a", amount: "1", price: 1, kit: "a" },
      layers: [
        { name: "c", color: "c", amount: "3", price: 2, kit: "c" },
        { name: "c", color: "c", amount: "3", price: 2, kit: "c" },
      ],
      noCharge: { name: "d", color: "o", amount: "2", price: 1, kit: "o" },
      threeD: { name: "e", color: "o", amount: "2", price: 1, kit: "o" },
    },
    orderDate: "2020-10-21",
    area: 200,
    resinType: "Acrilica",
    discount: 50,
    completed: false,
    dosManos: false
  }]

    
function reducer(state = initialState, action) {
    console.log('reducer. action:', action);

    switch (action.type) {
    case 'UPDATE_TABLEVALUES':
        //console.log(action.data)
        return [...action.data]

    default:
        return state;
    }

}

const store = createStore(reducer);

export default store;