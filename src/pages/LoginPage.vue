<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md q-gutter-md" style="width: 300px">
      <h5 class="text-center">Đăng nhập</h5>
      <q-input v-model="email" label="Email" filled />
      <q-input v-model="password" label="Password" type="password" filled />

      <q-btn :label="loginLabel" color="primary" @click="handleLogin" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useQuasar } from 'quasar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const router = useRouter();
const $q = useQuasar();
const userStore = useUserStore();

const email = ref('');
const password = ref('');

const loginLabel = ref('Login');

async function handleLogin() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);

    const user = userCredential.user;
    userStore.setUser(user);
    $q.notify({ type: 'positive', message: `Chào mừng ${user.email}` });
    await nextTick();
    await router.push('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    $q.notify({ type: 'negative', message: error.message });
  }
}
</script>
