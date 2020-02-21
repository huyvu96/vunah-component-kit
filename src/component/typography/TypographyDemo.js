import React, { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MomoTitle from './MomoTitle';
import MomoText from './MomoText';
import MomoParagraph from './MomoParagraph';

const MOMO_TEXT = 'Momo Component Kit';
const MOMO_PARAGRAPH = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore';

const styles = StyleSheet.create({
    marginTop: { marginTop: 10 },
});

const TypographyDemo = () => (
    <ScrollView style={{ paddingHorizontal: 10 }}>

        <MomoTitle style={styles.marginTop}>H1. Heading 1</MomoTitle>

        <MomoTitle style={styles.marginTop} level={2}>H2. Heading 2</MomoTitle>

        <MomoTitle style={styles.marginTop} level={3}>H3. Heading 3</MomoTitle>

        <MomoTitle style={styles.marginTop} level={4}>H4. Heading 4</MomoTitle>


        <MomoText style={styles.marginTop} font="regular" size="paragraph1" color="red">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} type="back" font="bold" size="paragraph2">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} type="primary" font="semibold" size="paragraph1">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} type="white" font="heavy" size="paragraph2">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} type="disabled" font="light" size="paragraph1">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} type="hint" font="thin" size="paragraph2">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} type="success" font="ultralight" size="paragraph2">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} type="danger" size="caption1">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} type="warning" size="caption1">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} type="link" size="caption2">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} type="placeholder" size="caption2">{MOMO_TEXT}</MomoText>

        <MomoText style={styles.marginTop} underline size="caption2">{MOMO_TEXT}</MomoText>


        <MomoParagraph style={styles.marginTop} rows={2} ellipsizeMode="head" type="primary" size="paragraph1">
            {MOMO_PARAGRAPH + MOMO_PARAGRAPH}
        </MomoParagraph>

        <MomoParagraph style={styles.marginTop} rows={3} ellipsizeMode="middle" type="danger" size="paragraph2">
            {MOMO_PARAGRAPH + MOMO_PARAGRAPH}
        </MomoParagraph>

        <MomoParagraph style={styles.marginTop} rows={4} ellipsizeMode="tail" type="link" size="paragraph1">
            {MOMO_PARAGRAPH + MOMO_PARAGRAPH + MOMO_PARAGRAPH + MOMO_PARAGRAPH}
        </MomoParagraph>

        <MomoParagraph style={styles.marginTop} rows={10} type="warning" size="paragraph1">
            {MOMO_PARAGRAPH + MOMO_PARAGRAPH + MOMO_PARAGRAPH + MOMO_PARAGRAPH + MOMO_PARAGRAPH}
        </MomoParagraph>

    </ScrollView>
);


export default memo(TypographyDemo);
