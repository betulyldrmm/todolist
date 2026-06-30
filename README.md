# Staj Hazirlik Gorev Takip Sistemi

Bu proje Vue.js, Node.js, Express.js ve PostgreSQL mantigini ogrenmek icin hazirlanmis basit ama kapsamli bir CRUD uygulamasidir.

## Proje Klasor Yapisi

```text
staj proje/
  backend/
    .env.example
    package.json
    src/
      server.js
      db/
        pool.js
      controllers/
        categoryController.js
        taskController.js
      routes/
        categoryRoutes.js
        taskRoutes.js
  frontend/
    index.html
    package.json
    vite.config.js
    src/
      main.js
      App.vue
      services/
        api.js
      components/
        TaskForm.vue
        TaskList.vue
        TaskDetail.vue
        CategoryManager.vue
  database/
    schema.sql
    seed.sql
```

## Kurulum Komutlari

1. PostgreSQL'de veritabani olustur:

```bash
createdb staj_gorev_takip
```

2. Tablolari olustur:

```bash
psql -d staj_gorev_takip -f database/schema.sql
```

3. Ornek verileri ekle:

```bash
psql -d staj_gorev_takip -f database/seed.sql
```

4. Backend paketlerini kur:

```bash
cd backend
npm install
```

5. Backend ayar dosyasini hazirla:

```bash
copy .env.example .env
```

`.env` icindeki PostgreSQL bilgilerini kendi bilgisayarina gore duzenle.

6. Frontend paketlerini kur:

```bash
cd ../frontend
npm install
```

## Calistirma

1. Backend'i baslat:

```bash
cd backend
npm run dev
```

Backend varsayilan olarak `http://localhost:5000` adresinde calisir.

2. Baska terminalde frontend'i baslat:

```bash
cd frontend
npm run dev
```

Frontend varsayilan olarak `http://localhost:5173` adresinde calisir.

## REST API

```text
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
PATCH  /api/tasks/:id/status
DELETE /api/tasks/:id

GET    /api/categories
POST   /api/categories
DELETE /api/categories/:id
```

## Proje Uzerinden Temel Kavramlar

### Vue'da ref ne ise yarar?

`ref`, tek bir reaktif deger tutar. Deger degistiginde Vue ekrani otomatik gunceller. Bu projede `tasks`, `categories`, `selectedTask` gibi degiskenler `ref` ile tutulur.

### v-model ne ise yarar?

`v-model`, form elemani ile JavaScript degiskenini birbirine baglar. Input'a yazdiginda `form.title` otomatik degisir; `form.title` degisirse input da guncellenir.

### onMounted neden kullanilir?

`onMounted`, component ekrana ilk yerlestiginde calisir. Bu projede gorevleri ve kategorileri sayfa acilir acilmaz backend'den cekmek icin kullanilir.

### Express route nedir?

Route, bir HTTP isteginin hangi fonksiyonla karsilanacagini belirler. Ornek: `GET /api/tasks` istegi `getTasks` controller fonksiyonuna gider.

### req.body nedir?

Frontend POST veya PUT istegiyle JSON veri gonderdiginde Express bu veriyi `req.body` icinde okur. Ornek: yeni gorev basligi `req.body.title` icinden gelir.

### pool.query nedir?

`pool.query`, PostgreSQL'e SQL komutu gonderir. `pg` paketindeki connection pool'u kullanir. Parametreli sorgular SQL injection riskini azaltir.

### GET, POST, PUT, DELETE farki nedir?

`GET` veri okur. `POST` yeni veri ekler. `PUT` mevcut veriyi tamamen/guncel haliyle degistirir. `DELETE` veriyi siler. Bu projede `PATCH` sadece gorev durumunu degistirmek icin kullanildi.

### Frontend backend'e nasil veri gonderir?

Frontend `fetch` ile backend adresine HTTP istegi atar. Yeni gorev eklerken JSON body gonderir:

```js
fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

### Backend PostgreSQL'e nasil veri kaydeder?

Backend controller, `req.body` ile gelen veriyi alir ve `pool.query` ile `INSERT INTO tasks ...` sorgusunu calistirir. PostgreSQL veriyi tabloya kalici olarak kaydeder.

## Sonraki Gelistirme Adimlari

1. Form validasyonlarini guclendir.
2. Gorevlere son teslim tarihi ekle.
3. Kullanici girisi ve JWT authentication ekle.
4. Sayfalama ve siralama ekle.
5. Test yazmaya basla.
