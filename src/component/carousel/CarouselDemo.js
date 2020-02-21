/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
    View, Dimensions, Text, ScrollView, TouchableOpacity
} from 'react-native';
import MomoCarousel from './MomoCarousel';
import MomoPagination from '../pagination/MomoPagination';
import styles, { sliderWidth, itemWidth } from './styles';


export const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        color: 'red'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        color: 'blue'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        color: 'pink'
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        color: 'yellow'
    },
];

export const ENTRIES2 = [
    {
        title: 'Favourites landscapes 1',
        subtitle: 'Lorem ipsum dolor sit amet',
        color: 'red'
    },
    {
        title: 'Favourites landscapes 2',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        color: 'blue'
    },
    {
        title: 'Favourites landscapes 3',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat',
        color: 'pink'
    },
    {
        title: 'Favourites landscapes 4',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        color: 'yellow'
    },
];

const widthScreen = Dimensions.get('window').width;
const itemHeight = widthScreen * (100 / 427);

const mockData = ['red', 'blue', 'pink', 'yellow'];

const renderBanner = ({ item }) => (<View style={{ width: widthScreen, height: itemHeight, backgroundColor: item }} />);

const renderSilde = ({
    even, title, subtitle, color
}) => (
    <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
    >
        <View style={styles.shadow} />
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
            <View style={[styles.image, { backgroundColor: color }]} />
        </View>
        <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
            {title && (
                <Text
                    style={[styles.titleItem, even ? styles.titleEven : {}]}
                    numberOfLines={2}
                >
                    { title.toUpperCase() }
                </Text>
            )}
            <Text
                style={[styles.subtitleItem, even ? styles.subtitleEven : {}]}
                numberOfLines={2}
            >
                { subtitle }
            </Text>
        </View>
    </TouchableOpacity>
);

const renderItemNormal = ({ item, index }) => renderSilde({
    title: item.title, subtitle: item.title, color: item.color, even: (index + 1) % 2 === 0
});

const renderItemLight = ({ item }) => renderSilde({
    title: item.title, subtitle: item.title, color: item.color
});

const renderCarouselBanner = (number, title, indexPagination, onSnapToItem, loop = false, autoplay) => (
    <View>
        <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <MomoCarousel
            data={mockData}
            renderItem={renderBanner}
            itemWidth={widthScreen}
            sliderWidth={widthScreen}
            loop={loop}
            autoplay={autoplay}
            onSnapToItem={onSnapToItem}
            autoplayInterval={5000}
            autoplayDelay={500}
            removeClippedSubviews={false}
            lockScrollWhileSnapping
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
        />
        <MomoPagination
            activeDotIndex={indexPagination}
            dotsLength={mockData.length}
            containerStyle={styles.dotsArea}
            dotColor="#DADADA"
            inactiveDotColor="transparent"
            dotContainerStyle={styles.dotContainer}
        />
    </View>
);

const momentumExample = (number, title) => (
    <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <MomoCarousel
            data={ENTRIES2}
            renderItem={renderItemNormal}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={1}
            enableMomentum
            activeSlideAlignment="start"
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            activeAnimationType="spring"
            activeAnimationOptions={{
                friction: 4,
                tension: 40
            }}
        />
    </View>
);


const layoutExample = (number, title, type) => {
    const isTinder = type === 'tinder';
    return (
        <View style={[styles.exampleContainer, isTinder ? styles.exampleContainerDark
            : styles.exampleContainerLight]}
        >
            <Text style={[styles.title, isTinder ? {} : styles.titleDark]}>{`Example ${number}`}</Text>
            <Text style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>{title}</Text>
            <MomoCarousel
                data={isTinder ? ENTRIES2 : ENTRIES1}
                renderItem={isTinder ? renderItemLight : renderItemNormal}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                layout={type}
                loop={false}
            />
        </View>
    );
};

const MomoCoverFlowDemo = () => {
    const [indexPaginationLoop, setIndexPaginationLoop] = useState(0);
    const [indexPagination, setIndexPagination] = useState(0);

    const onSnapToItem = (index) => setIndexPagination(index);

    const onSnapToItemLoop = (index) => setIndexPaginationLoop(index);


    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
                {renderCarouselBanner(1, 'Banner with loop', indexPaginationLoop, onSnapToItemLoop, true, true)}
                {renderCarouselBanner(2, 'Banner no loop', indexPagination, onSnapToItem, false, false)}
                {momentumExample(3, 'Momentum | Left-aligned | Active animation')}
                {layoutExample(4, '"Stack of cards" layout', 'stack')}
                {layoutExample(5, '"Tinder-like" layout', 'tinder')}
            </ScrollView>
        </View>
    );
};

export default MomoCoverFlowDemo;
