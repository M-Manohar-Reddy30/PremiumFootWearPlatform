import { useState }
from "react";

import api
from "../api/axios";

import {
useDispatch
}
from "react-redux";

import {
loginSuccess
}
from "../store/authSlice";

export default function LoginPage(){

const dispatch =
useDispatch();

const [email,setEmail]
=
useState("");

const [password,
setPassword]
=
useState("");

const handleLogin =
async()=>{

try{

const res =
await api.post(
"/admin/auth/login",
{
email,
password
}
);

dispatch(
loginSuccess(
res.data.token
)
);

window.location.href =
"/dashboard";

}
catch{

alert(
"Invalid credentials"
);
}

};

return(

<div className="min-h-screen flex items-center justify-center">

<div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

<h1 className="text-2xl font-bold mb-6">

Admin Login

</h1>

<input
className="border w-full p-3 mb-4"
placeholder="Email"
value={email}
onChange={(e)=>
setEmail(
e.target.value
)}
/>

<input
type="password"
className="border w-full p-3 mb-4"
placeholder="Password"
value={password}
onChange={(e)=>
setPassword(
e.target.value
)}
/>

<button
onClick={handleLogin}
className="
w-full
bg-black
text-white
p-3
rounded
"
>

Login

</button>

</div>

</div>

);

}