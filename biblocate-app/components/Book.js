import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default class Book extends Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.subtitle = props.subtitle;
    }
    render() {
        return (
        <Card>
            <Card.Title title={this.title} subtitle={this.subtitle}/>
        </Card>
        )
    }
}

const styles = StyleSheet.create({})