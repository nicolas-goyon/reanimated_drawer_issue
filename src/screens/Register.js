import React from 'react';
import { View, Button} from 'react-native';

const Register = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            onPress={() => navigation.navigate('Login')}
            title="Go to Login"
          />
        </View>
      );
};
export default Register;