<template>
  <div class="min-h-screen bg-base-200 max-h-screen overflow-auto" id="halamanBeranda">
    <!-- Content -->
    <section class="p-4 pb-[13rem]">
      <!-- Banner -->
      <div class="card bg-base-100 card-compact shadow">
        <Suspense>
          <carouselComponent></carouselComponent>
          <template #fallback>
            <carouselSkeleton></carouselSkeleton>
          </template>
        </Suspense>
      </div>

      <!-- search  -->
      <div class="py-2">
        <div class="form-control">
          <div class="input-group w-full">
            <input type="text" placeholder="Search…" class="input input-bordered w-full" />
            <button class="btn btn-square btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- postingan -->
      <div class="card card-compact bg-base-100 shadow">
        <div class="card-body">
          <div class="card-title">
            <span class="bg-primary w-4 h-4 rounded"></span> Laporan
            Terbaru
          </div>
          <div class="opacity-50 -mt-2 mb-2">
            Pelindo Teluk Bayur Hotline
          </div>
          <!-- item post  -->
          <Suspense>
            <ambilPostingan></ambilPostingan>
            <template #fallback>
                <cardSkeleton></cardSkeleton>
            </template>
          </Suspense>
        </div>
      </div>

    </section>
</div>
</template>
<script lang="ts" setup>
import ambilPostingan from './postingan/ambilPostingan.vue';
import carouselComponent from '../../component/carousel/carouselComponent.vue';
import carouselSkeleton from '../../component/carousel/carouselSkeleton.vue';
import cardSkeleton from '../../component/card/cardSkeleton.vue';
</script>
