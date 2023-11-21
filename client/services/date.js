
export function Dates (){

  const fecha = new Date();

  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
  const dia = fecha.getDate().toString().padStart(2, '0');
  const horas = fecha.getHours().toString().padStart(2, '0');
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  const segundos = fecha.getSeconds().toString().padStart(2, '0');
  const milisegundos = fecha.getMilliseconds().toString().padStart(3, '0');
  
  const formattedDate = `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}.${milisegundos}Z`;
  return formattedDate;
}