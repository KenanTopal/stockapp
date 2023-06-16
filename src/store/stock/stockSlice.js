import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firms:[], 
    categories: [], 
    brands: [], 
    products: [], 
    sales:[], 
    stockData: [], 
    totalProfit: {}
}


const stockSlice = createSlice({
    name:'stock', 
    initialState: initialState, 
    reducers:{
        getFirms(state, action){
            state.firms = action.payload
        }, 
        getBrands(state, action){
            state.brands = action.payload
        }, 
        getProducts(state, action){
            state.products = action.payload
        }, 
        getCategories(state, action){
            state.categories = action.payload
        }, 
        getSales(state, action){
            state.sales = action.payload;
        },
        
        getTransactions(state, action){
            const {sales, purchases} = action.payload;
            state.sales = sales;
            state.stockData = [...sales, ...purchases]
            const saleCount = sales.map(sale => Number.parseFloat(sale.price_total))
            const purachaseCount = purchases.map(item=> Number.parseFloat(item.price_total))
            const profitSale = saleCount.reduce((a,b)=> a+b, 0);
            const profitPurchase = purachaseCount.reduce((a,b)=> a+b, 0)
            const profitTotal = profitSale- profitPurchase
            state.totalProfit= {profitPurchase, profitSale, profitTotal}
        }, 

    }
})


const stockReducer = stockSlice.reducer; 
const stockActions = stockSlice.actions;
export {stockActions, stockReducer}