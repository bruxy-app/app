import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { api } from '../helpers/api';

export default function Home() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const { data } = await api.get('/treatments');

			setData([
				{
					name: 'Concluído',
					progress: data.progress,
					color: '#FFF',
				},
				{
					name: 'Em andamento',
					progress: 100 - data.progress,
					color: '#2176FF',
				},
			]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const chartConfig = {
		backgroundColor: '#FFF',
		backgroundGradientFrom: '#FFF',
		backgroundGradientTo: '#FFF',
		style: {
			borderColor: '#000',
		},
		color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	};

	const screenWidth = Dimensions.get('window').width;
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.cardLabel}>Seu tratamento</Text>

			<PieChart
				accessor={'progress'}
				backgroundColor={'transparent'}
				paddingLeft='-30'
				data={data}
				height={150}
				width={screenWidth}
				chartConfig={chartConfig}
			/>

			<Text style={styles.cardLabel}>Entenda sobre o bruxismo</Text>
			<View style={{ ...styles.infoCard, marginBottom: 10 }}>
				<Text style={{ lineHeight: 20 }}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting, remaining essentially
					unchanged.
				</Text>

				<TouchableOpacity style={styles.infoButton}>Saiba mais</TouchableOpacity>
			</View>

			<Text style={styles.cardLabel}>Como usar o aplicativo</Text>
			<View style={styles.infoCard}>
				<Text style={{ lineHeight: 20 }}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting, remaining essentially
					unchanged.
				</Text>

				<TouchableOpacity style={styles.infoButton}>Saiba mais</TouchableOpacity>
			</View>
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
