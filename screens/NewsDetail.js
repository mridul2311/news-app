import { Button, Image, StyleSheet, Text, View, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useLayoutEffect } from "react";
import { FavoritesContext } from "../store/context/favorites-context";

function NewsDetail({ navigation, route }) {
  const newsCtx = useContext(FavoritesContext);

  const title = route.params.item.title;
  const content = route.params.item.content;
  const urlImage = route.params.item.urlImage;
  const url = route.params.item.url;
  const later = route.params.item.later;

  const newsLater = newsCtx.ids.includes(title);

  function goBack() {
    if (later) {
      navigation.navigate("Later");
    } else navigation.navigate("Latest News");
  }

  function changeFavoriteStatusHandler() {
    if (newsLater) {
      newsCtx.removeFavorite(title);
    } else {
      newsCtx.addFavorite(title);
      //console.log(newsLater);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <Ionicons
            name="arrow-back"
            size={24}
            onPress={goBack}
            color="white"
          />
        );
      },
      headerRight: () => {
        return (
          <Ionicons
            name={newsLater ? "bookmark" : "bookmark-outline"}
            size={20}
            onPress={changeFavoriteStatusHandler}
            color="white"
          />
        );
      },
    });
  }, [navigation, goBack, changeFavoriteStatusHandler]);

  const handleLinkPress = async () => {
    await Linking.openURL(url);
  };

  return (
    <View style={styles.rootContainer}>
      <Image
        source={{
          uri: urlImage
            ? urlImage
            : "https://images.uncyclomedia.co/uncyclopedia/en/thumb/0/0e/No_image.PNG/300px-No_image.PNG",
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text onPress={handleLinkPress} style={styles.url}>
          View full story here
        </Text>
      </View>
    </View>
  );
}

export default NewsDetail;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  url: {
    color: "#1677a8",
    marginVertical: 10,
    textAlign: "center",
    fontSize: 20,
  },
  rootContainer: {
    margin: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 10,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 10,
    fontSize: 18,
  },
  content: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
});
