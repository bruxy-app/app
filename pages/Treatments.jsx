import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../helpers/api';

export default function Treatments() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState({});

	const getData = async () => {
		try {
			const { data } = await api.get('/treatments');

			setData({
				treatment_uuid: data.treatment_uuid,
				responsible: data.responsible,
				duration: data.duration,
				start: data.start,
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.pageTitle}>Tratamentos</Text>
			<Text style={styles.cardLabel}>Atual</Text>
			<View style={{ ...styles.infoCard, marginBottom: 10 }}>
				<Text style={{ lineHeight: 20 }}>
					Código do tratamento: {data.treatment_uuid}
					<br />
					Responsável: {data.responsible}
					<br />
					Duração: {data.duration}
					<br />
					Início: {data.start}
				</Text>
			</View>

			{/* <Text style={styles.cardLabel}>Histórico</Text> */}
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
