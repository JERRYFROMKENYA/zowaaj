import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const interests = [
  { label: 'Nature', icon: 'nature' },
  { label: 'Travel', icon: 'flight' },
  { label: 'Writing', icon: 'create' }
];

const religiosity = [
  { label: "Sunni", icon: "brightness-5" },
  { label: "Halal Only", icon: "restaurant" },
  { label: "Moderately Practicing", icon: "event" },
  { label: "Smokes Occasionally", icon: "smoking-rooms" }
];

const futurePlans = [
  { label: "Wants Children", icon: "child-care" },
  { label: "Will not move abroad", icon: "home" }
];

const languageEth = [
  { label: "English", icon: "language" },
  { label: "Pakistani", icon: "flag" },
  { label: "Grew up in Australia", icon: "place" }
];

const ProfileDetailScreen = () => {
  const { profile: profileString } = useLocalSearchParams();
  const profile = JSON.parse(profileString);

  const renderButtons = (title, items) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.buttonContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.button}>
            <Icon name={item.icon} size={16} color="#43CEBA" />
            <Text style={styles.buttonText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image source={profile.image} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.iconsContainer}>
            <Image source={profile.rejectIcon} style={styles.icon} />
            <Image source={profile.matchIcon} style={styles.icon} />
            <Image source={profile.staredIcon} style={styles.icon} />
          </View>
          <Text style={styles.nameText}>{profile.name}</Text>
          <Text style={styles.locationText}>{profile.address}</Text>
          
          <Text style={styles.bioTitle}>About Me</Text>
          <Text style={styles.bioText}>
            Hi there! I'm Sarah, a 28-year-old graphic designer with a passion for life and a desire to find a meaningful connection. I love exploring new cafes, hiking on weekends, and curling up with a good book. I'm looking for someone who shares my values, can make me laugh, and is ready for a serious relationship. Family is important to me, and I hope to start my own someday. I'm open-minded, curious about the world, and always eager to try new experiences. If you're kind, ambitious, and enjoy deep conversations, we might just hit it off!
          </Text>

          {renderButtons("Religiosity", religiosity)}
          {renderButtons("Future Plans", futurePlans)}
          {renderButtons("Interests", interests)}
          {renderButtons("Language and Ethnicity", languageEth)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.6,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -height * 0.1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: -50,
  },
  icon: {
    width: 56,
    height: 56,
    marginHorizontal: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  bioTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  bioText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#43CEBA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default ProfileDetailScreen;