<template>
  <modal-factory />
  <router-view />
</template>

<script>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModalFactory from "./components/ModalFactory";
// import services from "./services";
import { setCurrentUser } from "./store/user";

export default {
  components: { ModalFactory },
  setup() {
    const route = useRoute();
    const router = useRouter();

    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem("token");
          if (!token) {
            router.push({ name: "Home" });
            return;
          }

          // const { data } = await services.users.getMe(); // Estpa dando undefined por erro de autorização da API
          const data = { name: "matheus", apiKey: '61795062-a37e-48c7-bdb6-50d030051ccb' };
          setCurrentUser(data);
        }
      }
    );
  },
};
</script>
