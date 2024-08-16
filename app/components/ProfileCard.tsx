import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const ProfileCard = ({ profile }) => {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push({
      pathname: `/profiledetail/${profile.id}`,
      params: { profile: JSON.stringify(profile) }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={handleProfilePress} >

          <Image source={profile.image} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Anita Fritsch, 21</Text>
            <Text style={styles.locationText}>Cape Town, Afrika</Text>
            <View style={styles.tagsContainer}>
              {profile.tags.map((item, index) => (
                <Text key={index} style={styles.tagText}>{item}</Text>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={profile.rejectIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={profile.matchIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={profile.staredIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}

export default ProfileCard

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginBottom: 30,
  },
  cardContainer: {
    position: 'relative',
    marginTop: 10,
    borderRadius: 26,
    overflow: 'visible',
  },
  image: {
    height: 400,
    width: '100%',
    borderRadius: 26,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 20,
  },
  nameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  locationText: {
    color: 'white',
    fontWeight: 'normal',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tagText: {
    color: "white",
    fontSize: 14,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -28,
    left: 0,
    right: 0,
  },
  iconButton: {
    // width: 56,
    // height: 56,
    // marginHorizontal: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    // elevation: 5, // This will give a raised effect on Android
  },
  icon: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
    elevation: 5,
    marginHorizontal: 14
  },
})