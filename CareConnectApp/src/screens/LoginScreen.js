import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ onNavigate, isTablet = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => onNavigate('welcome')}
          accessibilityRole="button"
          accessibilityLabel="Go back to welcome screen"
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#334155" />
        </Pressable>
        <Text style={styles.headerTitle}>Sign In</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.card,
            isTablet && styles.tabletCard,
          ]}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
              <Ionicons name="heart" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.appName}>CareConnect</Text>
            <Text style={styles.tagline}>
              Manage your health journey with ease
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="name@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                accessibilityLabel="Email address"
              />
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  accessibilityLabel="Password"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  style={styles.eyeButton}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#64748B"
                  />
                </Pressable>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.row}>
              <View style={styles.rememberMe}>
                <Ionicons
                  name="checkbox-outline"
                  size={20}
                  color="#2563EB"
                />
                <Text style={styles.rememberText}>Remember me</Text>
              </View>

              <Pressable accessibilityRole="button">
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </Pressable>
            </View>

            {/* Submit */}
            <Pressable
              onPress={handleLogin}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Sign in to your account"
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.pressed,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.loginText}>Sign In</Text>
                  <Ionicons name="log-in" size={20} color="#FFFFFF" />
                </>
              )}
            </Pressable>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don’t have an account?{' '}
                <Text
                  onPress={() => onNavigate('register')}
                  style={styles.linkText}
                >
                  Sign up for CareConnect
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F9FF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  backButton: {
    padding: 8,
    borderRadius: 20,
  },

  headerTitle: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },

  tabletCard: {
    maxWidth: 480,
    alignSelf: 'center',
    padding: 32,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },

  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: '#2563EB',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    transform: [{ rotate: '3deg' }],
  },

  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
  },

  tagline: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },

  form: {
    gap: 20,
  },

  field: {
    gap: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },

  input: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#0F172A',
  },

  passwordWrapper: {
    position: 'relative',
  },

  eyeButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  rememberText: {
    fontSize: 14,
    color: '#475569',
  },

  forgotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },

  loginButton: {
    marginTop: 12,
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  pressed: {
    transform: [{ scale: 0.98 }],
  },

  footer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    color: '#475569',
  },

  linkText: {
    color: '#2563EB',
    fontWeight: '700',
  },
});
