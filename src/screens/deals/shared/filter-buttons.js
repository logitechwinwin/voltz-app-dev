import { StyleSheet, TouchableOpacity } from "react-native";
import { sizer } from "../../../helpers";
import { COLORS } from "../../../globals";
import { Flex, Typography } from "../../../atom-components";
import { useEffect, useState } from "react";

const FilterButtons = ({
  categories,
  setCurrentCatagory = () => {},
  oneSelect = false,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const toggleCategory = (chip) => {
    if (chip.label === "All" || chip.label === "Saved Deals") {
      setSelectedCategories([]);
      setCurrentCatagory([]);
      if (chip.label === "Saved Deals") {
        setCurrentCatagory("Saved Deals");
        setIsSaved(true);
      } else if (chip.label === "All") {
        setCurrentCatagory("All");
        setIsSaved(false);
      }
    } else {
      if (oneSelect) {
        setSelectedCategories([chip.id]);
        setCurrentCatagory([chip.label]);
      } else {
        setSelectedCategories((prev) => {
          setIsSaved(false);
          const isAlreadySelected = prev.includes(chip.id);
          const updatedCategories = isAlreadySelected
            ? prev.filter((id) => id !== chip.id)
            : [...prev, chip.id];

          setCurrentCatagory(updatedCategories);
          return updatedCategories;
        });
      }
    }
  };
  return (
    <Flex gap={5}>
      {categories.map((chip, i) => {
        if (!chip.label) return;
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => toggleCategory(chip)}
            key={i}
            style={[
              styles.container,
              (chip.label === "All" &&
                !isSaved &&
                !selectedCategories.length) ||
              (chip.label === "Saved Deals" &&
                isSaved &&
                !selectedCategories.length) ||
              selectedCategories.includes(chip.id)
                ? { backgroundColor: COLORS.primary }
                : { backgroundColor: COLORS.lightblue },
            ]}
          >
            <Typography
              text={chip.label}
              color={
                (chip.label === "All" &&
                  !isSaved &&
                  !selectedCategories.length) ||
                (chip.label === "Saved Deals" &&
                  isSaved &&
                  !selectedCategories.length) ||
                selectedCategories.includes(chip.id)
                  ? COLORS.white
                  : COLORS.secondary
              }
              size={14}
              semiBold
            />
          </TouchableOpacity>
        );
      })}
    </Flex>
  );
};

export default FilterButtons;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizer.fontScale(50),
    marginTop: sizer.moderateVerticalScale(24),
    marginBottom: sizer.moderateVerticalScale(17),
    paddingHorizontal: sizer.moderateScale(26),
    paddingVertical: sizer.moderateVerticalScale(6),
  },
});
