import {
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  View,
  Text,
} from "react-native";
import React, { useRef } from "react";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import Animated, {
  Layout,
  Easing,
  Transition,
  Transitioning,
} from "react-native-reanimated";

const Book = ({
  book,
  index,
  currentIndex,
  setCurrentIndex,
  setDetails,
  details,
}) => {
  return (
    <Card
      style={
        index === currentIndex
          ? details
            ? styles.details
            : styles.expandedBook
          : styles.collapsedBook
      }
    >
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          if (details) {
            setDetails(false);
          } else {
            setCurrentIndex(index === currentIndex ? null : index);
          }
        }}
      >
        <Card.Content>
          <Title style={styles.text}>{"📖 " + book.Title}</Title>
          <Paragraph style={styles.text.author}>{book.Author}</Paragraph>
          {index === currentIndex && (
            <React.Fragment>
              <Paragraph>Available: {book.CopiesOnOrder}</Paragraph>
            </React.Fragment>
          )}
          {details && (
            <React.Fragment>
              {
                <Paragraph style={{ marginBottom: 15 }}>
                  <Text>ISBN: {book.ISBN.toString()}</Text>
                </Paragraph>
              }
              {book.edition ? (
                <Paragraph style={{ marginBottom: 15 }}>
                  <Text>Edition: {book.Edition}</Text>
                </Paragraph>
              ) : (
                ""
              )}
              {book.callNumber ? (
                <Paragraph style={{ marginBottom: 15 }}>
                  <Text>Call Number: {book.CallNumber}</Text>
                </Paragraph>
              ) : (
                ""
              )}
              {book.title ? (
                <Paragraph style={{ marginBottom: 15 }}>
                  <Text>Title: {book.Title}</Text>
                </Paragraph>
              ) : (
                ""
              )}
              {book.author ? (
                <Paragraph style={{ marginBottom: 15 }}>
                  <Text>Author: {book.Author}</Text>
                </Paragraph>
              ) : (
                ""
              )}
              {book.publicationInfo ? (
                <Paragraph style={{ marginBottom: 15 }}>
                  <Text>Publication Info: {book.YearOfPublication}</Text>
                </Paragraph>
              ) : (
                ""
              )}
            </React.Fragment>
          )}
        </Card.Content>
      </TouchableOpacity>
      {index === currentIndex && (
        <Card.Actions>
          {book.available > 0 && (
            <Button buttonColor="#097969" textColor="#ffffff">
              Navigate
            </Button>
          )}
          {!details && (
            <Button
              onPress={() => {
                setDetails(true);
                setCurrentIndex(index);
              }}
            >
              Details
            </Button>
          )}
        </Card.Actions>
      )}
    </Card>
  );
};

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
    paddingBottom: 10,
    paddingTop: 10,
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
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  details: {
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
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: 7,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    flexGrow: 1,
  },
});
