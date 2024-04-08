import { View, StyleSheet, Text } from 'react-native';

export default function Header() {
	return (
		<View style={styles.header}>
			<Text style={{ color: '#fff', fontSize: 18 }}>BRUXY</Text>
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
