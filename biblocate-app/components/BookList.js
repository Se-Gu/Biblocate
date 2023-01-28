import { StyleSheet } from "react-native";
import React, { Component, useState, useRef, useEffect } from "react";
import Animated, { Layout, Easing } from "react-native-reanimated";
import books from "../data/Data";
import Book from "./Book";
import axios from "axios";

const BookList = ({ details, setDetails }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const ref = React.useRef();
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios
      .get("https://biblocate.azurewebsites.net/api/Books")
      .then(function (response) {
        setBookList(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Animated.View>
      {bookList.map((book, index) => {
        return (
          <Animated.View
            key={book.TitleId}
            layout={Layout.duration(450).easing(Easing.out(Easing.poly(3)))}
          >
            {details ? (
              index === currentIndex && (
                <Book
                  book={book}
                  setCurrentIndex={setCurrentIndex}
                  currentIndex={currentIndex}
                  index={index}
                  setDetails={setDetails}
                  details={details}
                />
              )
            ) : (
              <Book
                book={book}
                setCurrentIndex={setCurrentIndex}
                currentIndex={currentIndex}
                index={index}
                setDetails={setDetails}
                details={details}
              />
            )}
          </Animated.View>
        );
      })}
    </Animated.View>
  );
};

export default BookList;

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
    marginBottom: 10,
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
