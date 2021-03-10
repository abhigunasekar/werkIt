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

    fetch('http://10.186.150.93:8000/')
         .then(response => console.log('connect'))
         .catch(error => console.log(error));
    console.log("made it");
}