// GET REQUEST
function getTodos() {
    axios({
            method: 'post',
            url: '',
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
}

// POST REQUEST
function addTodo() {
    console.log('POST Request');
}

// PUT/PATCH REQUEST
function updateTodo() {
    console.log('PUT/PATCH Request');
}

// DELETE REQUEST
function removeTodo() {
    console.log('DELETE Request');
}

// SIMULTANEOUS DATA
function getData() {
    console.log('Simultaneous Request');
}

// CUSTOM HEADERS
function customHeaders() {
    console.log('Custom Headers');
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
    console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
    console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
    console.log(res.dark_mode);
    document.getElementById('fName').value = res.dark_mode;
    document.getElementById('lName').value = res.dark_mode;
    document.getElementById('email').value = res.dark_mode;
    document.getElementById('uname').value = res.dark_mode;

}


window.onload = function() {
        getTodos();
    }
    // Event listeners
    // document.getElementById('get').addEventListener('click', );