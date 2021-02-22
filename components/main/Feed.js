import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet, Button } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'

function Feed({ following, users, usersLoaded, navigation }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let posts = [];
        if(usersLoaded === following.length && following.length !== 0){
            for(let i = 0; i < following.length; i++){
                const user = users.find(el => el.uid === following[i])
                if (user !== undefined && user.posts.length > 0){
                    posts = [...posts, user.posts]
                }
            }

            posts.sort(function(x, y) {
                return x.creation - y.creation;
            })
            setPosts(posts)
        }
    }, [usersLoaded])

    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.containerImage}>
                            <Text style={styles.container}>{item.user.name}</Text>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            <Text
                                onPress={() => navigation.navigate("Comment", 
                                { postId: item.id, uid: item.user.uid }
                                )}
                            >View Comments...</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerGallery: {
        flex: 1,
    },
    containerImage: {
        flex: 1/3,
    },
    image: {
        flex: 1,
        aspectRatio: 1/1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser, 
    following: store.userState.following,
    users: store.usersState.users,
    usersLoaded: store.usersState.usersLoaded
})

export default connect(mapStateToProps, null)(Feed);
