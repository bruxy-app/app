import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const onMenuPress = () => {
	console.log('Menu Pressed');
};

export default function Header() {
	return (
		<View style={styles.header}>
			<Text style={{ color: '#fff', fontSize: 18 }}>BRUXY</Text>
			<Icon.Button onPress={onMenuPress} iconStyle={{ margin: 0 }} name='menu' color='#fff' />
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		height: 60,
		padding: 10,
		backgroundColor: '#2176FF',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
