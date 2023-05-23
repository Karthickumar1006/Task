import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import CustomText from '../customcomponent/CustomText';
import FastImage from 'react-native-fast-image';
import {SwipeListView} from 'react-native-swipe-list-view';
const {windowWidth, windowHeight} = Dimensions.get('window');

import Realm from 'realm';
let realm;

const BookMarked = ({navigation}) => {
  const [bookMark, setbookMark] = useState(true);

  useEffect(() => {
    fetchBookMarkData();
  }, []);

  //Used to fetch data from News_details table from NewDatabases Database
  const fetchBookMarkData = () => {
    realm = new Realm({path: 'NewsDatabases.realm'});
    var News_details = realm.objects('News_details');
    setbookMark(News_details);
  };

  //Used to close the row after deleting the data from DB using swiper
  const closeRow = (rowMap, rowKey) => {
    global.bookmarkIndex = rowKey;
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  //Used to deleting the data from DB using swiper
  const deleteItem = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...bookMark];
    const prevIndex = bookMark.findIndex(item => item.News_id === rowKey);
    deleteUser(rowKey);
    newData.splice(prevIndex, 1);
    setbookMark(newData);
  };

  //Its called when the swiper row open left or right side
  const onItemOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  //Used to call the hiden method like delete in the swiperlist and perfom to do some action
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={() => deleteItem(rowMap, data.item.News_id)}>
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  //Used to delete the row from the News_details table
  const deleteUser = rowKey => {
    realm = new Realm({path: 'NewsDatabases.realm'});
    realm.write(() => {
      if (
        realm.objects('News_details').filtered('News_id =' + rowKey).length > 0
      ) {
        realm.delete(
          realm.objects('News_details').filtered('News_id =' + rowKey),
        );
      }
    });
  };

  //Render item for the flatlsit
  const ItemView = ({item, index, rowMap}) => {
    return (
      <View>
        {item?.News_title && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.renderItem}
            onPress={() => {
              navigation.navigate('DetailedNewsFeed', {
                itemDetail: item,
                indexValue: index,
                bookmarkedDetails: true,
              });
            }}>
            <FastImage
              source={{
                uri: item?.News_url
                  ? item.News_url
                  : 'https://haryana.gov.in/wp-content/themes/sdo-theme/images/default/image-gallery.jpg',
              }}
              style={styles.renderImageItem}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <CustomText text={item?.News_title} textFont={18} padding={'4%'} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <CustomText
          text="Bookmarked"
          textFont={30}
          textFontweight={800}
          margin={'4%'}
        />
        {bookMark.length == 0 ? (
          <View style={styles.bookmarkView}>
            <CustomText
              text="No Bookmarks to show"
              textFont={20}
              textFontweight={400}
              margin={'4%'}
            />
          </View>
        ) : (
          <View style={styles.flatlistView}>
            <SwipeListView
              data={bookMark}
              renderItem={ItemView}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-100}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              keyExtractor={item => item.News_id}
              onRowDidOpen={onItemOpen}
            />
          </View>
        )}
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
  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  deleteBtn: {
    backgroundColor: 'red',
    right: 0,
    borderRadius: 15,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'lightcoral',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  bookmarkView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
  },
});
export default BookMarked;
