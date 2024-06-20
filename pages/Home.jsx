import { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { api } from '../helpers';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ route }) {
	const [hasTreatment, setHasTreatment] = useState('');

	useEffect(() => {
		const getPageData = async () => {
			const hasTreatment = await AsyncStorage.getItem('treatmentUuid');
			if (hasTreatment) {
				setHasTreatment(true);
			}
		};

		getPageData();
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

	if (route.params.updatingNotifications) {
		return (
			// center loading spinner
			<ScrollView style={{ paddingTop: 50, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
				<View style={styles.infoCard}>
					<Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 18 }}>
						Carregando as notificações
					</Text>
					<ActivityIndicator size='large' color='#2176FF' />
				</View>
			</ScrollView>
		);
	}

	return (
		<ScrollView style={styles.container}>
			{/* {hasTreatment ? (
				<View>
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
				</View>
			) : null} */}

			{/* <Text style={styles.cardLabel}>Entenda sobre o bruxismo</Text>
			<View style={{ ...styles.infoCard, marginBottom: 10 }}>
				<Text style={{ lineHeight: 20 }}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting, remaining essentially
					unchanged.
				</Text>

				<TouchableOpacity onPress={() => onPress()} style={styles.infoButton}>
					<Text>Saiba mais</Text>
				</TouchableOpacity>
			</View> */}

			<Text style={styles.cardLabel}>
				Seja bem-vindo(a) ao Bruxy, um aplicativo para ajudar com o seu tratamento de bruxismo.
			</Text>
			<View style={{ ...styles.infoCard, marginBottom: 10 }}>
				<Text style={{ lineHeight: 20 }}>
					O Bruxy ainda está em desenvolvimento, por isso você pode encontrar alguns erros durante o
					uso. Caso encontre algum problema ou tenha alguma sugestão, por favor, entre em contato.
				</Text>
			</View>
			<Text style={styles.cardLabel}>Como funciona o aplicativo</Text>
			<View style={styles.infoCard}>
				<Text style={{ lineHeight: 20 }}>
					O Bruxy funciona através do envio de notificações ao longo do dia para fazer o
					acompanhamento do seu caso de bruxismo. Pedimos que você responda às perguntas assim que
					possível, para ter maior precisão nos dados. Em breve você poderá acompanhar o seu
					tratamento por aqui.
				</Text>
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
