// Go to CONNECT --> Login --> Registrar --> Course Offered --> Course Section
// Developer Tools (Ctrl+Shift+I) -> Sources -> Left Pane (may be hidden) -> Snippets -> New Snipptes -> Paste code
// Set semester and course code in lines 7 and 8
// paste and overwrite lines 10 with the cell content copied from gsheet
// Ctrl + Enter to run

const semester = 'Fall 2025';
const course_codes = 'CSE460';
// Replace the following line with the cell content copied from Google Sheet
const section_and_faculty = ['01', 'ABCD', '02', 'ABC', '03', 'EFG', '04', 'DPN'];

filter('Academic Session', semester);
await sleep(3000);
filter('Course Code', course_codes);
await sleep(3000);

for(let i=0; i<section_and_faculty.length-1; i+=2) {
    filter('Section', section_and_faculty[i]);
    await sleep(3000);
    enterEdit();
    await sleep(8000);
    add_faculty(section_and_faculty[i+1]);
    await sleep(1000);
    update_info();
    await sleep(3000);
    window.history.back();
    await sleep(4000);
}


async function enterEdit() {
    document.querySelector('.mat-mdc-focus-indicator').click();
    await sleep(1000);
    document.querySelector('button[data-id="edit"]').click();
}


async function filter(field, filterBy) {
    const headers = document.querySelectorAll('.ag-header-cell');
    const header_texts = document.querySelectorAll('.ag-header-cell-text');
    
    for(let i=0; i<headers.length; i++) {
        if(header_texts[i].textContent.includes(field)) {
            headers[i].querySelector('.ag-icon.ag-icon-menu').click();
            await sleep(500);
            let filter_field = document.querySelector('.ag-input-field-input.ag-text-field-input');
            filter_field.value = filterBy;
            filter_field.dispatchEvent(new Event('input', {bubbls: true}));
            await sleep(500);
            document.body.dispatchEvent(new MouseEvent('mousedown', {bubbles: true}));
            break;
        }
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function update_info() {
    button = document.querySelectorAll('button.btn.m-1.btn-primary');
    await sleep(1000);
    button[0].click();
}

async function add_faculty(theory_faculty) {
    existing_faculty = document.querySelector('mat-icon.mat-icon.notranslate.mat-danger');
    if(existing_faculty) {
        existing_faculty.click();
        await sleep(500);
    }
    select(theory_faculty);
    await sleep(500);
    add_faculty_button = document.querySelectorAll('button.btn.btn-primary.default')[0];
    scroll(add_faculty_button);
    await sleep(500);
    add_faculty_button.click();
}

async function select(selection) {
    all_menu = document.querySelectorAll('.mat-mdc-select-value');
    menu = all_menu[4];
    menu.click();
    await sleep(1000);

    options = document.querySelectorAll('mat-option');
    options.forEach(option => {
        if (option.textContent.includes(selection)) {
            option.click();
        }
    });
}
