import { View, Text, StyleSheet, SafeAreaView, ScrollView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Book from '../../components/Book';
import books from '../../data/Data';
import SearchBar from '../../components/SearchBar';

const BookSearchScreen = () => {
    const [clicked, setClicked] = useState(false);
    const [searchPhrase, setSearchPhrase] = useState("");

    return (
        <SafeAreaView>
            <SearchBar 
                clicked={clicked} 
                searchPhrase={searchPhrase} 
                setSearchPhrase={setSearchPhrase}
                setClicked={setClicked} 
            ></SearchBar>
            <ScrollView onScrollBeginDrag={() => {
                console.log("dismissed");
                Keyboard.dismiss();
            }}
            keyboardShouldPersistTaps='handled'>
                <Book></Book>
            </ScrollView>
        </SafeAreaView>
    )
}


export default BookSearchScreen;
