import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
  const [plate_1, setPlate_1] = React.useState('');
  const [plate_2, setPlate_2] = React.useState('');
  const [comments, setComments] = React.useState([]);
 

  async function askData () {
    try {
      const response = await fetch('http://192.168.1.28/taksicil/askdata.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plate_1: plate_1,
        plate_2: plate_2,
      }),
    });
    const parsedResponse = await response.json();
      setComments( parsedResponse );
      console.log(parsedResponse);    
  
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>Yorumları İncele</Text>
      </View>
        <View style={styles.board}>
          <View style={styles.tr}>
            <Text style={styles.trText}>TR</Text>
          </View>

          <Text style={{fontSize:45,alignSelf:'center',marginLeft:5,fontWeight:'bold'}}>34</Text>

          <TextInput
            autoCapitalize="characters"
            style={styles.plate_1}
            value={plate_1}
            onChangeText={setPlate_1}
          />
          <TextInput
            autoCapitalize="characters"
            style={styles.plate_2}
            value={plate_2}
            onChangeText={setPlate_2}
          />
        </View>

        
        <TouchableOpacity style={styles.searchButton} onPress={askData}>
          <Ionicons name='ios-search' style={{ color: "white", fontSize: 20}}/>
          <Text style={{ color: "white", fontSize: 16,marginLeft: 6}}>Ara</Text>
        </TouchableOpacity>
      
        <FlatList
          data={comments}
          renderItem={({item}) => {return (<Text>{item.comment} + {item.star}</Text>)}}
          keyExtractor={item => item.comment_id}
        />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#FFCC4D",
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0,height: 1,},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },
  board: {
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 15,
    height: 80,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: { width: 0,height: 1,},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  tr: {
    backgroundColor: '#0062F7',
    width: 30,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'flex-end'
  },
  trText: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    marginBottom: 10
  },
  plate_1: {
    marginLeft: 8,
    justifyContent: 'center',
    width: 100,
    fontSize: 40,
    borderBottomWidth:1.5,
    borderBottomColor: 'black',
    marginVertical: 5,
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  plate_2: {
    marginLeft: 8,
    justifyContent: 'center',
    width: 110,
    marginHorizontal: 10,
    fontSize: 40,
    borderBottomWidth:1.5,
    borderBottomColor: 'black',
    marginVertical: 5,
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  searchButton: {
    backgroundColor: '#e3386a',
    width: 140,
    flexDirection:'row',
    height: 35,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 15
  }
});
