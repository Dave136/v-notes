import { getCurrentInstance, onMounted, Ref, ref } from 'vue';
import type { ToastPluginApi } from 'vue-toast-notification';

export default function useToast() {
  const toast = ref() as Ref<ToastPluginApi>;

  onMounted(() => {
    const app = getCurrentInstance();
    const global = app?.appContext.config.globalProperties;
    toast.value = global?.$toast;
  });

  return { toast };
}
