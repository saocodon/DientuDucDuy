<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12">
        <q-input
          v-model="searchQuery"
          placeholder="Tìm kiếm sản phẩm..."
          clearable
        />
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <!-- Sort dropdown column (1/5 width) -->
      <div class="col-12 col-md-2">
        <q-select
          v-model="sortOption"
          :options="sortOptions"
          label="Sắp xếp"
          outlined
          dense
          class="q-mb-md"
        />
      </div>
      
      <!-- Products grid column (4/5 width) -->
      <div class="col-12 col-md-10">
        <div class="row q-col-gutter-md">
          <div
            v-for="p in sortedProducts"
            :key="p.id"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
            :style="{ opacity: p.isMatch ? 1 : 0.3 }"
          >
            <q-card class="q-hoverable">
              <q-img :src="p.imageUrl" :alt="p.name" style="height: 200px" />
              <q-card-section class="q-pa-sm">
                <div class="text-h6" v-html="highlightSearch(p.name)"></div>
                <div class="row justify-between items-end">
                  <div class="text-subtitle2">{{ p.price.toLocaleString() }} đ</div>
                  <div class="text-subtitle2 text-right">Đã bán: {{ p.sold }}</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Product } from '../types';

interface DisplayProduct extends Product {
  isMatch: boolean;
}

const allProducts = ref<Product[]>([]);
const searchQuery = ref('');
const sortOption = ref('default');
const sortOptions = [
  { label: 'Mặc định', value: 'default' },
  { label: 'Giá tăng dần', value: 'price-asc' },
  { label: 'Giá giảm dần', value: 'price-desc' },
  { label: 'Bán chạy nhất', value: 'sold-desc' }
];

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'Products'));
  allProducts.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Product, 'id'>),
    sold: doc.data().sold || 0,
  }));
});

const filteredProducts = computed(() => {
  const query = removeDiacritics(searchQuery.value.toLowerCase().trim());
  
  if (!query) {
    return allProducts.value.map(p => ({ ...p, isMatch: true }));
  }

  const matches: DisplayProduct[] = [];
  const nonMatches: DisplayProduct[] = [];

  allProducts.value.forEach(product => {
    const normalizedProductName = removeDiacritics(product.name.toLowerCase());
    const isMatch = normalizedProductName.includes(query);
    const displayProduct: DisplayProduct = { ...product, isMatch };
    
    if (isMatch) {
      matches.push(displayProduct);
    } else {
      nonMatches.push(displayProduct);
    }
  });

  return [...matches, ...nonMatches];
});

const sortedProducts = computed(() => {
  // Create a new array to avoid mutating the original
  const products = [...filteredProducts.value];
  
  // Apply sorting based on selected option
  switch (sortOption.value) {
    case 'price-asc':
      return products.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return products.sort((a, b) => b.price - a.price);
    case 'sold-desc':
      return products.sort((a, b) => b.sold - a.sold);
    default:
      // For default, show matches first then non-matches
      return products.sort((a, b) => {
        if (a.isMatch && !b.isMatch) return -1;
        if (!a.isMatch && b.isMatch) return 1;
        return 0;
      });
  }
});

function highlightSearch(text: string) {
  const query = searchQuery.value.trim();
  if (!query) return text;
  
  // Normalize both text and query for diacritic-insensitive matching
  const normalizedText = removeDiacritics(text.toLowerCase());
  const normalizedQuery = removeDiacritics(query.toLowerCase());
  
  // Find all matches in normalized text
  const matches: number[] = [];
  let index = normalizedText.indexOf(normalizedQuery);
  
  while (index !== -1) {
    matches.push(index);
    index = normalizedText.indexOf(normalizedQuery, index + 1);
  }
  
  if (matches.length === 0) return text;
  
  // Highlight matched parts in original text
  let result = '';
  let lastIndex = 0;
  
  for (const matchIndex of matches) {
    // Add text before match
    result += text.substring(lastIndex, matchIndex);
    
    // Add highlighted match
    const matchEnd = matchIndex + normalizedQuery.length;
    const originalMatch = text.substring(matchIndex, matchEnd);
    result += `<span class="text-yellow-8 text-weight-bold">${originalMatch}</span>`;
    
    lastIndex = matchEnd;
  }
  
  // Add remaining text
  result += text.substring(lastIndex);
  
  return result;
}

function removeDiacritics(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
</script>

<style>
.text-yellow-8 {
  color: #f2c037;
}
</style>
