/* Status 0 means connected,
   Status 1 means not connected, error involved */

var mostRecentNetworkStatus = 1;



function checkNetworkConnection() {
    const checkOnlineStatus = async() => {
        try {
            // http://172.30.81.223:8000/
            // Previously: https://www.google.com
            const online = await fetch("https://www.google.com", {
                method: 'GET',
                mode: 'no-cors',
                cache: 'no-cache'
            });
            return online /* online.status >= 200 && online.status < 300 */ ;
        } catch (err) {
            return false;
        }
    };

    setInterval(async() => {
        const result = await checkOnlineStatus();
        if (result) {
            // console.log("Connected to Internet");
            mostRecentNetworkStatus = 0;
            document.getElementById("We're Werking on it...").hidden = true;
            document.getElementById("We're Werking on it text").hidden = true;
        } else {
            // console.log("Not connected to Internet");
            mostRecentNetworkStatus = 1;
            document.getElementById("We're Werking on it...").hidden = false;
            document.getElementById("We're Werking on it text").hidden = false;
        }
    }, 1000);
}

function checkNetworkConnectionCaller() {
    if (mostRecentNetworkStatus === 1) {
        alert("We cannot access the internet. Please check your network connectivity");
        return false;
    }
    return true;
}

function getMostRecentNetworkStatus() {
    return (mostRecentNetworkStatus === 1);
}

/* const checkOnlineStatus = async() => {
    try {
        const online = await fetch("https://www.google.com", {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-cache'
        });
        return online;
    } catch (err) {
        return false;
    }
};
setInterval(async () => {
    const result = await checkOnlineStatus();
    if (result) {
        console.log("Connected to Internet");
    } else {
        alert("We cannot access the internet. Please check your network connectivity");
        console.log("Not connected to Internet");
    }
}, 15000); */