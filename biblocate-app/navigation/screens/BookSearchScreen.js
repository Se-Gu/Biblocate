import { View, Text } from 'react-native'
import React from 'react'
import Book from '../../components/Book';
import books from '../../data/Data';


const BookSearchScreen = () => {
    return (
        <View style={{marginBottom: 300}}>
            {books.map(({id, title, author}) => {
                return <Book style={{marginBottom: 300}} key={id} title={title} subtitle={author}/>
            })}
        </View>
    )
}

export default BookSearchScreen;