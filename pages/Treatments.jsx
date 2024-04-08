import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Treatments() {
	const [data, setData] = useState({});
	const [hasTreatment, setHasTreatment] = useState(false);
	const [treatmentUuid, settreatmentUuid] = useState('');
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
		}
	};
	useEffect(async () => {
		const hasTreatment = await AsyncStorage.getItem('treatmentUuid');
		if (!hasTreatment) {
			getData();
		} else {
			setHasTreatment(true);
		}
	}, []);

	const submitTreatmentUuid = async () => {
		try {
			const { data } = await api.post('/treatments', {
				treatment_uuid: treatmentUuid,
			});

			await AsyncStorage.setItem('treatmentUuid', treatmentUuid);
			setHasTreatment(true);
		} catch (error) {
			console.error(error);
		}
	};

	if (hasTreatment) {
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.pageTitle}>Tratamentos</Text>
				<Text style={styles.cardLabel}>Atual</Text>
				<View style={{ ...styles.infoCard, marginBottom: 10 }}>
					<Text style={{ lineHeight: 20 }}>Código do tratamento: {data.treatment_uuid}</Text>
					<Text>Responsável: {data.responsible}</Text>
					<Text>Duração: {data.duration}</Text>
					<Text>Início: {data.start}</Text>
				</View>

				{/* <Text style={styles.cardLabel}>Histórico</Text> */}
			</ScrollView>
		);
	}

	return (
		<ScrollView>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
					minHeight: 100,
				}}
			>
				<TextInput
					style={styles.input}
					value={treatmentUuid}
					onChangeText={settreatmentUuid}
					placeholder='Código do tratamento'
					keyboardType='default'
				/>

				<TouchableOpacity onPress={submitTreatmentUuid} style={styles.infoButton}>
					<Text>Enviar</Text>
				</TouchableOpacity>
			</View>
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
		alignSelf: 'center',
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
