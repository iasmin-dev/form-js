class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
      writable: false,
      enumerable: false,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, '')
    })
  }

  isSequence() {
    return this.cpfLimpo.charAt(0).repeat(this.cpfLimpo.length) === this.cpfLimpo;
  }

  geraNovoCpf() {
    const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
    const digito1 = this.geraDigito(cpfSemDigitos);
    const digito2 = this.geraDigito(cpfSemDigitos + digito1);
    this.novoCPF = cpfSemDigitos + digito1 + digito2;
  }

  geraDigito(cpfSemDigitos) {
    let total = 0;
    let reverso = cpfSemDigitos.length + 1;

    for (let stringNumerica of cpfSemDigitos) {
      total += reverso * Number(stringNumerica);
      reverso--;
    }

    const digito = 11 - (total % 11);
    return digito <= 9 ? String(digito) : '0';
  }

  valida() {
    if (!this.cpfLimpo) return false;
    if (typeof this.cpfLimpo !== 'string') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequence()) return false;
    this.geraNovoCpf();
    // console.log(this.novoCPF);

    return this.novoCPF === this.cpfLimpo;
  }

}

// const validaCPF = new ValidaCPF()
// // const validaCpf = new ValidaCPF('111.111.111-11')
// // console.log(validaCpf.valida());

// if (validaCPF.valida()) {
//   console.log('CPF válido');
// } else {
//   console.log('CPF inválido');
// }