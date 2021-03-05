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

}

class TodoList
    extends List {

    getReport() {
        this.noteStorage = JSON.parse(localStorage.getItem(this.name));
        const total = this.noteStorage.length;
        const inProgress = this.noteStorage.filter((note) => (note.status === false)).length;
        alert('Total notes: ' + total + ', in progress: ' + inProgress + ', completed: ' + (total - inProgress));
    }
}


document.querySelector('#statistic').addEventListener("click", function () {
    let idOfNote = $('body').attr('selectedNote');
    if (localStorage.length !== 0 && $('body').attr('selectedNote') !== undefined && localStorage.getItem(idOfNote) !== null) {
        new TodoList($('body').attr('selectedNote')).getReport();
    }
});


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
        $('.main').css('display', 'inline-block');
    }, 1000);
});

document.querySelector('#selectNote').addEventListener("click", function () {
    $('body').attr('selectedNote', $('select option:selected').html());
    $('.h4NameCategory').text('Create new text note in ' + $('body').attr('selectedNote') + '   category');
    $('.h4CRUD').text('CRUD in ' + $('body').attr('selectedNote') + '   category');
    $('.h4Summary').text('Additional methods in ' + $('body').attr('selectedNote') + '   category');
    $('.main').css('display', 'inline-block');


});

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


document.querySelector('#newTextButton').addEventListener("click", function () {
    if ($('body').attr('selectedNote') !== undefined) {
        new TodoList($('body').attr('selectedNote')).create($('#newTextNote').val());
        $('.recorded').css('display', 'block');
        $('#newTextNote').val('');
        setTimeout(function () {
            $('.recorded').css('display', 'none');
        }, 1000);
    }
});

document.querySelector('#UpdateButton').addEventListener("click", function () {
    new TodoList($('body').attr('selectedNote')).update(
        Number($('#crudID').val()),
        $('#crudTextNote').val(),
        $('#crudStatus').val(),
    );

    $('.updated').css('display', 'block');
    setTimeout(function () {
        location.reload();
    }, 3000);
});


document.querySelector('#DeleteButton').addEventListener("click", function () {
    new TodoList($('body').attr('selectedNote')).delete(Number($('#crudID').val()));
    $('.deleted').css('display', 'block');
    setTimeout(function () {
        location.reload();
    }, 3000);
});


document.querySelector('.crudSelect').addEventListener("change", function () {
    let selectedText = $(this).find("option:selected").text().replace(/\s/g, '').split('|');
    $('#crudTextNote').val(selectedText[1]);
    $('#crudID').val(selectedText[0]);
    $('#crudStatus').val(selectedText[2]);

});