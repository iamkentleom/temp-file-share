import { config } from './config.js'

firebase.initializeApp(config)

window.onload = () => {
    document.getElementById('fileUpload').addEventListener('change', (e) => {
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref('files/' + file.name)

        var task = storageRef.put(file)

        task.on('state_changed', (snapshot) => {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            if(percentage < 100){
                document.getElementById('loading').classList.remove('hidden')
                document.getElementById('percent').classList.remove('hidden')
                document.getElementById('percent').innerHTML = `<strong>${percentage.toFixed(0)}%</strong>`
            }else{
                document.getElementById('percent').classList.add('hidden')
            }
        },
        (e) => {
            console.log(e)
        },
        () => {
            console.log('Upload Succesful')
            var path = firebase.storage().ref('files/' + file.name)
            path.getDownloadURL().then( (url) => {
                let newLink = url
                console.log(newLink)
                console.log(encodeURIComponent(newLink))
                // alternative
                // fetch(`http://tny.im/yourls-api.php?action=shorturl&format=json&url=${encodeURIComponent(newLink)}`)
                fetch(`https://v.gd/create.php?format=json&url=${encodeURIComponent(newLink)}`)
                    .then(res => res.json())
                    .then(json => {
                        newLink = json.shorturl
                        document.getElementById('link').classList.remove('hidden')
                        document.getElementById('qrcode').classList.remove('hidden')
                        document.getElementById('upload-label').classList.add('hidden')
                        document.getElementById('link').innerText = newLink
                        new QRCode(document.getElementById("qrcode"), {
                            text: newLink,
                            width: 150,
                            height: 150,
                            colorDark : "#1d58ac",
                            colorLight : "#ffffff",
                            correctLevel : QRCode.CorrectLevel.H
                        })
                        document.getElementById('loading').classList.add('hidden')
                    })
                    .catch(err => {
                        console.log(err)
                        document.getElementById('link').classList.remove('hidden')
                        document.getElementById('qrcode').classList.remove('hidden')
                        document.getElementById('upload-label').classList.add('hidden')
                        document.getElementById('link').innerText = newLink
                        new QRCode(document.getElementById("qrcode"), {
                            text: newLink,
                            width: 150,
                            height: 150,
                            colorDark : "#1d58ac",
                            colorLight : "#ffffff",
                            correctLevel : QRCode.CorrectLevel.H
                        })
                        document.getElementById('loading').classList.add('hidden')
                    })
            }).catch((error) => {
                console.log(error)
            })
        })
    })

    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log('signed in')
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
        } else {
            // User is signed out.
            console.log('signed out')
        }
    });

    document.getElementById('link').addEventListener('click', () => {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(link);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        document.getElementById('toast').classList.remove('hidden')
        setTimeout(() => {
            document.getElementById('toast').classList.add('hidden')
        }, 1000)
    })
}

window.onbeforeunload = (e) => {
    return "Reload"
}