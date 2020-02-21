import React, { useState, useEffect } from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
    Easing,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const Heart = props => (
    <View {...props} style={[styles.heart, props.style]}>
        <AntDesign name="heart" size={48} color={props.color} />
    </View>
);

const HeartContainer = props => {
    const state = {
        position: new Animated.Value(0),
    };

    useEffect(() => {
        const animationEndY = Math.ceil(height * 0.7);
        const negativeEndY = animationEndY * -1;

        // state.position.interpolate({
        //     inputRange: [negativeEndY, 0],
        //     outputRange: [animationEndY, 0],
        // });

        Animated.timing(state.position, {
            duration: 2000,
            toValue: negativeEndY,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, [state.position]);

    const getHeartStyle = () => {
        return {
            transform: [{ translateY: state.position }],
        };
    };

    return (
        <Animated.View
            style={[styles.heartContainer, getHeartStyle(), props.style]}
        >
            <Heart color="purple" />
        </Animated.View>
    );
};

const Index = () => {
    const [hearts, setHearts] = useState([]);
    const [heartCount, setHeartCount] = useState(0);

    const addHeart = () => {
        setHeartCount(heartCount + 1);

        setHearts([
            ...hearts,
            { id: heartCount, right: getRandomNumber(20, 150) },
        ]);
    };

    const getRandomNumber = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {hearts.length > 0 &&
                    hearts.map(heart => (
                        <HeartContainer
                            key={heart.id}
                            style={{ right: heart.right }}
                        />
                    ))}
            </View>

            <TouchableOpacity onPress={addHeart} style={styles.addButton}>
                <AntDesign name="plus" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButton: {
        backgroundColor: '#378AD9',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 32,
        left: 32,
    },
    heartContainer: {
        position: 'absolute',
        bottom: 30,
        backgroundColor: 'transparent',
    },
    heart: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
});

export default Index;
