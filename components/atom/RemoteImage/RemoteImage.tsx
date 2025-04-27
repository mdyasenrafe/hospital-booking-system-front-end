import {Image, ImageProps, ImageSourcePropType} from 'react-native';

export type RemoteImageProps = Omit<ImageProps, 'source'> & {
  url?: string;
  source?: ImageSourcePropType;
};

export const RemoteImage = ({
  url,
  source,
  style,
  ...rest
}: RemoteImageProps) => {
  const imageSource = source ? source : {uri: url};

  return <Image source={imageSource} {...rest} style={style} />;
};
