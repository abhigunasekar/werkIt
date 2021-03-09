export async function createAccount(info) {
    // fetch('http://127.0.0.1:8000/create_account',{
    //   method: 'POST',
    //   body: JSON.stringify({
    //     f_name: info.firstName,
    //     l_name: info.lastName,
    //     email: info.email,
    //     username: info.username,
    //     password: info.password,
    //   })
    // })
    // .then(function(response){
    // return response.json()
    // }).catch(error => console.log('lmfao'));

    console.log('attempt server connection');

    // fetch('http://127.0.0.1:8000/', {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     params: null,
    //     body: null
    // })
     fetch('http://10.186.118.49:8000/')
         .then(response => console.log('connect'))
         .catch(error => console.log(error));
    console.log("made it");

    // const response = await fetch("http://192.168.137.1:8000/");
    // console.log("here");
    // const data = await response.json();
    // console.log("now here");
    // console.log(data);
}