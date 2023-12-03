let todoListData = [];

function renderTodoList() {
  const todoListContainer = document.getElementById("todoList");
  todoListContainer.innerHTML = "";

  todoListData.forEach((todo, index) => {
    const row = `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${todo.task}</td>
        <td>${todo.priority}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="openUpdateModal(${index})">Update</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTodo(${index})">Delete</button>
        </td>
      </tr>
    `;
    todoListContainer.innerHTML += row;
  });
}

function openAddModal() {
  const addTodoModal = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add ToDo</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="addTodoForm">
            <div class="mb-3">
              <label for="task" class="form-label">Task</label>
              <input type="text" class="form-control" id="task" required>
              <div class="invalid-feedback">Please enter a valid Task name.</div>
            </div>
            <div class="mb-3">
              <label for="priority" class="form-label">Priority</label>
              <select class="form-select" id="priority" required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary" onclick="addTodo()">Add</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  `;
  document.getElementById("addTodoModal").innerHTML = addTodoModal;
  const modal = new bootstrap.Modal(document.getElementById("addTodoModal"));
  modal.show();
  document.getElementById("addTodoForm").addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
    modal.hide();
  });
  document.getElementById("addTodoForm").querySelector('[data-bs-dismiss="modal"]').addEventListener("click", function () {
    modal.hide();
  });
}

function addTodo() {
  const task = document.getElementById("task").value;
  const priority = document.getElementById("priority").value;
  if (!task || !priority) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Task and priority are required!',
    });
    return;
  } else {
    var isSuccess = true;

    if (isSuccess) {
      toastr.warning('Task added successfully!', 'Success');
      closeModal();
    } else {
      toastr.error('An error occurred while adding the task.', 'Error');
    }
  }
  const newTodo = { task, priority };
  todoListData.push(newTodo);

  renderTodoList();
}


function closeModal() {
  var addModal = document.getElementById("addTodoModal");
  var updateModal = document.getElementById("updateTodoModal");
  if (addModal) {
    addModal.style.display = "none";
  }
  if (updateModal) {
    updateModal.style.display = "none";
  }
  var backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.parentNode.removeChild(backdrop);
  }
  document.body.classList.remove('modal-open');
}


function openUpdateModal(index) {
  const todoToUpdate = todoListData[index];
  const updateTodoModal = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update ToDo</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="updateTodoForm">
            <div class="mb-3">
              <label for="updateTask" class="form-label">Task</label>
              <input type="text" class="form-control" id="updateTask" value="${todoToUpdate.task}" required>
              <div class="invalid-feedback">Please enter a valid Task name.</div>
            </div>
            <div class="mb-3">
              <label for="updatePriority" class="form-label">Priority</label>
              <select class="form-select" id="updatePriority" required>
                <option value="Low" ${todoToUpdate.priority === 'Low' ? 'selected' : ''}>Low</option>
                <option value="Medium" ${todoToUpdate.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="High" ${todoToUpdate.priority === 'High' ? 'selected' : ''}>High</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary" onclick="updateTodo(${index})">Update</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  `;
  document.getElementById("updateTodoModal").innerHTML = updateTodoModal;
  const modal = new bootstrap.Modal(document.getElementById("updateTodoModal"));
  modal.show();
  document.getElementById("updateTodoForm").addEventListener("submit", function (event) {
    event.preventDefault();
    updateTodo(index);
    modal.hide();
  });
  document.getElementById("updateTodoForm").querySelector('[data-bs-dismiss="modal"]').addEventListener("click", function () {
    modal.hide();
  });
}

function updateTodo(index) {
  const updatedTask = document.getElementById("updateTask").value;
  const updatedPriority = document.getElementById("updatePriority").value;
  if (!updatedTask || !updatedPriority) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Task are required!',
    });
    return;
  } else {
    var isSuccess = true;

    if (isSuccess) {
      toastr.warning('Task updated successfully!', 'Success');
      closeModal();
    } else {
      toastr.error('An error occurred while updating the task.', 'Error');
    }
  }
  todoListData[index].task = updatedTask;
  todoListData[index].priority = updatedPriority;

  renderTodoList();
}

function deleteTodo(index) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      todoListData.splice(index, 1);
      renderTodoList();
      Swal.fire(
        'Deleted!',
        'Your ToDo has been deleted.',
        'success'
      );
    }
  });
}

document.getElementById("addTodoBtn").addEventListener("click", openAddModal);
renderTodoList();
