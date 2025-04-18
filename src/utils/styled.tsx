import { ComponentType, useMemo, forwardRef, PropsWithoutRef } from "react";
import { TextStyle, ViewStyle, ImageStyle } from "react-native";

type Style<T> =
  | TextStyle
  | ViewStyle
  | ImageStyle
  | ((props: T) => TextStyle | ViewStyle | ImageStyle);

export default function styled<Props, T>(
  Component: ComponentType<T>,
  style: Style<T & Props>
) {
  const StyledComponent = forwardRef<any, PropsWithoutRef<Props & T> & { style?: TextStyle | ViewStyle | ImageStyle }>(
    (props, ref) => {
      const resolvedStyle = useMemo(
        () => (typeof style === "function" ? style(props as T & Props) : style),
        [props]
      );

      return <Component {...(props as T)} ref={ref} style={[resolvedStyle, props.style]} />;
    }
  );

  const withSubComponents = <SubComponents extends Record<string, ComponentType<any>>>(
    subComponents: SubComponents
  ) => {
    return Object.assign(StyledComponent, subComponents);
  };

  return Object.assign(StyledComponent, { withSubComponents });
}