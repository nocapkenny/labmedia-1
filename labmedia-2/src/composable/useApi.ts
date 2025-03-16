import { ref, computed } from "vue";
import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

// Базовый URL API
const BASE_URL = "https://jsonplaceholder.typicode.com";

interface ApiRequestOptions extends AxiosRequestConfig {}

export function useApi<T>(endpoint: string, options: ApiRequestOptions = {}) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(false);
  const isSuccess = computed(() => !isLoading.value && error.value === null && data.value !== null);

  async function fetchData(customOptions: ApiRequestOptions = {}) {
    isLoading.value = true;
    error.value = null;

    try {
      const finalOptions: ApiRequestOptions = { ...options, ...customOptions };

      const response: AxiosResponse<T> = await axios({
        url: `${BASE_URL}${endpoint}`, 
        method: finalOptions.method || "GET",
        headers: { "Content-Type": "application/json", ...finalOptions.headers },
        params: finalOptions.params,
        data: finalOptions.data,
        timeout: 5000,
      });

      data.value = response.data;
    } catch (err) {
      error.value = axios.isAxiosError(err) ? err.message : "Неизвестная ошибка";
    } finally {
      isLoading.value = false;
    }
  }

  return {
    data,
    error,
    isLoading,
    isSuccess,
    fetchData,
  };
}
