class Student {

    #_presentArray = new Array(30);
    #_scoreArray = new Array(30);
    #_name;
    #_surname;
    #_year;

    constructor(name, surname, year) {
        this.name = name;
        this.surname = surname;
        this.year = year;
    }


    set name(value) {
        if (value.length === 0) {
            throw new Error('Name can not be empty')
        }
        this.#_name = value;
    }

    set surname(value) {
        if (value.length === 0) {
            throw new Error('Surname can not be empty')
        }
        this.#_surname = value;

    }

    set year(value) {
        if (value.length === 0 || typeof value != "number") {
            throw new Error('Year can not be empty')
        }
        this.#_year = value;

    }

    get age() {
        return (new Date).getFullYear() - this.#_year;
    }

    #_checkArrayLength(arr, days = 29) {
        if (typeof arr[days] === 'boolean' || typeof arr[days] === 'number') {
            throw new Error('The maximum amount of  records reached ')
        }
    }

    presence(value) {
        this.#_checkArrayLength(this.#_presentArray);
        const arrayIndex = this.#_presentArray.filter(() => Boolean).length;
        value === true ? this.#_presentArray[arrayIndex] = true : this.#_presentArray[arrayIndex] = false;
    }

    present() {
        this.presence(true);
    }

    absent() {
        this.presence(false);
    }

    mark(value) {
        this.#_checkArrayLength(this.#_scoreArray);
        const res = this.#_scoreArray.filter((item) => {
            return item !== undefined;
        });
        this.#_scoreArray[res.length] = value;
    }

    getSummary() {
        const notice = {
            good: 'Ути какой молодчинка',
            norm: 'Норм, но можно лучше',
            bad: 'Редиска'
        }
        let avrMark = 0;
        avrMark = this.#_scoreArray.reduce((sum, current) => sum + current, 0) / this.#_scoreArray.length;
        let avrPresent = 0;
        avrPresent = this.#_presentArray.reduce((sum, current) => sum + current, 0) / this.#_presentArray.length;
        if (avrMark > 9 && avrPresent > 0.9) {
            return notice.good;
        } else if (avrMark < 9 && avrPresent < 0.9) {
            return notice.bad;
        } else if (avrMark < 9 || avrPresent < 0.9)
            return notice.norm;
    }
}


const ivan = new Student('ivan', 'ivanov', 1980);