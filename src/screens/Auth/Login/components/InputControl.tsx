import React from "react";
import { Input } from "@lavii/ds";
import { Gutter } from "@lavii/ds";
import { Align } from "@lavii/ds";
import { RegularText } from "@lavii/ds";
import { LinkText } from "@lavii/ds";
import { primaryColor } from "@lavii/ds";
import { TextInput } from "react-native";

interface InputControlProps extends React.ComponentProps<typeof Input> {
    label: string;
    textAction?: string;
    onPressTextAction?: () => void;
    inputRef?: React.Ref<TextInput>;
}

export function InputControl({
    label,
    textAction,
    onPressTextAction,
    inputRef,
    ...props
}: InputControlProps) {
    return (
        <Gutter space={8}>
            <RegularText>{label}</RegularText>
            <Input {...props} ref={inputRef} />
            {textAction && (
                <Align alignment="centerRight">
                    <LinkText color={primaryColor} onPress={onPressTextAction}>
                        {textAction}
                    </LinkText>
                </Align>
            )}
        </Gutter>
    );
} 