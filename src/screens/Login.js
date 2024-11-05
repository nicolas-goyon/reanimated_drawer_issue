import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';  
import { login } from '../redux/authSlice'; 
import Colors from '../Enums/Colors';
import CustomButton from '../components/CustomButton';
import Auth, { AuthErrors, AuthUtils } from '../Business/API/Auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState(''); 

  const dispatch = useDispatch();

  const handleLogin = async () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');
    setServerError(''); 

    if (!email) {
      setEmailError('Adresse mail est obligatoire');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Mot de passe est obligatoire');
      isValid = false;
    }

    if (!isValid) return;

    if (!AuthUtils.isValidEmail(email)) {
      setEmailError('Adresse mail invalide');
      return;
    }

    if (!AuthUtils.isValidPassword(password)) {
        setPasswordError('Mot de passe invalide');
        return;
    }

    if (!isValid) return;

    console.log("email : " + email);
    try {
      const response = await Auth.login(email, password);

      if (response.status === 200) {
        dispatch(login(response.data)); // TODO : A vérifier
        // navigation.navigate('Home');
      }
    } catch (error) {
        if (error.message == AuthErrors.INVALID_CREDENTIALS) {
          setServerError('Adresse mail ou mot de passe incorrect');
          return;
        }
        setServerError('Une erreur est survenue...');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      </View>

      <Text style={styles.title}>Connexion</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Adresse mail"
        style={[styles.input, emailError ? styles.errorInput : null]}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Mot de passe"
        secureTextEntry={true}
        style={[styles.input, passwordError ? styles.errorInput : null]}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      {serverError ? <Text style={styles.serverErrorText}>{serverError}</Text> : null}

      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signupLink}>
          Vous n'avez pas encore de compte ? <Text style={styles.signupText}>S’inscrire</Text>
        </Text>
      </TouchableOpacity>

      <CustomButton title="Se connecter" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.White,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -100,
    width: '70%',
    height: '20%',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.NavyBlue,
    width: '100%',
    textAlign: 'left',
  },
  input: {
    backgroundColor: Colors.LightBlue,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  errorInput: {
    borderColor: Colors.Red,
    borderWidth: 1,
  },
  errorText: {
    color: Colors.Red,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  serverErrorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: '2%',
    width: '100%',
  },
  signupLink: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.Gray,
    marginBottom: 20,
    width: '100%',
    textAlign: 'left',
  },
  signupText: {
    color: Colors.Blue,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
})

export default Login;
