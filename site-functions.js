const path = require('path');
const fs = require('fs');


function getFilePaths(folder) {
    let fileArray = []
    const fileNames = fs.readdirSync(folder);
    fileNames.forEach(name => fileArray.push(path.join(__dirname, name))) 

    return fileArray
}

let filePaths = getFilePaths('./img')
console.log(filePaths)

function addElementTo(parentElement, elementType, elementClass) {
    let element = document.createElement(elementType)
    element.className = elementClass
    document.body[parentElement].appendChild(element)
}
// addElementTo('main', 'div', 'gallery')
addElementTo('main', 'div', 'gallery')

// export { getFilePaths }