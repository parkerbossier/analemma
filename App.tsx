import { AutoFocus, Camera, CameraType } from 'expo-camera';
import { DeviceMotion } from 'expo-sensors';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function App() {
	const [permission, requestPermission] = Camera.useCameraPermissions();

	if (!permission?.granted)
		requestPermission();

	useEffect(
		() => {
			const sub = DeviceMotion.addListener(e => {
				console.log(e.accelerationIncludingGravity);
			});

			return () => {
				DeviceMotion.removeSubscription(sub);
			};
		},
		[]
	);


	return (
		<View style={styles.container}>
			<Camera
				autoFocus={AutoFocus.on}
				style={styles.camera}
				type={CameraType.back}
			/>
			<View style={styles.overlay}>
				<Image
					source={require('./assets/analemma.png')}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
		position: 'relative'
	},
	camera: {
		width: '100%',
		height: '100%'
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%'
	}
});
