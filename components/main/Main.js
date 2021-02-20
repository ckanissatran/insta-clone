import React, { useEffect } from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetchUser, fetchUserPosts } from '../../redux/actions/index'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import FeedScreen from './Feed'
import ProfileScreen from './Profile'

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
    return null
}

const Main = ({fetchUser, fetchUserPosts, currentUser}) => {
    useEffect(() => {
        fetchUser();
        fetchUserPosts();
    }, [])

    return(
        <Tab.Navigator initialRouteName='Feed' labeled={false}>
            <Tab.Screen 
                name="Feed" 
                component={FeedScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
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
    bindActionCreators({ fetchUser, fetchUserPosts }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);