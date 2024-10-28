const notesContainer = document.querySelector('.notes-container');
const createBtn = document.getElementById('create-note-btn');
const addImageBtn = document.getElementById('add-image-btn');
const imageUpload = document.getElementById('image-upload');
let currentNote = null; // Track the current note for image insertion

// Load notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes') || '';
    document.querySelectorAll('.input-box').forEach(addDeleteFunctionality);
}
showNotes();

// Update localStorage with the latest content
function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

// Function to create a new note
createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');

    let deleteIcon = document.createElement('img');
    deleteIcon.src = 'images/delete.png';
    deleteIcon.classList.add('delete-icon');
    inputBox.appendChild(deleteIcon);
    notesContainer.appendChild(inputBox);

    addDeleteFunctionality(inputBox);

    // Set the current note for adding images
    currentNote = inputBox;
    addImageBtn.style.display = 'inline-block';

    updateStorage();
});

// Add delete functionality to each note
function addDeleteFunctionality(note) {
    note.querySelector('.delete-icon').addEventListener('click', (e) => {
        e.target.parentElement.remove();
        updateStorage();
    });
}

// Add image to the selected note
addImageBtn.addEventListener('click', () => {
    if (currentNote) {
        imageUpload.click();
        imageUpload.onchange = () => {
            const file = imageUpload.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    let noteImage = document.createElement('img');
                    noteImage.src = reader.result;
                    noteImage.classList.add('note-image');
                    currentNote.appendChild(noteImage);
                    updateStorage();
                };
                reader.readAsDataURL(file);
            }
        };
    }
});

// Prevent Enter key from creating new lines
document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
});
