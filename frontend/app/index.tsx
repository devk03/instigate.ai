import { Text, View } from "react-native";
import InstigateButton from "../instigate_components/instigate_button";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <InstigateButton message="1: humanities have a higher creative ceiling, 2: shut the fuck up" />
    </View>
  );
}
