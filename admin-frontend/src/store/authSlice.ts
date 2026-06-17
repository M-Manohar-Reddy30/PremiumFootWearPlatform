import {
createSlice
}
from "@reduxjs/toolkit";

const token =
localStorage.getItem(
"adminToken"
);

const authSlice =
createSlice({

name:"auth",

initialState:{
token,
isAuthenticated:
!!token
},

reducers:{

loginSuccess:
(state,action)=>{

state.token =
action.payload;

state.isAuthenticated =
true;

localStorage.setItem(
"adminToken",
action.payload
);

},

logout:
(state)=>{

state.token = null;

state.isAuthenticated =
false;

localStorage.removeItem(
"adminToken"
);

}

}

});

export const {
loginSuccess,
logout
}
=
authSlice.actions;

export default
authSlice.reducer;