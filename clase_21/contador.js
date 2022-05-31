class Contador {
  constructor () {
    this.cant = 0
    this.label = document.createElement('span')
    this.button = document.createElement('button')

    document.body.appendChild(this.label)
    document.body.appendChild(this.button)

    this.label.innerText = this.cant
    this.button.innerText = '+'

    this.button.addEventListener('click', () => {
      this.sumar()
    })
  }

  sumar () {
    this.cant++
    this.label.innerText = this.cant
  }
}
