import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from "react-native-progress";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const profileScreenthree = (setData:any,setPage:any) => {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState('');
  const [relocate, setRelocate] = useState('');
  const [children, setChildren] = useState('');
  const [livingArrangements, setLivingArrangements] = useState('');
  const [icebreaker, setIcebreaker] = useState('');

  const [showTimeframeModal, setShowTimeframeModal] = useState(false);
  const [showRelocateModal, setShowRelocateModal] = useState(false);
  const [showChildrenModal, setShowChildrenModal] = useState(false);
  const [showLivingArrangementsModal, setShowLivingArrangementsModal] = useState(false);

  const timeframeOptions = ['Within 1 year', '1-2 years', '2-3 years', '3-5 years'];
  const relocateOptions = ['Yes', 'No', 'Maybe'];
  const childrenOptions = ['Yes', 'No', 'Maybe'];
  const livingArrangementsOptions = ['Living alone', 'Living with family', 'Living with roommates'];

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

  useEffect(()=>{
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  setTimeframe(docSnap.data().timeframe)
  setRelocate(docSnap.data().relocate)
  setChildren(docSnap.data().children)
  setLivingArrangements(docSnap.data().livingArrangements)
  setIcebreaker(docSnap.data().icebreaker)

} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}})
  },[1])

  const grabData=()=>{
    updateDoc(doc(db, "users", auth.currentUser.uid), {
     timeframe,relocate,children,livingArrangements,icebreaker
    }).then(() => {
      console.log('data', timeframe,relocate,children,livingArrangements,icebreaker)
      router.push('/profileDetailsfour')
    });
  }

    const grabDataAndClose=()=>{
      updateDoc(doc(db, "users", auth.currentUser.uid), {
       timeframe,relocate,children,livingArrangements,icebreaker
      }).then(() => {
        console.log('data', timeframe,relocate,children,livingArrangements,icebreaker)
        router.push('/(tabs)/profile')
      });
  }




  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.headerText}>Marriage Intentions</Text>
        <View style={styles.inputContainer}>
          {renderSelectInput(timeframe, 'Looking to get married in', () => setShowTimeframeModal(true), 'calendar-today')}
          {renderSelectInput(relocate, 'Willing to relocate', () => setShowRelocateModal(true), 'location-on')}
          {renderSelectInput(children, 'Do you want any children?', () => setShowChildrenModal(true), 'child-care')}
          {renderSelectInput(livingArrangements, 'What are your Living Arrangements?', () => setShowLivingArrangementsModal(true), 'home')}
          <TextInput
            placeholder='Any Icebreaker Questions?'
            placeholderTextColor={'#878787'}
            style={[styles.input, styles.taglineInput]}
            multiline={true}
            numberOfLines={3}
            value={icebreaker}
            onChangeText={setIcebreaker}
          />
        </View>

        {/* Timeframe Modal */}
        <Modal visible={showTimeframeModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Looking to get married in</Text>
              <FlatList
                data={timeframeOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedTimeframe) => {
                    setTimeframe(selectedTimeframe);
                    setShowTimeframeModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowTimeframeModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Relocate Modal */}
        <Modal visible={showRelocateModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Willing to relocate</Text>
              <FlatList
                data={relocateOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedRelocate) => {
                    setRelocate(selectedRelocate);
                    setShowRelocateModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowRelocateModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Children Modal */}
        <Modal visible={showChildrenModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Do you want any children?</Text>
              <FlatList
                data={childrenOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedChildren) => {
                    setChildren(selectedChildren);
                    setShowChildrenModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowChildrenModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Living Arrangements Modal */}
        <Modal visible={showLivingArrangementsModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>What are your Living Arrangements?</Text>
              <FlatList
                data={livingArrangementsOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedLivingArrangements) => {
                    setLivingArrangements(selectedLivingArrangements);
                    setShowLivingArrangementsModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowLivingArrangementsModal(false)}>
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
}


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
  taglineInput: {
    height: 80,
    textAlignVertical: 'top',
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


export default profileScreenthree
