class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e)
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const validField = this.isValid()
  }

  isValid() {
    let valid = true;
    for (let field of this.formulario.querySelectorAll('.validar')) {
      const label = field.previousElementSibling.innerText;

      if (!field.value) {
        this.createError(field, `Campo "${label}" não é válido`)
        valid = false
      }
    }
  }

  createError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg
    div.classList.add('.error-text')
    field.insertAdjacentElement('afterend', div)
  }
}
const valida = new ValidaFormulario();