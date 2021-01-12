
const btnCopy = document.getElementById('btn-copy');
btnCopy.onclick = (e) => {
    const copyText = document.getElementById('inputLink');
    let inputValue = copyText.value.trim();
    if (inputValue) {
        navigator.clipboard.writeText(inputValue)
            .then(() => {
                inputValue.value = '';
                if (btnCopy.innerText !== 'Copied!') {
                    const originalText = btnCopy.innerText;
                    btnCopy.innerText = 'Copied!';
                    setTimeout(() => {
                        btnCopy.innerText = originalText;
                    }, 1500);
                }

            }).catch(err => {
                console.log('Something went wrong', err);
            })
    }
}
document.body.addEventListener("keydown", async (ev) => {
    const file = document.getElementById('inputFile');
    ev = ev || window.event;  // Event object 'ev' 
    var key = ev.which || ev.keyCode; // Detecting keyCode 

    // Detecting Ctrl 
    var ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17)
        ? true : false);

    if (key == 67 && ctrl) {
        const img = new Image;
        const c = document.createElement('canvas');
        const ctx = c.getContext('2d');
        //convert image to png
        //clipboard (image) only works for png
        const setCanvasImage = (path, func) => {
            img.onload = function () {
                c.width = this.naturalWidth
                c.height = this.naturalHeight
                ctx.drawImage(this, 0, 0)
                c.toBlob(blob => {
                    func(blob)
                }, 'image/png')
            };
            img.src = path;
        }
        setCanvasImage(file.value, (imgBlob) => {
            navigator.clipboard.write(
                [
                    new ClipboardItem({ 'image/png': imgBlob })
                ]
            )
                .then(e => { console.log('Image copied to clipboard') })
                .catch(e => { console.log(e) })
        })
    }
})




