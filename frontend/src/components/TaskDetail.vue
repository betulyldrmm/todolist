<!-- Bu dosya ne ise yarar?
     Secilen gorevin detaylarini gosterir. -->

<script setup>
defineProps({
  task: {
    type: Object,
    default: null
  }
});
</script>

<template>
  <aside class="panel detail-panel">
    <h2>Gorev Detayi</h2>

    <div v-if="task">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description || 'Aciklama eklenmemis.' }}</p>

      <dl>
        <dt>Durum</dt>
        <dd>{{ task.status }}</dd>

        <dt>Kategori</dt>
        <dd>{{ task.category_name || 'Kategori yok' }}</dd>

        <dt>Olusturulma</dt>
        <dd>{{ new Date(task.created_at).toLocaleString('tr-TR') }}</dd>

        <dt>Guncellenme</dt>
        <dd>{{ new Date(task.updated_at).toLocaleString('tr-TR') }}</dd>
      </dl>
    </div>

    <p v-else class="muted">Detay gormek icin bir gorev sec.</p>
  </aside>
</template>

<style scoped>
.detail-panel {
  min-height: 240px;
}

dl {
  display: grid;
  gap: 8px;
}

dt {
  color: #6b7280;
  font-size: 13px;
}

dd {
  margin: 0 0 8px;
}
</style>
