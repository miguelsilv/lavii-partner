import React, { Component } from "react";
import { ContainerInput, StyledTextInput, IconWrapper } from "./styles";
import { IconButtonProps, InputProps } from "./types";
import { mutedColor } from "@/styles/colors";

export default class InputComponent extends Component<InputProps> {
  public render() {
    const { leftIcon, rightIcon, ...rest } = this.props;

    return (
      <ContainerInput>
        {leftIcon && this.renderIcon(leftIcon, "left")}
        <StyledTextInput {...rest as any} leftIconSize={leftIcon?.size ?? 0} placeholderTextColor={mutedColor}/>
        {rightIcon && this.renderIcon(rightIcon, "right")}
      </ContainerInput>
    );
  }

  private renderIcon(
    iconConfig: IconButtonProps,
    position: "left" | "right" = "right"
  ) {
    const IconComponent = iconConfig.family;

    return (
      <IconWrapper position={position}>
        <IconComponent
          name={iconConfig.name}
          size={iconConfig.size}
          color={iconConfig.color}
          onPress={iconConfig.onPress}
        />
      </IconWrapper>
    );
  }
}
