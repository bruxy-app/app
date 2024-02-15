import { useState } from 'react';
import { Text, Image, TextInput } from 'react-native';

export default function Home() {
	const [text, setText] = useState('');
	return (
		<div>
			<Text>Aloouu</Text>
			<Image
				source={{
					uri: 'https://www.ufmt.br/ocs/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png',
				}}
				style={{ width: 200, height: 200 }}
			/>
			<TextInput
				style={{ height: 40 }}
				placeholder='Digite seu nome'
				onChangeText={(text) => setText(text)}
			/>
			<Text style={{ padding: 10, fontSize: 42 }}>
				{text
					.split(' ')
					.map((word) => word && '🍕')
					.join(' ')}
			</Text>
		</div>
	);
}
