import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from "react-native-progress";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const ReligiosityDetails = (setData:any,setPage:any) => {
  const router = useRouter();
  const [sect, setSect] = useState('');
  const [convert, setConvert] = useState('');
  const [practice, setPractice] = useState('');
  const [prayer, setPrayer] = useState('');
  const [diet, setDiet] = useState('');
  const [smoke, setSmoke] = useState('');
  const [tattoos, setTattoos] = useState('');

  const [showSectModal, setShowSectModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [showDietModal, setShowDietModal] = useState(false);
  const [showSmokeModal, setShowSmokeModal] = useState(false);
  const [showTattoosModal, setShowTattoosModal] = useState(false);

  const sectOptions = ['Sunni', 'Shia', 'Other'];
  const convertOptions = ['Yes', 'No'];
  const practiceOptions = ['Very Practicing', 'Moderately Practicing', 'Not Practicing'];
  const prayerOptions = ['Yes', 'No', 'Sometimes'];
  const dietOptions = ['Halal Only', 'Halal and Non-Halal', 'Vegetarian', 'Vegan'];
  const smokeOptions = ['Yes', 'No', 'Occasionally'];
  const tattoosOptions = ['Yes', 'No'];

  
    const grabData=()=>{
      updateDoc(doc(db, "users", auth.currentUser.uid), {
        sect,convert,practice,prayer,diet,smoke,tattoos
      }).then(() => {
        console.log('data',sect,convert,practice,prayer,diet,smoke,tattoos)
        router.push('profilesScreenthree')
      });
      
    }

    const grabDataAndClose=()=>{
      updateDoc(doc(db, "users", auth.currentUser.uid), {
        sect,convert,practice,prayer,diet,smoke,tattoos
      }).then(() => {
        // console.log('data', timeframe,relocate,children,livingArrangements,icebreaker)
        router.push('/(tabs)/profile')
      });
      
    }


    useEffect(()=>{
      const docRef = doc(db, "users", auth.currentUser.uid);
      getDoc(docRef).then((docSnap) => {
  
  if (docSnap.exists()) {
    // router.replace('profileDetailstwo')
    setSect(docSnap.data().sect)
    setConvert(docSnap.data().convert)
    setPractice(docSnap.data().practice)
    setPrayer(docSnap.data().prayer)
    setDiet(docSnap.data().diet)
    setSmoke(docSnap.data().smoke)
    setTattoos(docSnap.data().tattoos)
    
 
  
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }})
    },[1])
  

  const renderSelectInput = (value, placeholder, onPress, iconName) => (
    <TouchableOpacity onPress={onPress} style={styles.selectInput}>
      <Icon name={iconName} size={24} color="#878787" style={styles.icon} />
      <Text style={value ? styles.inputText : styles.placeholderText}>
        {value || placeholder}
      </Text>
      <Icon name="arrow-drop-down" size={24} color="#878787" />
    </TouchableOpacity>
  );

  const renderModalItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.modalItem} onPress={() => onPress(item)}>
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );


 

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.headerText}>Religiosity</Text>
        <View style={styles.inputContainer}>
          {renderSelectInput(sect, 'Muslim Sect', () => setShowSectModal(true), 'group')}
          {renderSelectInput(convert, 'Are you a convert/revert?', () => setShowConvertModal(true), 'compare-arrows')}
          {renderSelectInput(practice, 'Your Religious Practice', () => setShowPracticeModal(true), 'spa')}
          {renderSelectInput(prayer, 'Do you Pray?', () => setShowPrayerModal(true), 'accessibility')}
          {renderSelectInput(diet, 'What is your Diet?', () => setShowDietModal(true), 'restaurant')}
          {renderSelectInput(smoke, 'Do you Smoke?', () => setShowSmokeModal(true), 'smoking-rooms')}
          {renderSelectInput(tattoos, 'Do you have any Tattoos?', () => setShowTattoosModal(true), 'brush')}
        </View>

        {/* Sect Modal */}
        <Modal visible={showSectModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Sect</Text>
              <FlatList
                data={sectOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedSect) => {
                    setSect(selectedSect);
                    setShowSectModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowSectModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Convert Modal */}
        <Modal visible={showConvertModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Are you a convert/revert?</Text>
              <FlatList
                data={convertOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedConvert) => {
                    setConvert(selectedConvert);
                    setShowConvertModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowConvertModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Practice Modal */}
        <Modal visible={showPracticeModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Your Religious Practice</Text>
              <FlatList
                data={practiceOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedPractice) => {
                    setPractice(selectedPractice);
                    setShowPracticeModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowPracticeModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Prayer Modal */}
        <Modal visible={showPrayerModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Do you Pray?</Text>
              <FlatList
                data={prayerOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedPrayer) => {
                    setPrayer(selectedPrayer);
                    setShowPrayerModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowPrayerModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Diet Modal */}
        <Modal visible={showDietModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>What is your Diet?</Text>
              <FlatList
                data={dietOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedDiet) => {
                    setDiet(selectedDiet);
                    setShowDietModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowDietModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Smoke Modal */}
        <Modal visible={showSmokeModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Do you Smoke?</Text>
              <FlatList
                data={smokeOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedSmoke) => {
                    setSmoke(selectedSmoke);
                    setShowSmokeModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowSmokeModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Tattoos Modal */}
        <Modal visible={showTattoosModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Do you have any Tattoos?</Text>
              <FlatList
                data={tattoosOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedTattoos) => {
                    setTattoos(selectedTattoos);
                    setShowTattoosModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowTattoosModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{
  flexDirection: 'row',
  padding: 20}}>

<TouchableOpacity style={{ width: 95, backgroundColor: '#43CEBA', display: 'flex', paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, borderRadius: 14, marginTop: 20, gap: 10, alignSelf: 'flex-end', marginRight: 16 }} 
        onPress={() => {
          grabData()
         
        }} >
          <Text style={{ fontWeight: 'semibold', fontSize: 14, color: 'white', }} >
            Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 100, backgroundColor: '#CE8D43', display: 'flex', paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32, borderRadius: 14, marginTop: 20, gap: 10, alignSelf: 'flex-end', marginRight: 16 }} 
        onPress={() => {
          grabDataAndClose()
         
        }} >
          <Text style={{ fontWeight: 'semibold', fontSize: 14, color: 'white', }} >
            Close
          </Text>
        </TouchableOpacity>
</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 18,
    paddingLeft: 25,
    marginTop: 12,
    fontWeight: '600',
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    paddingBottom: 20,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#878787',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    height: 44,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#878787',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    height: 44,
  },
  inputText: {
    color: 'black',
    fontSize: 14,
  },
  placeholderText: {
    color: '#878787',
    fontSize: 14,
  },
  icon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  modalItemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#43CEBA',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  nextButton: {
    width: 95,
    backgroundColor: '#43CEBA',
    display: 'flex',
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderRadius: 14,
    marginTop: 20,
    gap: 10,
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  nextButtonText: {
    fontWeight: 'semibold',
    fontSize: 14,
    color: 'white',
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 40,
  },
  progressText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'semibold',
  },
});

export default ReligiosityDetails;
