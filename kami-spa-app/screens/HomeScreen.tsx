import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function HomeScreen() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const res = await axios.get('https://kami-backend-5rs0.onrender.com/services', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setServices(res.data);
            } catch (error) {
                console.log('Failed to load services', error);
            }
        };
        fetchServices();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách dịch vụ</Text>
            <FlatList data={services} renderItem={renderItem} keyExtractor={(item) => item._id} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    item: {
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: { fontSize: 16 },
    price: { fontSize: 16, fontWeight: 'bold' }
});
