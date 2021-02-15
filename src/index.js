class Student {

    #_presentArray = new Array(30);
    #_scoreArray = new Array(30);
    #_name;
    #_surname;
    #_year;

    constructor(name, surname, year) {
        this.#_name = this.setName(name);
        this.#_surname = this.setSurname(surname);
        this.#_year = this.setYear(year);
    }

    setName(value) {
        if (value.length === 0) {
            throw new Error('Name can not be empty')
        }
        return value;
    }

    setSurname(value) {
        if (value.length === 0) {
            throw new Error('Surname can not be empty')
        }
        return value;
    }

    setYear(value) {
        if (value.length === 0 || typeof value != "number") {
            throw new Error('Year can not be empty')
        }
        return value;
    }

    get age() {
        return (new Date).getFullYear() - this.year;
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

    get present() {
        this.presence(true);
    }

    get absent() {
        this.presence(false);
    }

    mark(value) {
        this.#_checkArrayLength(this.#_scoreArray);
        const res = this.#_scoreArray.filter((item) => {
            return item !== undefined;
        });
        this.#_scoreArray[res.length] = value;
    }

    get summary() {
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