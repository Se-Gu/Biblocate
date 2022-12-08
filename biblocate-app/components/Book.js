import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component, useState, useRef} from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import {Transition, Transitioning} from 'react-native-reanimated';
import books from '../data/Data';

const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200}/>
        <Transition.Change/>
        <Transition.Out type='fade' durationMs={200}/>
    </Transition.Together>
);

const Book = () => {
    const [currentIndex, setCurrentIndex] = useState(null);
    const ref = React.useRef();
    
    return (
        <Transitioning.View
            ref={ref}
            transition={transition}
        >
            {books.map(({id, title, author}, index) => {
                return(
                    <TouchableOpacity
                        key={id}
                        onPress={() => {
                            ref.current.animateNextTransition();
                            setCurrentIndex(index === currentIndex ? null : index);
                        }}
                        activeOpacity={0.8}
                        style={styles.container}
                    >
                        <Card style={styles.book}>
                            <Card.Title title={title} subtitle={author}/>
                            { currentIndex === index && ( 
                            <Card.Content>
                                <Title>Card title</Title>
                                <Paragraph>Card content</Paragraph>
                            </Card.Content>
                            )}
                        </Card>
                    </TouchableOpacity>
                )
            })}
       </Transitioning.View>
    )
}

export default Book;

const styles = StyleSheet.create({
    book: {
        flexGrow: 1,
        backgroundColor: "#fff",
        padding: 0,
        marginTop: 7,
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
        flexGrow: 1,
    }
});
