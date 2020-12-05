

const getDate = () =>{
    let newDate = new Date()
    return `${newDate.getUTCFullYear()}-${newDate.getUTCMonth()+1}-${newDate.getUTCDate()}`
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