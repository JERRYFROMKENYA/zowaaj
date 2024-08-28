import { fetchNotifications } from '@/components/reusables/reusables';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const data = [
  { id: '1', name: 'Ariel Hoan', action: 'followed you', time: '5 minutes ago', section: 'Recent', following: true },
  { id: '2', name: 'Ngab Odnan', action: 'followed you', time: '10 minutes ago', section: 'Recent', following: true },
  { id: '3', name: 'Pitter Nedved', action: 'followed you', time: '15 minutes ago', section: 'Recent', following: true },
  { id: '4', name: 'Hansen', action: 'followed you', time: '5 minutes ago', section: 'This Week', following: true },
  { id: '5', name: 'Sam Ari', action: 'comment your photo', time: '5 minutes ago', section: 'This Week', following: false },
  { id: '6', name: 'Setiawan', action: 'Appreciated your photo', time: '5 minutes ago', section: 'This Week', following: false },
  { id: '7', name: 'Bastia Sam Kikuk', action: 'wow amazing', time: '5 minutes ago', section: 'This Week', following: false },
  { id: '8', name: 'Jusrin Yusman', action: 'followed you', time: '5 minutes ago', section: 'This Week', following: true },
  { id: '9', name: 'Ngateno Sam', action: 'followed you', time: '5 minutes ago', section: 'This Week', following: true },
];




const ActivityItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.nameText}>{item.name} <Text style={styles.actionText}>{item.action}</Text></Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
    {item.following && (
      <TouchableOpacity style={styles.followingButton}>
        <Text style={styles.followingText}>Following</Text>
      </TouchableOpacity>
    )}
  </View>
);

const ActivityScreen = () => {
  const [data, setData] = React.useState([]);
  const getData= async () =>{
  fetchNotifications().then((data) => {
    setData(data || []);
  });
  console.log(data);
  };
  useEffect(() => {
    getData();
  }, []);

 
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchNotifications();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Recent</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <ActivityItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <>
            <FlatList
              data={data.filter(item => item.section === 'Recent')}
              renderItem={({ item }) => <ActivityItem item={item} />}
              keyExtractor={item => item.id}
            />
            <Text style={styles.headerText}>This Week</Text>
          </>
        )}
      />
    </View>
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
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontWeight: 'bold',
  },
  actionText: {
    fontWeight: 'normal',
  },
  timeText: {
    color: 'gray',
    fontSize: 12,
    marginTop: 2,
  },
  followingButton: {
    backgroundColor: '#20B2AA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  followingText: {
    color: 'white',
    fontSize: 12,
  },
});

export default ActivityScreen;