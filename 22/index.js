class List {

    noteStorage = [];

    setName(name) {
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

    update(id, newText, newStatus) {
        this.noteStorage = JSON.parse(localStorage.getItem(this.name));
        const index = this.noteStorage.findIndex((el) => (el.id === id));
        this.noteStorage[index].textNote = newText;
        if (newStatus == "false") {
            this.noteStorage[index].status = false;
        } else if (newStatus == "true") {
            this.noteStorage[index].status = true;
        }
        localStorage.setItem(this.name, JSON.stringify(this.noteStorage));
    }

    getReport() {
        this.noteStorage = JSON.parse(localStorage.getItem(this.name));
        const total = this.noteStorage.length;
        const inProgress = this.noteStorage.filter((note) => (note.status === false)).length;
        alert('Total notes: ' + total + ', in progress: ' + inProgress + ', completed: ' + (total - inProgress));
    }


}


class UIRender {


    constructor(model) {
        this.model = model;
        this.createCategory();
        this.getStatistic();
        this.refreshNotes();
        this.select();
        this.crudSelect();
        this.delete();
        this.update();
        this.newTextNote();
        this.selectExistedNote();
    }


    selectExistedNote() {
        for (let i = 0; i < localStorage.length; i++) {
            $('#selectExistedNote').append(`<option>${localStorage.key(i)}</option>`);
        }
    }

    refreshNotes() {
        document.querySelector('#refreshButton').addEventListener("click", function () {
            let idOfNote = $('body').attr('selectedNote');
            if (localStorage.length !== 0 && idOfNote !== undefined && localStorage.getItem(idOfNote) !== null) {
                $('.crudSelect').empty();
                $('.crudSelect').append('<option>---</option>');
                const receivedData = JSON.parse(localStorage.getItem(idOfNote));
                for (let i = 0; i < receivedData.length; i++) {
                    $('.crudSelect').append(`<option>${receivedData[i].id} | ${receivedData[i].textNote} | ${receivedData[i].status}</option>`);
                }
            }
        });
    }


    newTextNote() {
        let model = this.model;
        document.querySelector('#newTextButton').addEventListener("click", function () {
            newText(model)
        });

        function newText(model) {
            if ($('body').attr('selectedNote') !== undefined) {
                model.setName($('body').attr('selectedNote'));
                model.create($('#newTextNote').val());
                $('.recorded').css('display', 'block');
                $('#newTextNote').val('');
                setTimeout(function () {
                    $('.recorded').css('display', 'none');
                }, 1000);
            }
        }
    }

    delete() {
        let model = this.model;
        document.querySelector('#DeleteButton').addEventListener("click", function () {
            deleteText(model)
        });

        function deleteText(model) {
            model.setName($('body').attr('selectedNote'));
            model.delete(Number($('#crudID').val()));
            $('.deleted').css('display', 'block');
            setTimeout(function () {
                location.reload();
            }, 3000);
        }
    }

    update() {
        let model = this.model;
        document.querySelector('#UpdateButton').addEventListener("click", function () {
            updateText(model)
        });

        function updateText(model) {
            model.setName($('body').attr('selectedNote'));
            model.update(Number($('#crudID').val()),
                $('#crudTextNote').val(),
                $('#crudStatus').val(),
            );

            $('.updated').css('display', 'block');
            setTimeout(function () {
                location.reload();
            }, 3000);
        }
    }

    getStatistic() {
        let model = this.model;
        document.querySelector('#statistic').addEventListener("click", function () {
            statistic(model)
        });

        function statistic(model) {
            let idOfNote = $('body').attr('selectedNote');
            if (localStorage.length !== 0 && $('body').attr('selectedNote') !== undefined && localStorage.getItem(idOfNote) !== null) {
                model.setName($('body').attr('selectedNote'));
                model.getReport();
            }
        }
    }


    crudSelect() {
        document.querySelector('.crudSelect').addEventListener("change", function () {
            let selectedText = $(this).find("option:selected").text().replace(/\s/g, '').split('|');
            $('#crudTextNote').val(selectedText[1]);
            $('#crudID').val(selectedText[0]);
            $('#crudStatus').val(selectedText[2]);
        });
    }

    select() {
        document.querySelector('#selectNote').addEventListener("click", function () {
            $('body').attr('selectedNote', $('select option:selected').html());
            $('.h4NameCategory').text('Create new text note in ' + $('body').attr('selectedNote') + '   category');
            $('.h4CRUD').text('CRUD in ' + $('body').attr('selectedNote') + '   category');
            $('.h4Summary').text('Additional methods in ' + $('body').attr('selectedNote') + '   category');
            $('.main').css('display', 'block');
        });
    }

    createCategory() {
        document.querySelector('#createObject').addEventListener("click", function () {
            $('body').attr('selectedNote', $('#newNoteName').val());
            $('#selectExistedNote').append(new Option($('body').attr('selectedNote')));
            $('.newNoteCategory').css('display', 'block');
            $('body').attr('selectedNote', $('#newNoteName').val());
            $('.h4NameCategory').text('Create new text note in ' + $('body').attr('selectedNote') + '   category');
            $('.h4Summary').text('Additional methods in ' + $('body').attr('selectedNote') + '   category');
            $('.h4CRUD').text('CRUD in ' + $('body').attr('selectedNote') + '   category');
            setTimeout(function () {
                $('#newNoteName').val('');
                $('.newNoteCategory').css('display', 'none');
                $('.main').css('display', 'block');
            }, 1000);
        });
    }
}

new UIRender(new List());