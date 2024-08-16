import { Pressable, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b82f6', // equivalent to bg-blue-500
    width: '100%',
    padding: 12, // equivalent to p-3
    alignItems: 'center',
    borderRadius: 8, // equivalent to rounded-md
  },
  buttonText: {
    color: '#ffffff', // equivalent to text-white
    fontWeight: '600', // equivalent to font-semibold
  },
});
