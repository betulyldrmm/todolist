// Bu dosya ne ise yarar?
// Vite'in Vue eklentisini kullanmasini ve API isteklerini backend'e yonlendirmesini saglar.

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Frontend /api/tasks dediginde istek http://localhost:5000/api/tasks adresine gider.
      '/api': 'http://localhost:5000'
    }
  }
});
