import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image,
    ScrollView,
} from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import confused from '../assets/confused.png';
import ellipse from '../assets/ellipse.png';

const EditNameScreen = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    //var userId = '';

    const [userId, setUserId] = useState('');

    let tempUserId = '';

    useEffect(() => {
        const getUserId = async () => {
            console.log('heloo----');
            tempUserId = await AsyncStorage.getItem('userId');
            console.log(tempUserId);

            setUserId(tempUserId);
        };

        getUserId();
    }, []);

    const setMyUser = async () => {
        const setUser = async () => {
            await AsyncStorage.setItem('User', `${name}`);
            navigation.navigate('Category Screen');
        };

        await setUser();
    };

    const handleName = () => {
        setLoading(true);
        console.log(userId, 'userid');
        var data = JSON.stringify({
            userId: userId,
            username: `${name}`,
        });

        var config = {
            method: 'put',
            url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/editUser',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setLoading(false);
                Alert.alert('Name Successfully Changed');
                setMyUser();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <ScrollView>
                <LinearGradient
                    colors={['#5A2D94', '#f2748e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        backgroundColor: '#FFF',
                        margin: verticalScale(15),
                        borderRadius: moderateScale(15),
                        paddingBottom: verticalScale(80),
                    }}>
                    <Text
                        style={{
                            color: '#FFF',
                            fontSize: moderateScale(20),
                            alignSelf: 'center',
                            fontFamily: 'Ubuntu-Bold',
                            marginTop: verticalScale(30),
                        }}>
                        Reset Name
                    </Text>
                    <Image
                        source={ellipse}
                        style={{
                            height: verticalScale(150),
                            width: scale(150),
                            position: 'relative',
                            alignSelf: 'center',
                            resizeMode: 'contain',
                            marginTop: verticalScale(50),
                        }}
                    />
                    <Image
                        source={confused}
                        style={{
                            height: verticalScale(80),
                            width: scale(100),
                            position: 'absolute',
                            resizeMode: 'contain',
                            marginTop: verticalScale(135),
                            marginLeft: scale(113),
                        }}
                    />
                    <TextInput
                        onChangeText={text => {
                            setName(text);
                        }}
                        style={{
                            fontSize: moderateScale(12),
                            borderColor: '#FFF',
                            borderBottomWidth: 1,
                            borderBottomColor: '#ffffff80',
                            //borderWidth: 1,
                            height: verticalScale(45),
                            //borderRadius: moderateScale(100),
                            marginTop: verticalScale(15),
                            marginLeft: scale(20),
                            paddingLeft: moderateScale(15),
                            marginRight: scale(20),
                            color: '#FFF',
                            fontFamily: 'Ubuntu-Regular',
                        }}
                        placeholder="Enter New Name"
                        placeholderTextColor="#FFF"
                        keyboardType="email-address"></TextInput>
                    {loading == true ? (
                        <ActivityIndicator
                            color="#FFF"
                            size={'large'}
                            style={{
                                marginTop: verticalScale(10),
                            }}
                        />
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                if (name.length > 0) {
                                    handleName();
                                } else {
                                    Alert.alert('Enter Valid Name');
                                }
                            }}>
                            <View
                                style={{
                                    alignSelf: 'center',

                                    width: scale(280),
                                    height: verticalScale(45),
                                    marginTop: verticalScale(20),
                                    backgroundColor: '#000',
                                    borderRadius: moderateScale(10),
                                    padding: moderateScale(10),
                                    width: scale(220),
                                }}>
                                <Text
                                    style={{
                                        fontSize: moderateScale(14),
                                        textAlign: 'center',
                                        paddingTop: verticalScale(5),
                                        fontFamily: 'Ubuntu-Regular',
                                        color: '#FFF',
                                    }}>
                                    Save New Name
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </LinearGradient>
            </ScrollView>
        </>
    );
};

export default EditNameScreen;
