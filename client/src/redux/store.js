  
import {createStore} from 'redux';
import {EXAMPLE_ORDER} from './exampleOrder'
import {getDate} from '../components/functions/otherFunctions'

const MONTHS_TO_TRACEBACK = 6

const initialState = {
  lastMonthOrders: [EXAMPLE_ORDER],
  totalOrders: [EXAMPLE_ORDER],
  nextOrderNumber: "",
  priceObject: {},
  priceKeys: []
}

    
function reducer(state = initialState, action) {
    console.log('reducer. action:', action);

    switch (action.type) {
    case 'UPDATE_TABLEVALUES':
        return {
          ...state,
          lastMonthOrders:[...action.data]
        }
    case 'GET_PRICES':
      
      return {
        ...state,
        priceObject: action.data,
        priceKeys: Object.keys(action.data)
      }

    case 'GET_TABLEVALUES':
        let [maxYear, maxMonth, maxDay] = getDate().split("-").map(element => parseFloat(element))
        if(maxMonth-MONTHS_TO_TRACEBACK<1){
          maxYear = maxYear-1
          maxMonth= 12+maxMonth-MONTHS_TO_TRACEBACK
        }
        else{
          maxMonth = maxMonth - MONTHS_TO_TRACEBACK
        }
        
        const checkFilterDate = (orderDate) =>{
          let [year, month, day] = orderDate.split("-").map(element => parseFloat(element))
          if(year<maxYear){  return false}
          if(year>maxYear){ return true}
          if(month<maxMonth){return false}
          if(month>maxMonth){return true}
          return day>=maxDay
        }
          return {
            ...state,
            lastMonthOrders:[...action.data.filter(order => (checkFilterDate(order.orderDate)))].reverse(),
            totalOrders: [...action.data]
          }
    
    case "ADD_ORDER":
      let suffix = action.lastOrderNumber.substring(action.lastOrderNumber.length-2, action.lastOrderNumber.length)
      let prefix = action.lastOrderNumber.slice(0,-2)
      prefix = parseFloat(prefix)+3
      return{
        ...state,
        nextOrderNumber: prefix+suffix
      }

    case 'DELETE_ORDER':
      return{
        ...state,
        lastMonthOrders: state.lastMonthOrders.filter(order=>order._id!==action.data),
        totalOrders: state.totalOrders.filter(order=>order._id!==action.data) 
      }  
    

    default:
        return state;
    }

}

const store = createStore(reducer);

export default store;