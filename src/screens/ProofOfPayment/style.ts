import { blackColor } from "@lavii/ds";
import { scaleSize } from "@lavii/ds";
import { styled } from "@lavii/ds";
import { View, Text } from "react-native";

export const Container = styled(View, {
  flex: 1,
  backgroundColor: "white",
});

export const ContentImage = styled(View, {
  marginTop: scaleSize(24),
  alignItems: "center",
  justifyContent: "center",
});
export const ContentDateService = styled(View, {
  marginTop: scaleSize(50),
  alignItems: "center",
  justifyContent: "center",
});
export const LabelText = styled(Text, {
  color: blackColor,
  fontFamily: "Poppins_500Medium",
  fontSize: scaleSize(24),
  height: scaleSize(36),
});
export const DateTimeText = styled(Text, {
  color: blackColor,
  fontFamily: "Poppins_700Bold",
  fontSize: scaleSize(24),
  height: scaleSize(36),
});
export const AmountText = styled(Text, {
  color: blackColor,
  fontFamily: "Poppins_500Medium",
  fontSize: scaleSize(12),
});
export const PriceText = styled(Text, {
  color: blackColor,
  fontFamily: "Poppins_500Medium",
  fontSize: scaleSize(14),
});
export const PriceServiceText = styled(Text, {
  color: blackColor,
  fontFamily: "Poppins_700Bold",
  fontSize: scaleSize(16),
});
export const PaymentMethodText = styled(Text, {
  color: blackColor,
  fontFamily: "Poppins_700Bold",
  fontSize: scaleSize(14),
  height: scaleSize(20),
});
export const SelectedPaymentText = styled(Text, {
  marginTop: scaleSize(8),
  color: blackColor,
  fontFamily: "Poppins_500Medium",
  fontSize: scaleSize(14),
  height: scaleSize(20),
});
export const ContentButton = styled(View, {
  marginTop: scaleSize(22),
  marginHorizontal: scaleSize(24),
});

export const ContentTimeService = styled(View, {
  marginTop: scaleSize(16),
  alignItems: "center",
  justifyContent: "center",
});
export const ContentAmountPaid = styled(View, {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: scaleSize(24),
  marginTop: scaleSize(36),
  height: scaleSize(20),
});
export const ContentChangeValue = styled(View, {
  marginTop: scaleSize(8),
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: scaleSize(24),
  height: scaleSize(20),
});
export const ContentPriceService = styled(View, {
  marginTop: scaleSize(16),
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: scaleSize(24),
  height: scaleSize(24),
});
export const ContentMethodPayment = styled(View, {
  marginTop: scaleSize(24),
  marginHorizontal: scaleSize(24),
});
