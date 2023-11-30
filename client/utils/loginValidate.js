export default function LoginValid(password, email, setLoginValidate, loginValidate) {
    // Limpiar errores de validación previos
    setLoginValidate({ email: false, password: false, phone: false });

    if (email === "" || password === "") {
        alert("Datos incompletos");
       return "error";
    }

    if (password.length < 8) {
        setValidate((data)=>{
            return  { ...data, password: true }
          });;
    }

    if (!isNaN(email)) {
        // Verificar si es un número (posiblemente un número de teléfono)
        if (email.toString().length < 5) {
            setValidate((data)=>{
                return  { ...data, email: true }
              });;

        }
    } else {
        // Verificar si es un correo electrónico válido
        if (!isValidEmail(email)) {
            setValidate((data)=>{
                return  { ...data, email: true }
              });;

        }
    }

}

// Función para validar el formato de un correo electrónico
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
