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

const RegisterScreen = ({ onNavigate, isTablet = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
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
        <Text style={styles.headerTitle}>Create Account</Text>
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
          {/* Intro */}
          <View style={styles.intro}>
            <View style={styles.iconBox}>
              <Ionicons name="heart" size={32} color="#2563EB" />
            </View>
            <Text style={styles.title}>Join CareConnect</Text>
            <Text style={styles.subtitle}>
              Start your health journey today
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                value={formData.name}
                onChangeText={text => handleChange('name', text)}
                placeholder="John Doe"
                style={styles.input}
                accessibilityLabel="Full name"
              />
            </View>

            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
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
                  value={formData.password}
                  onChangeText={text => handleChange('password', text)}
                  placeholder="Create a password"
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

            {/* Confirm Password */}
            <View style={styles.field}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                value={formData.confirmPassword}
                onChangeText={text =>
                  handleChange('confirmPassword', text)
                }
                placeholder="Confirm your password"
                secureTextEntry
                style={styles.input}
                accessibilityLabel="Confirm password"
              />
            </View>

            {/* Submit */}
            <Pressable
              onPress={handleRegister}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Create a new account"
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.pressed,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.submitText}>Create Account</Text>
                  <Ionicons name="person-add" size={20} color="#FFFFFF" />
                </>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text
                style={styles.linkText}
                onPress={() => onNavigate('login')}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    minHeight: '100%',
  },

  tabletCard: {
    maxWidth: 480,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },

  intro: {
    alignItems: 'center',
    marginBottom: 32,
  },

  iconBox: {
    width: 64,
    height: 64,
    backgroundColor: '#DBEAFE',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
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

  submitButton: {
    marginTop: 12,
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  pressed: {
    transform: [{ scale: 0.98 }],
  },

  footer: {
    marginTop: 32,
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
