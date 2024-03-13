import { ScrollView, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';

export default function TreatmentProgress() {
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.cardLabel}>Relatório</Text>

			<View style={{ ...styles.infoCard, marginBottom: 10 }}></View>

			<View style={styles.infoCard}></View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	cardLabel: {
		marginBottom: 10,
		fontSize: 20,
	},
	infoCard: {
		padding: 10,
		borderRadius: 8,
		backgroundColor: '#E8EAEE',
		justifyContent: 'center',
	},
	infoButton: {
		borderRadius: 100,
		marginTop: 10,
		backgroundColor: '#2176FF',
		color: '#fff',
		width: 150,
		height: 33,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
