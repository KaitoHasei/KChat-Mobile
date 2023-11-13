import { Image } from 'react-native';
import { Avatar as AvatarPaper } from 'react-native-paper';

const Avatar = ({ width, height, style, uri, ...props }) => {
  return (
    <>
      {!uri ? (
        <AvatarPaper.Icon
          size={width}
          icon="account"
          style={style}
          {...props}
        />
      ) : (
        <Image
          style={[{ borderRadius: 100 }, style]}
          width={width}
          height={height}
          source={{ uri }}
          {...props}
        />
      )}
    </>
  );
};

export default Avatar;
