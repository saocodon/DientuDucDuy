<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" style="text-decoration: none; color: inherit;">
            Điện tử Đức Duy
          </router-link>
        </q-toolbar-title>
        <q-space />
        <q-btn flat to="/cart">
          <q-icon name="shopping_cart" />
          <q-badge v-if="cartCount > 0" color="red" floating>{{ cartCount }}</q-badge>
        </q-btn>
        <q-btn v-if="!user" flat label="Đăng nhập" to="/login" />
        <q-btn v-else flat :label="user?.email || 'User'" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { useCartStore } from '../stores/cart';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const cartStore = useCartStore();

const { user } = storeToRefs(userStore);
const { count: cartCount } = storeToRefs(cartStore);
</script>

<style>
.q-toolbar__title a {
  text-decoration: none;
  color: inherit;
}
</style>
