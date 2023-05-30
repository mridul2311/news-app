import { useContext } from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import news from "../data/news";
import { FavoritesContext } from "../store/context/favorites-context";

function ReadLater({ navigation }) {
  const newsCtx = useContext(FavoritesContext);
  newsL = news();

  const readLater = newsL.filter((data) => newsCtx.ids.includes(data.title));

  if (readLater.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no saved news</Text>
      </View>
    );
  }

  function renderNewsItem({ item }) {
    function selectNewsItemHandler() {
      navigation.navigate("Detailed News", {
        item: {
          title: item.title,
          content: item.content,
          urlImage: item.urlToImage,
          url: item.url,
          later: true,
        },
      });
    }

    return (
      <View style={styles.grid}>
        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
          onPress={selectNewsItemHandler}
        >
          <Image
            source={{
              uri: item.urlToImage
                ? item.urlToImage
                : "https://images.uncyclomedia.co/uncyclopedia/en/thumb/0/0e/No_image.PNG/300px-No_image.PNG",
            }}
            style={styles.image}
            alt={"Image doesnt exist"}
          />
          <View style={styles.basicInfo}>
            <Text>{item.source.name}</Text>
            <Text>{item.author}</Text>
          </View>

          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.desc}>{item.description}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={readLater}
        keyExtractor={(item) => item.title}
        renderItem={renderNewsItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default ReadLater;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3f2f25",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  grid: {
    margin: 10,
    backgroundColor: "grey",
    borderRadius: 8,
    padding: 10,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  basicInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  title: {
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  buttonPressed: {
    //for ios pressable
    opacity: 0.5,
  },
  desc: {
    margin: 10,
    justifyContent: "center",
    alignContent: "center",
  },
});
