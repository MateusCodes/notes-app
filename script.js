const addBtn = document.getElementById('add');

const fetchLocalStorageNotes = JSON.parse(localStorage.getItem('notes'));

if (fetchLocalStorageNotes) {
  fetchLocalStorageNotes.forEach(note => handleNewNote(note));
}

addBtn.addEventListener('click', () => handleNewNote());

function handleNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
  <div class="tools">
      <button class="edit"><i class="ph-notepad-bold"></i></button>
      <button class="delete"><i class="ph-trash-bold"></i></button>
  </div>
  <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
  `;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text;
  main.innerHTML = marked.parse(text);

  deleteBtn.addEventListener('click', () => {
    note.remove();

    updateLS();
  });

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', e => {
    const { value } = e.target;

    main.innerHTML = marked.parse(value);

    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea');

  const savedNotes = [];

  notesText.forEach(note => savedNotes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(savedNotes));
}
