import { Text, StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native'
import React, { Component, useState, useRef} from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import Animated, {Layout, Transition, Transitioning, Easing} from 'react-native-reanimated';
import books from '../data/Data';

const Book = () => {
    const [currentIndex, setCurrentIndex] = useState(null);
    const ref = React.useRef();
    
    return (
        <Animated.View>
            {books.map(({id, title, author}, index) => {
                return(
                    <Animated.View
                        key={id}
                        layout={Layout.duration(300).easing(Easing.out(Easing.poly(3)))}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setCurrentIndex(
                                    index === currentIndex ? null : index
                                );
                                Keyboard.dismiss();
                            }}
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
                    </Animated.View>
                )
            })}
        </Animated.View>
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
