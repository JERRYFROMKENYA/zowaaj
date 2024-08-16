import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from "react-native-progress";

const LanguageEthnicityEducationCareer = (setData:any,setPage:any) => {
  const router = useRouter();
  const [language, setLanguage] = useState('');
  const [ethnicGroup, setEthnicGroup] = useState('');
  const [ethnicOrigin, setEthnicOrigin] = useState('');
  const [biography, setBiography] = useState('');
  const [profession, setProfession] = useState('');
  const [education, setEducation] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showEthnicGroupModal, setShowEthnicGroupModal] = useState(false);
  const [showEthnicOriginModal, setShowEthnicOriginModal] = useState(false);
  const [showProfessionModal, setShowProfessionModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showJobTitleModal, setShowJobTitleModal] = useState(false);

  const languageOptions = ['English', 'Arabic', 'Urdu', 'Bengali', 'Other'];
  const ethnicGroupOptions = ['Asian', 'Black', 'Hispanic', 'Middle Eastern', 'White', 'Other'];
  const ethnicOriginOptions = ['Indian', 'Pakistani', 'Bangladeshi', 'Arab', 'Turkish', 'Other'];
  const professionOptions = ['Doctor', 'Engineer', 'Teacher', 'Business', 'Other'];
  const educationOptions = ['High School', 'Bachelor\'s', 'Master\'s', 'PhD', 'Other'];
  const jobTitleOptions = ['Manager', 'Developer', 'Designer', 'Analyst', 'Other'];

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
        <Text style={styles.headerText}>Language and Ethnicity</Text>
        <View style={styles.inputContainer}>
          {renderSelectInput(language, 'Languages', () => setShowLanguageModal(true), 'language')}
          {renderSelectInput(ethnicGroup, 'Ethnic Group', () => setShowEthnicGroupModal(true), 'group')}
          {renderSelectInput(ethnicOrigin, 'Ethnic Origin', () => setShowEthnicOriginModal(true), 'flag')}
          <TextInput
            placeholder='Biography'
            placeholderTextColor={'#878787'}
            style={[styles.input, styles.biographyInput]}
            multiline={true}
            numberOfLines={3}
            value={biography}
            onChangeText={setBiography}
          />
        </View>

        <Text style={styles.headerText}>Education and Career</Text>
        <View style={styles.inputContainer}>
          {renderSelectInput(profession, 'Profession', () => setShowProfessionModal(true), 'work')}
          {renderSelectInput(education, 'Education', () => setShowEducationModal(true), 'school')}
          {renderSelectInput(jobTitle, 'Job Title', () => setShowJobTitleModal(true), 'business')}
        </View>

        {/* Language Modal */}
        <Modal visible={showLanguageModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Languages</Text>
              <FlatList
                data={languageOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedLanguage) => {
                    setLanguage(selectedLanguage);
                    setShowLanguageModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowLanguageModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Ethnic Group Modal */}
        <Modal visible={showEthnicGroupModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Ethnic Group</Text>
              <FlatList
                data={ethnicGroupOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedEthnicGroup) => {
                    setEthnicGroup(selectedEthnicGroup);
                    setShowEthnicGroupModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowEthnicGroupModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Ethnic Origin Modal */}
        <Modal visible={showEthnicOriginModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Ethnic Origin</Text>
              <FlatList
                data={ethnicOriginOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedEthnicOrigin) => {
                    setEthnicOrigin(selectedEthnicOrigin);
                    setShowEthnicOriginModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowEthnicOriginModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Profession Modal */}
        <Modal visible={showProfessionModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Profession</Text>
              <FlatList
                data={professionOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedProfession) => {
                    setProfession(selectedProfession);
                    setShowProfessionModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowProfessionModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Education Modal */}
        <Modal visible={showEducationModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Education</Text>
              <FlatList
                data={educationOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedEducation) => {
                    setEducation(selectedEducation);
                    setShowEducationModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowEducationModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Job Title Modal */}
        <Modal visible={showJobTitleModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Job Title</Text>
              <FlatList
                data={jobTitleOptions}
                renderItem={({ item }) => renderModalItem({
                  item,
                  onPress: (selectedJobTitle) => {
                    setJobTitle(selectedJobTitle);
                    setShowJobTitleModal(false);
                  }
                })}
                keyExtractor={(item) => item}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowJobTitleModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.nextButton} onPress={() => router.push('profileDetailsFive')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>4/7</Text>
          <Progress.Bar progress={0.57} unfilledColor='#E9E9E9' borderColor='#e9e9e9' height={10} color='#43CEBA' width={null} style={{ width: '100%' }} />
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
  biographyInput: {
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
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  nextButton: {
    backgroundColor: '#43CEBA',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
    width:94,
    alignSelf:'flex-end'
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    display:'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    color: 'black',
    fontWeight:'semibold',
  },
});

export default LanguageEthnicityEducationCareer;
