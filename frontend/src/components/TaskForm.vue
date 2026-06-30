<!-- Bu dosya ne ise yarar?
     Yeni gorev ekleme ve mevcut gorevi guncelleme formunu yonetir. -->

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  editingTask: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['save-task', 'cancel-edit']);

const form = reactive({
  title: '',
  description: '',
  status: 'todo',
  category_id: ''
});

function resetForm() {
  form.title = '';
  form.description = '';
  form.status = 'todo';
  form.category_id = '';
}

watch(
  () => props.editingTask,
  (task) => {
    if (!task) {
      resetForm();
      return;
    }

    form.title = task.title;
    form.description = task.description || '';
    form.status = task.status;
    form.category_id = task.category_id || '';
  },
  { immediate: true }
);

function submitForm() {
  emit('save-task', {
    title: form.title,
    description: form.description,
    status: form.status,
    category_id: form.category_id || null
  });

  resetForm();
}
</script>

<template>
  <form class="panel task-form" @submit.prevent="submitForm">
    <h2>{{ editingTask ? 'Gorevi Guncelle' : 'Yeni Gorev' }}</h2>

    <label>
      Baslik
      <input v-model="form.title" class="form-control" required />
    </label>

    <label>
      Aciklama
      <textarea v-model="form.description" rows="4"></textarea>
    </label>

    <label>
      Durum
      <select v-model="form.status" class="form-control">
        <option value="todo">todo</option>
        <option value="in_progress">in_progress</option>
        <option value="done">done</option>
      </select>
    </label>

    <label>
      Kategori
      <select v-model="form.category_id" class="form-control">
        <option value="">Kategori yok</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </label>

    <div class="form-actions">
      <button class="primary" type="submit">
        {{ editingTask ? 'Kaydet' : 'Ekle' }}
      </button>
      <button v-if="editingTask" type="button" @click="emit('cancel-edit')">
        Vazgec
      </button>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  display: grid;
  gap: 12px;
}

label {
  color: #374151;
  display: grid;
  font-size: 14px;
  gap: 6px;
}

.form-actions {
  display: flex;
  gap: 8px;
}

.primary {
  background: #2563eb;
  color: #ffffff;
}
</style>
