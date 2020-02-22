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

let heartCount = 1;

const { height } = Dimensions.get('window');

const animationEndY = Math.ceil(height * 0.7);
const negativeEndY = animationEndY * -1;

const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
};

export default class Home extends React.Component {
    state = {
        hearts: [],
    };

    addHeart = () => {
        this.setState(
            {
                hearts: [
                    ...this.state.hearts,
                    {
                        id: heartCount,
                        right: getRandomNumber(20, 150),
                    },
                ],
            },
            () => {
                heartCount++;
            }
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    {this.state.hearts.map(heart => (
                        <HeartContainer
                            key={heart.id}
                            style={{ right: heart.right }}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    onPress={this.addHeart}
                    style={styles.addButton}
                >
                    <AntDesign name="plus" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        );
    }
}

class HeartContainer extends React.Component {
    state = {
        position: new Animated.Value(0),
    };

    componentDidMount() {
        // this.yAnimation = this.state.position.interpolate({
        //     inputRange: [negativeEndY, 0],
        //     outputRange: [animationEndY, 0],
        // });

        Animated.timing(this.state.position, {
            duration: 2000,
            toValue: negativeEndY,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }

    getHeartStyle = () => {
        return {
            transform: [{ translateY: this.state.position }],
        };
    };

    render() {
        return (
            <Animated.View
                style={[
                    styles.heartContainer,
                    this.getHeartStyle(),
                    this.props.style,
                ]}
            >
                <Heart color="purple" />
            </Animated.View>
        );
    }
}

const Heart = props => (
    <View {...props} style={[styles.heart, props.style]}>
        <AntDesign name="heart" size={48} color={props.color} />
    </View>
);

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
