import * as React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class ScanScreen extends React.Component {

    constructor()
    {
        super();
        this.state={
            hasCameraPermissions: false,
            scanned: false.valueOf,
            scannedData: "",
            buttonState: "normal",
        }
    }

    getCameraPermissions = async () =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        
        this.setState({
          /*status === "granted" is true when user has granted permission
            status === "granted" is false when user has not granted the permission
          */
          hasCameraPermissions: status === "granted",
          buttonState: "clicked",
          scanned: false
        });
      }
  
    handleBarCodeScanned = async({type, data})=>{
        const {buttonState} = this.state
  
        if(buttonState==="BookId"){
          this.setState({
            scanned: true,
            scannedBookId: data,
            buttonState: 'normal'
          });
        }
        else if(buttonState==="StudentId"){
          this.setState({
            scanned: true,
            scannedStudentId: data,
            buttonState: 'normal'
          });
        }
        
      }
  render()
  {
   if(this.state.buttonState !== "normal" && this.state.hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }
else{
    return (
        <SafeAreaProvider>
      
          <Header backgroundColor="coral" centerComponent={{text:"Bar Code Scanner", style:{width:"100%", textAlign:"center",fontSize:20, fontWeight: "bold"}}}></Header>
      <TouchableOpacity
      onPress={this.getCameraPermissions}
      title="Bar Code Scanner"
      >
        <View style={styles.container}>
       <Image source={require("../assets/scanner.jpg")} style={styles.image}/>
          <Text style={styles.text}> Click on the scanner</Text>
          </View>
      </TouchableOpacity>
      
      </SafeAreaProvider>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:
  {
    width:100,
    height:100,
    justifyContent:"center",
     alignItems:"center",
     marginTop:50
  },
  text:
  {
    alignContent:"center",
     alignItems:"center",
     justifyContent:"center",
     marginTop:40,
     fontSize:15,
     fontWeight:"bold",
  }
});

