class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.eventos();
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.handleSubmit(e);
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const validField = this.isValid();
  }

  isValid() {
    let valid = true;

    for (let errorText of this.formulario.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for (let field of this.formulario.querySelectorAll('.validar')) {
      const label = field.previousElementSibling.innerText;

      if (!field.value) {
        this.createError(field, `Campo "${label}" não é válido`);
        valid = false;
      }
      
      if (field.classList.contains('cpf')) {
        if (!this.validaCPF(field)) valid = false;
      }
    }
  }

  validaCPF(field) {
    const cpf = new ValidaCPF(field.value);

    if (!cpf.valida()) {
      this.createError(field, 'CPF inválido');
      return false;
    }
    return true;
  }


  createError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }
}
const valida = new ValidaFormulario();