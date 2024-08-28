
import { auth, db } from '@/app/firebaseConfig';
import { collection, addDoc, getDoc, doc, updateDoc, query, orderBy, getDocs } from 'firebase/firestore';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function notify(title: string, message: string) {
    return (
        <View style={styles.toast}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    toast: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        color: '#fff',
        fontSize: 16,
    },
});


export function NotifyMessage(title:string,message:string){
    //logic for message notification
}


export function requireSubscription(){
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {

if (docSnap.exists()) {
  if(docSnap.data().accountType === "paid"){
    return(true);
  }
  else if(docSnap.data().accountType === "free"){
    return(false);
  }
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
  return(false);
}})
    //logic for subscription
}

export function PayForSubscription(){
   if(auth.currentUser){ //logic for payment


    //on payment completion
    const docRef = doc(db, "users", auth.currentUser?.uid);
    updateDoc(docRef, {
        accountType: "paid",
        subExpiresOn: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) })
    .then(() => {
        return true;
    })
    return false;
        ;}

}   

export function AddToTheirNotificationList(){
    //logic for checking subscription
}

export function CallUser(caller:string,receiver:string){
    //logic for calling user
}

export async function ReportUsers(accountId:string){
    const docRef = collection(db, "reports");
    addDoc(docRef, {
        accountId,
        reportedBy: auth.currentUser?.uid,
        time: new Date().toISOString(),
    }).then(() => {
        return true;
    })
    return false;


    //logic for reporting users
}

export async function sendNotification(receiver:string, action:string, message:string){

    if(auth.currentUser){const userDocRef = doc(db,"users",auth?.currentUser?.uid);

    const document = await getDoc(userDocRef);
    const displayName= document?.data()?.firstName+" "+document?.data()?.lastName;
    const profilePhoto= document?.data()?.photos[0];
    


    const docRef = collection(db,"users",receiver,"notifications");
    addDoc(docRef,{
        message,
        from:auth.currentUser.uid,
        displayName,
        profilePhoto,
        action,
       
        time: new Date().toISOString()
    }).then(()=>{
        return true
    })
    return false


}
}

export const fetchNotifications = async () => {
    if(auth.currentUser){const queryRef = collection(db, "users", auth.currentUser?.uid, "notifications");
    const notifQuery = query(queryRef, orderBy("time", "desc"));
    let notifications:any[] = [];
    getDocs(notifQuery).then((querySnapshot) => {
        // notifications = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        for (const doc of querySnapshot.docs) {
            notifications.push({...doc.data(), id: doc.id});
            // console.log(notifications);
        }
        
    }).then(() => {
    // console.log(notifications);
    return notifications;
    });

}
else{
    return [];
}

}
