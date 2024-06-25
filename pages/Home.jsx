import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';

export default function Home({ route }) {
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
			<Text style={styles.cardLabel}>
				Seja bem-vindo(a) ao Bruxy, um aplicativo para ajudar com o seu tratamento de bruxismo.
			</Text>
			<View style={{ ...styles.infoCard, marginBottom: 10 }}>
				<Text style={{ lineHeight: 20 }}>
					Para inicar o seu tratamento, clique no ícone da prancheta na barra inferior e adicione
					seu código no campo.
				</Text>
			</View>
			<Text style={styles.cardLabel}>Como funciona o aplicativo</Text>
			<View style={styles.infoCard}>
				<Text style={{ lineHeight: 20 }}>
					O Bruxy funciona através do envio de notificações ao longo do dia para fazer o
					acompanhamento do seu caso de bruxismo. Pedimos que você responda às perguntas assim que
					possível, para ter maior precisão nos dados.
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
