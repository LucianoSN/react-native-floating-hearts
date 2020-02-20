import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Heart = props => (
    <View {...props} style={[styles.heart, props.style]}>
        <AntDesign name="heart" size={48} color={props.color} />
    </View>
);

const HeartContainer = () => {
    return (
        <Animated.View style={[styles.heartContainer]}>
            <Heart color="purple" />
        </Animated.View>
    );
};

const Index = () => {
    const [hearts, setHearts] = useState([]);
    const [heartCount, setHeartCount] = useState(1);

    const addHeart = () => {
        setHeartCount(heartCount + 1);
    };

    useEffect(() => {
        setHearts({
            id: heartCount,
        });
    }, [heartCount]);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {hearts.map(heart => {
                    return <HeartContainer key={heart.id} />;
                })}
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
