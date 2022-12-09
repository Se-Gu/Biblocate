import {
    StyleSheet,
    TouchableOpacity,
    Keyboard,
} from "react-native";
import React from "react";
import { Button, Card, Title, Paragraph } from "react-native-paper";


const Book = ({book, index, currentIndex, setCurrentIndex, setDetails, details}) => {
    
    return (
    <Card style={ index === currentIndex ? styles.expandedBook : styles.collapsedBook}>
        <TouchableOpacity 
            onPress={() => {
                console.log('perssed')
                setCurrentIndex(index === currentIndex ? null : index);
                Keyboard.dismiss();
                if(details) {setDetails(false)};
            }}
        >
            <Card.Content>
                <Title style={styles.text}>{"📖 " + book.title}</Title>
                <Paragraph style={styles.text.author}>{book.author}</Paragraph>
                { index === currentIndex && (
                    <React.Fragment>
                        <Paragraph>Available: {book.available}</Paragraph>
                        <Paragraph style={{ marginBottom: 15 }}>{book.summary}</Paragraph>
                    </React.Fragment>
                )}
            </Card.Content>
        </TouchableOpacity>
            {(index === currentIndex) && (
                <Card.Actions>                     
                    { book.available > 0 && (
                     <Button>Navigate</Button>
                     )}
                     {!details && (
                <Button
                    onPress={() => {
                    console.log("asdf");
                    setDetails(true);
                    }}
                >
                    Details
                </Button>
                     )}
                </Card.Actions>
            )}
    </Card>
    )
}

export default Book;

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: "row",
    },
    expandedBook: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
        flexGrow: 1,
        backgroundColor: "#fff",
        padding: 0,
        marginTop: 7,
        marginBottom: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    text: {
        author: {
            font: 19,
        },
    },
    collapsedBook: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.2,
        elevation: 0.2,
        flexGrow: 1,
        backgroundColor: "#FDFDFC",
        padding: 0,
        marginTop: 7,
        marginLeft: 10,
        marginRight: 10,
    },
    container: {
        flexGrow: 1,
    },
});
