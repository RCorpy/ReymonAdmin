

const getDate = () =>{
    let newDate = new Date()
    return `${newDate.getUTCFullYear()+1}-${newDate.getUTCMonth()+1}-${newDate.getUTCDate()+1}`
}

const getOrderNumberPrefix = () => {
    let newDate = new Date()
    let yearPart = `${newDate.getUTCFullYear()}`.substring(2,4)
    return `${yearPart}${newDate.getUTCMonth()+1}${newDate.getUTCDate()+1}`
}

module.exports = {
    getDate: getDate,
    getOrderNumberPrefix: getOrderNumberPrefix
  };