import { View, Text } from "react-native";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";

const NewBookSearchScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValueChange = (search) => {
    setSearchValue(search);
  };
  return (
    <View>
      <SearchBar
        placeholder="Title"
        lightTheme="true"
        value={searchValue}
        onChangeText={handleSearchValueChange}
        platform="ios"
      />
      <Text>NewBookSearchScreen</Text>
    </View>
  );
};

export default NewBookSearchScreen;
