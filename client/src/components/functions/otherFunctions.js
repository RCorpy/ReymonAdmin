

const getDate = () =>{
    let newDate = new Date()
    return `${newDate.getUTCFullYear()}-${newDate.getUTCMonth()+1}-${newDate.getUTCDate()}`
}

const getOrderNumberPrefix = () => {
    let newDate = new Date()
    let yearPart = `${newDate.getUTCFullYear()}`.substring(2,4)
    let monthPart = `${newDate.getUTCMonth()+1 <10 ? "0"+newDate.getUTCMonth()+1 : newDate.getUTCMonth()+1 }`
    let dayPart = `${newDate.getUTCDate() <10 ? "0" + newDate.getUTCDate(): newDate.getUTCDate()}`
    return `${yearPart}${monthPart}${dayPart}`
}

module.exports = {
    getDate: getDate,
    getOrderNumberPrefix: getOrderNumberPrefix
  };