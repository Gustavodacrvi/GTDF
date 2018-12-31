
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

        if (isNaN(day) || isNaN(month) || isNaN(year))
            return false
        if (splited.length - 1 != 2)
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
    static getDaysInMonth(month, leap_year_bool){
        if (month == 1) return 31
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
        if (leap_year_bool) {
            if (month == 2 && leap_year_bool) return 29
            if (month == 2 && !leap_year_bool) return 28
        }
    }
    static getCurrentDay(){
        let date = new Date()
        let datem = new DateM('' + date.getDate() + '/' + (parseInt(date.getMonth()) + parseInt(1)) + '/' + date.getFullYear())
        return datem
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
    getCopy(){
        let datem = new DateM('' + this.day + '/' + this.month + '/' + this.year)
        return datem
    }

    stringfy(){
        return '' + this.day + '/' + this.month + '/' + this.year
    }

    addDay(int){
        for (let i = 0;i < int;i++){
            if (this.month + 1 > 12){
                this.year += 1
                this.month = 1
            } else 
                this.month += 1
        }
    }
    addMonth(int){
        for (let i = 0;i < int;i++){
            if (this.month + 1 > 12){
                this.year += 1
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
                this.year -= 1
                this.month = 12
            } else 
                this.month -= 1
        }
    }
    subtractDay(int){
        for (let i = 0;i < int;i++){
            if (this.day - 1 == 0){
                this.subtractMonth(1)
                this.day = DateM.getDaysInMonth(this.month, this.year)
            } else 
                this.day -= 1
        }
    }

    diference(date_obj){
        return new DateM('' + (this.day - date_obj.day) + '/' + (this.month - date_obj.month) + '/' + (this.year - date_obj.year))
    }
}

class TimeM {
    constructor(time_str){
        let splited = time_str.split(':')
        this.hour = parseInt(splited[0])
        this.min = parseInt(splited[1])
    }
    static isValidTime(time_str){
        let splited = time_str.split(':')
        let hour = parseInt(splited[0])
        let min = parseInt(splited[1])

        if (isNaN(hour) || isNaN(min))
            return false
        if (splited.length - 1 != 1)
            return false
        
        if (hour > 23 || hour < 0 || min < 0 || min > 59)
            return false
    }
    static getCurrentTime(){
        let date = new Date()
        return new TimeM('' + date.getHours() + ':' + date.getMinutes())
    }

    isEqual(time_obj){
        if (this.hour != time_obj.hour)
            return false
        if (this.min != time_obj.min)
            return false
        return true
    }
    comesBefore(time_obj){
        if (this.hour > time_obj.hour)
            return false
        if (this.hour == time_obj.hour){
            if (this.min >= time_obj.min){
                return false
            }
            if (this.min < time_obj.min)
                return true
        }
        return true
    }
    comesAfter(time_obj){
        if (this.hour < time_obj.hour)
            return false
        if (this.hour == time_obj.hour){
            if (this.min <= time_obj.min){
                return false
            }
            if (this.min > time_obj.min)
                return true
        }
        return true
    }

    sync(){
        let date = new Date()
        let init = () => {this.syncId = setInterval(() => {this.addMin(1);console.log(this)}, 60000)}
        setTimeout(() => {
            this.hour = date.getHours()
            this.min = date.getMinutes()
            this.addMin(1)
            console.log(this)
            init()
        }, 60000 - date.getSeconds() * 1000)
    }
    async(){
        clearInterval(this.syncId)
    }

    getCopy(){
        let timem = new TimeM('' + this.hour + ':' + this.min)
        return timem
    }

    stringfy(){
        return '' + this.hour + ':' + this.min
    }

    addHour(int){
        for (let i = 0;i < int;i){
            if (this.hour + 1 == 24)
                this.hour = 0
            else
                this.hour += 1
        }
    }
    addMin(int){
        for (let i = 0;i < int;i++){
            if (this.min + 1 > 59){
                this.min = 0
                this.hour += 1
            } else {
                this.min += 1
            }
        }
    }
    subtractHour(int){
        for (let i = 0;i < int;i){
            if (this.hour - 1 < 0)
                this.hour = 23
            else
                this.hour -= 1
        }
    }
    subtractMin(int){
        for (let i = 0;i < int;i++){
            if (this.min -1 < 0){
                this.min = 59
                this.hour -= 1
            } else {
                this.min -= 1
            }
        }
    }

    diference(time_obj){
        return new TimeM('' + (this.hour - time_obj.hour) + ':' + (this.min - time_obj.min))
    }
}

let time = TimeM.getCurrentTime()
let time2 = new TimeM('9:0')

console.log(time.diference(time2))