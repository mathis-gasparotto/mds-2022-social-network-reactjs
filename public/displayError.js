let paramsString = document.location.search.split('?')[1]
let params_arr = paramsString.split('&')
params_arr.forEach((paramString) => {
  if (paramString.includes('error=')) {
    const error = decodeURI(paramString.split('error=')[1])
    let errorElement = document.createElement('p')
    errorElement.innerText = error
    // insertAfter(document.querySelector('#login-form'), errorElement)
    document.querySelector('body').appendChild(errorElement)
  }
})
// function insertAfter(referenceNode, newNode) {
//   referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }