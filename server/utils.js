const os = require('os');

function get_ip() {
    var interfaces_obj = os.networkInterfaces();
    console.log(interfaces_obj);
    for (let conn_type in interfaces_obj) {
        if (conn_type.substring(0, 4).localeCompare("wifi") == 0) {
            return interfaces_obj[conn_type][0]["address"];
        }
    }
    return "127.0.0.1";
}

module.exports = {
    get_ip
}