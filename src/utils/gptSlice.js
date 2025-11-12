import { createSlice } from "@reduxjs/toolkit";


const gptSlice=createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        gptMovies:null,
        moviesResults:[],
        moviesName:[],
    },
    reducers:{
        toggleGptSearchView:(state)=>{
            state.showGptSearch=!state.showGptSearch;
        },
        addGptMoviesResult:(state,action)=>{
            const {moviesName,moviesResults}=action.payload
        
           state.moviesName=moviesName;
           state.moviesResults=moviesResults;
        }
    },
});
export const {toggleGptSearchView,addGptMoviesResult}=gptSlice.actions;
export default gptSlice.reducer;