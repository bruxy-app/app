import { View, StyleSheet, ScrollView, Text } from 'react-native';

export default function Treatments() {
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.pageTitle}>Tratamentos</Text>
			<Text style={styles.cardLabel}>Atual</Text>
			<View style={{ ...styles.infoCard, marginBottom: 10 }}>
				<Text style={{ lineHeight: 20 }}>
					Código do tratamento:
					<br />
					Responsável: Francisco Cavasan
					<br />
					Duração: 7 dias
					<br />
					Início: 12/03/2024
				</Text>
			</View>

			<Text style={styles.cardLabel}>Histórico</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	pageTitle: {
		marginBottom: 20,
		fontSize: 28,
	},
	cardLabel: {
		marginBottom: 10,
		fontSize: 16,
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
