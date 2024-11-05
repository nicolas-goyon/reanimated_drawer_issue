import axios from "axios";
import { API_BASE_URL } from '@env';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');


class User {
    static async update(user) {
        await axios.put(`${API_BASE_URL}/user/${user.idUser}`, updatedUser); // TODO : Pas besoin de l'id, le token suffit ; TODO : Utiliser Patch ; TODO : Récupérer le code de retour au lieu de refaire un call
        const response = await axios.get(`${API_BASE_URL}/user/${user.idUser}`); 

        return response;
    }

    static async deleteSelf() {
        var response = await axios.delete(`${API_BASE_URL}/user/${user.idUser}`); // TODO : Pas besoin de l'id, le token suffit
        return response; 
    }

    static async fetchUserComments(userId) {
        try {
          const response = await axios.get(`${API_BASE_URL}/comment/user/${userId}`);
          return response.data;
        } catch (error) {
          return [
            {
              idComment: 1,
              User: { idUser: 1, pseudo: "MockUser1" },
              date: moment().subtract(1, 'days').toISOString(),
              content: "Mock comment content 1",
            },
            {
              idComment: 2,
              User: { idUser: 2, pseudo: "MockUser2" },
              date: moment().subtract(2, 'days').toISOString(),
              content: "Mock comment content 2",
            },
            {
              idComment: 3,
              User: { idUser: 3, pseudo: "MockUser3" },
              date: moment().subtract(3, 'days').toISOString(),
              content: "Mock comment content 3",
            },
            {
              idComment: 4,
              User: { idUser: 4, pseudo: "MockUser4" },
              date: moment().subtract(4, 'days').toISOString(),
              content: "Mock comment content 4",
            },
            {
              idComment: 5,
              User: { idUser: 5, pseudo: "MockUser5" },
              date: moment().subtract(5, 'days').toISOString(),
              content: "Mock comment content 5",
            },
          ];
        }
      }
    
      static async fetchUserRating(userId) {
        try {
          const response = await axios.get(`${API_BASE_URL}/rating/user/${userId}`);
          return response.data.rating !== undefined ? response.data.rating : 4.5;
        } catch (error) {
          return 4.5; 
        }
      }
    
      static async fetchCommentCount(userId) {
        try {
          const response = await axios.get(`${API_BASE_URL}/rating/user/${userId}`);
          return response.data.comment !== undefined ? response.data.comment : 10;
        } catch (error) {
          return 10; 
        }
      }
}

class UserUtils{
    static isValidUser(user) {
        if (!user) throw new Error(UserErrors.USER_REQUIRED);

        if (!user.name) throw new Error(UserErrors.NAME_REQUIRED);
        if (!UserUtils.isValidName(user.name)) throw new Error(UserErrors.INVALID_NAME);

        if (!user.lastname) throw new Error(UserErrors.LASTNAME_REQUIRED);
        if (!UserUtils.isValidLastname(user.lastname)) throw new Error(UserErrors.INVALID_LASTNAME);

        if (!user.email) throw new Error(UserErrors.EMAIL_REQUIRED);
        if (!UserUtils.isValidEmail(user.email)) throw new Error(UserErrors.INVALID_EMAIL);

        if (user.phone && !UserUtils.isValidPhone(user.phone)) throw new Error(UserErrors.INVALID_PHONE);

        if (user.host && !UserUtils.isValidHost(user.host)) throw new Error(UserErrors.INVALID_HOST);

        return true;
    }




    static isValidName(name) {
        return name.length >= 2 && name.trim().length > 0;
    }

    static isValidLastname(lastname) {
        return lastname.length >= 2 && lastname.trim().length > 0;
    }

    static isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static isValidPhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    static isValidHost(host) {
        return typeof host === 'boolean';
    }




}



const UserErrors = {
    USER_REQUIRED: 'L\'utilisateur est obligatoire.',
    NAME_REQUIRED: 'Le nom est obligatoire.',
    LASTNAME_REQUIRED: 'Le prénom est obligatoire.',
    EMAIL_REQUIRED: 'L\'email est obligatoire.',
    PHONE_REQUIRED: 'Le numéro de téléphone est obligatoire.',
    INVALID_EMAIL: 'Veuillez entrer une adresse mail valide.',
    INVALID_PHONE: 'Veuillez entrer un numéro de téléphone valide (10 chiffres).',
    INVALID_NAME: 'Veuillez entrer un prénom valide.',
    INVALID_LASTNAME: 'Veuillez entrer un nom valide.',
    INVALID_HOST: 'Veuillez entrer un type de compte valide.',

}

export default User;
export { UserUtils, UserErrors };