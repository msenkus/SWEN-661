import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Subtitles,
  ChevronRight,
} from 'lucide-react-native';

const ASLHelpScreen = ({ onNavigate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);

  const aslVideos = [
    { id: 1, title: 'How to Take Your Medication', duration: '2:45', emoji: '💊' },
    { id: 2, title: 'Understanding Your Daily Tasks', duration: '3:20', emoji: '📋' },
    { id: 3, title: 'Using the SOS Button', duration: '1:30', emoji: '🆘' },
    { id: 4, title: 'Setting Up Reminders', duration: '2:15', emoji: '⏰' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Featured Video */}
      <View style={styles.videoCard}>
        <View style={styles.videoDisplay}>
          <Text style={styles.aslEmoji}>🤟</Text>
          <Text style={styles.videoTitle}>ASL Interpretation</Text>

          {showCaptions && (
            <View style={styles.captionOverlay}>
              <Text style={styles.captionText}>
                Welcome to CareConnect. This video will show you how to take your
                medication safely.
              </Text>
            </View>
          )}
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <View style={styles.controlRow}>
            <Pressable
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause size={24} color="#FFFFFF" />
              ) : (
                <Play size={24} color="#FFFFFF" />
              )}
            </Pressable>

            <View style={styles.controlIcons}>
              <Pressable onPress={() => setIsMuted(!isMuted)}>
                {isMuted ? (
                  <VolumeX size={24} color="#FFFFFF" />
                ) : (
                  <Volume2 size={24} color="#FFFFFF" />
                )}
              </Pressable>

              <Pressable onPress={() => setShowCaptions(!showCaptions)}>
                <Subtitles
                  size={24}
                  color={showCaptions ? '#60A5FA' : '#FFFFFF'}
                />
              </Pressable>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.timeRow}>
            <Text style={styles.timeText}>0:45</Text>
            <Text style={styles.timeText}>2:45</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>How to Take Your Medication</Text>
      <Text style={styles.sectionSubtitle}>
        Learn the step-by-step process with ASL interpretation and captions
      </Text>

      {/* Video Library */}
      <Text style={styles.libraryTitle}>More Help Videos</Text>

      {aslVideos.map((video) => (
        <Pressable key={video.id} style={styles.videoRow}>
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailEmoji}>{video.emoji}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.videoRowTitle}>{video.title}</Text>
            <View style={styles.badgeRow}>
              <Text style={styles.badge}>ASL + Captions</Text>
              <Text style={styles.duration}>{video.duration}</Text>
            </View>
          </View>

          <ChevronRight size={20} color="#94A3B8" />
        </Pressable>
      ))}

      {/* Accessibility Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          ♿ <Text style={{ fontWeight: '700' }}>Accessibility:</Text> All videos
          include American Sign Language (ASL) interpretation and closed
          captions. Captions can be toggled at any time.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ASLHelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  videoCard: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },

  videoDisplay: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020617',
  },

  aslEmoji: {
    fontSize: 72,
    marginBottom: 8,
  },

  videoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  captionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 12,
  },

  captionText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },

  controls: {
    backgroundColor: '#1E293B',
    padding: 16,
  },

  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  playButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 999,
  },

  controlIcons: {
    flexDirection: 'row',
    gap: 16,
  },

  progressBar: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 999,
    overflow: 'hidden',
  },

  progressFill: {
    width: '33%',
    height: '100%',
    backgroundColor: '#3B82F6',
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },

  timeText: {
    color: '#E5E7EB',
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },

  sectionSubtitle: {
    color: '#64748B',
    fontSize: 13,
    marginBottom: 20,
  },

  libraryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0F172A',
  },

  videoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 10,
    gap: 12,
  },

  thumbnail: {
    width: 64,
    height: 64,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  thumbnailEmoji: {
    fontSize: 28,
  },

  videoRowTitle: {
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },

  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },

  badge: {
    backgroundColor: '#DBEAFE',
    color: '#2563EB',
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },

  duration: {
    fontSize: 11,
    color: '#64748B',
  },

  infoCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 2,
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    marginBottom: 32,
  },

  infoText: {
    color: '#1E40AF',
    fontSize: 13,
  },
});
