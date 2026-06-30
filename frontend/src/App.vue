<!-- Bu dosya ne ise yarar?
     Uygulamanin ana componentidir; state'i tutar ve child componentleri yonetir. -->

<script setup>
import { onMounted, reactive, ref } from 'vue';
import CategoryManager from './components/CategoryManager.vue';
import TaskDetail from './components/TaskDetail.vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import {
  createCategory,
  createTask,
  deleteCategory,
  deleteTask,
  fetchCategories,
  fetchTaskById,
  fetchTasks,
  updateTask,
  updateTaskStatus
} from './services/api';

const tasks = ref([]);
const categories = ref([]);
const selectedTask = ref(null);
const editingTask = ref(null);
const loading = ref(false);
const errorMessage = ref('');

const filters = reactive({
  search: '',
  status: '',
  categoryId: ''
});

async function loadTasks() {
  try {
    loading.value = true;
    errorMessage.value = '';
    tasks.value = await fetchTasks(filters);
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}

async function loadCategories() {
  categories.value = await fetchCategories();
}

async function handleSaveTask(formData) {
  if (editingTask.value) {
    await updateTask(editingTask.value.id, formData);
    editingTask.value = null;
  } else {
    await createTask(formData);
  }

  await loadTasks();
}

async function handleSelectTask(task) {
  // Liste kisa veri gosterebilir; detay icin backend'den tek kaydi tekrar cekiyoruz.
  selectedTask.value = await fetchTaskById(task.id);
}

async function handleDeleteTask(id) {
  await deleteTask(id);
  selectedTask.value = null;
  editingTask.value = null;
  await loadTasks();
}

async function handleStatusChange(task, status) {
  await updateTaskStatus(task.id, status);
  await loadTasks();

  if (selectedTask.value?.id === task.id) {
    selectedTask.value = await fetchTaskById(task.id);
  }
}

async function handleCreateCategory(name) {
  await createCategory({ name });
  await loadCategories();
}

async function handleDeleteCategory(id) {
  await deleteCategory(id);
  await loadCategories();
  await loadTasks();
}

function startEdit(task) {
  editingTask.value = { ...task };
}

function cancelEdit() {
  editingTask.value = null;
}

// Component ilk kez ekrana geldiginde baslangic verilerini cekiyoruz.
onMounted(async () => {
  await loadCategories();
  await loadTasks();
});
</script>

<template>
  <main class="app-shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Vue + Express + PostgreSQL</p>
        <h1>Staj Hazirlik Gorev Takip Sistemi</h1>
      </div>
    </header>

    <section class="filters">
      <input
        v-model="filters.search"
        type="search"
        placeholder="Baslik veya aciklama ara"
        @input="loadTasks"
      />

      <select v-model="filters.status" @change="loadTasks">
        <option value="">Tum durumlar</option>
        <option value="todo">todo</option>
        <option value="in_progress">in_progress</option>
        <option value="done">done</option>
      </select>

      <select v-model="filters.categoryId" @change="loadTasks">
        <option value="">Tum kategoriler</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </section>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <section class="layout">
      <aside class="side-panel">
        <CategoryManager
          :categories="categories"
          @create-category="handleCreateCategory"
          @delete-category="handleDeleteCategory"
        />

        <TaskForm
          :categories="categories"
          :editing-task="editingTask"
          @save-task="handleSaveTask"
          @cancel-edit="cancelEdit"
        />
      </aside>

      <TaskList
        :tasks="tasks"
        :loading="loading"
        @select-task="handleSelectTask"
        @edit-task="startEdit"
        @delete-task="handleDeleteTask"
        @change-status="handleStatusChange"
      />

      <TaskDetail :task="selectedTask" />
    </section>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: #1f2937;
  background: #f3f4f6;
  font-family: Arial, Helvetica, sans-serif;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  padding: 9px 12px;
}

.app-shell {
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px;
}

.topbar {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.eyebrow {
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

.filters {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 180px 220px;
  margin-bottom: 16px;
}

.filters input,
.filters select,
.form-control,
textarea {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px;
  width: 100%;
}

.layout {
  align-items: start;
  display: grid;
  gap: 16px;
  grid-template-columns: 300px 1fr 320px;
}

.panel {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
}

.side-panel {
  display: grid;
  gap: 16px;
}

.error {
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #991b1b;
  padding: 10px;
}

.muted {
  color: #6b7280;
}

@media (max-width: 980px) {
  .layout,
  .filters {
    grid-template-columns: 1fr;
  }
}
</style>
