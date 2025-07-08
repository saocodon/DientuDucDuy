<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>My Shop</q-toolbar-title>
        <q-space />
        <q-btn flat label="Trang chủ" to="/" />
        <q-btn flat label="Giỏ hàng" to="/cart" />
        <q-btn flat label="Đăng nhập" to="/login" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
