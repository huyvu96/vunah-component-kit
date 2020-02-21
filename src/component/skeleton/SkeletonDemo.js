import React from 'react';
import {
    StyleSheet, Dimensions, Text
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MomoSkeleton from './MomoSkeleton';

const widthScreen = Dimensions.get('window').width;

const widthImg = widthScreen / 1.9;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 15 },
    txt: { fontSize: 15, color: 'black', marginVertical: 10 }
});

const MomoSkeletonDemo = () => (
    <ScrollView style={styles.container}>
        <Text style={styles.txt}>1 Line</Text>
        <MomoSkeleton type="line" width={widthImg} />
        <Text style={styles.txt}>3 Line</Text>
        <MomoSkeleton type="line" width={widthImg} />
        <MomoSkeleton type="line" width={widthImg} />
        <MomoSkeleton type="line" width={widthImg} noMargin />
        <Text style={styles.txt}>1 Media Round</Text>
        <MomoSkeleton type="media" />
        <Text style={styles.txt}>1 Media Normal</Text>
        <MomoSkeleton type="media" isRound={false} />
        <Text style={styles.txt}>Media Left and Line</Text>
        <MomoSkeleton
            type="custom"
            left={<MomoSkeleton type="media" size={70} />}
        >
            <MomoSkeleton type="line" width={widthImg} />
            <MomoSkeleton type="line" width={150} />
            <MomoSkeleton type="line" width={80} />
        </MomoSkeleton>
        <Text style={styles.txt}>Media right and Line</Text>
        <MomoSkeleton
            type="custom"
            right={<MomoSkeleton type="media" size={70} />}
        >
            <MomoSkeleton type="line" width={widthImg} />
            <MomoSkeleton type="line" width={150} />
            <MomoSkeleton type="line" width={80} />
        </MomoSkeleton>
        <Text style={styles.txt}>Line list</Text>
        {
            [...Array(20).keys()].map((item) => (
                <MomoSkeleton
                    key={item.toString()}
                    type="line"
                    width={widthScreen / 1.2}
                    height={30}
                />
            ))
        }
    </ScrollView>
);

export default MomoSkeletonDemo;
