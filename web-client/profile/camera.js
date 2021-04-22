function cameraStuff() {

    var width = 320;    
    var height = 0;     

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    startup();

    function startup() {
        document.getElementById('profilePic').hidden=true;
        video = document.getElementById('video');
        camera = document.getElementById('camera');
        video.hidden=false;
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        photo.hidden=true;

        navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function(stream) {
        video.srcObject = stream;
        video.play();
        }).catch(function(err) {
        console.log('An error occurred: ' + err);
        });


        video.addEventListener('canplay', function(ev){
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth/width);
        
            if (isNaN(height)) {
            height = width / (4/3);
            }
        
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
        this.removeEventListener('canplay', arguments.callee);
        }, false);

        video.addEventListener('click', function(ev) {
        takepicture();
        const vstream = video.srcObject;
        const vtracks = vstream.getTracks();
        vtracks.forEach(function(element) {
            element.stop();
        });
        video.hidden=true;
        photo.hidden=true;
        ev.preventDefault();
        this.removeEventListener('click', arguments.callee);
        video.srcObject = null;
        video = null;
        }, false);
    }

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = '#AAA';
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
    
            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
            document.getElementById('profilePic').src=photo.src;
            document.getElementById('profilePic').hidden=false;
        } else {
            clearphoto();
        }
    }
}

function initialize() {
    if (document.getElementById("profilePic").src === '') {
        document.getElementById("profilePic").src = '../assets/health.png';
    }

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.altKey && event.key === 'c') {
            cameraStuff();
        }
    });
}

function updateProfilePic() {
    document.getElementById("profilePic").src = URL.createObjectURL(document.getElementById("updateProfile").files[0]);
    console.log(document.getElementById("updateProfile").files[0].webkitRelativePath);
}

function triggerUpdateProfile() {
    document.getElementById("updateProfile").onchange();
}