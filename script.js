let editActive = false;

function handleSubmit() {
  addTask();
}

function addTask() {
  let taskName = document.getElementById('taskName').value;
  const ul = document.querySelector('.taskList');
  if (!validateTask(taskName, ul)) {
    return;
  }
  const li = document.createElement('li');
  const text = document.createElement('span');
  text.innerText = taskName;
  const editBtn = document.createElement('button');
  editBtn.innerText = '✏️';
  editBtn.addEventListener('click', () => {
    editTask(li);
  });
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = '❌';
  deleteBtn.addEventListener('click', () => {
    deleteTask(deleteBtn);
  });
  li.append(text, editBtn, deleteBtn);
  ul.appendChild(li);
  // clear input field after adding task
  document.getElementById('taskName').value = '';
}

function deleteTask(deleteBtn) {
  // delete parent element of a child
  deleteBtn.parentElement.remove();
}

function editTask(li) {
  if (editActive) {
    const value = li.firstChild.value;
    const span = document.createElement('span');
    span.innerText = value;
    li.replaceChild(span, li.firstChild);
    // set the tick back for the second child of li here
    editActive = !editActive;
    return;
  }
  let elements = li.childNodes;
  for (let i = 0; i < elements.length; i++) {
    if (i === 0) {
      const oldTask = li.firstChild.innerText;
      const editBox = document.createElement('input');
      editBox.defaultValue = oldTask;
      li.replaceChild(editBox, li.firstChild);
    }
    if (i == 1) {
      elements[i].innerText = '✔️';
      editActive = true;
    }
  }
}

function validateTask(taskName, ul) {
  if (taskName === '' || taskName.length > 1000) {
    return false;
  }
  if (ul.childNodes.length > 0) {
    for (child of ul.childNodes) {
      if (taskName === child.firstChild.innerText) {
        return false;
      }
    }
  }
  return true;
}
