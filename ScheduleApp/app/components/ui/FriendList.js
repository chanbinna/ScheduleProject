import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import colors from "../../config/colors";
import { getUserProfilePic } from "../../util/http";
import React, { useState, useEffect } from "react";


function FriendList({ friend, handleUnfollow, handleViewSchedule }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfilePic(friend.uid);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [friend.uid]);

  function onPressFunction() {
    handleUnfollow(friend);
  
  }

  return (
    <View style={styles.friendListContainer}>
      <View style={styles.friendListInfo}>
        <View style={styles.friendsUserContainer}>
          <Image
            style={[styles.userImage, { borderRadius: styles.userImage.width / 2 }]}
            source={userData ? { uri: userData } : require("../../assets/user.png")}
          />
          <View style={styles.userNameID}>
            <Text style={styles.userName}>
              {friend.firstName + " " + friend.lastName}
            </Text>
            <Text style={styles.userTag}>{"@" + friend.nickname}</Text>
          </View>

          <Pressable style={styles.unfollowBtn} onPress={() => handleUnfollow(friend)}>
            <Text
              style={{
                fontSize: 12,
                color: colors.textColor,
                paddingHorizontal: 5,
              }}
            >
              Unfollow
            </Text>
          </Pressable>
          <Pressable
            style={styles.viewScheduleBtn}
            onPress={handleViewSchedule}
          >
            <Text
              style={{
                fontSize: 12,
                color: colors.textColor,
                paddingHorizontal: 5,
              }}
            >
              Schedule
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  friendListContainer: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: 60,
    justifyContent: "space-around",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  friendListInfo: {
    color: "#000000",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 15,
  },
  friendsUserContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "auto",
  },
  userImage: {
    height: 45,
    width: 45,
    padding: 5,
    marginRight: 10,
  },

  userName: {
    color: "#6B6B6B",
    fontSize: 18,
    fontWeight: "bold",
  },

  userNameID: {
    flexDirection: "column",
  },

  userTag: {
    color: colors.greyBtn,
    fontSize: 13,
  },

  unfollowBtn: {
    borderRadius: 15,
    backgroundColor: colors.greyBtn,
    padding: 7,
    justifyContent: "center",
    marginLeft: "15%",
  },

  viewScheduleBtn: {
    borderRadius: 15,
    backgroundColor: colors.greyBtn,
    padding: 7,
    justifyContent: "center",
    marginHorizontal: 10,
  },
});

export default FriendList;
