import * as React from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Constants from 'expo-constants';

// You can import from local files
//import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
   

   
  const [male, setMale] = React.useState(false);
  const [female, setfeMale] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.des} />
      <View style={styles.info}>
        <View style={styles.avatar1}>
          <Image
            style={styles.avatar}
            source={require('./assets/Avatar.png')}
          />

          <View>
            <TextInput
              style={styles.box1}
              placeholder="NickName"
              placeholderTextColor="gray"
            />
          </View>

          <View >
            <TextInput
              style={styles.box2}
              placeholder="First Name"
              placeholderTextColor="gray"
            />
          </View>

          <View >
              <TextInput
                style={styles.box3}
                placeholder="Last Name"
                placeholderTextColor="gray"
              />
          </View>


          <View>
              <TextInput
                style={styles.box4}
                placeholder="Email"
                placeholderTextColor="gray"
              />
          </View>

          <View >
              <TextInput
                style={styles.box4}
                placeholder="Birthday"
                placeholderTextColor="gray"
              />
          </View>

          <View style={styles.gender}>
            <Text style={{ marginVertical: 6, fontSize: 20 }}> Gender: </Text>
            <CheckBox
              containerStyle={{
                backgroundColor: '#faedef',
                borderColor: '#faedef',
                height: 45,
                width: 90,
                marginLeft: 90,
                marginTop: -38,
              }}
              title="Male"
              checked={male}
              onPress={() => (setMale(!male), setfeMale(false))}
            />
            <CheckBox
              containerStyle={{
                backgroundColor: '#faedef',
                borderColor: '#faedef',
                height: 45,
                width: 90,
                marginLeft: 200,
                marginTop: -49,
              }}
              title="Female"
              checked={female}
              onPress={() => (setfeMale(!female), setMale(false))}
            />
          </View>

          <View>
              <TextInput
                style={styles.box4}
                placeholder="Phone number"
                placeholderTextColor="gray"
              />
          </View>

          <View style={styles.button}>
            <View style={styles.button1}>
              <Text style={styles.textBut}   onPress={() => Alert.alert("Successful", "You have successfully changed profile")} > Change profile </Text>
              

            </View>
          </View> 

        </View>
      </View>
      <View style={styles.des} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },

  des: {
    flex: 1.1,
    backgroundColor: '#de4552',
  },
  info: {
    flex: 8,
    backgroundColor: '#faedef',
  },
  avatar1: {
    flex: 1,
    marginTop: 10,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 90,
    marginTop: 20,
    marginLeft: 20,
    borderColor: 'gray',
    borderWidth: 0.3,
  },

  box1: {
    marginLeft: 170,
    borderWidth: 0.7,
    borderRadius: 5,
    marginTop: -70,
    marginRight: 20,
    fontSize: 18,
    height: 35,
    paddingLeft: 10,
  },

  box2: {
    marginLeft: 20,
    borderWidth: 0.7,
    borderRadius: 5,
    marginTop: 30,
    width: 162,
    fontSize: 18,
    height: 35,
    paddingLeft: 10,
  },
  box3: {
    marginLeft: 191,
    borderWidth: 0.7,
    borderRadius: 5,
    marginTop: -35,
    marginRight: 20,
    width: 162,
    fontSize: 18,
    height: 35,
    paddingLeft: 10,
  },
  box4: {
    marginLeft: 20,
    borderWidth: 0.7,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 20,
    fontSize: 18,
    height: 35,
    paddingLeft: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 100,
    marginVertical: 40,
  },
  button1: {
    backgroundColor: '#de4552',
    height: 40,
    width: 180,
    borderRadius: 10,
  },
  textBut: {
    color: 'white',
    marginHorizontal: 22.5,
    marginVertical: 7,
    fontSize: 20,
  },
  gender: {
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    marginBottom: -10,
  },
});
