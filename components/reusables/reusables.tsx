
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
    //logic for subscription
}

export function PayForSubscription(){
    //logic for payment
}   

export function AddToTheirNotificationList(){
    //logic for checking subscription
}

export function CallUser(caller:string,receiver:string){
    //logic for calling user
}

export function ReportUsers(){
    //logic for reporting users
}
