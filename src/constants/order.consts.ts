import { mutedColor, mutedLightColor, primaryColor, primaryLightColor, ScheduleCardAction, ScheduleCardStatusProps, secondaryColor, secondaryLightColor } from "@lavii/ds";
import { OrderStatus } from "@/types/order";

export const scheduleCardStatusProps: Record<OrderStatus, ScheduleCardStatusProps> = {
    [OrderStatus.PAID]: {
        color: primaryColor,
        highlightColor: primaryLightColor,
        text: "Aguardando início",
        action: {
            color: primaryColor,
            text: "Iniciar",
            type: ScheduleCardAction.NEXT,
        },
    },
    [OrderStatus.DONE]: {
        color: secondaryColor,
        highlightColor: secondaryLightColor,
        text: "Concluído",
        action: {
            color: secondaryColor,
            text: "Concluído",
            outline: true,
            type: ScheduleCardAction.NEXT,
            disabled: true,
        },
    },
    [OrderStatus.CANCELED]: {
        color: mutedColor,
        highlightColor: mutedLightColor,
        text: "Cancelado",
        action: {
            color: mutedColor,
            text: "Cancelado",
            outline: false,
            type: ScheduleCardAction.NEXT,
        },
    },
    [OrderStatus.STARTED]: {
        color: secondaryColor,
        highlightColor: secondaryLightColor,
        text: "Em andamento",
        action: {
            color: secondaryColor,
            text: "Concluir",
            type: ScheduleCardAction.NEXT,
            disabled: true,
        },
    },
    [OrderStatus.REJECTED]: {
        color: primaryColor,
        highlightColor: primaryLightColor,
        text: "Procurando novo profissional",
        action: {
            color: primaryColor,
            text: "Cancelar",
            outline: true,
            type: ScheduleCardAction.CANCEL,
        },
    },
}
