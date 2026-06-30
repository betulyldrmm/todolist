// Bu dosya ne ise yarar?
// Backend'e giden fetch isteklerini tek dosyada toplar.

const headers = {
  'Content-Type': 'application/json'
};

async function request(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API istegi basarisiz oldu.');
  }

  return response.json();
}

export function fetchTasks(filters = {}) {
  const params = new URLSearchParams();

  if (filters.search) params.append('search', filters.search);
  if (filters.status) params.append('status', filters.status);
  if (filters.categoryId) params.append('categoryId', filters.categoryId);

  return request(`/api/tasks?${params.toString()}`);
}

export function fetchTaskById(id) {
  return request(`/api/tasks/${id}`);
}

export function createTask(payload) {
  return request('/api/tasks', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
}

export function updateTask(id, payload) {
  return request(`/api/tasks/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload)
  });
}

export function updateTaskStatus(id, status) {
  return request(`/api/tasks/${id}/status`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status })
  });
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, {
    method: 'DELETE'
  });
}

export function fetchCategories() {
  return request('/api/categories');
}

export function createCategory(payload) {
  return request('/api/categories', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });
}

export function deleteCategory(id) {
  return request(`/api/categories/${id}`, {
    method: 'DELETE'
  });
}
