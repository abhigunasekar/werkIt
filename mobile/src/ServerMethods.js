export function createAccount(info) {
    console.log('create account');
    fetch('http://10.186.150.93:8000/create_account',{
      method: 'POST',
      body: JSON.stringify({
        f_name: info.firstName,
        l_name: info.lastName,
        email: info.email,
        username: info.username,
        password: info.password,
      })
    })
    .then(response => console.log(response)
    ).catch(error => console.log('create account error: ' + error));
}

export function login(info) {
    console.log('login');
    fetch('http://10.186.150.93:8000/login',{
        method: 'POST',
        body: JSON.stringify({
          username: info.username,
          password: info.password,
        })
      })
      .then(response => console.log(response)
      ).catch(error => console.log('login error: ' + error));
}

export function changePassword(info) {
    console.log('change password');
    fetch('http://10.186.150.93:8000/user' + info.username + '/profile',{
        method: 'PATCH',
        body: JSON.stringify({
          username: info.username,
          password: info.newPassword,
        })
      })
      .then(response => console.log(response)
      ).catch(error => console.log('change password error: ' + error));
}