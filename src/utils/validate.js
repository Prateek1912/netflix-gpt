export const validate = (email, password) => {
    const isEmailValid = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const isPasswordValid = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/)
    
    if (!isEmailValid) return "Email is Invalid"
    if (!isPasswordValid) return "Password is Invalid"
    return null;
}