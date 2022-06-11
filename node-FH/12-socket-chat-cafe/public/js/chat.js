const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';


let user = null;
let socket = null;

//HTML references
const txtUid     = document.querySelector('#txtUid')
const txtMessage = document.querySelector('#txtMessage')
const ulUsers    = document.querySelector('#ulUsers')
const ulMessages = document.querySelector('#ulMessages')
const btnLogout  = document.querySelector('#btnLogout')

//validate token from localstorage
const validateJWT = async () => {
    const token = localStorage.getItem('token') || '';
    if( token.length <=  10 ){
        window.location = 'index.html';
        throw new Error("There's no token in the server");
    }

    //authenticate and renovate token
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
    socket = io({ 'extraHeaders': {
        'x-token': localStorage.getItem('token')
    } });

    socket.on('connect', () => {
        console.log('Sockets online')
    })

    socket.on('disconnect', () => {
        console.log('Socket offline')
    })

    socket.on('active-users', renderUsers)
    
    socket.on('receive-message', renderMessages)

    socket.on('private-message', (payload) => {
        console.log('privado: ', payload)
    })
}

const renderUsers = ( users = []) => {
    let usersHtml = '';
    users.forEach( user => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${user.name}</h5>
                    <span class="fs-6 text-muted">${user.uid}</span>
                </p>
            </li>
        `
    })

    ulUsers.innerHTML = usersHtml;
}
const renderMessages = ( messages = []) => {
    let messagesHtml = '';
    messages.forEach( ({name, message}) => {
        messagesHtml += `
            <li>
                <p>
                    <span class="text-primary">${name}</span>
                    <span class="fs-6 text-muted">${message}</span>
                </p>
            </li>
        `
    })

    ulMessages.innerHTML = messagesHtml;
}

txtMessage.addEventListener('keyup', ({keyCode}) => {

    const uid = txtUid.value;
    const message = txtMessage.value;

    if(keyCode === 13 && message.length !== 0){
        socket.emit('send-message', { uid, message })
        txtMessage.value = '';
     }
    
     return;
})

const main = async() => {

    //Validate JWT
    await validateJWT();
}

main();

