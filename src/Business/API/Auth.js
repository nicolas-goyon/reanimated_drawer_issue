import API from "./API";



class Auth {
    static async login(email, password) {
        if (!AuthUtils.validateLogin(email, password)) return;

        var response = await API.post('/login', { email, password });
        

        if(response.status !== 200 || response.data.invalidCreditentials) throw new Error(AuthErrors.INVALID_CREDENTIALS); // TODO : Vérifier si c'est le bon message d'erreur provenant du serveur

        API.setToken(response.data.token);
        return response;
    }

    static async register(name, lastname, email, phone, password, host) {
        if (!AuthUtils.validateRegister(name, lastname, email, phone, password, host)) return;

        var response = API.post('/register', { name, lastname, email, phone, password, host });

        if(response.status !== 200) throw new Error('Erreur lors de l\'inscription');

        return response;
    }

    static isLogged() {
        return API.token !== null;
    }
}


class AuthUtils{
    static validateLogin(email, password) {
        if (!email) throw new Error(AuthErrors.EMAIL_REQUIRED);
        if (!password) throw new Error(AuthErrors.PASSWORD_REQUIRED);
        if (!AuthUtils.isValidEmail(email)) throw new Error(AuthErrors.INVALID_EMAIL);
        if (!AuthUtils.isValidPassword(password)) throw new Error(AuthErrors.INVALID_PASSWORD);

        return true;
    }

    static validateRegister(name, lastname, email, phone, password, host) {
        if (!name) throw new Error(AuthErrors.NAME_REQUIRED);
        if (!lastname) throw new Error(AuthErrors.LASTNAME_REQUIRED);
        if (!email) throw new Error(AuthErrors.EMAIL_REQUIRED);
        if (!phone) throw new Error(AuthErrors.PHONE_REQUIRED);
        if (!password) throw new Error(AuthErrors.PASSWORD_REQUIRED);
        if (!AuthUtils.isValidEmail(email)) throw new Error(AuthErrors.INVALID_EMAIL);
        if (!AuthUtils.isValidPassword(password)) throw new Error(AuthErrors.INVALID_PASSWORD);
        if (!AuthUtils.isValidPhone(phone)) throw new Error(AuthErrors.INVALID_PHONE);
        if (!AuthUtils.isValidName(name)) throw new Error(AuthErrors.INVALID_NAME);
        if (!AuthUtils.isValidLastname(lastname)) throw new Error(AuthErrors.INVALID_LASTNAME);
        if (!AuthUtils.isValidHost(host)) throw new Error(AuthErrors.INVALID_HOST);

        return true;
    }



    static isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static isValidPassword(password) {
        return password.length >= 6;
    }

    static isValidPhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    static isValidName(name) {
        return name.length >= 2;
    }

    static isValidLastname(lastname) {
        return lastname.length >= 2;
    }

    // Check if host is boolean
    static isValidHost(host) {
        return typeof host === 'boolean';
    }

}

const AuthErrors = {
    EMAIL_REQUIRED: 'Adresse mail requise',
    PASSWORD_REQUIRED: 'Mot de passe requis',
    INVALID_EMAIL: 'Adresse mail invalide',
    INVALID_CREDENTIALS: 'Vérifiez vos identifiants de connexion',
    INVALID_PASSWORD: 'Mot de passe invalide',
    NAME_REQUIRED: 'Prénom requis',
    LASTNAME_REQUIRED: 'Nom requis',
    PHONE_REQUIRED: 'Téléphone requis',
    INVALID_PHONE: 'Téléphone invalide',
    INVALID_NAME: 'Prénom invalide',
    INVALID_LASTNAME: 'Nom invalide',
    INVALID_HOST: 'Hôte invalide',
}

export default Auth;

export { AuthUtils, AuthErrors };