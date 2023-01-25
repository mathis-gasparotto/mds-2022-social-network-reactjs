let paramsString = document.location.search.split('?')[1]
if (paramsString) {
  let params_arr = paramsString.split('&')
  let new_params_arr = [...params_arr]
  params_arr.forEach((paramString) => {
    if (paramString.includes('error=')) {
      const error = decodeURI(paramString.split('error=')[1])
      let errorElement = document.createElement('div')
      errorElement.classList.add('alert', 'alert-danger')
      errorElement.innerText = error
      document.querySelector('.main').appendChild(errorElement)
      new_params_arr = params_arr.filter(
        (e) => e !== 'error=' + encodeURI(error)
      )
    }
    if (paramString.includes('success=')) {
      const msg = decodeURI(paramString.split('success=')[1])
      let msgElement = document.createElement('div')
      msgElement.classList.add('alert', 'alert-success')
      msgElement.innerText = msg
      document.querySelector('.main').appendChild(msgElement)
      new_params_arr = params_arr.filter(
        (e) => e !== 'success=' + encodeURI(msg)
      )
    }
  })
  let newParamsString = ''
  if (new_params_arr.length > 0) {
    newParamsString = '?' + new_params_arr.join('$')
  }
  const newUrl = document.location.origin + document.location.pathname + newParamsString
  window.history.pushState({}, '', newUrl)
}
