class Student {

    static days = 29;
    static arrayLength = 30;
    presentArray = new Array(Student.arrayLength);
    scoreArray = new Array(Student.arrayLength);
    name;
    surname;
    year;

    constructor(name, surname, year) {
        this.name = name;
        this.surname = surname;
        this.year = year;
    }


    set name(value) {
        if (value.length === 0) {
            throw new Error('Name can not be empty');
        }
        this.name = value;
    }

    set surname(value) {
        if (value.length === 0) {
            throw new Error('Surname can not be empty');
        }
        this.surname = value;

    }

    set year(value) {
        if (value.length === 0 || typeof value !== 'number') {
            throw new Error('Year can not be empty');
        }
        this.year = value;

    }

    get age() {
        return (new Date).getFullYear() - this.year;
    }

    static checkArrayLength(arr, days = Student.days) {
        if (typeof arr[days] === 'boolean' || typeof arr[days] === 'number') {
            throw new Error('The maximum amount of  records reached ');
        }
    }

    presence(value) {
        Student.checkArrayLength(this.presentArray);
        const arrayIndex = this.presentArray.filter(() => Boolean).length;
        value === true ? this.presentArray[arrayIndex] = true : this.presentArray[arrayIndex] = false;
    }

    present() {
        this.presence(true);
    }

    absent() {
        this.presence(false);
    }

    mark(value) {
        Student.checkArrayLength(this.scoreArray);
        const res = this.scoreArray.filter((item) => (item !== undefined));
        this.scoreArray[res.length] = value;
    }

    getSummary() {
        const notice = {
            good: 'Ути какой молодчинка',
            norm: 'Норм, но можно лучше',
            bad: 'Редиска'
        };
        const presentValue = 0.9;
        const markValue = 9;
        let avrMark = 0;
        avrMark = this.scoreArray.reduce((sum, current) => sum + current, 0) / this.scoreArray.length;
        let avrPresent = 0;
        avrPresent = this.presentArray.reduce((sum, current) => sum + current, 0) / this.presentArray.length;
        if (avrMark > markValue && avrPresent > presentValue) {
            return notice.good;
        } else if (avrMark < markValue && avrPresent < presentValue) {
            return notice.bad;
        } else if (avrMark < markValue || avrPresent < presentValue)
            return notice.norm;
    }
}

const name = 'ivan';
const surname = 'ivanov';
const year = 1980;
const ivan = new Student(name, surname, year);
ivan.getSummary();