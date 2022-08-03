import * as React from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert, 
  ScrollView,
  SafeAreaView
} from 'react-native';
// import { CheckBox } from 'react-native-elements';
import Checkbox from 'expo-checkbox';

const Profile = () =>  {
  const [male, setMale] = React.useState(false);
  const [female, setfeMale] = React.useState(false);
  return (
    
    < SafeAreaView style={styles.container}>
      <View style={styles.des} />
      < ScrollView>
        <View style={styles.info}>
          <View style={styles.avatar1}>
            <Image
              style={styles.avatar}
              source={require('../../assets/avatar.jpg')}
            />

            <View >
              <TextInput
                style={styles.box}
                placeholder="First Name"
                placeholderTextColor="gray"
              />
            </View>

            <View>
                <TextInput
                  style={styles.box}
                  placeholder="Email"
                  placeholderTextColor="gray"
                />
            </View>

            <View >
                <TextInput
                  style={styles.box}
                  placeholder="Birthday"
                  placeholderTextColor="gray"
                />
            </View>

            <View style={styles.gender}>
              <Text style={{ marginVertical: 6, fontSize: 20 }}> Gender: </Text>
              <Checkbox
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
              <Checkbox
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
                  style={styles.box}
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
      </ScrollView>
      <View style={styles.des} />
    </SafeAreaView>
    
  );
}
export default Profile

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
    marginLeft: '35%',
    borderColor: 'gray',
    borderWidth: 0.3,
  },

  box: {
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