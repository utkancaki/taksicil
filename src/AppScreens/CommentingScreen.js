import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import { useUserContext } from "../context/UserContext";

export default function CommentingScreen() {
  const [plate_1, setPlate_1] = React.useState('');
  const [plate_2, setPlate_2] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [star, setStar] = React.useState();
  const { user, setUser } = useUserContext();

  async function addComment() {
        
    if (plate_1=='' && plate_2=='' && comment=='' && star=='' ){
        Alert.alert('Tüm alanları doldurunuz.');
    } else {
        fetch('http://192.168.1.28/taksicil/addComment.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              plate_1: plate_1,
              plate_2: plate_2,
              comment: comment,
              star: star,
              email: user.email
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert(responseJson);
        if(responseJson === 'Tekrar deneyin'){
          Alert.alert(responseJson);
        } else{
          Alert.alert(responseJson);
        }
        })
        .catch((error) => {
            console.error(error);
        });
    }
} 

  return (
    <View>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16,marginBottom: 15 }}>Yorum Yap</Text>
      </View>

      <Text style={styles.header} >Yorum yapmak istediğiniz taksi plakasını girin:</Text>

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

        <Text style={styles.header}>Yolculuktan memnun kaldınız mı?</Text>

        <StarRating
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          maxStars={5}
          rating={star}
          selectedStar={(rating) => setStar(rating)}
          fullStarColor={'#FFCC4D'}
          starSize={30}
          containerStyle={styles.star}
        />

        <TextInput
          style={styles.comment}
          value={comment}
          onChangeText={setComment}
          placeholder="Yorumunuz..."
          multiline={true}
        />

        <TouchableOpacity style={styles.button} onPress={addComment}>
          <Text style={{ fontWeight: "bold", fontSize: 15, color: 'white' }}>Gönder</Text>
        </TouchableOpacity>  
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
    marginHorizontal: 20,
    marginTop: 15,
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
  comment: {
    marginHorizontal: 25,
    height: 250,
    backgroundColor: 'white',
    marginTop: 15,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  star: {
    marginHorizontal: 50,
    marginTop: 10
  },
  button: {
    backgroundColor: '#e3386a',
    width: 200,
    flexDirection:'row',
    height: 35,
    justifyContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 30
  },
});
