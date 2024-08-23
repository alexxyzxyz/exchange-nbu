<script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
	import NoItems from '@/components/NoItems.vue'
  import { EDIT } from '@/utils/routes'

	const props = defineProps({
		currencies: {
			type: Array,
			default: () => [],
		},
    itemPerPage: {
			type: Number,
			default: 10,
		},
    date: {
      type: String,
    }
	})

  const router = useRouter()

  const currentPage = ref(1)
  const searchString = ref('')

	const columns = props.currencies.length ? Object.keys(props.currencies[0]) : null

  const filteredCurrencies = computed(() => {
    if (searchString.value.trim().length >= 1) {
      
      return props.currencies.filter(i => i.txt.toLowerCase().includes(searchString.value.trim()))
    }

    return props.currencies
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredCurrencies.value.length / props.itemPerPage)
  })

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * props.itemPerPage
    const end = start + props.itemPerPage

    return filteredCurrencies.value.slice(start, end)
  })

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value ++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value --
    }
  }

</script>

<template>
  <div class="currensies-list-container">
    <input
        class="search-input"
        v-model="searchString"
        type="text"
        placeholder="Пошук по назві"
      >
      <template v-if="filteredCurrencies.length">
        <table class="currencies-table">
          <thead class="currencies-table__header">
            <td v-for="column in columns" :key="column">{{ column }}</td>
          </thead>
          <tbody class="currencies-table__body">
            <tr
              v-for="(row, i) in paginatedData"
              :key="i"
              @click="router.push({ name: EDIT, params: { id: row.cc, date: date ? date : row.exchangedate } })"
            >
              <td v-for="column in columns" :key="column">
                {{ row[column] }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">◀︎</button>
          <span>Сторінка {{ currentPage }} з {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">▶</button>
        </div>
      </template>
      <NoItems v-else />
  </div>
</template>

<style lang="scss" scoped>
  .currensies-list-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;

    .search-input {
      margin: 20px 10px 20px 20px;
      width: 200px;
    }
    .currencies-table {
      border-spacing: 0;
      width: calc(100% - 20px);
      margin: 0 10px;

      &__header {
        font-weight: bold;
        background-color: $darkgray;
        td {
          padding: 0 10px;
          text-align: start;
        }
      }

      &__body {
        tr {
          &:hover {
            background-color: $lightgray;
            cursor: pointer;
          }

          td {
            border-bottom: 1px solid $darkgray;
            padding: 0 10px;
            text-align: start;
          }
        }
      }
    }

    .pagination {
      margin: 20px auto;

      span {
        margin: 0 20px;
      }
    }
  }
  
</style>
