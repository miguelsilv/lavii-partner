import React, { useState, useRef } from "react";
import {
  Pressable,
  Animated,
  Easing,
  GestureResponderEvent,
  View,
} from "react-native";

import { ContainerButton, RippleEffect } from "./style";
import { SubtitleText } from "../text";
import { primaryColor } from "@/styles/colors";

interface ButtonProps {
  onPress?: () => void;
  title: string;
  outline?: boolean;
}

export default function ButtonComponent({ onPress, title, outline }: ButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rippleSize, setRippleSize] = useState(0);
  const [rippleAnim] = useState(new Animated.Value(0));
  const [rippleVisible, setRippleVisible] = useState(false);

  const buttonRef = useRef<View>(null);

  const handlePressIn = (evt: GestureResponderEvent) => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      const locationX = evt.nativeEvent.pageX - x;
      const locationY = evt.nativeEvent.pageY - y;

      setPosition({ x: locationX, y: locationY });

      const size = Math.max(width, height) * 2;
      setRippleSize(size);

      setRippleVisible(true);

      rippleAnim.setValue(0);
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => setRippleVisible(false));
    });
  };

  const scaleValue = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const opacityValue = rippleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 0],
  });

  return (
    <Pressable onPressIn={handlePressIn} onPress={onPress}>
      {({ pressed }) => (
        <ContainerButton outline={outline} pressed={pressed} ref={buttonRef}>
          <SubtitleText color={outline ? primaryColor : "white"}>
            {title}
          </SubtitleText>

          {rippleVisible && (
            <RippleEffect
              x={position.x}
              y={position.y}
              rippleSize={rippleSize}
              style={{
                transform: [{ scale: scaleValue }],
                opacity: opacityValue,
              }}
            />
          )}
        </ContainerButton>
      )}
    </Pressable>
  );
}
