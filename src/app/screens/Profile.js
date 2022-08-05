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
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
// import { CheckBox } from 'react-native-elements';
import Checkbox from 'expo-checkbox';
import Icon1 from 'react-native-vector-icons/AntDesign';

const Profile = ({navigation}) =>  {
  const [male, setMale] = React.useState(false);
  const [female, setfeMale] = React.useState(false);
  return (
    
    < View style={styles.AndroidSafeArea}>
      <View style={styles.des}>
        <TouchableOpacity style = {{marginTop: 30,}} onPress ={ () => navigation.goBack()}>
          <Icon1  name = "arrowleft" size ={55} color='black' borderRadius={2}  />
        </TouchableOpacity>
      </View>

      < ScrollView>
        <View style={styles.info}>
          <View style={styles.avatar1}>
            <Image
              style={styles.avatar}
              source={require('../../assets/avatar.jpg')}
            />
          </View>

            <View >
              <TextInput
                style={styles.box}
                placeholder="Name"
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
                <View style={styles.section}>
                  <Checkbox style={styles.checkbox} 
                    value={male} 
                    onValueChange={() => (setMale(!male), setfeMale(false))} />
                  <Text style={{fontSize: 20}}>Male</Text>
                </View>

                <View style={styles.section}>
                  <Checkbox style={styles.checkbox} 
                    value={female} 
                    onValueChange={() => (setfeMale(!female), setMale(false))} />
                  <Text style={{fontSize: 20}}>Female</Text>
                </View>
              {/* <Checkbox
                containerStyle={{
                  backgroundColor: '#faedef',
                  borderColor: '#faedef',
                  height: 45,
                  width: 90,
                  marginLeft: 200,
                  marginTop: -49,
                }}
                // title="Female"
                // checked={female}
                value={female}
                onPress={() => (setfeMale(!female), setMale(false))}
              /> */}
            </View>

            <View>
                <TextInput
                  style={styles.box}
                  placeholder="Phone number"
                  placeholderTextColor="gray"
                />
            </View>

            <View style={styles.button1}>
              <Text style={styles.textBut}   
                onPress={() => Alert.alert("Successful", "You have successfully changed profile")} > 
                Change profile
              </Text>
            </View>

          
        </View>
      </ScrollView>
      <View style={styles.des} />
    </View>
    
  );
}
export default Profile

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#faedef',
  },
  des: {
    flex: 1.1,
    backgroundColor: '#cf4848',
  },
  info: {
    flex: 8,
    backgroundColor: '#faedef',
  },
  avatar1: {
    flex: 1,
    marginTop: 10,
    justifyContent:'center'
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 90,
    borderColor: 'gray',
    borderWidth: 0.3,
    alignSelf: 'center'
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
    backgroundColor: '#cf4848',
    height: 40,
    width: 180,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  textBut: {
    color: 'black',
    marginHorizontal: 22.5,
    marginVertical: 7,
    fontSize: 20,
  },
  gender: {
    marginLeft: 20,
    marginTop: 10,
    marginRight: 20,
    marginBottom: -10,
    flexDirection: 'row',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    margin: 8,
  },
});