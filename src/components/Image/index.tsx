import { Image } from "expo-image";
import { ImageProps } from "./types";

export default function ImageComponent({
  height,
  width,
  contentFit,
  source,
}: ImageProps) {
  return (
    <Image
      style={{
        width: "100%",
        ...(height && { height }),
        ...(width && { width }),
      }}
      contentFit={contentFit}
      source={source}
    />
  );
}
