import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getSpecialtyVisual } from '@/constants';

interface SpecialtyIconProps {
    name: string;
    size?: number;
    fontSize?: number;
    borderRadius?: number;
    style?: object;
}

const SpecialtyIcon = ({ name, size = 64, fontSize, borderRadius, style }: SpecialtyIconProps) => {
    const { icon, colors } = getSpecialtyVisual(name);

    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: borderRadius ?? size / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                style,
            ]}
        >
            <Text style={{ fontSize: fontSize ?? size * 0.42 }}>{icon}</Text>
        </LinearGradient>
    );
};

export default SpecialtyIcon;
