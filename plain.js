var el = document.getElementById('demo')
var tel = document.getElementById('top')
el.addEventListener('scroll', function () {
  console.log(el)
  tel.innerHTML = el.scrollTop
})
