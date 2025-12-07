import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>MuscleApp</Text>
        <Text style={styles.title}>Mobile shell ready</Text>
        <Text style={styles.body}>
          This Expo app only verifies the React Native toolchain. Replace it with product UI when
          requirements solidify.
        </Text>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 24
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: '#94a3b8',
    fontSize: 12
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    marginTop: 12
  },
  body: {
    color: '#cbd5f5',
    marginTop: 12,
    lineHeight: 20
  }
});
