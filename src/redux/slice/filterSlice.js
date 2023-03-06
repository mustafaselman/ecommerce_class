//// tüm filtreleme ve sıralama işlemlerinin yürütüldüğü redux: arama filtresi, kategori filtresi, marka filtresi, fiyat filtresi
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredProducts: []
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state,action) {
      console.log(action.payload)
  },
  }
});

export const {FILTER_BY_SEARCH} = filterSlice.actions

export const selectFilteredProducts = (state) => (state.filter.filteredProducts)

export default filterSlice.reducer