<!-- Bu dosya ne ise yarar?
     Gorevleri listeler ve detay, duzenleme, silme, durum degistirme olaylarini ana componente bildirir. -->

<script setup>
defineProps({
  tasks: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-task', 'edit-task', 'delete-task', 'change-status']);
</script>

<template>
  <section class="panel task-list">
    <h2>Gorevler</h2>

    <p v-if="loading" class="muted">Gorevler yukleniyor...</p>
    <p v-else-if="tasks.length === 0" class="muted">Henuz gorev yok.</p>

    <article v-for="task in tasks" :key="task.id" class="task-item">
      <div>
        <h3>{{ task.title }}</h3>
        <p class="muted">{{ task.category_name || 'Kategori yok' }}</p>
      </div>

      <select
        :value="task.status"
        @change="emit('change-status', task, $event.target.value)"
      >
        <option value="todo">todo</option>
        <option value="in_progress">in_progress</option>
        <option value="done">done</option>
      </select>

      <div class="task-actions">
        <button @click="emit('select-task', task)">Detay</button>
        <button @click="emit('edit-task', task)">Duzenle</button>
        <button class="danger" @click="emit('delete-task', task.id)">Sil</button>
      </div>
    </article>
  </section>
</template>

<style scoped>
.task-list {
  display: grid;
  gap: 12px;
}

.task-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 150px auto;
  padding: 12px;
}

h3 {
  margin-bottom: 4px;
}

select {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.danger {
  background: #dc2626;
  color: #ffffff;
}

@media (max-width: 760px) {
  .task-item {
    grid-template-columns: 1fr;
  }
}
</style>
