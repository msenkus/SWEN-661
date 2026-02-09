import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react-native';

export default function StepByStepTask({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      title: 'Preparation',
      instruction:
        'Find a quiet space with room to move. Make sure you have your exercise mat ready.',
      emoji: '🧘‍♀️',
    },
    {
      title: 'Neck Rotation',
      instruction:
        'Gently turn your head to the right, hold for 5 seconds, then turn to the left.',
      emoji: '🔄',
    },
    {
      title: 'Shoulder Rolls',
      instruction:
        'Roll your shoulders backward 10 times, then forward 10 times. Move slowly and breathe.',
      emoji: '💪',
    },
    {
      title: 'Arm Raises',
      instruction:
        'Raise both arms straight up above your head. Hold for 3 seconds, then lower slowly.',
      emoji: '🙌',
    },
    {
      title: 'Leg Lifts',
      instruction:
        'While seated, lift your right leg straight out. Hold for 5 seconds, then switch legs.',
      emoji: '🦵',
    },
    {
      title: 'Cool Down',
      instruction:
        'Take 5 deep breaths, breathing in through your nose and out through your mouth.',
      emoji: '😌',
    },
  ];

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLast = currentStep === steps.length - 1;

  const next = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (isLast) {
      onNavigate('dashboard');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const previous = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <View style={styles.container}>
      {/* Progress */}
      <View style={styles.progressHeader}>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            Step {currentStep + 1} of {steps.length}
          </Text>
          <Text style={styles.progressPercent}>
            {Math.round(progress)}%
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Emoji */}
        <View style={styles.emojiCard}>
          <Text style={styles.emoji}>{step.emoji}</Text>
        </View>

        {/* Title + Instruction */}
        <Text style={styles.title}>{step.title}</Text>

        <View style={styles.instructionCard}>
          <Text style={styles.instructionText}>{step.instruction}</Text>
        </View>

        {/* Step Dots */}
        <View style={styles.dots}>
          {steps.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                completedSteps.includes(i) && styles.dotDone,
                i === currentStep && styles.dotActive,
              ]}
            />
          ))}
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={styles.footer}>
        {currentStep > 0 && (
          <Pressable style={styles.prevButton} onPress={previous}>
            <ArrowLeft size={18} color="#374151" />
            <Text style={styles.prevText}>Previous</Text>
          </Pressable>
        )}

        <Pressable
          style={[
            styles.nextButton,
            isLast && styles.completeButton,
          ]}
          onPress={next}
        >
          {isLast ? (
            <>
              <CheckCircle2 size={20} color="#FFFFFF" />
              <Text style={styles.nextText}>Complete Task</Text>
            </>
          ) : (
            <>
              <Text style={styles.nextText}>Next Step</Text>
              <ChevronRight size={20} color="#FFFFFF" />
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  /* Progress */
  progressHeader: {
    backgroundColor: '#EFF6FF',
    padding: 16,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  progressText: {
    fontWeight: '600',
    color: '#374151',
  },

  progressPercent: {
    fontWeight: '700',
    color: '#2563EB',
  },

  progressTrack: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
  },

  /* Content */
  content: {
    padding: 20,
  },

  emojiCard: {
    backgroundColor: '#DBEAFE',
    borderRadius: 32,
    paddingVertical: 48,
    alignItems: 'center',
    marginBottom: 24,
  },

  emoji: {
    fontSize: 72,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },

  instructionCard: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#BFDBFE',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },

  instructionText: {
    fontSize: 20,
    color: '#374151',
    lineHeight: 28,
  },

  /* Step indicators */
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#D1D5DB',
  },

  dotActive: {
    width: 28,
    backgroundColor: '#3B82F6',
  },

  dotDone: {
    backgroundColor: '#22C55E',
  },

  /* Footer */
  footer: {
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    gap: 12,
  },

  prevButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  prevText: {
    fontWeight: '600',
    color: '#374151',
  },

  nextButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  completeButton: {
    backgroundColor: '#22C55E',
  },

  nextText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
});
