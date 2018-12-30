class DateM {
    constructor(date_str){
        let splited = date_str.split('/')
        this.day = parseInt(splited[0])
        this.month = parseInt(splited[1])
        this.year = parseInt(splited[2])
    }
    static isValidDate(date_str){
        let splited = date_str.split('/')
        let day = parseInt(splited[0])
        let month = parseInt(splited[1])
        let year = parseInt(splited[2])

        if (splited.length - 1 != 2)
            return false
        if (isNaN(day) || isNaN(month) || isNaN(year))
            return false
        
        if (month > 12 || month <= 0 || day <= 0 || year < 1)
            return false
        
        if (month == 2){
            if (DateM.isLeapYear(year) && day > 29)
                return false
            if (!DateM.isLeapYear(year) && day > 28)
                return false 
        } else if (day > DateM.getDaysInMonth(month))
            return false
        return true
    }
    static isLeapYear(year){
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
            return true
        return false
    }
    static getDaysInMonth(month){
        if (month == 1) return 31
        if (month == 2 && DateM.isLeapYear(this.year)) return 29
        if (month == 2 && !DateM.isLeapYear(this.year)) return 28
        if (month == 3) return 31
        if (month == 4) return 30
        if (month == 5) return 31
        if (month == 6) return 30
        if (month == 7) return 31
        if (month == 8) return 31
        if (month == 9) return 30
        if (month == 10) return 31
        if (month == 11) return 30
        if (month == 12) return 31
    }

    isEqual(date_obj){
        if (date_obj.day != this.day)
            return false
        if (date_obj.month != this.month)
            return false
        if (date_obj.year != this.year)
            return false
        return true
    }


    comesAfter(date_obj){
        if (this.year > date_obj.year) return true
        if (this.year == date_obj.year){
            if (this.month > date_obj.month) return true
            if (this.month == date_obj.month){
                if (this.day > date_obj.day) return true
                if (this.day == date_obj.day) return false
            }
        }
        return false
    }
    comesBefore(date_obj){
        if (!this.comesAfter(date_obj) && !this.isEqual(date_obj))
            return true
        return false
    }
    stringfy(){
        return '' + this.day + '/' + this.month + '/' + this.year
    }

    addDay(int){
        for (let i = 0;i < int;i++){
            if (this.day + 1 > DateM.getDaysInMonth(this.month)){
                this.day = 1
                this.addMonth(1)
            } else 
                this.day += 1
        }
    }
    addMonth(int){
        for (let i = 0;i < int;i++){
            if (this.month + 1 > 12){
                this.addYear(1)
                this.month = 1
            } else 
                this.month += 1
        }
    }
    addYear(int){
        this.year += int
    }

    subtractYear(int){
        this.year -= int
    }
    subtractMonth(int){
        for (let i = 0;i < int;i++){
            if (this.month - 1 == 0){
                this.subtractYear(1)
                this.month = 12
            } else 
                this.month -= 1
        }
    }
    subtractDay(int){
        for (let i = 0;i < int;i++){
            if (this.day - 1 == 0){
                this.subtractMonth(1)
                this.day = DateM.getDaysInMonth(this.month)
            } else 
                this.day -= 1
        }
    }
}



let date = new DateM('20/2/2010')
let date2 = new DateM('20/2/2010')

console.log(date.addYear(5))