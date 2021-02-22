import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Button, TextInput } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsersData } from '../../redux/actions/index'

function Comment({ route, users, fetchUsersData }) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState('')
    const [text, setText] = useState('')

    useEffect(() => {

        function matchUserToComment(comments){
            for(let i = 0; i < comments.length; i++){
                if(comments[i].hasOwnProperty('user')){
                    continue;
                }
                const user = users.find(x => x.uid === comments[i].creator)
                if(user === undefined){
                    fetchUsersData(comments[i].creator, false)
                }else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        }

        if(route.params.postId !== postId){
            firebase.firestore()
                .collection('posts')
                .doc(route.params.uid)
                .collection('userPosts')
                .doc(route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data()
                        const id = doc.id;
                        return { id, ...data }
                    })
                    matchUserToComment(comments)
                })    
            setPostId(route.params.postId) 
        }else {
            matchUserToComment(comments)
        }
    }, [route.params.postId, users])
    
    const onCommentSend = () => {
        firebase.firestore()
            .collection('posts')
            .doc(route.params.uid)
            .collection('userPosts')
            .doc(route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }

    return (
        <View>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.text}</Text>
                    </View>
                )}
            />
            <View>
                <TextInput
                    placeholder='comment. . .'
                    onChangeText={setText}
                />
                <Button
                    title='Post'
                    onPress={onCommentSend}
                />
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    users: store.usersState.users,
})

const mapDispatchProps = (dispatch) => 
    bindActionCreators({ fetchUsersData }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Comment);