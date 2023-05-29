// Retrieve notes from local storage or initialize an empty array
const notes = JSON.parse(localStorage.getItem('notes')) || [];

// Display notes on page load
window.addEventListener('load', displayNotes);

// Handle note submission
const noteForm = document.getElementById('noteForm');
noteForm.addEventListener('submit', saveNote);

function saveNote(event) {
  event.preventDefault();

  // Get the note title and content from the form inputs
  const title = document.getElementById('titleInput').value;
  const note = document.getElementById('noteInput').value;

  // Create a new note object
  const newNote = {
    title,
    note
  };

  // Add the new note to the notes array
  notes.push(newNote);

  // Save the updated notes array in local storage
  localStorage.setItem('notes', JSON.stringify(notes));

  // Clear the form inputs
  noteForm.reset();

  // Refresh the displayed notes
  displayNotes();
}

function displayNotes() {
  const noteList = document.getElementById('noteList');
  noteList.innerHTML = '';

  // Iterate over each note and create a note element
  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.note}</p><br>
      <button onclick="editNote(${index})">Edit</button>
      <button onclick="deleteNote(${index})">Delete</button>
    `;
    noteList.appendChild(noteElement);
  });
}

function deleteNote(index) {
  // Remove the note from the notes array
  notes.splice(index, 1);

  // Save the updated notes array in local storage
  localStorage.setItem('notes', JSON.stringify(notes));

  // Refresh the displayed notes
  displayNotes();
}

function editNote(index) {
  // Get the note object to edit
  const noteToEdit = notes[index];

  // Set the note title and content in the form inputs
  document.getElementById('titleInput').value = noteToEdit.title;
  document.getElementById('noteInput').value = noteToEdit.note;

  // Delete the note from the array
  deleteNote(index);
}
