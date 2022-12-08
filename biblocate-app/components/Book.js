import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.subtitle = props.subtitle;
    }
    render() {
        return (
        <Card style={styles.book}>
            <Card.Title title={this.title} subtitle={this.subtitle}/>
        </Card>
        )
    }
}

const styles = StyleSheet.create({
    book: {
      backgroundColor: "#fff",
      padding: 0,
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
    },
  });
