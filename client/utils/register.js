
export default function RegisterValidate(email, name, password, phone, Validate, setValidate) {

    setValidate({ email: false, password: false, phone: false , name:false });

    if (email === "" || password === "" || name === "" || phone === "") {
        alert("datos inconpletos");
        return "error";
    }

    if(name.length < 3) {

        setValidate((data)=>{
          return  { ...data, name: true }
        });
        return "error"
    }

    if (!isValidEmail(email)) {
        console.log(email)
        setValidate((data)=>{
            return  { ...data, email: true }
          });
          return "error"
    }

    if(password.length < 8) {
        console.log(password)
        setValidate((data)=>{
            return  { ...data, password: true }
          });
          return "error"
    }

    if(phone.length < 5){
        console.log(phone)
        setValidate((data)=>{
            return  { ...data, phone: true }
          });
          return "error"
    }

    if(isNaN(phone)){
        console.log(phone)
        setValidate((data)=>{
            return  { ...data, phone: true }
          });
          return "error"
    }
 
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}