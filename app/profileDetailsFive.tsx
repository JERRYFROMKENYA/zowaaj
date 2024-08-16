import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';

const InterestsAndPersonality = (setData:any,setPage:any) => {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { label: 'Photography', icon: 'camera-alt' },
    { label: 'Shopping', icon: 'shopping-cart' },
    { label: 'Karaoke', icon: 'mic' },
    { label: 'Yoga', icon: 'self-improvement' },
    { label: 'Cooking', icon: 'kitchen' },
    { label: 'Tennis', icon: 'sports-tennis' },
    { label: 'Running', icon: 'directions-run' },
    { label: 'Swimming', icon: 'pool' },
    { label: 'Art', icon: 'palette' },
    { label: 'Travelling', icon: 'flight' },
    { label: 'Extreme Sports', icon: 'sports-mma' },
    { label: 'Music', icon: 'music-note' },
    { label: 'Drinking', icon: 'local-bar' },
    { label: 'Video Games', icon: 'videogame-asset' }
  ];

  const toggleInterest = (interest) => {
    setSelectedInterests(prevSelected =>
      prevSelected.includes(interest)
        ? prevSelected.filter(i => i !== interest)
        : [...prevSelected, interest]
    );
  };

  const renderInterestPill = (interest) => {
    const isSelected = selectedInterests.includes(interest.label);
    return (
      <TouchableOpacity
        key={interest.label}
        style={[styles.pill, isSelected && styles.selectedPill]}
        onPress={() => toggleInterest(interest.label)}
      >
        <Icon name={interest.icon} size={20} color={isSelected ? '#FFFFFF' : '#43CEBA'} style={styles.icon} />
        <Text style={[styles.pillText, isSelected && styles.selectedPillText]}>
          {interest.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.headerText}>Interests and Personality</Text>
      <View style={styles.pillContainer}>
        {interests.map(interest => renderInterestPill(interest))}
      </View>
      <TouchableOpacity
        style={[styles.nextButton, { width: 94, alignSelf: 'flex-end' }]}
        onPress={() => router.push('profileDetailsSix')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>5/7</Text>
        <Progress.Bar progress={0.71} unfilledColor='#E9E9E9' borderColor='#e9e9e9' height={10} color='#43CEBA' width={null} style={{ width: '100%' }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: '600',
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#43CEBA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 6,
    backgroundColor: '#FFFFFF',
  },
  selectedPill: {
    backgroundColor: '#43CEBA',
  },
  pillText: {
    fontSize: 14,
    color: '#43CEBA',
    marginLeft: 8,
  },
  selectedPillText: {
    color: '#FFFFFF',
  },
  icon: {
    marginRight: 8,
  },
  nextButton: {
    backgroundColor: '#43CEBA',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    justifyContent: 'center',
    marginVertical: 20,
  },
  progressText: {
    fontSize: 18,
    color: 'black',
    fontWeight:'semibold',
  },
});

export default InterestsAndPersonality;
