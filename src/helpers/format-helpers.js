const formatter = new Intl.NumberFormat('pt-BR');

function formatNumber(numberToFormat) {
  return formatter.format(numberToFormat);
}

function limitSizeName(name) {
  if(name.length > 15) 
  return name.substring(0,15) + '...';
  else
  return name
}


export { formatNumber, limitSizeName };
