<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12">
        <q-input v-model="search" placeholder="Search products..." />
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div v-for="p in products" :key="p.id" class="col-xs-12 col-sm-6 col-md-2 col-lg-3">
        <q-card class="q-hoverable">
          <q-img :src="p.imageUrl" :alt="p.name" style="height: 200px" />
          <q-card-section>
            <div class="text-h6">{{ p.name }}</div>
            <div class="text-subtitle2">{{ p.price.toLocaleString() }} đ</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const products = ref<Product[]>([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'Products'));
  products.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, 'id'>),
  }));
});

const search = ref('');
</script>
