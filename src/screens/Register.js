import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Switch, ScrollView  } from 'react-native';
import Colors from '../Enums/Colors';
import { useNavigation} from '@react-navigation/native'; 
import Checkbox from '../components/Checkbox'; 
import CustomButton from '../components/CustomButton';

import { useDispatch } from 'react-redux';  
import { AuthUtils } from '../Business/API/Auth';

const Register = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [host, setHost] = useState(false);
  const [serverError, setServerError] = useState(''); 

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegister = async() => {
    // TODO : harmoniser avec login entre les messages en rouge ou les alertes
    if (!name || !email || !password || !lastname || !phone) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return;
    }
    if (!AuthUtils.isValidPhone(phone)) {
      Alert.alert('Erreur', 'Le numéro de téléphone doit contenir 10 chiffres.');
      return;
    }

    if (!AuthUtils.isValidName(name)) {
        Alert.alert('Erreur', 'Le prénom doit contenir au moins 2 caractères.');
        return;
    }

    if (!AuthUtils.isValidLastname(lastname)) {
        Alert.alert('Erreur', 'Le nom doit contenir au moins 2 caractères.');
        return;
    }

    if (!AuthUtils.isValidEmail(email)) {
        Alert.alert('Erreur', 'Adresse email invalide.');
        return;
    }

    if (!AuthUtils.isValidPassword(password)) {
        Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
        return;
    }

    
    
    try {
      const response = await Auth.register(name, lastname, email, phone, password, host);
      
      if (response.status === 200) {
        dispatch(login(response.data)); // TODO : Login ??? 
        // navigation.navigate('Home');
        Alert.alert('Succès', 'Inscription réussie !');
      }

    } catch (error) {
        const errorMessage = 'Une erreur est survenue...';
        setServerError(errorMessage); // TODO : Le message ne s'affiche pas
        Alert.alert('Erreur', errorMessage);
    }
    // TODO : appel API
    // renvoi token connexion
    // redux
    // redirection vers home page

  };
  const toggleIsHote = () => {
   setHost(!host)
  };
  return (
    <>
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled" // Permet de garder le focus sur le TextInput lorsque le clavier est ouvert
      contentContainerStyle={{ paddingBottom: 20 }} // Ajoute un peu d'espace en bas du ScrollView
    >
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        style={styles.input}
        placeholder="Email*"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Nom*"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom*"
        value={lastname}
        onChangeText={setLastname}
      />

      <TextInput
        style={styles.input}
        placeholder="Téléphone*"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe*"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.switchContainer}>
        <Checkbox
            isChecked={host} 
            onPress={toggleIsHote}
        />
        
        <View style={styles.switchTextContainer}>
          <Text style={styles.switchLabel}>Je suis hôte</Text>
          <Text style={styles.comment}>Vous pourrez changer cette option plus tard dans les paramètres de votre compte.</Text>
        </View>
      </View>

      <CustomButton title="S'inscrire" onPress={handleRegister} />

      <Text style={styles.linkText}>
        Vous avez déjà un compte?
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}> Se connecter</Text>
      </Text>

    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:'20%', 
    backgroundColor : 'white'
  },
  title: {
    color: Colors.NavyBlue,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginTop: 12,
    color: Colors.NavyBlue,
    backgroundColor: Colors.LightBlue,
    borderColor: Colors.LightBlue,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: '2%',
    marginBottom: 20,
  },
  switchTextContainer: {
    marginLeft: 10,
    flex: 1,
    flexDirection: 'column'
  },
  switchLabel: {
    fontSize: 16,
    color: Colors.NavyBlue,
  },
  comment: {
    fontSize: 12,
    color: Colors.NavyBlue,
    marginBottom: 5,
  },
  linkText: {
    fontSize: 14,
    color: Colors.NavyBlue,
    textAlign: 'center',
    marginTop: 7,
  },
  link: {
    color: "#224AD8",
  }
});

export default Register;