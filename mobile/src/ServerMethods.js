export async function createAccount(info) {
    console.log('create account');
    return await fetch('http://10.186.150.93:8000/mobile/create_account', {
        method: 'POST',
        body: JSON.stringify({
            f_name: info.firstName,
            l_name: info.lastName,
            email: info.email,
            username: info.username,
            password: info.password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function login(info) {
    console.log('login');
    return await fetch('http://10.186.150.93:8000/mobile/login', {
        method: 'POST',
        body: JSON.stringify({
            username: info.username,
            password: info.password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function changePassword(info) {
    console.log('change password');
    return await fetch('http://10.186.150.93:8000/mobile/user' + info.username + '/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          username: info.username,
          password: info.newPassword,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function verifyUsername(info) {
    console.log('verify username');
    return await fetch('http://10.186.150.93:8000/mobile/user' + info.username);
}