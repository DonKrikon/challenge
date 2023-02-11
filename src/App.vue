<template>
  <div class="menu mx-0">
    <!--Formulario para Crear Tarea-->
    <section class="create__task">
      <h4>Crear Tarea</h4>
      <form @submit.prevent="createTask" class="create_form">
        <div class="mb-3">
          <label class="label_create">Titulo*</label>
          <input type="text" class="form-control" v-model="title" required>
        </div>

        <div class="mb-3">
          <label class="label_create">Estado*</label>
          <select v-model="status" class="form-control" required>
            <option value="0">No completada</option>
            <option value="1">Completada</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="label_create">Fecha</label>
          <input type="date" v-model="date" class="form-control">
        </div>
        <div class="mb-3">
          <label class="label_create">Comentarios</label>
          <textarea v-model="comments" class="form-control textarea_create"></textarea>
        </div>
        <div class="mb-3">
          <label class="label_create">Descripcion</label>
          <input type="text" v-model="description" class="form-control">
        </div>
        <div class="mb-3">
          <label class="label_create">Etiquetas</label>
          <input type="text" v-model="tags" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>
      </form>
    </section>
    <!--Tabla de Visualizacion-->
    <main class="main mt-2">
      <h4>Tareas</h4>
      <table class="table mt-4">
        <thead>
          <tr class="table-dark">
            <th scope="col">Titulo</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks">
            <td class="fw-bold">{{ task.title }}</td>
            <td v-if="task.is_completed">Completado</td>
            <td v-else>No Completado</td>
            <td>{{ task.due_date }}</td>
            <td class="options">
              <i title="Ver" class="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#taskModal"
                @click="getOneTask(task.id)"></i>
              <i title="Editar" class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#updateModal"
                @click="updateData(task.id)"></i>
              <i title="Eliminar" class="fa-solid fa-trash" data-bs-toggle="modal"
                :data-bs-target="`#deleteModal${task.id}`"></i>
            </td>

            <!--Modal para Eliminar-->
            <div class="modal fade" :id="`deleteModal${task.id}`" tabindex="-1" aria-labelledby="deleteModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteModalLabel">Eliminar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    ¿Estas seguro de eliminar la tarea {{ task.title }}?
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                      @click="deleteTask(task.id)">Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          </tr>
        </tbody>
      </table>
    </main>
  </div>

  <!--Modal de Tarea-->
  <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="taskModalLabel">Tarea</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="oneTask = ''"></button>
        </div>
        <div class="modal-body" v-for="item in oneTask">
          <h4>Titulo: {{ item.title }}</h4>
          <h6 v-if="item.is_completed">Estado: Completada</h6>
          <h6 v-else>Estado: No Completada</h6>
          <p v-if="item.due_date">Fecha: {{ item.due_date }}</p>
          <p v-if="item.comments">Comentarios: {{ item.comments }}</p>
          <p v-if="item.description">Descripcion: {{ item.description }}</p>
          <p v-if="item.tags">Etiquetas: {{ item.tags }}</p>
        </div>
      </div>
    </div>
  </div>

  <!--Modal para Editar-->
  <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen-sm-down">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="updateModalLabel">Actualizar</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
            @click="clearUpdate()"></button>
        </div>
        <div class="modal-body">
          <form class="create_form">
            <div class="mb-3">
              <label class="label_create">Titulo*</label>
              <input type="text" class="form-control" v-model="updateTitle" required>
            </div>
            <div class="mb-3">
              <label class="label_create">Estado*</label>
              <select v-model="updateStatus" class="form-control" required>
                <option value="0">No completada</option>
                <option value="1">Completada</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="label_create">Fecha</label>
              <input type="date" v-model="updateDate" class="form-control">
            </div>
            <div class="mb-3">
              <label class="label_create">Comentarios</label>
              <textarea v-model="updateComments" class="form-control textarea_create"></textarea>
            </div>
            <div class="mb-3">
              <label class="label_create">Descripcion</label>
              <input type="text" v-model="updateDescription" class="form-control">
            </div>
            <div class="mb-3">
              <label class="label_create">Etiquetas</label>
              <input type="text" v-model="updateTags" class="form-control">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                @click="clearUpdate()">Cancelar</button>
              <button type="button" class="btn btn-warning" data-bs-dismiss="modal"
                @click="updateTask(taskId)">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>
  

<script>

export default {
  name: 'App',
  mounted() {
    this.getTasks()
  },
  data() {
    return {
      tasks: '',
      oneTask: '',
      message: '',

      title: '',
      status: null,
      date: null,
      comments: '',
      description: '',
      tags: '',

      updateTitle: '',
      updateStatus: null,
      updateDate: null,
      updateComments: '',
      updateDescription: '',
      updateTags: '',
      taskId: ''
    }
  },
  methods: {
    //Limpiar Formulario de Creacion
    clearData() {
      this.title = ''
      this.status = null
      this.date = null
      this.comments = ''
      this.description = ''
      this.tags = ''
    },
    //Limpiar Formulario de Actualizacion
    clearUpdate() {
      this.updateTitle = ''
      this.updateStatus = null
      this.updateDate = null
      this.updateComments = ''
      this.updateDescription = ''
      this.updateTags = ''
      this.taskId = ''
    },
    //Obtener Datos de una Tarea para Actualizar
    updateData(task_id) {
      this.axios.get(`/${task_id}`)
        .then(response => {
          let data = response.data['0']
          this.updateTitle = data.title
          this.updateStatus = data.is_completed
          this.updateDate = data.due_date
          this.updateComments = data.comments
          this.updateDescription = data.description
          this.updateTags = data.tags
          this.taskId = data.id
        })
    },
    //Obtener datos de una Tarea
    async getOneTask(task_id) {
      await this.axios.get(`/${task_id}`)
        .then(response => {
          this.oneTask = response.data
        })
    },
    //Crear una tarea
    createTask() {
      var payload = {
        token: '',
        title: this.title,
        is_completed: this.status,
        due_date: this.date,
        comments: this.comments,
        description: this.description,
        tags: this.tags
      }
      this.axios.post('', payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
          this.getTasks()
          this.clearData()

          console.log(response.data.detail)
        }
        )
    },
    //Actualizar una Tarea
    updateTask(task_id) {

      var payload = {
        title: this.updateTitle,
        is_completed: this.updateStatus,
        due_date: this.updateDate,
        comments: this.updateComments,
        description: this.updateDescription,
        tags: this.updateTags
      }
      this.axios.put(`/${task_id}`, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
          this.clearUpdate()
          this.getTasks()
        }
        )
    },
    //Eliminar una Tarea
    deleteTask(task_id) {
      this.axios.delete(`/${task_id}`)
        .then(response => {
          this.getTasks()
          this.message = 'Tarea Eliminada con Exito'
        }
        )
    },
    //Obtener todas las tareas
    async getTasks() {
      await this.axios.get()
        .then(response => {
          this.tasks = response.data
        })
    }
  }
}
</script>

