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
    const validPassword = this.passwordIsValid();

    if (validField && validPassword) {
      alert('formulário enviado');
      this.formulario.submit();
    }
  }

  passwordIsValid() {
    let valid = true

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if (senha.value !== repetirSenha.value) {
      valid = false
      this.createError(senha, 'Ambos os campos de "Senha" e "Repetir a senha" precisam ser iguais')
      this.createError(repetirSenha, 'Ambos os campos "Senha" e "Repetir a senha" precisam ser iguais')
    }

    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.createError(senha, 'Senha precisa ter entre 6 e 12 caracteres');
    }

    return valid;
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

      if (field.classList.contains('usuario')) {
        if (!this.validaUsuario(field)) valid = false;
      }
    }

    return valid
  }

  validaCPF(field) {
    const cpf = new ValidaCPF(field.value);

    if (!cpf.valida()) {
      this.createError(field, 'CPF inválido');
      return false;
    }
    return true;
  }

  validaUsuario(field) {
    const usuario = field.value;
    let valid = true;
    
    if (usuario.length < 3 || usuario.length > 12) {
      this.createError(field, 'Usuário precisa ter entre 3 e 12 caracteres')
      valid = false
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.createError(field, 'Nome de usuário deve apenas conter letras e números')
      valid = false
    }

    return valid;
  }

  createError(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }
}
const valida = new ValidaFormulario();