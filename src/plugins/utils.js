const saveFile = (text, filename = "file.txt") => {
    const urlObject = window.URL || window.webkitURL || window;
    const blob = new Blob([text]);
    const a = document.createElement("a");
    a.href = urlObject.createObjectURL(blob);
    a.download = filename;
    a.click();
    a.remove();
};

export { saveFile };
