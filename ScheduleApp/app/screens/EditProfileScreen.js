import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Pressable,
    ScrollView,
    TextInput,
  } from "react-native";
  import colors from "../config/colors";
  import IconButton from "../components/ui/IconButton";
  import { useState } from "react";


function EditProfileScreen() {


    const [newHashtag, setnewHashtag] = useState(false);

    const addHashtag = () => {
        setnewHashtag(true);
    }

    const [hashtags, setHashtags] = useState(["#hashtag1", "#hashtag2", "#hashtag3"]); 

    const [temporaryHashtag, setTemporaryHashtag] = useState("");

    const addNewHashtag = () => {
        setHashtags([...hashtags, temporaryHashtag]);
        console.log(temporaryHashtag);
        setTemporaryHashtag("");
        setnewHashtag(false);
    }

    const handleHashtagChange = (text) => {
        const MAX_LENGTH = 15;
        if (text.length <= MAX_LENGTH) {
          setTemporaryHashtag(text);
        }
      };

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.topContainer}>
                <Image 
                style={styles.profileImage}
                source={require("../assets/user.png")}>
                </Image>

                <View style={styles.nameButtonContainer}>
                    <Text style={styles.username}>Username</Text>
                    <Text style={styles.id}>@username</Text>
                    
                    <View style={styles.btnContainer}>
                        <Pressable 
                        style={styles.saveBtn}> 
                        <Text style={{fontSize: 13, color: 'white',marginHorizontal: 5, }}>Save </Text>
                        </Pressable>

                    </View>
                </View>
            </View>



        <View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <View style={styles.category}>
                        <Text style={styles.category}>Name</Text>
                    </View>
                    <View style={styles.category}>
                        <Text style={styles.category}>Username</Text>
                    </View>
                    <View style={styles.category}>
                        <Text style={styles.category}>Password</Text>
                    </View>
                    <View style={styles.category}>
                        <Text style={styles.category}>Hashtag</Text>
                    </View>
                </View>
                <View style={styles.column}>
                         <TextInput
                        style={styles.inputText}
                        placeholder="Enter Name"
                        placeholderTextColor="grey"/>
                        <TextInput
                        style={styles.inputText}
                        placeholder="Enter Username"
                        placeholderTextColor="grey"/>
                        <TextInput
                        style={styles.inputText}
                        placeholder="Enter Password"
                        placeholderTextColor="grey"/>
                        <View style={styles.hashtagContainer}>
                            {hashtags.map((hashtag) => (
                                <View style={styles.oneHashTag}>
                                    <Text style={styles.hashtagText}>{hashtag}</Text>
                                    <IconButton icon="close" color="white" size={16} onPress={()=>{
                                        setHashtags(hashtags.filter((item) => item !== hashtag));
                                    }}/>
                                </View>
                            ))}
                            {!newHashtag
                            ?
                            <IconButton icon="add" color="white" size={20} onPress={()=>{addHashtag(true)}}/>
                            :
                            <View style={styles.row}>
                                <TextInput
                                    value={temporaryHashtag}
                                    style={styles.hashtagText}
                                    placeholder="Enter Hashtag"
                                    placeholderTextColor="grey"
                                    onChangeText={handleHashtagChange}/>
                                <IconButton icon="add" color="white" size={20} onPress={addNewHashtag}/>
                            </View>
                            }
                        </View>
                </View>
            </View>
        </View>
        </SafeAreaView>
    )
};

// import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// const config = require('../config/.config.js');



// function EditProfileScreen() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [nickname, setNickname] = useState("");
//   const [hashtag, setHashtag] = useState("");
//   const [user, setUser] = useState(null);
//   const navigation = useNavigation();

//   const handleSave = async () => {
//     // Save the user's profile information
//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.nickname = nickname;

//     await AsyncStorage.setItem("userData", JSON.stringify(user));
//     setUser(user);
//     const userId = await AsyncStorage.getItem("uid");
//     const res = await axios.put(
//       `${config.BACKEND_URL}/db/${userId}.json`,
//       user
//     );
//     navigation.navigate("ProfileMain")
//   };


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userDataJson = await AsyncStorage.getItem('userData');
//         if (userDataJson !== null) {
//           const userData = JSON.parse(userDataJson);
//           setUser(userData);
//           setFirstName(userData.firstName);
//           setLastName(userData.lastName);
//           setNickname(userData.nickname);
//         }
//       } catch (error) {
//         console.error('Failed to load user data from storage', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <View style={styles.rootContainer}>
//       <Text style={styles.title}>Edit Profile</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="First Name"
//         value={firstName}
//         onChangeText={setFirstName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Last Name"
//         value={lastName}
//         onChangeText={setLastName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Nickname"
//         value={nickname}
//         onChangeText={setNickname}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Hashtag #"
//         value={hashtag}
//         onChangeText={setHashtag}
//       />
//       <Pressable style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.saveButtonText}>Save</Text>
//       </Pressable>
//     </View>
//   );

export default EditProfileScreen;

const styles = StyleSheet.create({
    background: {
      backgroundColor: colors.backgroundColor,
      flex: 1,
    },
    row: {
      flexDirection: "row",
      marginLeft: 30,
    },
    column: {
      flexDirection: "column",

    },
    category:{
        color: 'white',
        fontSize: 18,
        margin: 7,
    },

    inputText: {
      color: 'white',
      fontSize: 16,
      marginLeft: 20,
      marginBottom: 14,
      marginTop: 16,
    },

    hashtagContainer: {
        flex: 0,
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 10,
        marginLeft: 15,
    },
    oneHashTag: {
        backgroundColor: colors.hashtag,
        borderRadius: 10,
        padding: 1,
        marginTop: 5,
        marginRight: 10,
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        justifyContent: "center",
        flexDirection: "row",
    },

    hashtagText: {
        color: 'white',
        fontSize: 16,
        // margin: 5,
        marginBottom: 3,
        padding: 5,
      },
      topContainer:{
        flexDirection: "row",
        alignItems: "flex-start",
        margin: 25,
    },
    profileImage:{
        width: 130,
        height: 130,
        borderRadius: 50,
        alignSelf: "left",
        padding: 10,
        marginRight: 20,
    },

    nameButtonContainer:{
        flexDirection: "column",
        justifyContent: "center",
    },

    username:{
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 3,
        paddingTop: 20,
        color: "white",
    },
    id:{
        fontSize: 15,
        color: "white",
    },
    
    btnContainer:{
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
        marginTop: 10,
    },

    saveBtn:{
        backgroundColor: "gray",
        borderRadius: 8,
        padding: 6,
        alignItems: "center",  
        marginRight: 10, 
    },

    editBtn:{
        backgroundColor: "gray",
        borderRadius: 8,
        padding: 6,
        alignItems: "center",
    },
});

//     rootContainer: {
//         flex: 1,
//         padding: 32,
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: "bold",
//         marginBottom: 16,
//     },
//     input: {
//         height: 40,
//         borderColor: "gray",
//         borderWidth: 1,
//         marginBottom: 16,
//         padding: 8,
//     },
//     saveButton: {
//         backgroundColor: "blue",
//         padding: 16,
//         borderRadius: 8,
//         alignItems: "center",
//     },
//     saveButtonText: {
//         color: "white",
//         fontWeight: "bold",
//     },
// })
// >>>>>>> main
