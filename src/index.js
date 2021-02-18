class List {

    noteStorage = [];

    constructor(name) {
        this.name = name;
    }

    create(textNote) {
        if (localStorage.getItem(this.name) !== null) {
            this.noteStorage = JSON.parse(localStorage.getItem(this.name));
        }
        this.noteStorage.push({'id': Date.now(), 'textNote': textNote, 'status': false});
        localStorage.setItem(this.name, JSON.stringify(this.noteStorage));
    }

    delete(id) {
        this.noteStorage = JSON.parse(localStorage.getItem(this.name));
        this.noteStorage = this.noteStorage.filter((note) => (note.id !== id));
        localStorage.setItem(this.name, JSON.stringify(this.noteStorage));
    }

    update(id, newText) {
        this.noteStorage = JSON.parse(localStorage.getItem(this.name));
        const index = this.noteStorage.findIndex((el) => (el.id === id));
        this.noteStorage[index].text = newText;
        localStorage.setItem(this.name, JSON.stringify(this.noteStorage));
    }

}

class TodoList
    extends List {

    setStatus(id) {
        this.noteStorage = JSON.parse(localStorage.getItem(this.name));
        const index = this.noteStorage.findIndex((el) => (el.id === id));
        this.noteStorage[index].status = !this.noteStorage[index].status;
        localStorage.setItem(this.name, JSON.stringify(this.noteStorage));
    }

    getReport() {
        this.noteStorage = JSON.parse(localStorage.getItem(this.name));
        const total = this.noteStorage.length;
        const inProgress = this.noteStorage.filter((note) => (note.status === false)).length;
        const report = {'total: ': total, 'completed: ': total - inProgress, 'in progress: ': inProgress};
        return report;
    }
}

const test = new TodoList('my todo list');
test.create('test note');