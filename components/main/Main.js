import React, { useEffect } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { bindActionCreators } from 'redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../../redux/actions/index'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import FeedScreen from './Feed'
import ProfileScreen from './Profile'
import SearchScreen from './Search'

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return null
}

const Main = ({fetchUser, fetchUserPosts, fetchUserFollowing, clearData, navigation}) => {
    useEffect(() => {
        clearData();
        fetchUser();
        fetchUserPosts();
        fetchUserFollowing();
    }, [])

    return(
        <Tab.Navigator initialRouteName='Feed' labeled={false}>
            <Tab.Screen 
                name="Feed" 
                component={FeedScreen} navigation={navigation}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }}
            />

            <Tab.Screen 
                name="Search" 
                component={SearchScreen} navigation={navigation}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={26}/>
                    ),
                }}
            />

            <Tab.Screen 
                name="AddContainer" 
                component={EmptyScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Add")
                    }
                })}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid})
                    }
                })}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

const mapDispatchProps = (dispatch) => 
    bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing, clearData }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);