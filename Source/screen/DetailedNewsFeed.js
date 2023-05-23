import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import CustomText from '../customcomponent/CustomText';
import FastImage from 'react-native-fast-image';
import Realm from 'realm';

let realm;
const DetailedNewsFeed = ({navigation, route}) => {
  const [bookMark, setbookMark] = useState(true);

  useEffect(() => {
    {
      route.params.itemDetail.urlToImage
        ? route.params.itemDetail.urlToImage
        : 'https://haryana.gov.in/wp-content/themes/sdo-theme/images/default/image-gallery.jpg';
    }
    for (const item of global.newFeed) {
      item.bookmark = false;
    }
  }, [route]);

  // used to Insert a News details in "News_details" table
  const databaseCreated = () => {
    realm = new Realm({path: 'NewsDatabases.realm'});
    realm.write(() => {
      var ID =
        realm.objects('News_details').sorted('News_id', true).length > 0
          ? realm.objects('News_details').sorted('News_id', true)[0].News_id + 1
          : 1;
      realm.create('News_details', {
        News_id: ID,

        News_author_name: route.params.itemDetail.author
          ? route.params.itemDetail.author
          : '',
        News_title: route.params.itemDetail.title
          ? route.params.itemDetail.title
          : '',
        News_url: route.params.itemDetail.urlToImage
          ? route.params.itemDetail.urlToImage
          : 'https://haryana.gov.in/wp-content/themes/sdo-theme/images/default/image-gallery.jpg',
        News_description: route.params.itemDetail.description
          ? route.params.itemDetail.description
          : '',
        News_content: route.params.itemDetail.content
          ? route.params.itemDetail.content
          : '',
      });
    });
  };

  // used to delete a News details in "News_details" table using unique News id
  const deleteUser = id => {
    realm = new Realm({path: 'NewsDatabases.realm'});
    realm.write(() => {
      if (realm.objects('News_details').filtered('News_id =' + id).length > 0) {
        realm.delete(realm.objects('News_details').filtered('News_id =' + id));
        {
          route?.params?.bookmarkedDetails
            ? navigation.navigate('Dashboard')
            : null;
        }
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.subheaderView}>
          <CustomText
            text={
              route?.params?.bookmarkedDetails
                ? 'Bookmark News'
                : 'Detailed News'
            }
            textFont={30}
            textFontweight={800}
            margin={'4%'}
          />
          {!route?.params?.bookmarkedDetails ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setbookMark(!bookMark);
                {
                  !bookMark
                    ? (global.newFeed[
                        route?.params?.indexValue
                      ].bookmark = false)
                    : (global.newFeed[
                        route?.params?.indexValue
                      ].bookmark = true);
                }
                {
                  bookMark
                    ? databaseCreated()
                    : route?.params?.bookmarkedDetails
                    ? null
                    : deleteUser(
                        global.newFeed[route?.params?.indexValue].News_id,
                      );
                }
              }}>
              <FastImage
                source={
                  !global.newFeed[route?.params?.indexValue].bookmark
                    ? require('../resource/image/bookmark-white.png')
                    : require('../resource/image/bookmark-black.png')
                }
                style={styles.profileImage}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                Alert.alert(
                  '',
                  'Do you want remove from bookmark?',
                  [
                    {
                      text: 'Ok',
                      onPress: () => {
                        deleteUser(route?.params?.itemDetail.News_id);
                      },
                    },
                    {
                      text: 'Cancel',
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <FastImage
                source={require('../resource/image/delete.png')}
                style={styles.profileImage}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrolView}>
          <View style={styles.headerView}>
            <View style={styles.itemImage}>
              <FastImage
                source={{
                  uri: route?.params?.bookmarkedDetails
                    ? route?.params?.itemDetail?.News_url
                    : route.params.itemDetail.urlToImage
                    ? route.params.itemDetail.urlToImage
                    : 'https://haryana.gov.in/wp-content/themes/sdo-theme/images/default/image-gallery.jpg',
                }}
                style={styles.renderImageItem}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </View>

            {route?.params?.itemDetail?.author ||
            route?.params?.itemDetail?.News_author_name ? (
              <View style={styles.renderItemView}>
                <CustomText
                  text={'Author :'}
                  textFont={17}
                  flex={0.5}
                  fontWeight={800}
                />
                <CustomText
                  text={
                    route?.params?.bookmarkedDetails
                      ? route?.params?.itemDetail.News_author_name
                      : route?.params?.itemDetail?.author
                  }
                  textFont={17}
                  flex={1}
                  fontWeight={200}
                />
              </View>
            ) : null}

            {route?.params?.itemDetail?.title ||
            route?.params?.itemDetail?.News_title ? (
              <View style={styles.renderItemView}>
                <CustomText
                  text={'Title:'}
                  textFont={17}
                  flex={0.5}
                  fontWeight={800}
                />
                <CustomText
                  text={
                    route?.params?.bookmarkedDetails
                      ? route?.params?.itemDetail.News_title
                      : route?.params?.itemDetail?.title
                  }
                  textFont={17}
                  flex={1}
                  fontWeight={200}
                />
              </View>
            ) : null}

            {route?.params?.itemDetail?.description ||
            route?.params?.itemDetail?.News_description ? (
              <View style={styles.renderItemView}>
                <CustomText
                  text={'Description:'}
                  textFont={17}
                  flex={0.5}
                  fontWeight={800}
                />
                <CustomText
                  text={
                    route?.params?.bookmarkedDetails
                      ? route?.params?.itemDetail.News_description
                      : route?.params?.itemDetail?.description
                  }
                  textFont={17}
                  flex={1}
                  fontWeight={200}
                />
              </View>
            ) : null}

            {route?.params?.itemDetail?.content ||
            route?.params?.itemDetail?.News_content ? (
              <View style={styles.renderItemView}>
                <CustomText
                  text={'Content:'}
                  textFont={17}
                  flex={0.5}
                  fontWeight={800}
                />
                <CustomText
                  text={
                    route?.params?.bookmarkedDetails
                      ? route?.params?.itemDetail.News_content
                      : route?.params?.itemDetail?.content
                  }
                  textFont={17}
                  flex={1}
                  fontWeight={200}
                />
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerView: {
    flex: 1,
    margin: '3%',
    backgroundColor: '#FFF',
  },
  itemImage: {
    height: '40%',
  },
  renderImageItem: {
    flex: 1,
    borderRadius: 15,
    height: '30%',
    borderWidth: 0.1,
  },
  renderItemView: {
    flexDirection: 'row',
    margin: '3%',
  },
  scrolView: {
    flexGrow: 1,
    paddingBottom: 250,
  },
  subheaderView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    margin: '4%',
  },
});
export default DetailedNewsFeed;
