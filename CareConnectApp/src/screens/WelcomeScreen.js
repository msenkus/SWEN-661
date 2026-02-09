import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

const WelcomeScreen = ({ onNavigate, isTablet = false }) => {
  return (
    <View style={styles.container}>
      {/* Hero Image Section */}
      <View style={styles.heroContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1758686254056-6cd980b9aaee?fm=jpg&q=80&w=1080',
          }}
          style={styles.heroImage}
          accessibilityLabel="Elderly couple enjoying life"
        />

        {/* Gradient Overlay (simulated) */}
        <View style={styles.overlay} />

        {/* Logo Overlay */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Ionicons
              name="heart"
              size={48}
              color="#FFFFFF"
              accessibilityLabel="CareConnect logo"
            />
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View
        style={[
          styles.contentContainer,
          isTablet && styles.tabletContent,
        ]}
      >
        <View style={styles.headerText}>
          <Text style={styles.title}>CareConnect</Text>
          <Text style={styles.subtitle}>
            Empowering independence with care and connection, every single day.
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Get started with CareConnect"
            onPress={() => onNavigate('register')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Log in to existing account"
            onPress={() => onNavigate('login')}
          >
            <Text style={styles.secondaryButtonText}>
              I already have an account
            </Text>
          </Pressable>
        </View>

        <Text style={styles.legalText}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  heroContainer: {
    height: height * 0.55,
    position: 'relative',
  },

  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  logoContainer: {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: [{ translateX: -50 }],
    alignItems: 'center',
  },

  logoBox: {
    width: 96,
    height: 96,
    backgroundColor: '#2563EB',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    transform: [{ rotate: '-6deg' }],
  },

  contentContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: -40,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },

  tabletContent: {
    maxWidth: 700,
    alignSelf: 'center',
    width: '100%',
  },

  headerText: {
    alignItems: 'center',
    marginBottom: 32,
  },

  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },

  buttonGroup: {
    gap: 16,
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  secondaryButton: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: '#334155',
    fontSize: 18,
    fontWeight: '700',
  },

  pressed: {
    transform: [{ scale: 0.98 }],
  },

  legalText: {
    marginTop: 32,
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
