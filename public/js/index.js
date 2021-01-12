

const file = document.getElementById('uploadfile');
file.onchange = (e) => {
    $('#box-upload').hide();
    $('#loader').show();
    setTimeout(() => {
        document.getElementById('formUpload').submit();
    }, 2000);

}
const dropZone = document.getElementById('drop_zone');
dropZone.ondragover = function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '#d2dcec';
}
dropZone.ondragleave = function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.backgroundColor = '#F6F8FB';
}

dropZone.ondrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = e.dataTransfer.files;
    // force an onchange event on an input
    let inputFile = document.getElementById("uploadfile");
    inputFile.files = files;
    let event = new Event('change');
    inputFile.dispatchEvent(event);

};



