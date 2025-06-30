import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import _ from "lodash";

import { FilterIcon, SearchIcon } from "../../assets";
import { sizer } from "../../helpers";
import { COLORS, baseOpacity } from "../../globals";
import { useCallback } from "react";

const SearchField = ({
  value = "",
  setShouldFetch = () => {},
  setValue = () => {},
  rightIcon = false,
  onIconPress = () => {},
  setLoading = () => {},
  setData = () => {},
}) => {
  const debouncedFetch = useCallback(
    _.debounce(() => {
      setShouldFetch(true);
      setLoading(false);
    }, 1500),
    []
  );

  return (
    <View style={styles.container}>
      <View>
        <SearchIcon />
      </View>
      <TextInput
        placeholder="Search"
        placeholderTextColor={COLORS.text}
        style={styles.input}
        value={value}
        onChangeText={(e) => {
          setValue(e);
          setShouldFetch(false);
          debouncedFetch();
          setLoading(true);
          e == "" && setData([]);
        }}
      />
      {rightIcon && (
        <TouchableOpacity
          hitSlop={styles.hitSlop}
          activeOpacity={baseOpacity}
          onPress={onIconPress}
        >
          <FilterIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8E8E931F",
    borderRadius: sizer.fontScale(10),
    paddingHorizontal: sizer.moderateScale(8),
    height: sizer.moderateVerticalScale(40),
  },
  input: {
    flex: 1,
    marginHorizontal: sizer.moderateScale(6),
    paddingVertical: 0,
    color: COLORS.text,
  },
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
});
