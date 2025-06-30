import { FlatList, StyleSheet } from "react-native";

import { CONSTANTS } from "../../globals";
import { sizer } from "../../helpers";
import { EmptyState } from "../../atom-components";

const HorizontalFlatlist = ({
  data,
  renderItem,
  contentContainerStyle,
  emptyText,
}) => {
  return (
    <FlatList
      data={data}
      horizontal
      renderItem={renderItem}
      keyExtractor={(_, i) => i.toString()}
      showsHorizontalScrollIndicator={false}
      style={{
        marginHorizontal: sizer.moderateScale(-CONSTANTS.containerPaddingX),
      }}
      contentContainerStyle={[
        {
          paddingHorizontal: sizer.moderateScale(CONSTANTS.containerPaddingX),
          gap: 8,
        },
        contentContainerStyle,
      ]}
      ListEmptyComponent={
        <EmptyState width={150} height={150} message={emptyText} />
      }
    />
  );
};

export default HorizontalFlatlist;

const styles = StyleSheet.create({
  emptyData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
