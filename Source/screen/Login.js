import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import CustomText from '../customcomponent/CustomText';
import CustomInputText from '../customcomponent/CustomInputText';
import CustomButton from '../customcomponent/CustomButton';
const {windowWidth, windowHeight} = Dimensions.get('window');
import Realm from 'realm';
import FastImage from 'react-native-fast-image';
let realm;
const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//Must be atleast one number and one SPl character
const regularExpression =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
import {launchImageLibrary} from 'react-native-image-picker';
import {CreateSchema} from '../DataBase/Schema';
import {requestExternalWritePermission} from '../Utils/Utils';

const Login = ({navigation, route}) => {
  const [emailValid, setemailValid] = useState(false);
  const [passValid, setpassValid] = useState(false);
  const [update, setUpdate] = useState(false);
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [filePath, setFilePath] = useState(undefined);
  useEffect(() => {
    setUpdate(route?.params?.update);
    requestExternalWritePermission();
    //Creating schema for creating DataBase
    CreateSchema();
    if (route?.params?.update) {
      fetchLogindetails();
    }
  }, [fname, lname, email, pass, route, filePath]);

  //Used to fetch data from Userdetails table from NewDatabases Database
  const fetchLogindetails = () => {
    realm = new Realm({path: 'NewsDatabases.realm'});
    var user_details = realm.objects('User_details');
    global.profile = user_details[user_details.length - 1].user_Profile;
  };

  // used to get image from the file manager or gallery and storing it in database
  const chooseFile = type => {
    let options = {
      mediaType: type,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      setFilePath(response.assets);
      realm = new Realm({path: 'NewsDatabases.realm'});
      realm.write(() => {
        var obj = realm.objects('User_details');
        obj[obj.length - 1].user_Profile =
          filePath != undefined ? filePath[0].uri : '';
      });
      global.image = response.assets;
    });
  };

  //used to Insert a user details in "User_details" table
  const databaseCreated = () => {
    realm = new Realm({path: 'NewsDatabases.realm'});
    realm.write(() => {
      var ID =
        realm.objects('User_details').sorted('user_id', true).length > 0
          ? realm.objects('User_details').sorted('user_id', true)[0].user_id + 1
          : 1;
      realm.create('User_details', {
        user_id: ID,
        user_Fname: fname,
        user_Lname: lname,
        user_Email: email,
        user_Pass: pass,
        user_Profile: '',
      });
    });
    navigation.navigate('Dashboard');
  };

  //used to update a user details in "User_details" table

  const databaseUpdate = () => {
    realm = new Realm({path: 'NewsDatabases.realm'});
    realm.write(() => {
      var obj = realm.objects('User_details');
      obj[obj.length - 1].user_Email = email;
      obj[obj.length - 1].user_Fname = fname;
      obj[obj.length - 1].user_Lname = lname;
      obj[obj.length - 1].user_Pass = pass;
      obj[obj.length - 1].user_Profile =
        filePath != undefined ? filePath[0].uri : '';
    });
    navigation.navigate('Dashboard');
  };

  // validation method for Email
  const validateEmail = text => {
    const isValid = reg.test(text);
    setEmail(text);
    if (isValid) {
      setemailValid(true);
    } else {
      setemailValid(false);
    }
    return isValid;
  };

  // validation method for Pass
  const validatePass = text => {
    const isValid = regularExpression.test(text);
    setPass(text);
    if (isValid) {
      setpassValid(true);
    } else {
      setpassValid(false);
    }
    return isValid;
  };

  //used to navigate button to dashboard and based on condition we are creating and updating the table
  const loginButtonClick = () => {
    {
      !update ? databaseCreated() : databaseUpdate();
    }
  };

  //Used to display profile imag.
  const renderProfile = () => {
    if (filePath === undefined) {
      return require('../resource/image/profile.png');
    } else if (filePath !== undefined) {
      return {uri: filePath[0].uri};
    } else if (global.profile !== '') {
      return {uri: global.profile};
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        {!update ? (
          <CustomText
            text="Login"
            textFont={30}
            textFontweight={800}
            margin={'7%'}
          />
        ) : (
          <View style={styles.profileView}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                chooseFile('photo');
              }}>
              <FastImage
                source={renderProfile()}
                style={styles.profileImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.InputTextView}>
          <CustomInputText
            placeholder="Enter FirstName"
            value={fname}
            onChangeText={fname => setFName(fname)}
            maxLength={10}
          />
          <CustomInputText
            placeholder="Enter LastName"
            value={lname}
            onChangeText={lname => setLName(lname)}
            maxLength={10}
          />
          <CustomInputText
            placeholder="Enter Email Address"
            value={email}
            onChangeText={email => validateEmail(email)}
            maxLength={10}
          />
          <CustomInputText
            placeholder="Enter Password"
            value={pass}
            onChangeText={pass => validatePass(pass)}
            maxLength={10}
            secureTextEntry={true}
          />

          <CustomButton
            title={!update ? 'Login' : 'Update'}
            disabled={
              !fname || !lname || !email || !pass || !emailValid || !passValid
            }
            buttonColor={
              !fname || !lname || !email || !pass || !emailValid || !passValid
                ? '#D3D3D3'
                : '#000'
            }
            customClick={loginButtonClick}
          />
        </View>
        <View />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#FFF',
  },
  headerView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  InputTextView: {
    flex: 1,
    margin: '7%',
    backgroundColor: '#FFF',
  },
  profileView: {
    margin: '7%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    margin: '4%',
    borderRadius: 100,
  },
});
export default Login;
