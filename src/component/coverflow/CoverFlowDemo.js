import React from 'react';
import {
    StyleSheet, View, Dimensions, Text, TouchableOpacity, Image, ScrollView
} from 'react-native';
import MomoCoverFlow from './MomoCoverflow';

const widthScreen = Dimensions.get('window').width;

const widthImg = widthScreen / 1.9;
const heightImg = widthImg * 1.5;

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentView: { paddingTop: 20, backgroundColor: '#1a191c' },
    img: {
        width: widthImg, height: heightImg, borderRadius: 3, resizeMode: 'cover'
    },
    divide: { width: widthScreen, height: 30 },
    txtHeading: {
        marginVertical: 15, marginLeft: 10, fontSize: 15, color: '#000'
    }
});
const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const renderItem = ({ item = {}, index = 0, onPress = () => {} }) => {
    const onPressItem = () => onPress(index, item);
    const source = { uri: 'https://images-na.ssl-images-amazon.com/images/I/71nEcvXcDqL._SL1500_.jpg' };
    return (
        <TouchableOpacity
            onPress={onPressItem}
            activeOpacity={1}
            key={index}
        >
            <Image
                style={styles.img}
                source={source}
            />
        </TouchableOpacity>
    );
};
const MomoCoverFlowDemo = () => {
    const onSnapToItem = (idx) => {
        console.log('index', idx);
    };

    const getChildrenView = () => mockData.map((item, index) => renderItem({ item, index }));

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.txtHeading}>CoverFlow No Loop</Text>
                <MomoCoverFlow autoplay={false} onChange={onSnapToItem}>
                    {getChildrenView()}
                </MomoCoverFlow>
                <Text style={styles.txtHeading}>CoverFlow Has Loop</Text>
                <MomoCoverFlow onChange={onSnapToItem}>
                    {getChildrenView()}
                </MomoCoverFlow>
            </ScrollView>
        </View>
    );
};

export default MomoCoverFlowDemo;
