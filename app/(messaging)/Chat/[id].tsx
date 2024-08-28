import React from "react";
import {Bubble, GiftedChat} from "react-native-gifted-chat";
import {auth, db} from "../../firebaseConfig";
import { useLocalSearchParams } from 'expo-router';
import {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
}from 'react';
import { TouchableOpacity, Text } from "react-native";
import{
    collection,
    addDoc,
    orderBy,query,
    onSnapshot,
    getDoc,doc,
    updateDoc
}from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function Chat(){
    const { itemId:ide } = useLocalSearchParams();
    const [username, setUsername]=useState('')
    const id = ide.toString().replaceAll('"','');
    console.log(id);
    // const message = JSON.parse(messageString);
    // const id = message.id;
    const getAvatar= () =>{ 

        getDoc(doc(db, "users", auth.currentUser.uid)).then((doc) => {
            if(doc.exists()){
                return doc.data().photos[0];
            }
          
        });
        return "https://i.gravatar.cc/300";
    }

    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={{marginLeft: 10}}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="black"/>
                </TouchableOpacity>
            )
        });
    },[navigation])



    useLayoutEffect(() => {
        const collectionRef = collection(db, "chats",id, "messages" );
        const q = query(collectionRef,orderBy("createdAt","desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const _messages: ((prevState: never[]) => never[]) | { _id: any; text: any; createdAt: any; user: any; }[] = [];
            querySnapshot.forEach((doc) => {
                _messages.push(
                    {
                        _id: doc.id,
                        text: doc.data().text,
                        createdAt: doc.data().createdAt.toDate(),
                        user: doc.data().user
                    }
                );
            });
            setMessages(_messages);
        },[]);

        return ()=> unsubscribe();





    },[])


    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages))

        const {_id, createdAt, text, user} = messages[0];
        addDoc(collection(db, "chats", id,"messages"), {
            _id,
            createdAt,
            text,
            user,
            read:false
        });
        updateDoc(doc(db, "chats", id), {
            lastUpdated: Date.now()
        });

    },[]);


        





    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => {
                onSend(messages);
            }}
            user={{
                _id: auth?.currentUser?.uid ?? "",
                avatar: getAvatar() ,
            }}
            messagesContainerStyle={{
                backgroundColor: "#f0f0f0",
                padding: 1,
            }}
            renderUsernameOnMessage={true}
            renderBubble={(props)=>{
                return <Bubble
                    {...props}
                    wrapperStyle={{
                        right: {
                            backgroundColor: "#6646ee"
                        }, left: {
                            backgroundColor: "#58EBD7"
                        }
                    }} />;
            }}
          
        />
    );
}