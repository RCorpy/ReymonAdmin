
export default class Validator{

    number(num){
        return (num && typeof Number(num) ==="number")
    }

    notEmpty(string){
        return string
    }

    date(date){
        if(date && date.split("-").length===3){
            const [year, month, day] = date.split("-")
            if(year.length===4 && month.length<3 && day.length<3 &&  parseInt(year) && parseInt(month) && parseInt(day)){
                return true
            }
        }
        return false
    }

}




