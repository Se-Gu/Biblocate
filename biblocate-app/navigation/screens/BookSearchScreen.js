import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Book from '../../components/Book';
import books from '../../data/Data';


const BookSearchScreen = () => {
    return (
        <View>
            {books.map(({id, title, author}) => {
                return (
                    <Book key={id} title={title} subtitle={author}/>
                )
            })}
        </View>
    )
}


export default BookSearchScreen;