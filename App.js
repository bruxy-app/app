import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, {useState} from 'react';

export default function App() {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <Text>Aloouu</Text>
      <Image
        source={{
          uri: "https://www.ufmt.br/ocs/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Digite seu nome"
        onChangeText={(text) => setText(text)}
      />
      <Text style={{ padding: 10, fontSize: 42 }}>
        {text
          .split(" ")
          .map((word) => word && "🍕")
          .join(" ")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
