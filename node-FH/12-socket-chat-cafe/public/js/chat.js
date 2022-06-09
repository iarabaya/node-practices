const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';


let user = null;
let socket = null;

//validate token from localstorage
const validateJWT = async () => {
    const token = localStorage.getItem('token') || '';
    if( token.length <=  10 ){
        window.location = 'index.html';
        throw new Error("There's no token in the server");
    }

    const res = await fetch(url , {
        headers: { 'x-token': token }
    }) 

    const { user: authUser, token: tokenDB } = await res.json();
    localStorage.setItem('token', tokenDB);
    user = authUser;
    document.title = user.name;

    await connectSocket();
}

const connectSocket = async() => {
    const socket = io({ 'extraHeaders': {
        'x-token': localStorage.getItem('token')
    } });
}

const main = async() => {

    //Validate JWT
    await validateJWT();
}

main();
// const socket = io();

