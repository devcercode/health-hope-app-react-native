import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';
import {AuthContext} from '../../context/authContext';
import {ButtonGradient} from '../../components/ButtonGradient/ButtonGradient';
import {Button} from '../../components/Button/Button';
import {useForm} from '../../hooks/useForm';
import {colors} from '../../theme/colors';
import {Picker} from '@react-native-picker/picker';
import { DrawerScreenProps } from '@react-navigation/drawer';

interface Props extends DrawerScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const [selectedRole, setSelectedRole] = useState("USER_ROLE");
  const [selectedGender, setSelectedGender] = useState("MALE");

  const {signUp, errorMessage, removeError} = useContext(AuthContext);

  const {email, password, name, role, gender, onChange} = useForm({
    name: '',
    email: '',
    password: '',
    role: selectedRole,
    gender: selectedGender,
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Registro incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError,
      },
    ]);
  });

  const onRegister = () => {
    console.log({email, password, name, role, gender});
    Keyboard.dismiss();
    signUp({
      email,
      name,
      password,
      role: selectedRole,
      gender: selectedGender,
    });
  };

  // const [data, setData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   check_textInputChange: false,
  //   secureTextEntry: true,
  //   isValidUser: true,
  //   isValidPassword: true,
  // });

  // const textInputChange = (val) => {
  //     if( val.length !== 0 ) {
  //         setData({
  //             ...data,
  //             username: val,
  //             check_textInputChange: true
  //         });
  //     } else {
  //         setData({
  //             ...data,
  //             username: val,
  //             check_textInputChange: false
  //         });
  //     }
  // }

  // const handlePasswordChange = (val) => {
  //     setData({
  //         ...data,
  //         password: val
  //     });
  // }

  // const handleConfirmPasswordChange = (val) => {
  //     setData({
  //         ...data,
  //         confirm_password: val
  //     });
  // }

  // const updateSecureTextEntry = () => {
  //     setData({
  //         ...data,
  //         secureTextEntry: !data.secureTextEntry
  //     });
  // }

  // const updateConfirmSecureTextEntry = () => {
  //     setData({
  //         ...data,
  //         confirm_secureTextEntry: !data.confirm_secureTextEntry
  //     });
  // }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text_header}>Registrar</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text_footer}>Tipo de usuario</Text>
            <Picker
              selectedValue={selectedRole}
              onValueChange={(value, index) => {
                setSelectedRole(value)
                onChange(value, 'role');
                }}>
              <Picker.Item label="Participante" value="USER_ROLE" />
              <Picker.Item label="Staff Médico" value="MEDICAL_ROLE" />
            </Picker>

            {/* Nombre */}
            <Text style={styles.text_footer}>Nombre</Text>
            <View style={styles.action}>
              <AntDesign name="user" color={colors.blue} size={20} />
              <TextInput
                placeholder="Ingrese su nombre"
                style={styles.textInput}
                autoCapitalize="words"
                autoCorrect={false}
                value={name}
                onChangeText={value => onChange(value, 'name')}
                onSubmitEditing={onRegister}
              />
              {/* {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <AntDesign name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null} */}
            </View>

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 20,
                },
              ]}>
              Correo
            </Text>
            <View style={styles.action}>
              <AntDesign name="mail" color={colors.blue} size={20} />
              <TextInput
                placeholder="Ingrese su correo"
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => onChange(value, 'email')}
                value={email}
                onSubmitEditing={onRegister}
                // onChangeText={(val) => textInputChange(val)}
              />
              {/* {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <AntDesign name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null} */}
            </View>

            {/* Contraseña */}
            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 20,
                },
              ]}>
              Contraseña
            </Text>
            <View style={styles.action}>
              <AntDesign name="lock" color={colors.blue} size={20} />
              <TextInput
                placeholder="Escriba su contraseña"
                // secureTextEntry={data.secureTextEntry ? true : false}
                secureTextEntry={true}
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => onChange(value, 'password')}
                value={password}
                onSubmitEditing={onRegister}
                // onChangeText={(val) => handlePasswordChange(val)}
              />
              {/*
              <TouchableOpacity
              // onPress={updateSecureTextEntry}
              >
                
                 {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )} 
              </TouchableOpacity>
              */}
            </View>

            {/* Repetir contraseña */}

            <Text
              style={[
                styles.text_footer,
                {
                  marginTop: 20,
                },
              ]}>
              Confirmar Contraseña
            </Text>
            <View style={styles.action}>
              <AntDesign name="lock" color={colors.blue} size={20} />
              <TextInput
                placeholder="Confirme su contraseña"
                secureTextEntry={true}

                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={onRegister}
                // onChangeText={(val) => handleConfirmPasswordChange(val)}
              />
              {/* <TouchableOpacity
              // onPress={updateConfirmSecureTextEntry}
              >
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity> */}
            </View>

            <Text style={{...styles.text_footer, marginTop: 10}}>Sexo</Text>
            <Picker
              selectedValue={selectedGender}
              onValueChange={value => {
                setSelectedGender(value);
                onChange(value, 'gender');
              }}>
              <Picker.Item label="Hombre" value="MALE" />
              <Picker.Item label="Mujer" value="FEMALE" />
            </Picker>

            {/* Buttons */}
            <View style={styles.button}>
              {/* Boton Registrar */}
              <ButtonGradient title="Registrar" onPress={onRegister} />

              {/* Boton Login */}
              <Button
                title="Iniciar Sesión"
                onPress={() => navigation.navigate('LoginScreen')}
              />
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    </>
  );
};
