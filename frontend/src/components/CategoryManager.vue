<!-- Bu dosya ne ise yarar?
     Basit kategori ekleme, listeleme ve silme islemlerini yonetir. -->

<script setup>
import { ref } from 'vue';

defineProps({
  categories: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['create-category', 'delete-category']);
const categoryName = ref('');

function submitCategory() {
  if (!categoryName.value.trim()) return;

  emit('create-category', categoryName.value.trim());
  categoryName.value = '';
}
</script>

<template>
  <section class="panel category-panel">
    <h2>Kategoriler</h2>

    <form class="category-form" @submit.prevent="submitCategory">
      <input v-model="categoryName" placeholder="Yeni kategori" />
      <button type="submit">Ekle</button>
    </form>

    <ul>
      <li v-for="category in categories" :key="category.id">
        <span>{{ category.name }}</span>
        <button @click="emit('delete-category', category.id)">Sil</button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.category-panel {
  display: grid;
  gap: 12px;
}

.category-form {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr auto;
}

input {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 9px;
}

ul {
  display: grid;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
