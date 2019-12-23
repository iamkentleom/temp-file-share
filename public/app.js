import { config } from './config.js'

firebase.initializeApp(config)

const UPLOADLABEL = document.getElementById('upload-label')
const PROGRESSBAR =  document.getElementById('progressBar')
const LOADING = document.getElementById('loading')
const PERCENT = document.getElementById('percent')
const LINK = document.getElementById('link')
const QRCODE = document.getElementById('qrcode')
const TOAST = document.getElementById('toast')

window.onload = () => {
    document.getElementById('fileUpload').addEventListener('change', (e) => {
        let file = e.target.files[0];
        let storageRef = firebase.storage().ref(file.name)

        let task = storageRef.put(file)

        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            if(percentage < 100){
                UPLOADLABEL.classList.add('hidden')
                PROGRESSBAR.classList.remove('hidden')
                PROGRESSBAR.style.width = `${percentage.toFixed(0)}%`
                LOADING.classList.remove('hidden')
                PERCENT.classList.remove('hidden')
                PERCENT.innerHTML = `<strong>${percentage.toFixed(0)}%</strong>`
            }else{
                PERCENT.classList.add('hidden')
                PROGRESSBAR.classList.add('hidden')
            }
        },
        (e) => {
            console.log(e)
        },
        () => {
            console.log('Upload Succesful')
            let path = firebase.storage().ref(file.name)
            path.getDownloadURL().then( (url) => {
                let newLink = url
                console.log(newLink)
                console.log(encodeURIComponent(newLink))
                fetch(`https://v.gd/create.php?format=json&url=${encodeURIComponent(newLink)}`)
                    .then(res => res.json())
                    .then(json => {
                        newLink = json.shorturl
                        LINK.classList.remove('hidden')
                        QRCODE.classList.remove('hidden')
                        UPLOADLABEL.classList.add('hidden')
                        LINK.innerText = newLink
                        new QRCode(QRCODE, {
                            text: newLink,
                            width: 175,
                            height: 175,
                            colorDark : "#1d58ac",
                            colorLight : "#ffffff",
                            correctLevel : QRCode.CorrectLevel.H
                        })
                        LOADING.classList.add('hidden')
                    })
                    .catch(err => {
                        console.log(err)
                        LINK.classList.remove('hidden')
                        QRCODE.classList.remove('hidden')
                        UPLOADLABEL.classList.add('hidden')
                        LINK.innerText = newLink
                        new QRCode(QRCODE, {
                            text: newLink,
                            width: 175,
                            height: 175,
                            colorDark : "#1d58ac",
                            colorLight : "#ffffff",
                            correctLevel : QRCode.CorrectLevel.H
                        })
                        LOADING.classList.add('hidden')
                    })
            }).catch((error) => {
                console.log(error)
            })
        })
    })

    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log('signed in')
            let isAnonymous = user.isAnonymous;
            let uid = user.uid;
        } else {
            // User is signed out.
            console.log('signed out')
        }
    });

    LINK.addEventListener('click', () => {
        let selection = window.getSelection();
        let range = document.createRange();
        range.selectNodeContents(link);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        TOAST.classList.remove('hidden')
        setTimeout(() => {
            TOAST.classList.add('hidden')
        }, 1000)
    })
}

window.onbeforeunload = (e) => {
    return "Reload"
}