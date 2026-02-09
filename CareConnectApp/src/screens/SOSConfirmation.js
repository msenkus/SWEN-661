import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';
import {
  Phone,
  AlertCircle,
  ChevronRight,
} from 'lucide-react-native';

const SLIDER_WIDTH = 320;
const KNOB_SIZE = 64;

export default function SOSConfirmation({ onNavigate }) {
  const [countdown, setCountdown] = useState(null);
  const [activated, setActivated] = useState(false);

  const slideX = useRef(new Animated.Value(0)).current;

  /* Countdown logic */
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      setActivated(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  /* Slider gesture */
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        const newX = Math.max(
          0,
          Math.min(gesture.dx, SLIDER_WIDTH - KNOB_SIZE)
        );
        slideX.setValue(newX);
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > (SLIDER_WIDTH - KNOB_SIZE) * 0.9) {
          Animated.timing(slideX, {
            toValue: SLIDER_WIDTH - KNOB_SIZE,
            duration: 150,
            useNativeDriver: false,
          }).start(() => setCountdown(3));
        } else {
          Animated.spring(slideX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  /* ACTIVATED STATE */
  if (activated) {
    return (
      <View style={styles.activeContainer}>
        <View style={styles.pulse}>
          <Phone size={64} color="#FFFFFF" />
        </View>
        <Text style={styles.activeTitle}>Calling Emergency Services</Text>
        <Text style={styles.activeSub}>Emergency Services (911)</Text>

        <Pressable
          style={styles.endButton}
          onPress={() => {
            setActivated(false);
            setCountdown(null);
            slideX.setValue(0);
            onNavigate('dashboard');
          }}
        >
          <Text style={styles.endButtonText}>End Call</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Warning */}
      <View style={styles.warning}>
        <AlertCircle size={36} color="#FFFFFF" />
        <Text style={styles.warningTitle}>Emergency Assistance</Text>
        <Text style={styles.warningText}>
          Slide to immediately call emergency services.
        </Text>
      </View>

      {/* Countdown */}
      {countdown !== null ? (
        <View style={styles.countdownBox}>
          <Text style={styles.countdown}>{countdown}</Text>
          <Text style={styles.countdownLabel}>
            Calling Emergency Services…
          </Text>
          <Pressable
            style={styles.cancelButton}
            onPress={() => {
              setCountdown(null);
              slideX.setValue(0);
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* SLIDER */}
          <Text style={styles.slideLabel}>
            Slide to Call Emergency Services
          </Text>

          <View style={styles.slider}>
            <View style={styles.chevrons}>
              <ChevronRight size={24} color="rgba(255,255,255,0.4)" />
              <ChevronRight size={24} color="rgba(255,255,255,0.4)" />
              <ChevronRight size={24} color="rgba(255,255,255,0.4)" />
            </View>

            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.knob,
                {
                  transform: [{ translateX: slideX }],
                },
              ]}
            >
              <Phone size={28} color="#EF4444" />
            </Animated.View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F8FAFC',
    flexGrow: 1,
  },

  warning: {
    backgroundColor: '#EF4444',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
  },

  warningTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8,
  },

  warningText: {
    color: '#FEE2E2',
    marginTop: 4,
  },

  slideLabel: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0F172A',
  },

  slider: {
    width: SLIDER_WIDTH,
    height: 80,
    backgroundColor: '#EF4444',
    borderRadius: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 32,
    overflow: 'hidden',
  },

  chevrons: {
    position: 'absolute',
    right: 24,
    flexDirection: 'row',
    gap: 6,
  },

  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    backgroundColor: '#FFFFFF',
    borderRadius: KNOB_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    elevation: 6,
  },

  countdownBox: {
    alignItems: 'center',
    marginTop: 48,
  },

  countdown: {
    fontSize: 72,
    fontWeight: '800',
    color: '#DC2626',
  },

  countdownLabel: {
    fontSize: 18,
    marginVertical: 16,
  },

  cancelButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 16,
  },

  cancelText: {
    fontWeight: '700',
  },

  activeContainer: {
    flex: 1,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  pulse: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    padding: 24,
    borderRadius: 999,
    marginBottom: 24,
  },

  activeTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },

  activeSub: {
    color: '#FEE2E2',
    fontSize: 16,
    marginBottom: 32,
  },

  endButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 20,
  },

  endButtonText: {
    color: '#DC2626',
    fontWeight: '800',
    fontSize: 16,
  },
});
