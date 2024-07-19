export function validateEmptyAndLenght3(value) {
  if (!value) {
    return "*Este campo é obrigatório";
  }

  if (value.length < 3) {
    return "*Este campo precisa no mínimo 3 caracteres";
  }

  return true;
}

export function validateEmptyAndEmail(value) {
  if (!value) {
    return "*Este campo é obrigatório";
  }

  const isValid = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(value);

  if (!isValid) {
    return "*Este campo precisa ser um e-mail";
  }

  return true;
}
