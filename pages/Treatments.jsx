import { View, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { api } from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleNotifications } from '../helpers';

export default function Treatments() {
	const [data, setData] = useState({});
	const [hasTreatment, setHasTreatment] = useState(false);
	const [treatmentUuid, setTreatmentUuid] = useState('');
	const getData = async (treatmentUuid) => {
		try {
			const response = await api.get('/treatments/' + treatmentUuid);

			setData({
				treatment_uuid: response.uuid,
				responsible: response.responsible.name,
				duration: response.duration,
				start: response.starts_at,
			});

			setHasTreatment(true);
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		const getPageData = async () => {
			const treatmentUuid = await AsyncStorage.getItem('treatmentUuid');
			if (treatmentUuid) {
				getData(treatmentUuid);
			}
		};

		getPageData();
	}, []);

	const submitTreatmentUuid = async () => {
		try {
			const response = await api.post('/treatments/start', {
				treatment_uuid: treatmentUuid,
			});

			setData({
				treatment_uuid: response.uuid,
				responsible: response.responsible.name,
				duration: response.duration,
				start: response.starts_at,
			});

			await AsyncStorage.setItem('treatmentUuid', treatmentUuid);
			scheduleNotifications(treatmentUuid);
			setHasTreatment(true);
		} catch (error) {
			console.error(error);
		}
	};

	if (hasTreatment) {
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.pageTitle}>Tratamento</Text>
				{/* <Text style={styles.cardLabel}>Atual</Text> */}
				<View style={styles.infoCard}>
					<Text selectable={true} style={{ lineHeight: 20 }}>
						Código do tratamento: {data.treatment_uuid}
					</Text>
					<Text>Responsável: {data.responsible}</Text>
					<Text>
						Duração: {data.duration} {data.duration > 1 ? 'dias' : 'dia'}
					</Text>
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
					onChangeText={setTreatmentUuid}
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
		marginBottom: 10,
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
		width: 300,
		padding: 10,
	},
});
