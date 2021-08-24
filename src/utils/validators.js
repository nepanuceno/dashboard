export function validateEmptyAndLength3 (value) {
  if (!value) {
    return '*Este campo é obrigatorio'
  }

  if (value.length < 3) {
    return '*Mínimo de 3 caracteres'
  }

  return true
}

export function validateEmptyAndEmail (value) {
  if (!value) {
    return '*Este compo é obrigatório'
  }

  const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

  if (!isValid) {
    return '*Este campo precisa ser um e-mail'
  }

  return true
}
