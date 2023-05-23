import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import CustomText from '../customcomponent/CustomText';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
const {windowWidth, windowHeight} = Dimensions.get('window');

import Realm from 'realm';
import InternetCheck from '../Utils/checkIfInternetIsConnected';
import NewsFeedApi from '../Apicall/NewsFeed';
let realm;

const Dashboard = ({navigation}) => {
  const [newsData, setnewsData] = useState('');
  const [loading, setLoading] = useState(true);
  const isInternetConnected = InternetCheck();
  const [loadings, newdata] = NewsFeedApi();
  useEffect(() => {
    getNewsApiFeed(loadings, newdata);
    realm = new Realm({path: 'NewsDatabases.realm'});
  }, [global.newFeed, newdata]);

  // existing the app from the dashboard
  const backPressed = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  //Fetching new feed data from api call
  const getNewsApiFeed = async (loadingData, newsDataVal) => {
    setLoading(loadingData);
    setnewsData(newsDataVal);
    global.newFeed = newsDataVal;
    let itemCount = 0;
    for (const item of global.newFeed) {
      itemCount++;
      item.News_id = itemCount;
    }
  };

  //Render item for the flatlist
  const ItemView = ({item, index}) => {
    return (
      <View>
        {item?.title && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.renderItem}
            onPress={() => {
              navigation.navigate('DetailedNewsFeed', {
                itemDetail: item,
                indexValue: index,
                bookmarkedDetails: false,
              });
            }}>
            <FastImage
              source={{
                uri: item?.urlToImage
                  ? item.urlToImage
                  : 'https://haryana.gov.in/wp-content/themes/sdo-theme/images/default/image-gallery.jpg',
              }}
              style={styles.renderImageItem}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <CustomText text={item?.title} textFont={18} padding={'4%'} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.subheaderView}>
          <View style={styles.subheaderview}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('Login', {update: 'true'});
              }}>
              <FastImage
                source={require('../resource/image/profile.png')}
                style={styles.profileImage}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </TouchableOpacity>
            <CustomText
              text="Dashboard"
              textFont={30}
              textFontweight={800}
              margin={'4%'}
            />
          </View>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('BookMarked');
            }}>
            <CustomText
              text="Bookmark"
              textFont={20}
              textFontweight={500}
              margin={'4%'}
            />
          </TouchableOpacity>
        </View>

        <Spinner visible={loading} textContent={'Please wait...'} />
        <View style={styles.flatlistView}>
          <FlatList
            data={newsData}
            renderItem={ItemView}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#FFF',
  },
  headerView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  subheaderView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subheaderview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistView: {
    flex: 1,
    margin: '7%',
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
  renderItem: {
    marginBottom: '5%',
    backgroundColor: '#D3D3D37C',
    borderRadius: 15,
  },
  renderImageItem: {
    flex: 1,
    borderRadius: 15,
    height: 200,
    borderWidth: 0.1,
  },
  profileImage: {
    width: 30,
    height: 30,
    margin: '4%',
  },
});
export default Dashboard;
